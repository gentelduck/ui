import { useRef, useState, forwardRef, useImperativeHandle, useEffect } from 'react'
import { useAudioService } from './audio-service-worker'

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

  let data: dataPoint[] = []
  let maxDataPoint = 0

  for (let i = 0; i < units; i++) {
    const mins: number[] = []
    const maxs: number[] = []

    for (let j = 0; j < step && i * step + j < bufferData.length; j++) {
      const datum = bufferData[i * step + j]
      if (datum <= 0) mins.push(datum)
      if (datum > 0) maxs.push(datum)
    }

    const minAvg = mins.length ? mins.reduce((a, c) => a + c, 0) / mins.length : 0
    const maxAvg = maxs.length ? maxs.reduce((a, c) => a + c, 0) / maxs.length : 0

    const dataPoint = { max: maxAvg, min: minAvg }
    maxDataPoint = Math.max(maxDataPoint, Math.abs(dataPoint.max), Math.abs(dataPoint.min))
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
}: ProcessBlobType): Promise<void> => {
  if (!canvasRef.current) return

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

    let startTime: number | null = null
    const animate = (time: number) => {
      if (!startTime) startTime = time
      const progress = Math.min((time - startTime) / 1000, 1) // 1 second animation
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
        requestAnimationFrame(animate)
      } else {
        setLoading(false) // End loading state after the animation completes
      }
    }
    requestAnimationFrame(animate)
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
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { processAudio, data, duration, animationProgress } = useAudioService()

  useEffect(() => {
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
      setLoading
    )
  }, [blob])

  useEffect(() => {
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
