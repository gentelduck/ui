// @ts-noCheck

'use client'

import React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { DialogProps, DrawerContextType } from './drawer.types'

export const DrawerContext = React.createContext<DrawerContextType | null>(null)

export const useDrawerContext = () => {
  const context = React.useContext(DrawerContext)
  if (!context) {
    throw new Error('useDrawerContext must be used within a Drawer')
  }
  return context
}

import './drawer.css'
import {
  set,
  getTranslate,
  dampenValue,
  isVertical,
  reset,
  getScale,
} from './drawer.libs'
import {
  TRANSITIONS,
  VELOCITY_THRESHOLD,
  CLOSE_THRESHOLD,
  SCROLL_LOCK_TIMEOUT,
  BORDER_RADIUS,
  NESTED_DISPLACEMENT,
  WINDOW_TOP_OFFSET,
  DRAG_CLASS,
} from './drawer.constants'
import { DrawerDirection } from './drawer.types'
import {
  useScaleBackground,
  usePreventScroll,
  isInput,
  useComposedRefs,
  useSnapPoints,
  useControllableState,
  usePositionFixed,
} from './drawer.hooks'
import { isIOS, isMobileFirefox } from './drawer.libs'
// import {
//   DialogClose,
//   DialogDescription,
//   DialogPortal,
//   DialogTitle,
//   DialogTrigger,
// } from '~/src/dialog'
import { DialogContent, DialogOverlay } from '@radix-ui/react-dialog'

export function Root({
  open: openProp,
  onOpenChange,
  children,
  onDrag: onDragProp,
  onRelease: onReleaseProp,
  snapPoints,
  shouldScaleBackground = false,
  setBackgroundColorOnScale = true,
  closeThreshold = CLOSE_THRESHOLD,
  scrollLockTimeout = SCROLL_LOCK_TIMEOUT,
  dismissible = true,
  handleOnly = false,
  fadeFromIndex = snapPoints && snapPoints.length - 1,
  activeSnapPoint: activeSnapPointProp,
  setActiveSnapPoint: setActiveSnapPointProp,
  fixed,
  modal = true,
  onClose,
  nested,
  noBodyStyles = false,
  direction = 'bottom',
  defaultOpen = false,
  disablePreventScroll = true,
  snapToSequentialPoint = false,
  preventScrollRestoration = false,
  repositionInputs = true,
  onAnimationEnd,
  container,
  autoFocus = false,
}: DialogProps) {
  const [isOpen = false, setIsOpen] = useControllableState({
    defaultProp: defaultOpen,
    prop: openProp,
    onChange: (o: boolean) => {
      onOpenChange?.(o)

      if (!o && !nested) {
        restorePositionSetting()
      }

      setTimeout(() => {
        onAnimationEnd?.(o)
      }, TRANSITIONS.DURATION * 1000)

      if (o && !modal) {
        if (typeof window !== 'undefined') {
          window.requestAnimationFrame(() => {
            document.body.style.pointerEvents = 'auto'
          })
        }
      }

      if (!o) {
        // This will be removed when the exit animation ends (`500ms`)
        document.body.style.pointerEvents = 'auto'
      }
    },
  })
  const [hasBeenOpened, setHasBeenOpened] = React.useState<boolean>(false)
  const [isDragging, setIsDragging] = React.useState<boolean>(false)
  const [justReleased, setJustReleased] = React.useState<boolean>(false)
  const overlayRef = React.useRef<HTMLDivElement>(null)
  const openTime = React.useRef<Date | null>(null)
  const dragStartTime = React.useRef<Date | null>(null)
  const dragEndTime = React.useRef<Date | null>(null)
  const lastTimeDragPrevented = React.useRef<Date | null>(null)
  const isAllowedToDrag = React.useRef<boolean>(false)
  const nestedOpenChangeTimer = React.useRef<NodeJS.Timeout | null>(null)
  const pointerStart = React.useRef(0)
  const keyboardIsOpen = React.useRef(false)
  const shouldAnimate = React.useRef(!defaultOpen)
  const previousDiffFromInitial = React.useRef(0)
  const drawerRef = React.useRef<HTMLDivElement>(null)
  const drawerHeightRef = React.useRef(
    drawerRef.current?.getBoundingClientRect().height || 0,
  )
  const drawerWidthRef = React.useRef(
    drawerRef.current?.getBoundingClientRect().width || 0,
  )
  const initialDrawerHeight = React.useRef(0)

  const onSnapPointChange = React.useCallback(
    (activeSnapPointIndex: number) => {
      // Change openTime ref when we reach the last snap point to prevent dragging for 500ms incase it's scrollable.
      if (snapPoints && activeSnapPointIndex === snapPointsOffset.length - 1)
        openTime.current = new Date()
    },
    [],
  )

  const {
    activeSnapPoint,
    activeSnapPointIndex,
    setActiveSnapPoint,
    onRelease: onReleaseSnapPoints,
    snapPointsOffset,
    onDrag: onDragSnapPoints,
    shouldFade,
    getPercentageDragged: getSnapPointsPercentageDragged,
  } = useSnapPoints({
    snapPoints,
    activeSnapPointProp,
    setActiveSnapPointProp,
    drawerRef,
    fadeFromIndex,
    overlayRef,
    onSnapPointChange,
    direction,
    container,
    snapToSequentialPoint,
  })

  usePreventScroll({
    isDisabled:
      !isOpen ||
      isDragging ||
      !modal ||
      justReleased ||
      !hasBeenOpened ||
      !repositionInputs ||
      !disablePreventScroll,
  })

  const { restorePositionSetting } = usePositionFixed({
    isOpen,
    modal,
    nested: nested ?? false,
    hasBeenOpened,
    preventScrollRestoration,
    noBodyStyles,
  })

  function onPress(event: React.PointerEvent<HTMLDivElement>) {
    if (!dismissible && !snapPoints) return
    if (drawerRef.current && !drawerRef.current.contains(event.target as Node))
      return

    drawerHeightRef.current =
      drawerRef.current?.getBoundingClientRect().height || 0
    drawerWidthRef.current =
      drawerRef.current?.getBoundingClientRect().width || 0
    setIsDragging(true)
    dragStartTime.current = new Date()

    // iOS doesn't trigger mouseUp after scrolling so we need to listen to touched in order to disallow dragging
    if (isIOS()) {
      window.addEventListener(
        'touchend',
        () => (isAllowedToDrag.current = false),
        { once: true },
      )
    }
    // Ensure we maintain correct pointer capture even when going outside of the drawer
    ;(event.target as HTMLElement).setPointerCapture(event.pointerId)

    pointerStart.current = isVertical(direction) ? event.pageY : event.pageX
  }

  function shouldDrag(el: EventTarget, isDraggingInDirection: boolean) {
    let element = el as HTMLElement
    const highlightedText = window.getSelection()?.toString()
    const swipeAmount = drawerRef.current
      ? getTranslate(drawerRef.current, direction)
      : null
    const date = new Date()

    // Fixes https://github.com/emilkowalski/vaul/issues/483
    if (element.tagName === 'SELECT') {
      return false
    }

    if (
      element.hasAttribute('data-vaul-no-drag') ||
      element.closest('[data-vaul-no-drag]')
    ) {
      return false
    }

    if (direction === 'right' || direction === 'left') {
      return true
    }

    // Allow scrolling when animating
    if (openTime.current && date.getTime() - openTime.current.getTime() < 500) {
      return false
    }

    if (swipeAmount !== null) {
      if (direction === 'bottom' ? swipeAmount > 0 : swipeAmount < 0) {
        return true
      }
    }

    // Don't drag if there's highlighted text
    if (highlightedText && highlightedText.length > 0) {
      return false
    }

    // Disallow dragging if drawer was scrolled within `scrollLockTimeout`
    if (
      lastTimeDragPrevented.current &&
      date.getTime() - lastTimeDragPrevented.current.getTime() <
        scrollLockTimeout &&
      swipeAmount === 0
    ) {
      lastTimeDragPrevented.current = date
      return false
    }

    if (isDraggingInDirection) {
      lastTimeDragPrevented.current = date

      // We are dragging down so we should allow scrolling
      return false
    }

    // Keep climbing up the DOM tree as long as there's a parent
    while (element) {
      // Check if the element is scrollable
      if (element.scrollHeight > element.clientHeight) {
        if (element.scrollTop !== 0) {
          lastTimeDragPrevented.current = new Date()

          // The element is scrollable and not scrolled to the top, so don't drag
          return false
        }

        if (element.getAttribute('role') === 'dialog') {
          return true
        }
      }

      // Move up to the parent element
      element = element.parentNode as HTMLElement
    }

    // No scrollable parents not scrolled to the top found, so drag
    return true
  }

  React.useEffect(() => {
    window.requestAnimationFrame(() => {
      shouldAnimate.current = true
    })
  }, [])

  React.useEffect(() => {
    function onVisualViewportChange() {
      if (!drawerRef.current || !repositionInputs) return

      const focusedElement = document.activeElement as HTMLElement
      if (isInput(focusedElement) || keyboardIsOpen.current) {
        const visualViewportHeight = window.visualViewport?.height || 0
        const totalHeight = window.innerHeight
        // This is the height of the keyboard
        let diffFromInitial = totalHeight - visualViewportHeight
        const drawerHeight =
          drawerRef.current.getBoundingClientRect().height || 0
        // Adjust drawer height only if it's tall enough
        const isTallEnough = drawerHeight > totalHeight * 0.8

        if (!initialDrawerHeight.current) {
          initialDrawerHeight.current = drawerHeight
        }
        const offsetFromTop = drawerRef.current.getBoundingClientRect().top

        // visualViewport height may change due to somq e subtle changes to the keyboard. Checking if the height changed by 60 or more will make sure that they keyboard really changed its open state.
        if (Math.abs(previousDiffFromInitial.current - diffFromInitial) > 60) {
          keyboardIsOpen.current = !keyboardIsOpen.current
        }

        if (
          snapPoints &&
          snapPoints.length > 0 &&
          snapPointsOffset &&
          activeSnapPointIndex
        ) {
          const activeSnapPointHeight =
            snapPointsOffset[activeSnapPointIndex] || 0
          diffFromInitial += activeSnapPointHeight
        }
        previousDiffFromInitial.current = diffFromInitial
        // We don't have to change the height if the input is in view, when we are here we are in the opened keyboard state so we can correctly check if the input is in view
        if (drawerHeight > visualViewportHeight || keyboardIsOpen.current) {
          const height = drawerRef.current.getBoundingClientRect().height
          let newDrawerHeight = height

          if (height > visualViewportHeight) {
            newDrawerHeight =
              visualViewportHeight -
              (isTallEnough ? offsetFromTop : WINDOW_TOP_OFFSET)
          }
          // When fixed, don't move the drawer upwards if there's space, but rather only change it's height so it's fully scrollable when the keyboard is open
          if (fixed) {
            drawerRef.current.style.height = `${height - Math.max(diffFromInitial, 0)}px`
          } else {
            drawerRef.current.style.height = `${Math.max(newDrawerHeight, visualViewportHeight - offsetFromTop)}px`
          }
        } else if (!isMobileFirefox()) {
          drawerRef.current.style.height = `${initialDrawerHeight.current}px`
        }

        if (snapPoints && snapPoints.length > 0 && !keyboardIsOpen.current) {
          drawerRef.current.style.bottom = `0px`
        } else {
          // Negative bottom value would never make sense
          drawerRef.current.style.bottom = `${Math.max(diffFromInitial, 0)}px`
        }
      }
    }

    window.visualViewport?.addEventListener('resize', onVisualViewportChange)
    return () =>
      window.visualViewport?.removeEventListener(
        'resize',
        onVisualViewportChange,
      )
  }, [activeSnapPointIndex, snapPoints, snapPointsOffset])

  function closeDrawer(fromWithin?: boolean) {
    cancelDrag()
    onClose?.()

    if (!fromWithin) {
      setIsOpen(false)
    }

    setTimeout(() => {
      if (snapPoints) {
        setActiveSnapPoint(snapPoints[0])
      }
    }, TRANSITIONS.DURATION * 1000) // seconds to ms
  }

  function resetDrawer() {
    if (!drawerRef.current) return
    const wrapper = document.querySelector('[data-vaul-drawer-wrapper]')
    const currentSwipeAmount = getTranslate(drawerRef.current, direction)

    set(drawerRef.current, {
      transform: 'translate3d(0, 0, 0)',
      transition: `transform ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(',')})`,
    })

    set(overlayRef.current, {
      transition: `opacity ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(',')})`,
      opacity: '1',
    })

    // Don't reset background if swiped upwards
    if (
      shouldScaleBackground &&
      currentSwipeAmount &&
      currentSwipeAmount > 0 &&
      isOpen
    ) {
      set(
        wrapper,
        {
          borderRadius: `${BORDER_RADIUS}px`,
          overflow: 'hidden',
          ...(isVertical(direction)
            ? {
                transform: `scale(${getScale()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`,
                transformOrigin: 'top',
              }
            : {
                transform: `scale(${getScale()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`,
                transformOrigin: 'left',
              }),
          transitionProperty: 'transform, border-radius',
          transitionDuration: `${TRANSITIONS.DURATION}s`,
          transitionTimingFunction: `cubic-bezier(${TRANSITIONS.EASE.join(',')})`,
        },
        true,
      )
    }
  }

  function cancelDrag() {
    if (!isDragging || !drawerRef.current) return

    drawerRef.current.classList.remove(DRAG_CLASS)
    isAllowedToDrag.current = false
    setIsDragging(false)
    dragEndTime.current = new Date()
  }

  function onRelease(event: React.PointerEvent<HTMLDivElement> | null) {
    if (!isDragging || !drawerRef.current) return

    drawerRef.current.classList.remove(DRAG_CLASS)
    isAllowedToDrag.current = false
    setIsDragging(false)
    dragEndTime.current = new Date()
    const swipeAmount = getTranslate(drawerRef.current, direction)

    if (
      !event ||
      !shouldDrag(event.target, false) ||
      !swipeAmount ||
      Number.isNaN(swipeAmount)
    )
      return

    if (dragStartTime.current === null) return

    const timeTaken =
      dragEndTime.current.getTime() - dragStartTime.current.getTime()
    const distMoved =
      pointerStart.current - (isVertical(direction) ? event.pageY : event.pageX)
    const velocity = Math.abs(distMoved) / timeTaken

    if (velocity > 0.05) {
      // `justReleased` is needed to prevent the drawer from focusing on an input when the drag ends, as it's not the intent most of the time.
      setJustReleased(true)

      setTimeout(() => {
        setJustReleased(false)
      }, 200)
    }

    if (snapPoints) {
      const directionMultiplier =
        direction === 'bottom' || direction === 'right' ? 1 : -1
      onReleaseSnapPoints({
        draggedDistance: distMoved * directionMultiplier,
        closeDrawer,
        velocity,
        dismissible,
      })
      onReleaseProp?.(event, true)
      return
    }

    // Moved upwards, don't do anything
    if (
      direction === 'bottom' || direction === 'right'
        ? distMoved > 0
        : distMoved < 0
    ) {
      resetDrawer()
      onReleaseProp?.(event, true)
      return
    }

    if (velocity > VELOCITY_THRESHOLD) {
      closeDrawer()
      onReleaseProp?.(event, false)
      return
    }

    const visibleDrawerHeight = Math.min(
      drawerRef.current.getBoundingClientRect().height ?? 0,
      window.innerHeight,
    )
    const visibleDrawerWidth = Math.min(
      drawerRef.current.getBoundingClientRect().width ?? 0,
      window.innerWidth,
    )

    const isHorizontalSwipe = direction === 'left' || direction === 'right'
    if (
      Math.abs(swipeAmount) >=
      (isHorizontalSwipe ? visibleDrawerWidth : visibleDrawerHeight) *
        closeThreshold
    ) {
      closeDrawer()
      onReleaseProp?.(event, false)
      return
    }

    onReleaseProp?.(event, true)
    resetDrawer()
  }

  React.useEffect(() => {
    // Trigger enter animation without using CSS animation
    if (isOpen) {
      set(document.documentElement, {
        scrollBehavior: 'auto',
      })

      openTime.current = new Date()
    }

    return () => {
      reset(document.documentElement, 'scrollBehavior')
    }
  }, [isOpen])

  function onNestedOpenChange(o: boolean) {
    const scale = o
      ? (window.innerWidth - NESTED_DISPLACEMENT) / window.innerWidth
      : 1

    const initialTranslate = o ? -NESTED_DISPLACEMENT : 0

    if (nestedOpenChangeTimer.current) {
      window.clearTimeout(nestedOpenChangeTimer.current)
    }

    set(drawerRef.current, {
      transition: `transform ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(',')})`,
      transform: isVertical(direction)
        ? `scale(${scale}) translate3d(0, ${initialTranslate}px, 0)`
        : `scale(${scale}) translate3d(${initialTranslate}px, 0, 0)`,
    })

    if (!o && drawerRef.current) {
      nestedOpenChangeTimer.current = setTimeout(() => {
        const translateValue = getTranslate(
          drawerRef.current as HTMLElement,
          direction,
        )
        set(drawerRef.current, {
          transition: 'none',
          transform: isVertical(direction)
            ? `translate3d(0, ${translateValue}px, 0)`
            : `translate3d(${translateValue}px, 0, 0)`,
        })
      }, 500)
    }
  }

  function onNestedDrag(
    _event: React.PointerEvent<HTMLDivElement>,
    percentageDragged: number,
  ) {
    if (percentageDragged < 0) return

    const initialScale =
      (window.innerWidth - NESTED_DISPLACEMENT) / window.innerWidth
    const newScale = initialScale + percentageDragged * (1 - initialScale)
    const newTranslate =
      -NESTED_DISPLACEMENT + percentageDragged * NESTED_DISPLACEMENT

    set(drawerRef.current, {
      transform: isVertical(direction)
        ? `scale(${newScale}) translate3d(0, ${newTranslate}px, 0)`
        : `scale(${newScale}) translate3d(${newTranslate}px, 0, 0)`,
      transition: 'none',
    })
  }

  function onNestedRelease(
    _event: React.PointerEvent<HTMLDivElement>,
    o: boolean,
  ) {
    const dim = isVertical(direction) ? window.innerHeight : window.innerWidth
    const scale = o ? (dim - NESTED_DISPLACEMENT) / dim : 1
    const translate = o ? -NESTED_DISPLACEMENT : 0

    if (o) {
      set(drawerRef.current, {
        transition: `transform ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(',')})`,
        transform: isVertical(direction)
          ? `scale(${scale}) translate3d(0, ${translate}px, 0)`
          : `scale(${scale}) translate3d(${translate}px, 0, 0)`,
      })
    }
  }

  React.useEffect(() => {
    if (!modal) {
      // Need to do this manually unfortunately
      window.requestAnimationFrame(() => {
        document.body.style.pointerEvents = 'auto'
      })
    }
  }, [modal])

  return (
    <DialogPrimitive.Root
      defaultOpen={defaultOpen}
      onOpenChange={(open) => {
        if (!dismissible && !open) return
        if (open) {
          setHasBeenOpened(true)
        } else {
          closeDrawer(true)
        }

        setIsOpen(open)
      }}
      open={isOpen}
    >
      <DrawerContext.Provider
        value={{
          activeSnapPoint,
          snapPoints,
          setActiveSnapPoint,
          drawerRef,
          overlayRef,
          onOpenChange,
          onPress,
          onRelease,
          // onDrag,
          dismissible,
          shouldAnimate,
          handleOnly,
          isOpen,
          isDragging,
          shouldFade,
          closeDrawer,
          onNestedDrag,
          onNestedOpenChange,
          onNestedRelease,
          keyboardIsOpen,
          modal,
          snapPointsOffset,
          activeSnapPointIndex,
          direction,
          shouldScaleBackground,
          setBackgroundColorOnScale,
          noBodyStyles,
          container,
          autoFocus,
        }}
      >
        {children}
      </DrawerContext.Provider>
    </DialogPrimitive.Root>
  )
}

export const Overlay = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(function ({ ...rest }, ref) {
  const {
    overlayRef,
    snapPoints,
    onRelease,
    shouldFade,
    isOpen,
    modal,
    shouldAnimate,
  } = useDrawerContext()
  const composedRef = useComposedRefs(ref, overlayRef)
  const hasSnapPoints = snapPoints && snapPoints.length > 0
  const onMouseUp = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => onRelease(event),
    [onRelease],
  )

  // Overlay is the component that is locking scroll, removing it will unlock the scroll without having to dig into Radix's Dialog library
  if (!modal) {
    return null
  }

  return (
    <DialogPrimitive.Overlay
      onMouseUp={onMouseUp}
      ref={composedRef}
      data-vaul-overlay=''
      data-vaul-snap-points={isOpen && hasSnapPoints ? 'true' : 'false'}
      data-vaul-snap-points-overlay={isOpen && shouldFade ? 'true' : 'false'}
      data-vaul-animate={shouldAnimate?.current ? 'true' : 'false'}
      {...rest}
    />
  )
})

Overlay.displayName = 'Drawer.Overlay'

export type ContentProps = React.ComponentPropsWithoutRef<typeof DialogContent>

export const Content = React.forwardRef<HTMLDivElement, ContentProps>(function (
  { onPointerDownOutside, style, onOpenAutoFocus, ...rest },
  ref,
) {
  const {
    drawerRef,
    onPress,
    onRelease,
    onDrag,
    keyboardIsOpen,
    snapPointsOffset,
    activeSnapPointIndex,
    modal,
    isOpen,
    direction,
    snapPoints,
    container,
    handleOnly,
    shouldAnimate,
    autoFocus,
  } = useDrawerContext()
  // Needed to use transition instead of animations
  const [delayedSnapPoints, setDelayedSnapPoints] = React.useState(false)
  const composedRef = useComposedRefs(ref, drawerRef)
  const pointerStartRef = React.useRef<{ x: number; y: number } | null>(null)
  const lastKnownPointerEventRef =
    React.useRef<React.PointerEvent<HTMLDivElement> | null>(null)
  const wasBeyondThePointRef = React.useRef(false)
  const hasSnapPoints = snapPoints && snapPoints.length > 0
  useScaleBackground()

  const isDeltaInDirection = (
    delta: { x: number; y: number },
    direction: DrawerDirection,
    threshold = 0,
  ) => {
    if (wasBeyondThePointRef.current) return true

    const deltaY = Math.abs(delta.y)
    const deltaX = Math.abs(delta.x)
    const isDeltaX = deltaX > deltaY
    const dFactor = ['bottom', 'right'].includes(direction) ? 1 : -1

    if (direction === 'left' || direction === 'right') {
      const isReverseDirection = delta.x * dFactor < 0
      if (!isReverseDirection && deltaX >= 0 && deltaX <= threshold) {
        return isDeltaX
      }
    } else {
      const isReverseDirection = delta.y * dFactor < 0
      if (!isReverseDirection && deltaY >= 0 && deltaY <= threshold) {
        return !isDeltaX
      }
    }

    wasBeyondThePointRef.current = true
    return true
  }

  React.useEffect(() => {
    if (hasSnapPoints) {
      window.requestAnimationFrame(() => {
        setDelayedSnapPoints(true)
      })
    }
  }, [])

  function handleOnPointerUp(event: React.PointerEvent<HTMLDivElement> | null) {
    pointerStartRef.current = null
    wasBeyondThePointRef.current = false
    onRelease(event)
  }

  return (
    <DialogPrimitive.Content
      data-vaul-drawer-direction={direction}
      data-vaul-drawer=''
      data-vaul-delayed-snap-points={delayedSnapPoints ? 'true' : 'false'}
      data-vaul-snap-points={isOpen && hasSnapPoints ? 'true' : 'false'}
      data-vaul-custom-container={container ? 'true' : 'false'}
      data-vaul-animate={shouldAnimate?.current ? 'true' : 'false'}
      {...rest}
      ref={composedRef}
      style={
        snapPointsOffset && snapPointsOffset.length > 0
          ? ({
              '--snap-point-height': `${snapPointsOffset[activeSnapPointIndex ?? 0]!}px`,
              ...style,
            } as React.CSSProperties)
          : style
      }
      onPointerDown={(event) => {
        if (handleOnly) return
        rest.onPointerDown?.(event)
        pointerStartRef.current = { x: event.pageX, y: event.pageY }
        onPress(event)
      }}
      onOpenAutoFocus={(e) => {
        onOpenAutoFocus?.(e)

        if (!autoFocus) {
          e.preventDefault()
        }
      }}
      onPointerDownOutside={(e) => {
        onPointerDownOutside?.(e)

        if (!modal || e.defaultPrevented) {
          e.preventDefault()
          return
        }

        if (keyboardIsOpen.current) {
          keyboardIsOpen.current = false
        }
      }}
      onFocusOutside={(e) => {
        if (!modal) {
          e.preventDefault()
          return
        }
      }}
      onPointerMove={(event) => {
        lastKnownPointerEventRef.current = event
        if (handleOnly) return
        rest.onPointerMove?.(event)
        if (!pointerStartRef.current) return
        const yPosition = event.pageY - pointerStartRef.current.y
        const xPosition = event.pageX - pointerStartRef.current.x

        const swipeStartThreshold = event.pointerType === 'touch' ? 10 : 2
        const delta = { x: xPosition, y: yPosition }

        const isAllowedToSwipe = isDeltaInDirection(
          delta,
          direction,
          swipeStartThreshold,
        )
        if (isAllowedToSwipe) onDrag(event)
        else if (
          Math.abs(xPosition) > swipeStartThreshold ||
          Math.abs(yPosition) > swipeStartThreshold
        ) {
          pointerStartRef.current = null
        }
      }}
      onPointerUp={(event) => {
        rest.onPointerUp?.(event)
        pointerStartRef.current = null
        wasBeyondThePointRef.current = false
        onRelease(event)
      }}
      onPointerOut={(event) => {
        rest.onPointerOut?.(event)
        handleOnPointerUp(lastKnownPointerEventRef.current)
      }}
      onContextMenu={(event) => {
        rest.onContextMenu?.(event)
        if (lastKnownPointerEventRef.current) {
          handleOnPointerUp(lastKnownPointerEventRef.current)
        }
      }}
    />
  )
})

Content.displayName = 'Drawer.Content'

export type HandleProps = React.ComponentPropsWithoutRef<'div'> & {
  preventCycle?: boolean
}

const LONG_HANDLE_PRESS_TIMEOUT = 250
const DOUBLE_TAP_TIMEOUT = 120

export const Handle = React.forwardRef<HTMLDivElement, HandleProps>(function (
  { preventCycle = false, children, ...rest },
  ref,
) {
  const {
    closeDrawer,
    isDragging,
    snapPoints,
    activeSnapPoint,
    setActiveSnapPoint,
    dismissible,
    handleOnly,
    isOpen,
    onPress,
    onDrag,
  } = useDrawerContext()

  const closeTimeoutIdRef = React.useRef<number | null>(null)
  const shouldCancelInteractionRef = React.useRef(false)

  function handleStartCycle() {
    // Stop if this is the second click of a double click
    if (shouldCancelInteractionRef.current) {
      handleCancelInteraction()
      return
    }
    window.setTimeout(() => {
      handleCycleSnapPoints()
    }, DOUBLE_TAP_TIMEOUT)
  }

  function handleCycleSnapPoints() {
    // Prevent accidental taps while resizing drawer
    if (isDragging || preventCycle || shouldCancelInteractionRef.current) {
      handleCancelInteraction()
      return
    }
    // Make sure to clear the timeout id if the user releases the handle before the cancel timeout
    handleCancelInteraction()

    if (!snapPoints || snapPoints.length === 0) {
      if (!dismissible) {
        closeDrawer()
      }
      return
    }

    const isLastSnapPoint =
      activeSnapPoint === snapPoints[snapPoints.length - 1]

    if (isLastSnapPoint && dismissible) {
      closeDrawer()
      return
    }

    const currentSnapIndex = snapPoints.findIndex(
      (point) => point === activeSnapPoint,
    )
    if (currentSnapIndex === -1) return // activeSnapPoint not found in snapPoints
    const nextSnapPoint = snapPoints[currentSnapIndex + 1]
    setActiveSnapPoint(nextSnapPoint)
  }

  function handleStartInteraction() {
    closeTimeoutIdRef.current = window.setTimeout(() => {
      // Cancel click interaction on a long press
      shouldCancelInteractionRef.current = true
    }, LONG_HANDLE_PRESS_TIMEOUT)
  }

  function handleCancelInteraction() {
    if (closeTimeoutIdRef.current) {
      window.clearTimeout(closeTimeoutIdRef.current)
    }
    shouldCancelInteractionRef.current = false
  }

  return (
    <div
      onClick={handleStartCycle}
      onPointerCancel={handleCancelInteraction}
      onPointerDown={(e) => {
        if (handleOnly) onPress(e)
        handleStartInteraction()
      }}
      onPointerMove={(e) => {
        if (handleOnly) onDrag(e)
      }}
      // onPointerUp is already handled by the content component
      ref={ref}
      data-vaul-drawer-visible={isOpen ? 'true' : 'false'}
      data-vaul-handle=''
      aria-hidden='true'
      {...rest}
    >
      {/* Expand handle's hit area beyond what's visible to ensure a 44x44 tap target for touch devices */}
      <span data-vaul-handle-hitarea='' aria-hidden='true'>
        {children}
      </span>
    </div>
  )
})

Handle.displayName = 'Drawer.Handle'

export function NestedRoot({
  onDrag,
  onOpenChange,
  open: nestedIsOpen,
  ...rest
}: DialogProps) {
  const { onNestedDrag, onNestedOpenChange, onNestedRelease } =
    useDrawerContext()

  if (!onNestedDrag) {
    throw new Error('Drawer.NestedRoot must be placed in another drawer')
  }

  return (
    <Root
      nested
      open={nestedIsOpen}
      onClose={() => {
        onNestedOpenChange(false)
      }}
      onDrag={(e, p) => {
        onNestedDrag(e, p)
        onDrag?.(e, p)
      }}
      onOpenChange={(o) => {
        if (o) {
          onNestedOpenChange(o)
        }
        onOpenChange?.(o)
      }}
      onRelease={onNestedRelease}
      {...rest}
    />
  )
}

type PortalProps = React.ComponentPropsWithRef<typeof DialogPrimitive.Portal>

export function Portal(props: PortalProps) {
  const context = useDrawerContext()
  const { container = context.container, ...portalProps } = props

  return <DialogPrimitive.Portal container={container} {...portalProps} />
}

export const Drawer = {
  Root,
  NestedRoot,
  Content,
  Overlay,
  Trigger: DialogPrimitive.Trigger,
  Portal,
  Handle,
  Close: DialogPrimitive.Close,
  Title: DialogPrimitive.Title,
  Description: DialogPrimitive.Description,
}
