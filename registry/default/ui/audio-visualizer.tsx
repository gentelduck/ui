import React from 'react'
import { useAudioProvider } from './audio-service-worker'

export interface dataPoint {
  max: number
  min: number
}

export const calculateBarData = (
  buffer: AudioBuffer,
  height: number,
  width: number,
  barWidth: number,
  gap: number
): dataPoint[] => {
  const bufferData = buffer.getChannelData(0)
  const units = Math.floor(width / (barWidth + gap))
  const step = Math.floor(bufferData.length / units)
  const amp = height / 2

  const data: dataPoint[] = new Array(units) // Preallocate array
  let maxDataPoint = 0

  for (let i = 0; i < units; i++) {
    let minSum = 0
    let maxSum = 0
    let minCount = 0
    let maxCount = 0

    const startIdx = i * step
    const endIdx = Math.min(startIdx + step, bufferData.length)

    for (let j = startIdx; j < endIdx; j++) {
      const datum = bufferData[j]
      if (datum < 0) {
        minSum += datum
        minCount++
      } else {
        maxSum += datum
        maxCount++
      }
    }

    const minAvg = minCount ? minSum / minCount : 0
    const maxAvg = maxCount ? maxSum / maxCount : 0

    const dataPoint = { max: maxAvg, min: minAvg }
    maxDataPoint = Math.max(maxDataPoint, Math.abs(dataPoint.max), Math.abs(dataPoint.min))
    data[i] = dataPoint // Assign directly to preallocated array
  }

  if (amp * 0.8 > maxDataPoint * amp) {
    const adjustmentFactor = (amp * 0.8) / maxDataPoint
    for (let i = 0; i < units; i++) {
      data[i].max *= adjustmentFactor
      data[i].min *= adjustmentFactor
    }
  }

  return data
}

export const draw = (
  data: dataPoint[],
  canvas: HTMLCanvasElement | null,
  barWidth: number,
  gap: number,
  backgroundColor: string,
  barColor: string,
  barPlayedColor?: string,
  currentTime: number = 0,
  duration: number = 1,
  minBarHeight: number = 5,
  animationProgress: number = 1
): void => {
  if (!canvas) return

  const amp = canvas.height / 2
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  if (backgroundColor !== 'transparent') {
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const playedPercent = (currentTime || 0) / duration

  data.forEach((dp, i) => {
    ctx.fillStyle = playedPercent > i / data.length && barPlayedColor ? barPlayedColor : barColor

    const x = i * (barWidth + gap)
    const y = amp

    const targetHeight = amp + dp.max * 2 - y // Adjust this factor for height
    const h = Math.max(targetHeight * animationProgress, minBarHeight)

    ctx.beginPath()
    ctx.fillRect(x, y - h / 2, barWidth, h)
  })
}

interface ProcessBlobType {
  canvasRef: React.RefObject<HTMLCanvasElement>
  blob: Blob | null
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
  speed: number
}

export const processBlob = async ({
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
  speed,
}: ProcessBlobType): Promise<void> => {
  if (!canvasRef.current || !blob) return

  const defaultBars = Array.from({ length: Math.floor(width / (barWidth + gap)) }, () => ({
    max: minBarHeight,
    min: minBarHeight,
  }))

  draw(defaultBars, canvasRef.current, barWidth, gap, backgroundColor, barColor, barPlayedColor, 0, 1, 1, 1)

  const audioContext = new AudioContext()
  const audioBuffer = await blob.arrayBuffer()

  // Decode the entire audio data
  audioContext.decodeAudioData(audioBuffer, buffer => {
    if (!canvasRef.current) return

    setDuration(buffer.duration)

    // Calculate the waveform data for the entire audio buffer
    const barsData = calculateBarData(buffer, height, width, barWidth, gap)

    // Set the calculated data for rendering
    setData(barsData)

    // Set up for animation
    let startTime: number | null = null
    let animationFrameId: number | null = null // For tracking animation frame ID

    const animate = (time: number) => {
      if (!startTime) startTime = time

      const elapsedTime = time - startTime
      const progress = Math.min(elapsedTime / 1000, 1) // 1 second animation

      // Update animation progress using a ref
      setAnimationProgress(progress)

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
        minBarHeight,
        progress
      )

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        setLoading(false) // End loading state after the animation completes
      }
    }

    // Start the animation
    animationFrameId = requestAnimationFrame(animate)

    // Cleanup when the component unmounts or the animation is done
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  })
}

interface AudioVisualizerProps {
  blob: Blob | null
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

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  blob,
  width,
  height,
  barWidth = 2,
  gap = 1,
  backgroundColor = 'transparent',
  barColor = 'rgb(184, 184, 184)',
  barPlayedColor = 'rgb(160, 198, 255)',
  currentTime = 0,
  minBarHeight = 2,
  style,
  setLoading,
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const { processAudio, data, duration, animationProgress, speed } = useAudioProvider()

  React.useEffect(() => {
    setLoading(true)
    processAudio(
      blob,
      canvasRef,
      width,
      height,
      barWidth,
      gap,
      backgroundColor,
      barColor,
      barPlayedColor,
      minBarHeight,
      setLoading,
      speed
    )
  }, [blob])

  React.useEffect(() => {
    if (!canvasRef.current) return
    draw(
      data.length
        ? data
        : Array.from({ length: Math.floor(width / (barWidth + gap)) }, () => ({
            min: minBarHeight,
            max: minBarHeight,
          })),
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
  }, [data, width, height, currentTime, duration, animationProgress])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={style}
    />
  )
}

export { AudioVisualizer }
