/**
 * Props for the CommandGroup component.
 * This component is used to group command items under a common heading.
 */
export interface CommandGroupProps extends React.HTMLProps<HTMLDivElement> {
  /** The title for the command group. */
  heading: string
}

/**
 * Type for the context used within the Command components.
 * This context provides the current search query and a function to update it.
 */
export type CommandContextType = {
  /** The current search query. */
  search: string
  /** A function to update the search query. */
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

/**
 * Type for the context used within the Command components.
 * This context provides references to various elements within the command palette.
 */
export type CommandRefsContextType = {
  /** A Reference to the list element that contains the command items */
  commandRef: React.RefObject<HTMLDivElement | null>
  /** A Reference to the list element that contains the rest of list items */
  listRef: React.RefObject<HTMLUListElement | null>
  /** A Reference to the list element that contains the command items */
  emptyRef: React.RefObject<HTMLHeadingElement | null>
  /** A Reference to the input field for searching through the command items */
  inputRef: React.RefObject<HTMLInputElement | null>
  /** A reference to the currently selected command item. */
  selectedItem: HTMLLIElement | null
  /** A function to update the currently selected command item. */
  setSelectedItem: React.Dispatch<React.SetStateAction<HTMLLIElement | null>>
  /** A function to update the currently selected command item. */
  items: React.RefObject<HTMLLIElement[]>
  /** A function to update the currently selected command item. */
  groups: React.RefObject<HTMLDivElement[]>
  /** A function to update the currently selected command item. */
  filteredItems: React.RefObject<HTMLLIElement[]>
}

/**
 * Props for the CommandBadge component (also used as CommandShortcut).
 * This component displays a badge that indicates the keyboard shortcut for a command.
 */
export interface CommandBadgeProps extends React.HTMLProps<HTMLElement> {
  /** The keyboard shortcut keys (e.g., "ctrl+K"). */
  keys: string
  /** Callback function that is invoked when the shortcut keys are pressed. */
  onKeysPressed: () => void
}
