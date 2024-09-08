import React from 'react'
import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { Button } from './button'
import { HoverCardCustomView } from './hover-card'

// Image variant styling
const imageVariants = cva('', {
  variants: {
    variant: {
      default: '',
      destructive: '',
      outline: '',
      secondary: '',
      ghost: '',
      link: '',
    },
    size: {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 rounded-md px-3',
      lg: 'h-11 rounded-md px-8',
      icon: 'h-10 w-10 p-0',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

// Image component
export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement>, VariantProps<typeof imageVariants> {
  type?: string
  filename?: string
  url?: string
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(({ className, variant, size, ...props }, ref) => (
  <HoverCardCustomView
    trigger={
      <img
        className={cn(imageVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    }
    content={<div>some content should go here!!</div>}
  />
))

Image.displayName = 'Image'

// ImageGroup component
interface ImageGroupProps {
  imgs: ImageProps[]
  max_imgs?: number
}

const ImageGroup = React.forwardRef<React.ElementRef<'div'>, React.ComponentPropsWithoutRef<'div'> & ImageGroupProps>(
  ({ imgs, max_imgs, ...props }, ref) => {
    const max = max_imgs ?? imgs.length
    return (
      <div
        ref={ref}
        {...props}
      >
        {imgs.map((img, idx) => {
          const { className, ...imgProps } = img
          return (
            idx < max && (
              <Image
                className={cn('w-8 h-8 rounded-md border-muted-foreground/80', className)}
                key={img.id || idx}
                {...imgProps}
              />
            )
          )
        })}

        {imgs.length > max && (
          <Button
            variant="ghost"
            className={cn(
              'w-8 h-8 rounded-md bg-zinc-700/80 flex items-center justify-center font-medium hover:bg-muted-foreground/20'
            )}
          >
            +{imgs.length - max}
          </Button>
        )}
      </div>
    )
  }
)

ImageGroup.displayName = 'ImageGroup'

export { Image, ImageGroup, imageVariants }
