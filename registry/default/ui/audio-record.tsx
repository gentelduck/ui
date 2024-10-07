import { ArrowBigUp, Mic, Pause, Play, Trash2 } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'
import { Button } from './button'
import { cn } from '@/lib'
import { Input } from './input'
import { AudioVisualizer, dataPoint, process_blob, ProcessBlobParams } from './audio-visualizer'

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

const AudioRecorder: React.FC = () => {
  const [recording, setRecording] = useState<boolean>(false)
  const [recordings, setRecordings] = useState<Blob[]>([])
  const [recordedDuration, setRecordedDuration] = useState<number>(0)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const intervalRef = useRef<NodeJS.Timer | null>(null)
  const durationRef = useRef<number>(0)
  const audioRef = useRef<HTMLAudioElement>(new Audio())

  // Cleanup audio element on unmount and interval
  useEffect(() => {
    return () => {
      audioRef.current.pause()
      audioRef.current.src = ''
      clearInterval(intervalRef.current!)
    }
  }, [])

  const record = recording
    ? () => stop_recording_handle({ setRecording, intervalRef, mediaRecorderRef, durationRef })
    : () =>
        start_recording_handler({
          setRecordings,
          setRecording,
          setRecordedDuration,
          durationRef,
          intervalRef,
          audioChunksRef,
          mediaRecorderRef,
        })

  const deleteRecording = () =>
    deleteRecordingHandler({ intervalRef, mediaRecorderRef, setRecording, durationRef, audioChunksRef })

  return (
    <div className="flex flex-col gap-2">
      <div className="p-5 rounded-lg shadow-md flex items-center gap-4 border border-border w-[333px]">
        <div className="relative">
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
            <Input
              disabled={recording}
              className={cn('transition fade_animation', !recording ? 'w-[235px]' : 'w-[179px] !opacity-100')}
            />
          </div>
        </div>

        <Button
          size={'icon'}
          onClick={deleteRecording}
          className={cn(
            'rounded-full relative transition fade_animation',
            recording ? 'scale-1 opacity-1 ml-0 w-10 h-10' : 'scale-0 opacity-0 pointer-events-none -ml- w-0 h-0'
          )}
        >
          <Trash2 className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 transition fade_animation" />
        </Button>

        <Button
          size={'icon'}
          onClick={record}
          className={cn('rounded-full transition relative w-10 h-10', recording ? 'ml-0' : '-ml-4')}
        >
          <Mic
            className={cn(
              'absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 transition fade_animation',
              recording ? 'scale-0 opacity-0 pointer-events-none' : 'scale-1 opacity-1'
            )}
          />
          <ArrowBigUp
            className={cn(
              'absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 transition fade_animation stroke-[1.5]',
              recording ? 'scale-[1.3] opacity-1' : 'scale-0 opacity-0 pointer-events-none'
            )}
          />
        </Button>
      </div>

      {/* Render List of Recordings */}
      <div className="flex flex-col gap-2 mt-5">
        {recordings.map((recording, index) => (
          <AudioProvider>
            <AudioRecordItem
              key={index}
              audio={recording}
            />
          </AudioProvider>
        ))}
      </div>
    </div>
  )
}

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
  const { speed, setSpeed } = useAudioProvider()

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
  const { duration: audioDuration, speed } = useAudioProvider()
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
      audioRef.current = new Audio(audioURL)

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
    <AudioProvider>
      <AudioRecordItem
        loading={audioBlob === null ? true : false}
        audio={audioBlob}
      />
    </AudioProvider>
  )
}

// Audio Provider
export interface AudioContextType {
  process_audio: (args: Omit<ProcessBlobParams, 'setAnimationProgress' | 'setDuration' | 'setData'>) => Promise<void>
  data: dataPoint[]
  duration: number
  speed: number
  setSpeed: React.Dispatch<React.SetStateAction<number>>
  animationProgress: number
}

export const AudioContext = React.createContext<AudioContextType | undefined>(undefined)

const useAudioProvider = (): AudioContextType => {
  const context = React.useContext(AudioContext)
  if (!context) {
    throw new Error('useAudioService must be used within an AudioServiceProvider')
  }
  return context
}

export interface AudioProviderProps {
  children: React.ReactNode
}

const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [data, setData] = React.useState<dataPoint[]>([])
  const [duration, setDuration] = React.useState<number>(0)
  const [speed, setSpeed] = React.useState<number>(1)
  const [animationProgress, setAnimationProgress] = React.useState<number>(0)

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
    <AudioContext.Provider
      value={{
        process_audio: process_audio,
        data,
        duration,
        animationProgress,
        speed,
        setSpeed,
      }}
    >
      {children}
    </AudioContext.Provider>
  )
}

export { AudioRecorder, AudioItem, AudioRecordItem, AudioItemWrapper, AudioProvider, useAudioProvider }
