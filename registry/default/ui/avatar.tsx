'use client'

import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'

import { cn } from '@/lib/utils'
import { Button } from './button'

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full', className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn('flex h-full w-full items-center justify-center rounded-full bg-muted', className)}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

interface UserType {
  id: string
  name?: string
  avatarUrl?: string
}

export interface AvatarGroupProps {
  users: UserType[]
}

const AvatarGroup = React.forwardRef(({ users }: AvatarGroupProps, ref: React.ForwardedRef<HTMLDivElement>) => {
  return (
    <div ref={ref}>
      {users.map(
        (taggedUser, idx) =>
          idx < 3 && (
            <Avatar
              key={taggedUser.id}
              className={cn('border-zinc-900/80 border-[3px]', 'mr-[-8%]')}
            >
              <AvatarImage
                className={cn('rounded-md object-cover w-18 h-18')}
                src={taggedUser.avatarUrl}
                alt={taggedUser.name}
              />
              <AvatarFallback className={'bg-zinc-900/80'}>{taggedUser.name?.slice(0, 1)}</AvatarFallback>
            </Avatar>
          )
      )}
      {users.length > 3 && (
        <Button
          variant="ghost"
          className={cn(
            'w-8 h-8 rounded-md bg-zinc-700/80 flex items-center justify-center font-medium hover:bg-muted-foreground/20'
          )}
        >
          +{users.length - 3}
        </Button>
      )}
    </div>
  )
})

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup }
