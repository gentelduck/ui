import { describe, expect, test } from 'vitest'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { PreviewPanel } from '../preview-panel'
import type { IPreviewPanelProps } from '../preview-panel.types'

describe('registry-ui preview-panel', () => {
  test('exposes the explicit `unsafeHtml` prop, not `html` (SEC-002)', () => {
    // The trusted-input-only raw-HTML sink is named `unsafeHtml` so callers
    // see the contract at every call site. A plain `html` prop must not exist.
    const props: IPreviewPanelProps = { unsafeHtml: '<p>trusted</p>' }
    expect(props.unsafeHtml).toBe('<p>trusted</p>')

    // @ts-expect-error - the legacy `html` prop has been removed.
    const legacy: IPreviewPanelProps = { html: '<p>x</p>' }
    expect(legacy).toBeDefined()
  })

  test('renders `unsafeHtml` verbatim into the panel content', () => {
    const html = renderToStaticMarkup(<PreviewPanel unsafeHtml="<span>preview body</span>" showControls={false} />)
    expect(html).toContain('<span>preview body</span>')
  })

  test('starts locked, so the wheel over it scrolls the page', () => {
    const html = renderToStaticMarkup(<PreviewPanel />)
    expect(html).toContain('aria-label="Unlock the view"')
    expect(html).toContain('aria-pressed="true"')
    expect(html).toContain('cursor:default;touch-action:auto')
  })

  test('`defaultLocked={false}` starts unlocked for drag, wheel and pinch', () => {
    const html = renderToStaticMarkup(<PreviewPanel defaultLocked={false} />)
    expect(html).toContain('aria-label="Lock the view"')
    expect(html).toContain('aria-pressed="false"')
    expect(html).toContain('cursor:grab;touch-action:none')
  })

  test('`actions` render in the toolbar before the zoom controls, and alone when they are hidden', () => {
    const actions = <button type="button">Copy</button>
    expect(renderToStaticMarkup(<PreviewPanel actions={actions} />)).toMatch(
      /data-slot="preview-panel-toolbar"[\s\S]*Copy[\s\S]*data-slot="preview-panel-controls"/,
    )
    expect(renderToStaticMarkup(<PreviewPanel actions={actions} showControls={false} />)).toMatch(
      /data-slot="preview-panel-toolbar"[^>]*><button type="button">Copy<\/button><\/div>/,
    )
    expect(renderToStaticMarkup(<PreviewPanel showControls={false} />)).not.toContain('preview-panel-toolbar')
  })
})
