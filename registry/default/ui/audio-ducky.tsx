import React from 'react'
import { AudioProvider } from './audio-service-worker'
import { AudioRecordItem } from './audio-record'

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

export interface AudioDuckyProps {
  url: string
  duration: number
}

const AudioDucky: React.FC<AudioDuckyProps> = ({ url, duration }) => {
  const [audioBlob, setAudioBlob] = React.useState<Blob | null>(null)

  React.useEffect(() => {
    if (!url.startsWith('https://') || !url) return
    fetchAudioBlob({ url, setAudioBlob })
  }, [url])

  return (
    <AudioProvider>
      <AudioRecordItem
        loading={audioBlob === null ? true : false}
        audio={{
          duration,
          blob: audioBlob,
        }}
      />
    </AudioProvider>
  )
}

export { AudioDucky }
