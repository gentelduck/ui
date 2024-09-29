import { ArrowBigUp, Mic, Pause, Play, Trash2 } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'
import { Button } from './button'
import { cn } from '@/lib'
import { Input } from './input'
import { AudioVisualizer } from './audio-visualizer'

interface Recording {
  url: string
  blob: Blob
  duration: number
}

export const AudioRecord: React.FC = () => {
  const [recording, setRecording] = useState<boolean>(false)
  const [recordings, setRecordings] = useState<Recording[]>([])
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
          {recording && (
            <>
              <span className="font-mono absolute right-8 top-1/2 -translate-y-1/2">
                {formatTime(recordedDuration)}
              </span>
              <span className="font-mono absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary animate-pulse" />
            </>
          )}
          <Input className={cn('transition fade_animation', !recording ? 'w-[235px]' : 'w-[179px] ')} />
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
          <AudioRecordItem
            key={index}
            audio={recording}
          />
        ))}
      </div>
    </div>
  )
}

export const AudioRecordItem = ({
  audio,
}: {
  audio: {
    duration: number
    blob: Blob | null
  }
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [timeLeft, setTimeLeft] = useState<number>(audio.duration * 1000 || 0)

  useEffect(() => {
    if (audio.blob) {
      audioRef.current = new Audio(URL.createObjectURL(audio.blob))
      audioRef.current.onended = () => {
        setIsPlaying(false)
        setCurrentTime(0)
        setTimeLeft(audio.duration * 1000)
      }

      audioRef.current.ontimeupdate = () => {
        setCurrentTime(audioRef.current!.currentTime * 1000)
        setTimeLeft(audio.duration * 1000 - currentTime)
      }

      return () => {
        if (audioRef.current) {
          audioRef.current.pause()
          audioRef.current.src = ''
        }
      }
    }
  }, [audio])

  // Play or pause audio
  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <>
      <div className="flex items-center gap-4 bg-secondary px-3 pt-2 pb-3 rounded-xl w-fit">
        <Button
          onClick={handlePlayPause}
          size={'icon'}
          className="rounded-full relative"
        >
          <Play
            className={cn(
              'absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 transition fade_animation',
              !isPlaying ? 'scale-1 opacity-1' : 'scale-0 opacity-0 pointer-events-none'
            )}
          />
          <Pause
            className={cn(
              'absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 transition fade_animation',
              isPlaying ? 'scale-1 opacity-1' : 'scale-0 opacity-0 pointer-events-none'
            )}
          />
        </Button>

        {audio.blob && (
          <div className="mt-4 flex flex-col">
            <div className="cursor-pointer w-fit bg-secondary p-0">
              {
                <AudioVisualizer
                  blob={audio.blob}
                  width={180}
                  height={23}
                  barWidth={3}
                  gap={2}
                  barColor={'#ffffff69'}
                  currentTime={currentTime / 1000}
                  barPlayedColor={'#fff'}
                  backgroundColor={'#f0f0f000'}
                />
              }
            </div>

            <span className="flex items-center text-primary">{formatTime(isPlaying ? timeLeft : audio.duration)}</span>
          </div>
        )}
      </div>
    </>
  )
}

interface Recording {
  url: string
  blob: Blob
  duration: number
}

interface RecordingParams {
  setRecording: React.Dispatch<React.SetStateAction<boolean>>
  setRecordings: React.Dispatch<React.SetStateAction<Recording[]>>
  setRecordedDuration: React.Dispatch<React.SetStateAction<number>>
  durationRef: React.MutableRefObject<number>
  intervalRef: React.MutableRefObject<ReturnType<typeof setInterval> | null>
  audioChunksRef: React.MutableRefObject<Blob[]>
  mediaRecorderRef: React.MutableRefObject<MediaRecorder | null>
}

interface StopRecordingParams
  extends Pick<RecordingParams, 'setRecording' | 'intervalRef' | 'mediaRecorderRef' | 'durationRef'> {}

interface DeleteRecordingParams
  extends Pick<
    RecordingParams,
    'setRecording' | 'intervalRef' | 'mediaRecorderRef' | 'durationRef' | 'audioChunksRef'
  > {}

interface HandleStopRecordingParams
  extends Pick<RecordingParams, 'setRecordings' | 'durationRef' | 'intervalRef' | 'audioChunksRef'> {}

interface StartTimerParams extends Pick<RecordingParams, 'durationRef' | 'intervalRef' | 'setRecordedDuration'> {}

const formatTime = (milliseconds: number): string => {
  const minutes = Math.floor(milliseconds / 6000)
  const seconds = Math.floor((milliseconds % 6000) / 1000)
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

// Start recording audio
const startRecording = async ({
  setRecordings,
  setRecording,
  setRecordedDuration,
  durationRef,
  intervalRef,
  audioChunksRef,
  mediaRecorderRef,
}: RecordingParams) => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  mediaRecorderRef.current = new MediaRecorder(stream)
  audioChunksRef.current = []

  mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
    audioChunksRef.current.push(event.data)
  }

  mediaRecorderRef.current.onstop = () => {
    console.log(audioChunksRef.current)
    setRecordedDuration(_ => 0)
    durationRef.current > 0 &&
      handleStopRecording({
        setRecordings,
        durationRef,
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
const handleStopRecording = ({
  setRecordings,
  durationRef,
  intervalRef,
  audioChunksRef,
}: HandleStopRecordingParams) => {
  const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
  const url = URL.createObjectURL(audioBlob)

  setRecordings(prev => [...prev, { url, blob: audioBlob, duration: durationRef.current }])
  clearInterval(intervalRef.current!)
}

// Stop recording audio
const stopRecording = ({ setRecording, intervalRef, mediaRecorderRef }: StopRecordingParams) => {
  mediaRecorderRef.current?.stop()
  setRecording(false)
  clearInterval(intervalRef.current!)
}

// Delete recording
const deleteRecording = ({
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
const startTimer = ({ durationRef, intervalRef, setRecordedDuration }: StartTimerParams) => {
  clearInterval(intervalRef.current!)
  intervalRef.current = setInterval(() => {
    durationRef.current += 1000
    setRecordedDuration(durationRef.current)
  }, 1000)
}
