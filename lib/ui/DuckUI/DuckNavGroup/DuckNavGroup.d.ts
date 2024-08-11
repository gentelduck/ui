import { ParsedLocation, UseNavigateResult } from '@tanstack/react-router'
import { DuckButtonProps } from '../DuckButton'

export type NavType<T extends boolean> = NavCollabsableType<T> &
  React.HtmlHTMLAttributes<HTMLDivElement> & {
    group: number[]
    router: UseNavigateResult<string>
    location: ParsedLocation<{}>
  }

export type NavCollabsableType<K> = K extends true ? NavCollabsedType : NavNotCollabsedType

export interface NavCollabsedType {
  isCollabsed?: boolean
}
export interface NavNotCollabsedType {}

export type DuckNavGroupProps<T extends boolean> = {
  navigationKeys: DuckButtonProps[]
  nav: NavType<T>
}
