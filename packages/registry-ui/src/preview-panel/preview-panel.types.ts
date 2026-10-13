import type React from 'react'

export interface IPreviewPanelState {
  zoom: number
  x: number
  y: number
}
export type PreviewPanelState = IPreviewPanelState

export interface IPreviewPanelProps extends React.HTMLProps<HTMLDivElement> {
  /** Maximum height of the panel container. */
  maxHeight?: string
  /** Minimum zoom level. Default 0.25. */
  minZoom?: number
  /** Maximum zoom level. Default 4. */
  maxZoom?: number
  /** Initial zoom level. Default 1. */
  initialZoom?: number
  /** Whether to show zoom controls. Default true. */
  showControls?: boolean
  /**
   * Whether drag, wheel and pinch start locked, so the wheel scrolls the page the panel sits in.
   * The zoom buttons work either way. Default true.
   */
  defaultLocked?: boolean
  /** Label for the lock control while the view is unlocked. Default 'Lock the view'. */
  lockText?: string
  /** Label for the lock control while the view is locked. Default 'Unlock the view'. */
  unlockText?: string
  /** Rendered in the toolbar before the zoom controls. */
  actions?: React.ReactNode
  /**
   * Raw HTML string rendered verbatim via `dangerouslySetInnerHTML`. Takes
   * priority over children.
   *
   * SECURITY: this value is NOT sanitised. The caller MUST pass only HTML it
   * fully trusts (e.g. a build-time constant). Never wire user-, CMS-, or
   * URL-derived markup into this prop — doing so is an XSS sink. Pass React
   * `children` instead for untrusted content.
   */
  unsafeHtml?: string
  /** Called whenever zoom or position changes. Use to sync with another panel. */
  onStateChange?: (state: IPreviewPanelState) => void
  /** External state to apply. When set, the panel syncs to this state. */
  syncState?: IPreviewPanelState
  /** Label for the zoom-in control. Default 'Zoom in'. */
  zoomInText?: string
  /** Label for the zoom-out control. Default 'Zoom out'. */
  zoomOutText?: string
  /** Label for the reset control. Default 'Reset view'. */
  resetText?: string
}

export interface IPreviewPanelDialogProps {
  /** Content to render in both the inline panel and the dialog panel. */
  children?: React.ReactNode
  /**
   * Raw HTML string rendered verbatim via `dangerouslySetInnerHTML`. Takes
   * priority over children.
   *
   * SECURITY: this value is NOT sanitised. The caller MUST pass only HTML it
   * fully trusts. Never wire untrusted markup into this prop.
   */
  unsafeHtml?: string
  /** Class name for the inline panel wrapper. */
  className?: string
  /** Class name applied to both PreviewPanel instances. */
  panelClassName?: string
  /** Maximum height of the inline panel. */
  maxHeight?: string
  /** Minimum zoom level. Default 0.25. */
  minZoom?: number
  /** Maximum zoom level. Default 4. */
  maxZoom?: number
  /** Initial zoom level. Default 1. */
  initialZoom?: number
  /** Whether to show zoom controls. Default true. */
  showControls?: boolean
  /** Whether the inline panel starts locked. The fullscreen panel starts unlocked. Default true. */
  defaultLocked?: boolean
  /** Label for the lock control while the view is unlocked. Default 'Lock the view'. */
  lockText?: string
  /** Label for the lock control while the view is locked. Default 'Unlock the view'. */
  unlockText?: string
  /** Whether to sync zoom and position between inline and dialog panels. Default true. */
  syncPanels?: boolean
  /** Label for the zoom-in control. Default 'Zoom in'. */
  zoomInText?: string
  /** Label for the zoom-out control. Default 'Zoom out'. */
  zoomOutText?: string
  /** Label for the reset control. Default 'Reset view'. */
  resetText?: string
}
