import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  RefObject,
  Dispatch,
  SetStateAction,
} from 'react'
import { dataPoint, processBlob } from './audio-visualizer'

interface AudioServiceContextType {
  processAudio: (
    blob: Blob,
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

const AudioServiceContext = createContext<AudioServiceContextType | undefined>(undefined)

export const useAudioService = (): AudioServiceContextType => {
  const context = useContext(AudioServiceContext)
  if (!context) {
    throw new Error('useAudioService must be used within an AudioServiceProvider')
  }
  return context
}

interface AudioServiceProviderProps {
  children: ReactNode
}

export const AudioServiceProvider: React.FC<AudioServiceProviderProps> = ({ children }) => {
  const [data, setData] = useState<dataPoint[]>([])
  const [duration, setDuration] = useState<number>(0)
  const [animationProgress, setAnimationProgress] = useState<number>(0)

  const processAudio = useCallback(
    async (
      blob: Blob,
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
    <AudioServiceContext.Provider
      value={{
        processAudio,
        data,
        duration,
        animationProgress,
      }}
    >
      {children}
    </AudioServiceContext.Provider>
  )
}
