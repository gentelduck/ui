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
  minBarHeight: number = 5,
  animationProgress: number = 1 // Added animation progress
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
    const y = amp

    // Increase the scaling factor to make bars taller
    const scalingFactor = 2 // Adjust this factor to make bars taller
    const targetHeight = amp + dp.max * scalingFactor - y
    const h = Math.max(targetHeight * animationProgress, minBarHeight)

    ctx.beginPath()
    if (ctx.roundRect) {
      ctx.roundRect(x, y - h / 2, barWidth, h, 50)
      ctx.fill()
    } else {
      ctx.fillRect(x, y - h / 2, barWidth, h)
    }
  })
}

interface ProcessBlobType {
  canvasRef: React.RefObject<HTMLCanvasElement>
  blob: Blob
  barWidth: number
  gap: number
  backgroundColor: string
  barColor: string
  barPlayedColor?: string
  minBarHeight: number
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setData: React.Dispatch<React.SetStateAction<dataPoint[]>>
  setDuration: React.Dispatch<React.SetStateAction<number>>
  setAnimationProgress: React.Dispatch<React.SetStateAction<number>>
  width: number
  height: number
}

const processBlob = async ({
  canvasRef,
  blob,
  barWidth,
  gap,
  backgroundColor,
  barColor,
  barPlayedColor,
  minBarHeight,
  setLoading,
  setData,
  setDuration,
  setAnimationProgress,
  width,
  height,
}: ProcessBlobType): Promise<void> => {
  if (!canvasRef.current) return

  if (!blob) {
    // Ensure min height bars if no blob is present
    const barsData = Array.from({ length: Math.floor(width / (barWidth + gap)) }, () => ({
      max: minBarHeight,
      min: minBarHeight,
    }))
    draw(barsData, canvasRef.current, barWidth, gap, backgroundColor, barColor, barPlayedColor, 0, 1, minBarHeight, 1)
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

    // Animate the bar heights
    let startTime: number | null = null
    const animate = (time: number) => {
      if (!startTime) startTime = time
      const progress = Math.min((time - startTime) / 1000, 1) // 1 second animation

      setAnimationProgress(progress)

      draw(
        barsData,
        canvasRef.current!,
        barWidth,
        gap,
        backgroundColor,
        barColor,
        barPlayedColor,
        0,
        buffer.duration,
        minBarHeight,
        progress // Use progress to animate the bars
      )

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)

    setLoading(false)
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
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
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
      setLoading,
    }: AudioVisualizerProps,
    ref?: ForwardedRef<HTMLCanvasElement>
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [data, setData] = useState<dataPoint[]>([])
    const [duration, setDuration] = useState<number>(0)
    const [animationProgress, setAnimationProgress] = useState<number>(0)

    useImperativeHandle<HTMLCanvasElement | null, HTMLCanvasElement | null>(ref, () => canvasRef.current, [])

    // Draw default bars initially (before the data is processed)
    useEffect(() => {
      if (canvasRef.current) {
        const defaultBars = Array.from({ length: Math.floor(width / (barWidth + gap)) }, () => ({
          max: minBarHeight,
          min: minBarHeight,
        }))
        draw(
          defaultBars,
          canvasRef.current,
          barWidth,
          gap,
          backgroundColor,
          barColor,
          barPlayedColor,
          0,
          1,
          minBarHeight,
          1
        )
      }
    }, [canvasRef.current, width, barWidth, gap, minBarHeight])

    // Process audio data and update the visualizer once the blob is available
    useEffect(() => {
      processBlob({
        blob,
        canvasRef,
        setAnimationProgress,
        setLoading,
        setDuration,
        setData,
        width,
        height,
        barWidth,
        gap,
        backgroundColor,
        barColor,
        barPlayedColor,
        minBarHeight,
      })
    }, [blob, canvasRef.current])

    // Redraw canvas on currentTime or animationProgress updates
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
        minBarHeight,
        animationProgress
      )
    }, [currentTime, duration, animationProgress])

    return (
      <div style={{ position: 'relative', width, height }}>
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
