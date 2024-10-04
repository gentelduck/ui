import React, { createContext, useContext, useState, ReactNode, RefObject, Dispatch, SetStateAction } from 'react'
import { dataPoint, processBlob } from './audio-visualizer'

interface AudioContextType {
  processAudio: (
    blob: Blob | null,
    canvasRef: RefObject<HTMLCanvasElement>,
    width: number,
    height: number,
    barWidth: number,
    gap: number,
    backgroundColor: string,
    barColor: string,
    barPlayedColor: string,
    minBarHeight: number,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) => Promise<void>
  data: dataPoint[]
  duration: number
  animationProgress: number
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export const useAudioProvider = (): AudioContextType => {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudioService must be used within an AudioServiceProvider')
  }
  return context
}

interface AudioProviderProps {
  children: ReactNode
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [data, setData] = React.useState<dataPoint[]>([])
  const [duration, setDuration] = React.useState<number>(0)

  React.useEffect(() => {
    console.log(duration)
  }, [duration])

  const [animationProgress, setAnimationProgress] = useState<number>(0)

  const processAudio = React.useCallback(
    async (
      blob: Blob | null,
      canvasRef: RefObject<HTMLCanvasElement>,
      width: number,
      height: number,
      barWidth: number,
      gap: number,
      backgroundColor: string,
      barColor: string,
      barPlayedColor: string,
      minBarHeight: number,
      setLoading: Dispatch<SetStateAction<boolean>>
    ) => {
      await processBlob({
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
      })
    },
    []
  )

  return (
    <AudioContext.Provider
      value={{
        processAudio,
        data,
        duration,
        animationProgress,
      }}
    >
      {children}
    </AudioContext.Provider>
  )
}
