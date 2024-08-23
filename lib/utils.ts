import * as React from 'react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { TableHeaderColumns } from '@/registry/default/ui'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export const filteredObject = <T extends Record<string, any>>(keys: string[], obj: T): Partial<T> => {
  return Object.fromEntries(Object.entries(obj).filter(([key]) => !keys.includes(key))) as Partial<T>
}

export function groupDataByNumbers<T>(strings: T[], groupSizes: number[]): T[][] {
  const result: T[][] = []
  let index = 0

  for (const size of groupSizes) {
    const group = strings.slice(index, index + size)
    result.push(group)
    index += size
  }

  return result
}

export function groupArrays<T>(numbers: number[], headers: T[]): T[][] {
  const result: T[][] = []
  let index = 0

  for (const num of numbers) {
    const headerGroup = headers.slice(index, index + num)
    result.push(headerGroup)
    index += num
  }

  return result
}

export function sortArray<T>(
  columns: TableHeaderColumns[],
  array: T[],
  key?: keyof T,
  order: 'asc' | 'desc' | 'not sorted' = 'desc'
) {
  const toggleSortOrder = (
    order: 'asc' | 'desc' | 'not sorted',
    currentOrder: 'asc' | 'desc' | 'not sorted'
  ): 'asc' | 'desc' | 'not sorted' => (order === 'not sorted' ? currentOrder : 'not sorted')

  const updatedColumns = columns.map(col => {
    if (col.children === key) {
      return {
        ...col,
        currentSort: toggleSortOrder(col.currentSort!, order),
      }
    }
    return col
  })

  const sortedData = array.sort((a, b) => {
    const valueA = key ? a[key] : a
    const valueB = key ? b[key] : b

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return order === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
    } else if (typeof valueA === 'number' && typeof valueB === 'number') {
      return order === 'asc' ? valueA - valueB : valueB - valueA
    } else {
      return order === 'asc' ? (valueA > valueB ? 1 : -1) : valueA < valueB ? 1 : -1
    }
  })
  return { sortedData, updatedColumns }
}
