import { ArrowBigUp, Mic, Pause, Play, Trash2 } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'
import { Button } from './button'
import { cn } from '@/lib'
import { Input } from './input'
import { audio, AudioVisualizer, dataPoint, new_audio, process_blob, ProcessBlobParams } from './audio-visualizer'

export interface RecordingParams {
  setRecordings: React.Dispatch<React.SetStateAction<Blob[]>>
  setRecordedDuration: React.Dispatch<React.SetStateAction<number>>
  audioChunksRef: React.MutableRefObject<Blob[]>
}

export interface StopRecordingHandlerParam {
  setRecording: React.Dispatch<React.SetStateAction<boolean>>
  intervalRef: React.MutableRefObject<ReturnType<typeof setInterval> | null>
  mediaRecorderRef: React.MutableRefObject<MediaRecorder | null>
  durationRef: React.MutableRefObject<number>
}

export interface DeleteRecordingHandlerParams
  extends Pick<RecordingParams, 'audioChunksRef'>,
    StopRecordingHandlerParam {}

export interface StopRecordingHandlerParams
  extends Omit<StopRecordingHandlerParam, 'setRecording' | 'mediaRecorderRef' | 'durationRef'>,
    Omit<RecordingParams, 'setRecordedDuration'> {}

export interface StartTimerParams
  extends Omit<StopRecordingHandlerParam, 'setRecording' | 'mediaRecorderRef'>,
    Pick<RecordingParams, 'setRecordedDuration'> {}

export interface StartRecordingHandlerParams extends StopRecordingHandlerParam, RecordingParams {}

export const format_time_handler = (milliseconds: number): string => {
  const minutes = Math.floor(milliseconds / 60000)
  const seconds = Math.floor((milliseconds % 60000) / 1000)
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export interface VisualizerClickHandlerParams {
  audioRef: React.MutableRefObject<HTMLAudioElement | null>
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>
  event: React.MouseEvent<HTMLDivElement>
}

// Handle audio visualizer click
const visualizer_click_handler = ({ audioRef, event, setCurrentTime }: VisualizerClickHandlerParams) => {
  if (audioRef.current == null) return
  const rect = event.currentTarget.getBoundingClientRect()
  const clickX = event.clientX - rect.left
  const duration = audioRef.current.duration

  if (duration && duration > 0) {
    const newTime = (clickX / rect.width) * duration
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime * 1000)
  }
}

// Start recording audio
export const start_recording_handler = async ({
  setRecordings,
  setRecording,
  setRecordedDuration,
  durationRef,
  intervalRef,
  audioChunksRef,
  mediaRecorderRef,
}: StartRecordingHandlerParams) => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  mediaRecorderRef.current = new MediaRecorder(stream)
  audioChunksRef.current = []

  mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
    audioChunksRef.current.push(event.data)
  }

  mediaRecorderRef.current.onstop = () => {
    setRecordedDuration(_ => 0)
    durationRef.current > 0 &&
      Stop_recording_handler({
        setRecordings,
        intervalRef,
        audioChunksRef,
      })
  }

  mediaRecorderRef.current.start()
  setRecording(true)
  durationRef.current = 0
  start_timer_handler({ durationRef, intervalRef, setRecordedDuration })
}

// Stop recording and process audio blob
export const Stop_recording_handler = ({ setRecordings, intervalRef, audioChunksRef }: StopRecordingHandlerParams) => {
  const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })

  setRecordings(prev => [...prev, audioBlob])
  clearInterval(intervalRef.current!)
}

// Stop recording audio
export const stop_recording_handle = ({ setRecording, intervalRef, mediaRecorderRef }: StopRecordingHandlerParam) => {
  mediaRecorderRef.current?.stop()
  setRecording(false)
  clearInterval(intervalRef.current!)
}

// Delete recording
export const deleteRecordingHandler = ({
  setRecording,
  intervalRef,
  mediaRecorderRef,
  durationRef,
  audioChunksRef,
}: DeleteRecordingHandlerParams) => {
  durationRef.current = 0
  audioChunksRef.current = []
  stop_recording_handle({ setRecording, intervalRef, mediaRecorderRef, durationRef })
}

// Start timer to track recording duration
export const start_timer_handler = ({ durationRef, intervalRef, setRecordedDuration }: StartTimerParams) => {
  clearInterval(intervalRef.current!)
  intervalRef.current = setInterval(() => {
    durationRef.current += 1000
    setRecordedDuration(durationRef.current)
  }, 1000)
}

// Define the type for the context
interface AudioContextType {
  recording: boolean
  recordedDuration: number
  startRecording: () => void
  stopRecording: () => void
  deleteRecording: () => void
}

// Default values for the context
const AudioContext = React.createContext<AudioContextType | undefined>(undefined)

// Use the custom hook to access the audio context
export const useAudioProvider = (): AudioContextType => {
  const context = React.useContext(AudioContext)
  if (!context) {
    throw new Error('useAudioContext must be used within an Audio')
  }
  return context
}

// AudioProvider component that will wrap the rest of the app
const Audio: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recordedDuration, setRecordedDuration] = React.useState<number>(0)
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null)
  const audioChunksRef = React.useRef<Blob[]>([])
  const intervalRef = React.useRef<NodeJS.Timer | null>(null)
  const durationRef = React.useRef<number>(0)
  const audioRef = React.useRef<HTMLAudioElement>(audio)
  const { setRecordings, setRecording, recording } = useAudioDataProvider()

  // Start recording handler
  const startRecording = () => {
    start_recording_handler({
      setRecordings,
      setRecording,
      setRecordedDuration,
      durationRef,
      intervalRef,
      audioChunksRef,
      mediaRecorderRef,
    })
  }

  // Stop recording handler
  const stopRecording = () => {
    stop_recording_handle({
      setRecording,
      intervalRef,
      mediaRecorderRef,
      durationRef,
    })
  }

  // Delete recording handler
  const deleteRecording = () => {
    deleteRecordingHandler({
      intervalRef,
      mediaRecorderRef,
      setRecording,
      durationRef,
      audioChunksRef,
    })
  }

  // Cleanup audio element and interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  // Provide the state and functions to the children components
  return (
    <AudioContext.Provider value={{ recording, recordedDuration, startRecording, stopRecording, deleteRecording }}>
      {children}
    </AudioContext.Provider>
  )
}

export interface AudioTimerProps extends React.HTMLAttributes<HTMLDivElement> {
  showInput?: boolean
}

export const AudioTimer = React.forwardRef<HTMLDivElement, AudioTimerProps>(({ showInput, className }, ref) => {
  const { recording, recordedDuration } = useAudioProvider()
  return (
    <div
      className={cn('relative', className)}
      ref={ref}
    >
      <div
        className={cn(
          'absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 transition duration-100',
          recording ? 'opacity-1' : 'opacity-0 pointer-events-none right-4'
        )}
      >
        <span className="font-mono">{format_time_handler(recordedDuration)}</span>
        <span className="font-mono w-2 h-2 rounded-full bg-primary animate-pulse" />
      </div>
      <div>
        {showInput && (
          <Input
            disabled={recording}
            className={cn('transition fade_animation', !recording ? 'w-[235px]' : 'w-[179px] !opacity-100')}
          />
        )}
      </div>
    </div>
  )
})

export interface AudioDeleteProps extends React.ComponentPropsWithoutRef<typeof Button> {}

export const AudioDelete = React.forwardRef<HTMLButtonElement, AudioDeleteProps>(
  ({ size, type, onClick, className, ...props }, ref) => {
    const { deleteRecording, recording } = useAudioProvider()
    return (
      <Button
        size={size ?? 'icon'}
        type={type ?? 'button'}
        onClick={e => {
          deleteRecording()
          onClick && onClick(e)
        }}
        className={cn(
          'rounded-full relative transition fade_animation',
          recording ? 'scale-1 opacity-1 w-8 h-8' : 'scale-0 opacity-0 pointer-events-none w-0 h-0',
          className
        )}
        ref={ref}
        {...props}
      >
        <Trash2 className="size-[1rem] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 transition fade_animation" />
      </Button>
    )
  }
)

export interface AudioStartProps extends React.ComponentPropsWithoutRef<typeof Button> {}

export const AudioStart = React.forwardRef<HTMLButtonElement, AudioStartProps>(
  ({ size, type, onClick, className, ...props }, ref) => {
    const { startRecording, stopRecording, recording } = useAudioProvider()
    return (
      <Button
        size={size ?? 'icon'}
        type={type ?? 'button'}
        onClick={e => {
          recording ? stopRecording() : startRecording()
          onClick && onClick(e)
        }}
        className={cn('rounded-full transition relative w-8 h-8', recording ? 'ml-2' : 'ml-0', className)}
        ref={ref}
        {...props}
      >
        <Mic
          className={cn(
            'size-[1rem] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 transition fade_animation',
            recording ? 'scale-0 opacity-0 pointer-events-none' : 'scale-1 opacity-1'
          )}
        />
        <ArrowBigUp
          className={cn(
            'size-[1.18rem] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 transition fade_animation stroke-[1.5]',
            recording ? 'scale-[1.1] opacity-1' : 'scale-0 opacity-0 pointer-events-none'
          )}
        />
      </Button>
    )
  }
)

const AudioVisualizerMemo = React.memo(AudioVisualizer)

const AudioItemWrapper = ({
  children,
  loading,
  isPlaying,
  timeLeft,
  size = 'sm',
  duration,
  handlePlayPause,
}: {
  size: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  duration: number
  loading: boolean
  isPlaying: boolean
  timeLeft: number
  handlePlayPause: () => void
}) => {
  return (
    <>
      <div className="flex items-center gap-4 bg-secondary p-3 rounded-xl w-fit">
        <Button
          onClick={handlePlayPause}
          size="icon"
          className={cn(
            'rounded-full relative',
            size === 'sm' ? 'w-8 h-8 [&_svg]:size-4' : size === 'md' ? 'w-10 h-10' : 'w-12 h-12'
          )}
          loading={loading}
        >
          <Play
            className={cn(
              'absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 transition fade_animation',
              !isPlaying && !loading ? 'scale-1 opacity-1' : 'scale-0 opacity-0 pointer-events-none'
            )}
          />
          <Pause
            className={cn(
              'absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 transition fade_animation',
              isPlaying && !loading ? 'scale-1 opacity-1' : 'scale-0 opacity-0 pointer-events-none'
            )}
          />
        </Button>

        {
          <div className="flex flex-col">
            <div className="cursor-pointer w-fit bg-secondary p-0">{children}</div>

            <div className="flex items-center gap-2">
              <span className={cn('flex items-center text-primary', size === 'sm' ? 'text-xs' : 'text-sm')}>
                {isPlaying || timeLeft < duration
                  ? format_time_handler(timeLeft > 0 ? timeLeft : 0)
                  : format_time_handler(duration)}
              </span>
              {
                /* TODO: YOU SHOULD EDIT THE OBJ TO GIVE YOU VALUE OF RECIPIENT OPENED THE RECORD */
                <span className="w-2 h-2 bg-primary rounded-full" />
              }

              <AudioSpeed />
            </div>
          </div>
        }
      </div>
    </>
  )
}

export const AudioSpeed = () => {
  const { speed, setSpeed } = useAudioDataProvider()

  return (
    <>
      <Button
        className={cn('w-8 h-4 rounded-full text-[.6rem] font-semibold')}
        variant={'default'}
        size={'sm'}
        onClick={() => setSpeed(speed > 1.5 ? 0.5 : speed + 0.5)}
      >
        x{speed}
      </Button>
    </>
  )
}

export interface AudioRecordItemProps {
  loading?: boolean
  size?: 'sm' | 'md' | 'lg'
  barHeight?: number
  barWidth?: number
  gap?: number
  backgroundColor?: string
  barColor?: string
  barPlayedColor?: string
  minBarHeight?: number
  style?: React.CSSProperties
  audio: Blob | null
}

const AudioRecordItem = ({
  size = 'sm',
  audio,
  loading: loadingState,
  style,
  minBarHeight,
  barPlayedColor,
  gap,
  barColor,
  barWidth,
  barHeight,
  backgroundColor,
}: AudioRecordItemProps) => {
  const { duration: audioDuration, speed } = useAudioDataProvider()
  const duration = audioDuration * 1000

  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [loading, setLoading] = useState<boolean>(loadingState ?? true)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [timeLeft, setTimeLeft] = useState<number>(duration)

  React.useEffect(() => {
    setTimeLeft(duration - currentTime)
  }, [currentTime, duration])

  React.useEffect(() => {
    if (audio) {
      const audioURL = URL.createObjectURL(audio)
      audioRef.current = new_audio(audioURL)

      // Handle end of the audio
      audioRef.current.onended = () => {
        setIsPlaying(false)
        setCurrentTime(0)
        setTimeLeft(duration)
      }

      // Update current time as the audio plays
      audioRef.current.ontimeupdate = () => {
        setCurrentTime(audioRef.current!.currentTime * 1000)
      }

      return () => {
        if (audioRef.current) {
          audioRef.current.pause()
          audioRef.current.src = ''
        }
      }
    }
  }, [audio])

  // Update the playback rate and keep the audio playing at the current time
  React.useEffect(() => {
    if (audioRef.current) {
      const wasPlaying = isPlaying
      const currentAudioTime = audioRef.current.currentTime

      // Pause the audio temporarily, change playback rate, and resume if it was playing
      audioRef.current.pause()
      audioRef.current.playbackRate = speed
      audioRef.current.currentTime = currentAudioTime

      if (wasPlaying) {
        audioRef.current.play()
      }
    }
  }, [speed])

  // Play or pause audio
  const handlePlayPause = React.useCallback(() => {
    if (isPlaying) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play()
    }
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  return (
    <>
      <AudioItemWrapper
        size={size}
        loading={loading}
        duration={duration}
        isPlaying={isPlaying}
        handlePlayPause={handlePlayPause}
        timeLeft={timeLeft}
        children={
          <div onClick={event => visualizer_click_handler({ audioRef, event, setCurrentTime })}>
            <AudioVisualizerMemo
              setCurrentTime={setCurrentTime}
              blob={audio}
              width={barWidth ?? 180}
              height={barHeight ?? 27}
              barWidth={barWidth ?? 3}
              gap={gap ?? 2}
              barColor={barColor ?? '#ffffff69'}
              currentTime={currentTime / 1000}
              barPlayedColor={barPlayedColor ?? '#fff'}
              backgroundColor={backgroundColor ?? '#f0f0f000'}
              setLoading={setLoading}
              style={style}
              minBarHeight={minBarHeight ?? 1}
            />
          </div>
        }
      />
    </>
  )
}

export interface FetchAudioBlobParams {
  url: string
  setAudioBlob: React.Dispatch<React.SetStateAction<Blob | null>>
}

export const fetchAudioBlob = async ({ url, setAudioBlob }: FetchAudioBlobParams) => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      console.error('Failed to fetch audio:', response.statusText)
      return setAudioBlob(null)
    }

    const blob = await response.blob()
    setAudioBlob(blob)
  } catch (error) {
    setAudioBlob(null)
    console.error('Error fetching audio:', error)
  }
}

export interface AudioItemProps {
  url: string
}

const AudioItem: React.FC<AudioItemProps> = ({ url }) => {
  const [audioBlob, setAudioBlob] = React.useState<Blob | null>(null)

  React.useEffect(() => {
    if (!url.startsWith('https://') || !url) return
    fetchAudioBlob({ url, setAudioBlob })
  }, [url])

  return (
    <AudioDataProvider>
      <AudioRecordItem
        loading={audioBlob === null ? true : false}
        audio={audioBlob}
      />
    </AudioDataProvider>
  )
}

// Audio Provider
export interface AudioDataContextType {
  process_audio: (args: Omit<ProcessBlobParams, 'setAnimationProgress' | 'setDuration' | 'setData'>) => Promise<void>
  data: dataPoint[]
  speed: number
  setSpeed: React.Dispatch<React.SetStateAction<number>>
  animationProgress: number
  setAnimationProgress: React.Dispatch<React.SetStateAction<number>>
  recordings: Blob[]
  setRecordings: React.Dispatch<React.SetStateAction<Blob[]>>
  duration: number
  setDuration: React.Dispatch<React.SetStateAction<number>>
  recording: boolean
  setRecording: React.Dispatch<React.SetStateAction<boolean>>
}

export const AudioDataContext = React.createContext<AudioDataContextType | undefined>(undefined)

const useAudioDataProvider = (): AudioDataContextType => {
  const context = React.useContext(AudioDataContext)
  if (!context) {
    throw new Error('useAudioProvider must be used within an AudioServiceProvider')
  }
  return context
}

export interface AudioProviderProps {
  children: React.ReactNode
}

const AudioDataProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [data, setData] = React.useState<dataPoint[]>([])
  const [duration, setDuration] = React.useState<number>(0)
  const [recordings, setRecordings] = React.useState<Blob[]>([])
  const [speed, setSpeed] = React.useState<number>(1)
  const [animationProgress, setAnimationProgress] = React.useState<number>(0)
  const [recording, setRecording] = React.useState<boolean>(false)

  const process_audio = React.useCallback(
    async ({
      canvasRef,
      blob,
      barWidth,
      gap,
      backgroundColor,
      barColor,
      barPlayedColor,
      minBarHeight,
      setLoading,
      width,
      height,
    }: Omit<ProcessBlobParams, 'setAnimationProgress' | 'setDuration' | 'setData'>) => {
      await process_blob({
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
    <AudioDataContext.Provider
      value={{
        process_audio: process_audio,
        recordings,
        setDuration,
        setRecordings,
        setAnimationProgress,
        data,
        duration,
        animationProgress,
        speed,
        setSpeed,
        recording,
        setRecording,
      }}
    >
      {children}
    </AudioDataContext.Provider>
  )
}

export { Audio, AudioItem, AudioRecordItem, AudioItemWrapper, AudioDataProvider, useAudioDataProvider }
