import { ArrowBigUp, Mic, Pause, Play, Trash2 } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'
import { Button } from './button'
import { cn } from '@/lib'
import { Input } from './input'
import { AudioVisualizer } from './audio-visualizer'
import { AudioProvider, useAudioProvider } from './audio-service-worker'

export interface RecordingParams {
  setRecordings: React.Dispatch<React.SetStateAction<Blob[]>>
  setRecordedDuration: React.Dispatch<React.SetStateAction<number>>
  audioChunksRef: React.MutableRefObject<Blob[]>
}

export interface StopRecordingParams {
  setRecording: React.Dispatch<React.SetStateAction<boolean>>
  intervalRef: React.MutableRefObject<ReturnType<typeof setInterval> | null>
  mediaRecorderRef: React.MutableRefObject<MediaRecorder | null>
  durationRef: React.MutableRefObject<number>
}

export interface DeleteRecordingParams extends Pick<RecordingParams, 'audioChunksRef'>, StopRecordingParams {}

export interface HandleStopRecordingParams
  extends Omit<StopRecordingParams, 'setRecording' | 'mediaRecorderRef' | 'durationRef'>,
    Omit<RecordingParams, 'setRecordedDuration'> {}

export interface StartTimerParams
  extends Omit<StopRecordingParams, 'setRecording' | 'mediaRecorderRef'>,
    Pick<RecordingParams, 'setRecordedDuration'> {}

export interface StartRecordingParams extends StopRecordingParams, RecordingParams {}

export const formatTime = (milliseconds: number): string => {
  const minutes = Math.floor(milliseconds / 60000)
  const seconds = Math.floor((milliseconds % 60000) / 1000)
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

// Start recording audio
export const startRecording = async ({
  setRecordings,
  setRecording,
  setRecordedDuration,
  durationRef,
  intervalRef,
  audioChunksRef,
  mediaRecorderRef,
}: StartRecordingParams) => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  mediaRecorderRef.current = new MediaRecorder(stream)
  audioChunksRef.current = []

  mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
    audioChunksRef.current.push(event.data)
  }

  mediaRecorderRef.current.onstop = () => {
    setRecordedDuration(_ => 0)
    durationRef.current > 0 &&
      handleStopRecording({
        setRecordings,
        intervalRef,
        audioChunksRef,
      })
  }

  mediaRecorderRef.current.start()
  setRecording(true)
  durationRef.current = 0
  startTimer({ durationRef, intervalRef, setRecordedDuration })
}

// Stop recording and process audio blob
export const handleStopRecording = ({ setRecordings, intervalRef, audioChunksRef }: HandleStopRecordingParams) => {
  const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })

  setRecordings(prev => [...prev, audioBlob])
  clearInterval(intervalRef.current!)
}

// Stop recording audio
export const stopRecording = ({ setRecording, intervalRef, mediaRecorderRef }: StopRecordingParams) => {
  mediaRecorderRef.current?.stop()
  setRecording(false)
  clearInterval(intervalRef.current!)
}

// Delete recording
export const deleteRecording = ({
  setRecording,
  intervalRef,
  mediaRecorderRef,
  durationRef,
  audioChunksRef,
}: DeleteRecordingParams) => {
  durationRef.current = 0
  audioChunksRef.current = []
  stopRecording({ setRecording, intervalRef, mediaRecorderRef, durationRef })
}

// Start timer to track recording duration
export const startTimer = ({ durationRef, intervalRef, setRecordedDuration }: StartTimerParams) => {
  clearInterval(intervalRef.current!)
  intervalRef.current = setInterval(() => {
    durationRef.current += 1000
    setRecordedDuration(durationRef.current)
  }, 1000)
}

const AudioRecord: React.FC = () => {
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

  return (
    <div className="flex flex-col gap-2 h-screen">
      <div className="p-5 rounded-lg shadow-md flex items-center gap-4 border border-border w-[333px]">
        <div className="relative">
          <div
            className={cn(
              'absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 transition duration-100',
              recording ? 'opacity-1' : 'opacity-0 pointer-events-none right-4'
            )}
          >
            <span className="font-mono">{formatTime(recordedDuration)}</span>
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
          onClick={() => deleteRecording({ intervalRef, mediaRecorderRef, setRecording, durationRef, audioChunksRef })}
          className={cn(
            'rounded-full relative transition fade_animation',
            recording ? 'scale-1 opacity-1 ml-0 w-10 h-10' : 'scale-0 opacity-0 pointer-events-none -ml- w-0 h-0'
          )}
        >
          <Trash2 className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 transition fade_animation" />
        </Button>

        <Button
          size={'icon'}
          onClick={
            recording
              ? () => stopRecording({ setRecording, intervalRef, mediaRecorderRef, durationRef })
              : () =>
                  startRecording({
                    setRecordings,
                    setRecording,
                    setRecordedDuration,
                    durationRef,
                    intervalRef,
                    audioChunksRef,
                    mediaRecorderRef,
                  })
          }
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
                {isPlaying || timeLeft < duration ? formatTime(timeLeft > 0 ? timeLeft : 0) : formatTime(duration)}
              </span>
              {
                /* TODO: YOU SHOULD EDIT THE OBJ TO GIVE YOU VALUE OF RECIPIENT OPENED THE RECORD */
                <span className="w-2 h-2 bg-primary rounded-full" />
              }

              <AudioSpeed loading={loading} />
            </div>
          </div>
        }
      </div>
    </>
  )
}

export const AudioSpeed = ({ loading }: { loading: boolean }) => {
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
  // Handle audio visualizer click
  const handleVisualizerClick = event => {
    if (audioRef.current == null) return
    const rect = event.target.getBoundingClientRect()
    const clickX = event.clientX - rect.left
    const duration = audioRef.current.duration

    if (duration && duration > 0) {
      const newTime = (clickX / rect.width) * duration
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime * 1000)
    }
  }
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
          <div onClick={handleVisualizerClick}>
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
              minBarHeight={minBarHeight ?? 2}
            />
          </div>
        }
      />
    </>
  )
}

export { AudioRecord, AudioRecordItem, AudioItemWrapper }
