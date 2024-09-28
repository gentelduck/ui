import { ArrowBigUp, Mic, Pause, Play, Trash2 } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'
import { AudioVisualizer } from 'react-audio-visualize'
import { Button } from './button'
import { cn } from '@/lib'
import { Input } from './input'

export const AudioRecord: React.FC = () => {
  const [recording, setRecording] = useState<boolean>(false)
  const [audioURL, setAudioURL] = useState<string>('')
  const [blob, setBlob] = useState<Blob | null>(null)
  const [recordedDuration, setRecordedDuration] = useState<number>(0)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const intervalRef = useRef<NodeJS.Timer | null>(null)
  const audioRef = useRef<HTMLAudioElement>(new Audio())

  // Start recording audio
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaRecorderRef.current = new MediaRecorder(stream)
    audioChunksRef.current = []

    mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
      audioChunksRef.current.push(event.data)
    }

    mediaRecorderRef.current.onstop = handleStopRecording

    mediaRecorderRef.current.start()
    setRecording(true)
    setRecordedDuration(0)
    startTimer()
  }

  // Stop recording and process audio blob
  const handleStopRecording = () => {
    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
    const url = URL.createObjectURL(audioBlob)
    setAudioURL(url)
    setBlob(audioBlob)
    clearInterval(intervalRef.current!)
  }

  // Stop recording audio
  const stopRecording = () => {
    mediaRecorderRef.current?.stop()
    setRecording(false)
    clearInterval(intervalRef.current!)
  }

  // Start timer to track recording duration
  const startTimer = () => {
    clearInterval(intervalRef.current!)
    intervalRef.current = setInterval(() => {
      setRecordedDuration(prev => prev + 1000)
    }, 1000) // Increment by seconds
  }

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current!)
    }
  }, [])

  // Format time in MM:SS format
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  // Handle audio visualizer click

  // Load audio URL and set duration
  useEffect(() => {
    if (audioURL) {
      audioRef.current.src = audioURL
      audioRef.current.onended = () => {
        setIsPlaying(false)
        setTimeLeft(0) // Reset time left when audio ends
      }
    }
  }, [audioURL])

  // Delete the recording
  const deleteRecording = () => {
    setAudioURL('')
    setBlob(null)
    setRecordedDuration(0)
    setCurrentTime(0)
    setTimeLeft(0)
  }

  // Send the recording and reset the values
  const sendRecording = () => {
    // Simulate sending the recording here
    // Reset all values after sending
    setAudioURL('')
    setBlob(null)
    setRecordedDuration(0)
    setCurrentTime(0)
    setTimeLeft(0)
  }

  return (
    <div className="flex flex-col gap-2 h-screen">
      <div className="p-5 rounded-lg shadow-md flex items-center gap-4 border border-border w-[333px]">
        <div className="relative">
          {recording && (
            <span className="font-mono absolute right-4 top-1/2 -translate-y-1/2">{formatTime(recordedDuration)}</span>
          )}
          <Input className={cn('transition fade_animation', !recording ? 'w-[235px]' : 'w-[179px] ')} />
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
          onClick={recording ? stopRecording : startRecording}
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
    </div>
  )
}

export const AudioRecordItem = ({
  audio,
}: {
  audio: {
    duration: number
    blob: any
  }
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [timeLeft, setTimeLeft] = useState<number>(0) // Time left during playback
  // const handleVisualizerClick = (event: React.MouseEvent<HTMLDivElement>) => {
  //   const rect = event.currentTarget.getBoundingClientRect()
  //   const clickX = event.clientX - rect.left
  //   const duration = audio.duration
  //
  //   if (duration && duration > 0) {
  //     const newTime = (clickX / rect.width) * duration
  //     audioRef.current.currentTime = newTime
  //     setCurrentTime(newTime * 1000)
  //   }
  // }
  //
  // // Play or pause audio
  // const handlePlayPause = () => {
  //   setIsPlaying(prev => {
  //     if (!prev) {
  //       audioRef.current.play()
  //       audioRef.current.ontimeupdate = () => {
  //         setCurrentTime(audioRef.current.currentTime * 1000)
  //         setTimeLeft((audioRef.current.duration - audioRef.current.currentTime) * 1000)
  //       }
  //       return true
  //     }
  //     audioRef.current.pause()
  //     return false
  //   })
  // }

  return (
    <>
      <div className="flex items-center gap-4 bg-secondary px-3 pt-2 pb-3 rounded-xl w-fit">
        <Button
          // onClick={handlePlayPause}
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
            <div
              // onClick={handleVisualizerClick}
              className="cursor-pointer w-fit bg-secondary p-0"
            >
              <AudioVisualizer
                blob={audio.blob}
                width={180}
                height={23}
                barWidth={3}
                gap={2}
                barColor={'#ffffff69'}
                currentTime={currentTime / 1000} // Current time in seconds
                barPlayedColor={'#fff'}
                backgroundColor={'#f0f0f000'}
              />
            </div>

            <span className="flex items-center text-primary ml-auto">
              {
                // isPlaying ? formatTime(timeLeft) : formatTime(audioRef.current.duration * 1000)
              }
            </span>
          </div>
        )}
      </div>
    </>
  )
}
