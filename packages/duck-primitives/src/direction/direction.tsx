import * as React from 'react'
import type { IDirection } from './direction.types'

const DIRECTION_DICTIONARY = {
  ltr: 'ltr',
  rtl: 'rtl',
} as const

const DirectionContext = React.createContext<IDirection.Kind | undefined>(undefined)

const DirectionProvider: React.FC<IDirection.IProviderProps> = (props) => {
  const { dir, children } = props
  return (
    <DirectionContext.Provider value={dir}>
      {/* `display: contents` keeps the wrapper out of layout; `dir` still flows to descendants. */}
      <div data-slot="direction" dir={dir} style={{ direction: dir, display: 'contents' }}>
        {children}
      </div>
    </DirectionContext.Provider>
  )
}

function subscribeToDocumentDir(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributeFilter: ['dir'], attributes: true })
  return () => observer.disconnect()
}

function getDocumentDir(): IDirection.Kind {
  return document.documentElement.dir === 'rtl' ? 'rtl' : 'ltr'
}

function getServerDir(): IDirection.Kind {
  return 'ltr'
}

/** Resolves `dir` prop -> nearest `DirectionProvider` -> `<html dir>`, so setting it once anywhere is enough. */
function useDirection(localDir?: IDirection.Kind): IDirection.Kind {
  const globalDir = React.useContext(DirectionContext)
  const documentDir = React.useSyncExternalStore(subscribeToDocumentDir, getDocumentDir, getServerDir)
  return localDir || globalDir || documentDir
}

const Provider = DirectionProvider

export { DIRECTION_DICTIONARY, DirectionContext, DirectionProvider, Provider, useDirection }
