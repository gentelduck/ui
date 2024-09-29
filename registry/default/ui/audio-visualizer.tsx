import {
  useRef,
  useState,
  forwardRef,
  type ForwardedRef,
  type ForwardRefExoticComponent,
  type RefAttributes,
  useImperativeHandle,
  useEffect,
} from 'react'

export interface dataPoint {
  max: number
  min: number
}

interface CustomCanvasRenderingContext2D extends CanvasRenderingContext2D {
  roundRect: (x: number, y: number, w: number, h: number, radius: number) => void
}

export const calculateBarData = (
  buffer: AudioBuffer,
  height: number,
  width: number,
  barWidth: number,
  gap: number
): dataPoint[] => {
  const bufferData = buffer.getChannelData(0)
  const units = width / (barWidth + gap)
  const step = Math.floor(bufferData.length / units)
  const amp = height / 2

  let data: dataPoint[] = []
  let maxDataPoint = 0

  for (let i = 0; i < units; i++) {
    const mins: number[] = []
    let minCount = 0
    const maxs: number[] = []
    let maxCount = 0

    for (let j = 0; j < step && i * step + j < buffer.length; j++) {
      const datum = bufferData[i * step + j]
      if (datum <= 0) {
        mins.push(datum)
        minCount++
      }
      if (datum > 0) {
        maxs.push(datum)
        maxCount++
      }
    }
    const minAvg = minCount > 0 ? mins.reduce((a, c) => a + c, 0) / minCount : 0
    const maxAvg = maxCount > 0 ? maxs.reduce((a, c) => a + c, 0) / maxCount : 0

    const dataPoint = { max: maxAvg, min: minAvg }

    if (dataPoint.max > maxDataPoint) maxDataPoint = dataPoint.max
    if (Math.abs(dataPoint.min) > maxDataPoint) maxDataPoint = Math.abs(dataPoint.min)

    data.push(dataPoint)
  }

  if (amp * 0.8 > maxDataPoint * amp) {
    const adjustmentFactor = (amp * 0.8) / maxDataPoint
    data = data.map(dp => ({
      max: dp.max * adjustmentFactor,
      min: dp.min * adjustmentFactor,
    }))
  }

  return data
}

export const draw = (
  data: dataPoint[],
  canvas: HTMLCanvasElement,
  barWidth: number,
  gap: number,
  backgroundColor: string,
  barColor: string,
  barPlayedColor?: string,
  currentTime: number = 0,
  duration: number = 1,
  minBarHeight: number = 5 // New minBarHeight argument
): void => {
  const amp = canvas.height / 2

  const ctx = canvas.getContext('2d') as CustomCanvasRenderingContext2D
  if (!ctx) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if (backgroundColor !== 'transparent') {
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const playedPercent = (currentTime || 0) / duration

  data.forEach((dp, i) => {
    const mappingPercent = i / data.length
    const played = playedPercent > mappingPercent
    ctx.fillStyle = played && barPlayedColor ? barPlayedColor : barColor

    const x = i * (barWidth + gap)
    const y = amp + dp.min
    let h = amp + dp.max - y

    // Ensure the bar height is at least `minBarHeight`
    h = Math.max(h, minBarHeight)

    ctx.beginPath()
    if (ctx.roundRect) {
      // Use roundRect if supported by the browser
      ctx.roundRect(x, y, barWidth, h, 50)
      ctx.fill()
    } else {
      // Fallback to fillRect if roundRect is not available
      ctx.fillRect(x, y, barWidth, h)
    }
  })
}

interface AudioVisualizerProps {
  blob: Blob
  width: number
  height: number
  barWidth?: number
  gap?: number
  backgroundColor?: string
  barColor?: string
  barPlayedColor?: string
  currentTime?: number
  minBarHeight?: number
  style?: React.CSSProperties
  ref?: React.ForwardedRef<HTMLCanvasElement>
}

const AudioVisualizer = forwardRef(
  (
    {
      blob,
      width,
      height,
      barWidth = 2,
      gap = 1,
      currentTime,
      style,
      backgroundColor = 'transparent',
      barColor = 'rgb(184, 184, 184)',
      barPlayedColor = 'rgb(160, 198, 255)',
      minBarHeight = 2,
    }: AudioVisualizerProps,
    ref?: ForwardedRef<HTMLCanvasElement>
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [data, setData] = useState<dataPoint[]>([])
    const [duration, setDuration] = useState<number>(0)

    useImperativeHandle<HTMLCanvasElement | null, HTMLCanvasElement | null>(ref, () => canvasRef.current, [])

    useEffect(() => {
      const processBlob = async (): Promise<void> => {
        if (!canvasRef.current) return

        if (!blob) {
          const barsData = Array.from({ length: 100 }, () => ({
            max: 0,
            min: 0,
          }))
          draw(
            barsData,
            canvasRef.current,
            barWidth,
            gap,
            backgroundColor,
            barColor,
            barPlayedColor,
            0,
            1,
            minBarHeight
          )
          return
        }

        const audioBuffer = await blob.arrayBuffer()
        const audioContext = new AudioContext()
        await audioContext.decodeAudioData(audioBuffer, buffer => {
          if (!canvasRef.current) return
          setDuration(buffer.duration)
          const barsData = calculateBarData(buffer, height, width, barWidth, gap)
          setData(barsData)
          draw(
            barsData,
            canvasRef.current,
            barWidth,
            gap,
            backgroundColor,
            barColor,
            barPlayedColor,
            0,
            buffer.duration,
            minBarHeight
          )
        })
      }

      processBlob()
    }, [blob, canvasRef.current])

    useEffect(() => {
      if (!canvasRef.current) return

      draw(
        data,
        canvasRef.current,
        barWidth,
        gap,
        backgroundColor,
        barColor,
        barPlayedColor,
        currentTime,
        duration,
        minBarHeight
      )
    }, [currentTime, duration])

    return (
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          ...style,
        }}
      />
    )
  }
)

AudioVisualizer.displayName = 'AudioVisualizer'

export { AudioVisualizer }
