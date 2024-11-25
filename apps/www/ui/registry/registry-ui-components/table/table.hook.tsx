import React from 'react'
import { DuckTableContext, type DuckTableContextType } from './table'

export const useDuckTable = (): DuckTableContextType | null => {
  const context = React.useContext(DuckTableContext)
  if (!context) {
    throw new Error('useTableProvider must be used within an TableProvider')
  }
  return context
}