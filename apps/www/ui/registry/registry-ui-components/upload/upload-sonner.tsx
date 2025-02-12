import { Progress } from '@/registry/default/ui'
import { CircleCheck, Loader } from 'lucide-react'
import React from 'react'
import { Button } from '../button'
import { UploadManager } from './upload.lib'

export const UploadSonnerContent = ({
  progress,
  files,
  remainingTime,
}: {
  progress: number
  files: number
  remainingTime?: number
}) => (
  <div className="flex gap-3 w-full">
    {progress >= 100 ? (
      <CircleCheck className="fill-primary [&_path]:stroke-primary-foreground mt-2 !size-[18px]" />
    ) : (
      <Loader className="animate-spin text-foreground-muted mt-2 opacity-70 !size-[18px]" />
    )}
    <div className="flex flex-col gap-2 w-full">
      <div className="flex w-full justify-between">
        <p className="text-foreground text-sm">
          {progress >= 100
            ? `Upload complete`
            : files
              ? `Uploading ${files} file${files > 1 ? 's' : ''}...`
              : `Uploading...`}
        </p>
        <div className="flex items-center gap-2">
          {remainingTime && (
            <p className="text-foreground-light text-sm font-mono">{`${remainingTime && !isNaN(remainingTime) && isFinite(remainingTime) && remainingTime !== 0 ? `${UploadManager.formatTime(remainingTime)} remaining – ` : ''}`}</p>
          )}
          <p className="text-foreground-light text-sm font-mono">{`${progress}%`}</p>
        </div>
      </div>
      <Progress
        value={progress}
        className="w-full h-1"
      />
      <div className="flex items-center justify-between gap-2 w-full">
        <small className="text-foreground-muted text-xs">Please do not close the browser until completed</small>

        {progress >= 100 && (
          <Button
            variant="default"
            size="xs"
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  </div>
)

export const UploadSonnerContentMemo = React.memo(UploadSonnerContent)
