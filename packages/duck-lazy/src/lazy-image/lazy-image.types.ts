/**
 * `UseLazyImageReturn` is the return type of the `useLazyImage` hook.
 * It provides the loading state of an image and a reference to the DOM element being observed by the IntersectionObserver.
 *
 * @interface
 * @property {boolean} isLoaded - A boolean indicating if the image has finished loading.
 * @property {React.RefObject<HTMLImageElement>} imageRef - A React ref object pointing to the DOM image element being observed.
 *
 * @example
 * const { isLoaded, imageRef } = useLazyImage({
 *   rootMargin: '50px', // Starts loading the image when 50px is within the viewport
 *   threshold: 0.25, // Trigger when 25% of the image is visible
 * });
 */
export type UseLazyImageReturn = {
  isLoaded: boolean
  imageRef: React.RefObject<HTMLImageElement>
}

/**
 * `LazyImageProps` defines the props for the `LazyImageComponent` component.
 * It extends the basic HTML properties of an `img` element with additional `options` and `placeholder` props for lazy-loading images.
 *
 * @interface
 * @extends {React.HTMLProps<HTMLImageElement>} - Extends default HTML image element props to allow for flexibility in the component.
 * @property {number|`${number}`} width - The width of the image in pixels.
 * @property {number|`${number}`} height - The height of the image in pixels.
 * @property {IntersectionObserverInit} [options] - Configuration for the IntersectionObserver to control when the lazy-loaded image becomes visible.
 * @property {string} [placeholder] - The URL of the placeholder image to display while the target image is being loaded.
 * @property {boolean} [nextImage] - A boolean indicating whether the image is being used in a Next.js application.
 *
 * @example
 * // Example of using LazyImageProps
 * <LazyImageComponent
 *   placeholder="loading-placeholder.jpg"
 *   options={{
 *     rootMargin: '50px', // Starts loading the image when 50px is within the viewport
 *     threshold: 0.25, // Trigger when 25% of the image is visible
 *   }}
 *   src="real-image.jpg"
 *   alt="Description of the image"
 * />
 * ```
 */
export interface LazyImageProps extends React.HTMLProps<HTMLImageElement> {
  options?: IntersectionObserverInit
  placeholder?: string
  nextImage?: boolean
  width: number | `${number}`
  height: number | `${number}`
}
