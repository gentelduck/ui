import { Pause, Play } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'
import { AudioVisualizer } from 'react-audio-visualize'
import { Button } from './button'

export const AudioRecord = () => {
  const [recording, setRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [audioURL, setAudioURL] = useState('')
  const [blob, setBlob] = useState(null)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const intervalRef = useRef(null)
  const audioRef = useRef(new Audio())

  // Start recording audio
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaRecorderRef.current = new MediaRecorder(stream)
    audioChunksRef.current = []

    mediaRecorderRef.current.ondataavailable = event => {
      audioChunksRef.current.push(event.data)
    }

    mediaRecorderRef.current.onstop = handleStopRecording

    mediaRecorderRef.current.start()
    setRecording(true)
    setIsPaused(false)
    startTimer()
  }

  // Stop recording and process audio blob
  const handleStopRecording = () => {
    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
    const url = URL.createObjectURL(audioBlob)
    setAudioURL(url)
    setBlob(audioBlob)
    setDuration(0)
    clearInterval(intervalRef.current)
  }

  // Stop recording audio
  const stopRecording = () => {
    mediaRecorderRef.current.stop()
    setRecording(false)
    setIsPaused(false)
    clearInterval(intervalRef.current)
  }

  // Pause recording audio
  const pauseRecording = () => {
    mediaRecorderRef.current.pause()
    setIsPaused(true)
    clearInterval(intervalRef.current)
  }

  // Resume recording audio
  const resumeRecording = () => {
    mediaRecorderRef.current.resume()
    setIsPaused(false)
    startTimer()
  }

  // Start timer for recording duration
  const startTimer = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setDuration(prev => prev + 100)
    }, 100)
  }

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current)
    }
  }, [])

  // Format audio time with milliseconds
  const formatAudioTimeWithMilliseconds = ms => {
    const totalSeconds = Math.floor(ms / 1000)
    const milliseconds = ms % 1000
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    if (totalSeconds < 60) {
      return `00:${seconds.toString().padStart(2, '0')}.${Math.floor(milliseconds / 10)
        .toString()
        .padStart(2, '0')}`
    } else if (totalSeconds < 3600) {
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    } else {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
  }

  // Format audio time without milliseconds
  const formatAudioTimeWithoutMilliseconds = ms => {
    const totalSeconds = Math.floor(ms / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    if (totalSeconds >= 3600) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  // Handle audio visualizer click
  const handleVisualizerClick = event => {
    const rect = event.target.getBoundingClientRect()
    const clickX = event.clientX - rect.left
    const duration = audioRef.current.duration

    if (duration && duration > 0) {
      const newTime = (clickX / rect.width) * duration
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime * 1000)
    }
  }

  // Play or pause audio
  const handlePlayPause = () => {
    setIsPaused(prev => {
      if (!prev) {
        audioRef.current.play()
        audioRef.current.ontimeupdate = () => {
          setCurrentTime(audioRef.current.currentTime * 1000)
        }
        return true
      }
      audioRef.current.pause()
      return false
    })
  }

  // Load audio URL and set duration
  useEffect(() => {
    if (audioURL) {
      audioRef.current.src = audioURL
      audioRef.current.onended = () => {
        setCurrentTime(0)
        setIsPaused(false) // Reset paused state when audio ends
      }
    }
  }, [audioURL])

  useEffect(() => {
    const handleLoadedMetadata = () => {
      setDuration(audioRef.current.duration * 1000)
    }

    audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata)

    return () => {
      audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata)
    }
  }, [audioURL])

  console.log(blob)

  return (
    <div className="flex flex-col gap-2">
      <div className="p-5 bg-secondary rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Voice Recorder</h1>
        <div className="mb-4">
          <p className="text-lg animate-pulse">
            Recording Duration: <span className="font-mono">{formatAudioTimeWithMilliseconds(duration)}</span>
          </p>
        </div>
        <button
          onClick={recording ? (isPaused ? resumeRecording : stopRecording) : startRecording}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          {recording ? (isPaused ? 'Resume Recording' : 'Stop Recording') : 'Start Recording'}
        </button>
      </div>

      {audioURL && (
        <div className="flex items-center gap-4 bg-secondary px-3 pt-2 pb-3 rounded-xl w-fit">
          <Button
            onClick={handlePlayPause}
            size={'icon'}
            className="rounded-full w-[48px] h-[48px] relative"
          >
            <Play
              className={`absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 transition fade_animation ${!isPaused ? 'scale-1 opacity-1' : 'scale-0 opacity-0 pointer-events-none'}`}
            />
            <Pause
              className={`absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 transition fade_animation ${!isPaused ? 'scale-0 opacity-0 pointer-events-none' : 'scale-1 opacity-1'}`}
            />
          </Button>
          {blob && (
            <div className="mt-4 flex flex-col">
              <div
                onClick={handleVisualizerClick}
                className="cursor-pointer w-fit bg-secondary p-0"
              >
                <AudioVisualizer
                  blob={blob}
                  width={180}
                  height={23}
                  barWidth={3}
                  gap={2}
                  barColor={'#ffffff69'}
                  currentTime={currentTime / 1000}
                  barPlayedColor={'#fff'}
                  backgroundColor={'#f0f0f000'}
                />
              </div>
              <span className="text-sm text-foreground">
                {currentTime ? formatAudioTimeWithoutMilliseconds(currentTime) : audioRef.current.duration}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
