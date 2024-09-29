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
    const [loading, setLoading] = useState<boolean>(true) // New loading state

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
          setLoading(false)
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
          setLoading(false) // Set loading to false after drawing
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
      <div style={{ position: 'relative', width, height }}>
        {!loading && (
          <svg
            id="wave"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 38.05"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          >
            <title>Audio Wave</title>
            <path
              id="Line_1"
              data-name="Line 1"
              d="M0.91,15L0.78,15A1,1,0,0,0,0,16v6a1,1,0,1,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H0.91Z"
            />
            <path
              id="Line_2"
              data-name="Line 2"
              d="M6.91,9L6.78,9A1,1,0,0,0,6,10V28a1,1,0,1,0,2,0s0,0,0,0V10A1,1,0,0,0,7,9H6.91Z"
            />
            <path
              id="Line_3"
              data-name="Line 3"
              d="M12.91,0L12.78,0A1,1,0,0,0,12,1V37a1,1,0,1,0,2,0s0,0,0,0V1a1,1,0,0,0-1-1H12.91Z"
            />
            <path
              id="Line_4"
              data-name="Line 4"
              d="M18.91,10l-0.12,0A1,1,0,0,0,18,11V27a1,1,0,1,0,2,0s0,0,0,0V11a1,1,0,0,0-1-1H18.91Z"
            />
            <path
              id="Line_5"
              data-name="Line 5"
              d="M24.91,15l-0.12,0A1,1,0,0,0,24,16v6a1,1,0,1,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H24.91Z"
            />
            <path
              id="Line_6"
              data-name="Line 6"
              d="M30.91,9l-0.12,0A1,1,0,0,0,30,10v18a1,1,0,1,0,2,0s0,0,0,0V10a1,1,0,0,0-1-1H30.91Z"
            />
            <path
              id="Line_7"
              data-name="Line 7"
              d="M36.91,0l-0.12,0A1,1,0,0,0,36,1V37a1,1,0,1,0,2,0s0,0,0,0V1a1,1,0,0,0-1-1H36.91Z"
            />
            <path
              id="Line_8"
              data-name="Line 8"
              d="M42.91,10l-0.12,0A1,1,0,0,0,42,11V27a1,1,0,1,0,2,0s0,0,0,0V11a1,1,0,0,0-1-1H42.91Z"
            />
            <path
              id="Line_9"
              data-name="Line 9"
              d="M48.91,15l-0.12,0A1,1,0,0,0,48,16v6a1,1,0,1,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H48.91Z"
            />
          </svg>
        )}
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          style={style}
        />
      </div>
    )
  }
)

AudioVisualizer.displayName = 'AudioVisualizer'

export { AudioVisualizer }
