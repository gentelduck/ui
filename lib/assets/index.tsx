import { HtmlHTMLAttributes } from 'react'

export interface IconType extends HtmlHTMLAttributes<SVGElement> {}

export const Icon = {
  execlmation: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      className={className}
    >
      <g fill="currentColor">
        <path d="M7.001 11a1 1 0 1 1 2 0a1 1 0 0 1-2 0" />
        <path d="M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0z" />
        <path d="m10.273 2.513l-.921-.944l.715-.698l.622.637l.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89l.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622l.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01l-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637l-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89l-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622l-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01l.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944l-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318l-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92l-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016l.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944l1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318l.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92l.016-1.32a1.89 1.89 0 0 0-1.912-1.911z" />
      </g>
    </svg>
  ),
  eyeOpen: ({ className }: IconType) => (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path>
    </svg>
  ),
  eyeOff: ({ className }: IconType) => (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M17.8827 19.2968C16.1814 20.3755 14.1638 21.0002 12.0003 21.0002C6.60812 21.0002 2.12215 17.1204 1.18164 12.0002C1.61832 9.62282 2.81932 7.5129 4.52047 5.93457L1.39366 2.80777L2.80788 1.39355L22.6069 21.1925L21.1927 22.6068L17.8827 19.2968ZM5.9356 7.3497C4.60673 8.56015 3.6378 10.1672 3.22278 12.0002C4.14022 16.0521 7.7646 19.0002 12.0003 19.0002C13.5997 19.0002 15.112 18.5798 16.4243 17.8384L14.396 15.8101C13.7023 16.2472 12.8808 16.5002 12.0003 16.5002C9.51498 16.5002 7.50026 14.4854 7.50026 12.0002C7.50026 11.1196 7.75317 10.2981 8.19031 9.60442L5.9356 7.3497ZM12.9139 14.328L9.67246 11.0866C9.5613 11.3696 9.50026 11.6777 9.50026 12.0002C9.50026 13.3809 10.6196 14.5002 12.0003 14.5002C12.3227 14.5002 12.6309 14.4391 12.9139 14.328ZM20.8068 16.5925L19.376 15.1617C20.0319 14.2268 20.5154 13.1586 20.7777 12.0002C19.8603 7.94818 16.2359 5.00016 12.0003 5.00016C11.1544 5.00016 10.3329 5.11773 9.55249 5.33818L7.97446 3.76015C9.22127 3.26959 10.5793 3.00016 12.0003 3.00016C17.3924 3.00016 21.8784 6.87992 22.8189 12.0002C22.5067 13.6998 21.8038 15.2628 20.8068 16.5925ZM11.7229 7.50857C11.8146 7.50299 11.9071 7.50016 12.0003 7.50016C14.4855 7.50016 16.5003 9.51488 16.5003 12.0002C16.5003 12.0933 16.4974 12.1858 16.4919 12.2775L11.7229 7.50857Z"></path>
    </svg>
  ),
  plainCyrcle: ({ className }: IconType) => (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 512 512"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M256 23.05C127.5 23.05 23.05 127.5 23.05 256S127.5 488.9 256 488.9 488.9 384.5 488.9 256 384.5 23.05 256 23.05z"></path>
    </svg>
  ),
  triangle: ({ className }: IconType) => (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="200px"
      width="200px"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z"></path>
    </svg>
  ),
  fiStar: ({ className }: IconType) => (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="200px"
      width="200px"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  ),
  regStar: ({ className }: IconType) => (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 576 512"
      height="200px"
      width="200px"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"></path>
    </svg>
  ),
  rectangleBold: ({ className }: IconType) => (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 256 256"
      height="200px"
      width="200px"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M216,36H40A20,20,0,0,0,20,56V200a20,20,0,0,0,20,20H216a20,20,0,0,0,20-20V56A20,20,0,0,0,216,36Zm-4,160H44V60H212Z"></path>
    </svg>
  ),
  regCircle: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
      />
    </svg>
  ),
  commandKey: ({ className }: IconType) => (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height="200px"
      width="200px"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fill="none"
        d="M0 0h24v24H0z"
      ></path>
      <path d="M17.5 3C15.57 3 14 4.57 14 6.5V8h-4V6.5C10 4.57 8.43 3 6.5 3S3 4.57 3 6.5 4.57 10 6.5 10H8v4H6.5C4.57 14 3 15.57 3 17.5S4.57 21 6.5 21s3.5-1.57 3.5-3.5V16h4v1.5c0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5H16v-4h1.5c1.93 0 3.5-1.57 3.5-3.5S19.43 3 17.5 3zM16 8V6.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S18.33 8 17.5 8H16zM6.5 8C5.67 8 5 7.33 5 6.5S5.67 5 6.5 5 8 5.67 8 6.5V8H6.5zm3.5 6v-4h4v4h-4zm7.5 5c-.83 0-1.5-.67-1.5-1.5V16h1.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5zm-11 0c-.83 0-1.5-.67-1.5-1.5S5.67 16 6.5 16H8v1.5c0 .83-.67 1.5-1.5 1.5z"></path>
    </svg>
  ),
  reqSquare: ({ className }: IconType) => (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 448 512"
      height="200px"
      width="200px"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-6 400H54c-3.3 0-6-2.7-6-6V86c0-3.3 2.7-6 6-6h340c3.3 0 6 2.7 6 6v340c0 3.3-2.7 6-6 6z"></path>
    </svg>
  ),
  dotVertical: ({ className }: IconType) => (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 16 16"
      height="200px"
      width="200px"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"></path>
    </svg>
  ),

  fiLink: ({ className }: IconType) => (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="200px"
      width="200px"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
    </svg>
  ),

  regCommentAlt: ({ className }: IconType) => (
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-
      viewBox="0 0 512 512"
      height="200px"
      width="200px"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {' '}
      <path d="M448 0H64C28.7 0 0 28.7 0 64v288c0 35.3 28.7 64 64 64h96v84c0 7.1 5.8 12 12 12 2.4 0 4.9-.7 7.1-2.4L304 416h144c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64zm16 352c0 8.8-7.2 16-16 16H288l-12.8 9.6L208 428v-60H64c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16h384c8.8 0 16 7.2 16 16v288z"></path>
    </svg>
  ),
  chovrenDown: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),

  X: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  ),

  search: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle
        cx="11"
        cy="11"
        r="8"
      />
      <path d="m21 21-4.3-4.3" />
    </svg>
  ),

  calculator: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect
        width="16"
        height="20"
        x="4"
        y="2"
        rx="2"
      />
      <line
        x1="8"
        x2="16"
        y1="6"
        y2="6"
      />
      <line
        x1="16"
        x2="16"
        y1="14"
        y2="18"
      />
      <path d="M16 10h.01" />
      <path d="M12 10h.01" />
      <path d="M8 10h.01" />
      <path d="M12 14h.01" />
      <path d="M8 14h.01" />
      <path d="M12 18h.01" />
      <path d="M8 18h.01" />
    </svg>
  ),
  calendar: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect
        width="18"
        height="18"
        x="3"
        y="4"
        rx="2"
      />
      <path d="M3 10h18" />
    </svg>
  ),
  creditCard: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect
        width="20"
        height="14"
        x="2"
        y="5"
        rx="2"
      />
      <line
        x1="2"
        x2="22"
        y1="10"
        y2="10"
      />
    </svg>
  ),
  settings: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle
        cx="12"
        cy="12"
        r="3"
      />
    </svg>
  ),
  smile: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
      />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line
        x1="9"
        x2="9.01"
        y1="9"
        y2="9"
      />
      <line
        x1="15"
        x2="15.01"
        y1="9"
        y2="9"
      />
    </svg>
  ),
  user: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle
        cx="12"
        cy="7"
        r="4"
      />
    </svg>
  ),
  chevronUp: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  ),

  check: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),

  bell: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  ),
  messageSquare: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  alertCircle: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
      />
      <line
        x1="12"
        x2="12"
        y1="8"
        y2="12"
      />
      <line
        x1="12"
        x2="12.01"
        y1="16"
        y2="16"
      />
    </svg>
  ),

  mail: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect
        width="20"
        height="16"
        x="2"
        y="4"
        rx="2"
      />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),

  archive: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect
        width="20"
        height="5"
        x="2"
        y="3"
        rx="1"
      />
      <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
      <path d="M10 12h4" />
    </svg>
  ),

  trash2: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line
        x1="10"
        x2="10"
        y1="11"
        y2="17"
      />
      <line
        x1="14"
        x2="14"
        y1="11"
        y2="17"
      />
    </svg>
  ),
  archiveX: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect
        width="20"
        height="5"
        x="2"
        y="3"
        rx="1"
      />
      <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
      <path d="m9.5 17 5-5" />
      <path d="m9.5 12 5 5" />
    </svg>
  ),
  send: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  ),

  galleryVerticalEnd: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M7 2h10" />
      <path d="M5 6h14" />
      <rect
        width="18"
        height="12"
        x="3"
        y="10"
        rx="2"
      />
    </svg>
  ),
  inbox: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  ),

  file: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  ),

  tags: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19" />
      <path d="M9.586 5.586A2 2 0 0 0 8.172 5H3a1 1 0 0 0-1 1v5.172a2 2 0 0 0 .586 1.414L8.29 18.29a2.426 2.426 0 0 0 3.42 0l3.58-3.58a2.426 2.426 0 0 0 0-3.42z" />
      <circle
        cx="6.5"
        cy="9.5"
        r=".5"
        fill="currentColor"
      />
    </svg>
  ),

  calendarCheck: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect
        width="18"
        height="18"
        x="3"
        y="4"
        rx="2"
      />
      <path d="M3 10h18" />
      <path d="m9 16 2 2 4-4" />
    </svg>
  ),

  chevronRight: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),

  arrowLeftFromLine: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m9 6-6 6 6 6" />
      <path d="M3 12h14" />
      <path d="M21 19V5" />
    </svg>
  ),

  chevronsUpDown: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m7 15 5 5 5-5" />
      <path d="m7 9 5-5 5 5" />
    </svg>
  ),

  chevronLeft: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  ),

  moreHorizontal: ({ className }: IconType) => (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 16 16"
      height="200px"
      width="200px"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"></path>
    </svg>
  ),

  keyboard: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M10 8h.01" />
      <path d="M12 12h.01" />
      <path d="M14 8h.01" />
      <path d="M16 12h.01" />
      <path d="M18 8h.01" />
      <path d="M6 8h.01" />
      <path d="M7 16h10" />
      <path d="M8 12h.01" />
      <rect
        width="20"
        height="16"
        x="2"
        y="4"
        rx="2"
      />
    </svg>
  ),
  users: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle
        cx="9"
        cy="7"
        r="4"
      />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),

  dot: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle
        cx="12.1"
        cy="12.1"
        r="1"
      />
    </svg>
  ),

  userPlus: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle
        cx="9"
        cy="7"
        r="4"
      />
      <line
        x1="19"
        x2="19"
        y1="8"
        y2="14"
      />
      <line
        x1="22"
        x2="16"
        y1="11"
        y2="11"
      />
    </svg>
  ),
  plusCircle: ({ className }: IconType) => (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height="200px"
      width="200px"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M12.75 7.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z"></path>
      <path d="M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1ZM2.5 12a9.5 9.5 0 0 0 9.5 9.5 9.5 9.5 0 0 0 9.5-9.5A9.5 9.5 0 0 0 12 2.5 9.5 9.5 0 0 0 2.5 12Z"></path>
    </svg>
  ),

  github: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  ),
  cloud: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  ),
  discord: ({ className }: IconType) => (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 640 512"
      height="200px"
      width="200px"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"></path>
    </svg>
  ),
  logOut: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line
        x1="21"
        x2="9"
        y1="12"
        y2="12"
      />
    </svg>
  ),

  gripVertical: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle
        cx="9"
        cy="12"
        r="1"
      />
      <circle
        cx="9"
        cy="5"
        r="1"
      />
      <circle
        cx="9"
        cy="19"
        r="1"
      />
      <circle
        cx="15"
        cy="12"
        r="1"
      />
      <circle
        cx="15"
        cy="5"
        r="1"
      />
      <circle
        cx="15"
        cy="19"
        r="1"
      />
    </svg>
  ),

  squareKanban: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect
        width="18"
        height="18"
        x="3"
        y="3"
        rx="2"
      />
      <path d="M8 7v7" />
      <path d="M12 7v4" />
      <path d="M16 7v9" />
    </svg>
  ),

  list: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line
        x1="8"
        x2="21"
        y1="6"
        y2="6"
      />
      <line
        x1="8"
        x2="21"
        y1="12"
        y2="12"
      />
      <line
        x1="8"
        x2="21"
        y1="18"
        y2="18"
      />
      <line
        x1="3"
        x2="3.01"
        y1="6"
        y2="6"
      />
      <line
        x1="3"
        x2="3.01"
        y1="12"
        y2="12"
      />
      <line
        x1="3"
        x2="3.01"
        y1="18"
        y2="18"
      />
    </svg>
  ),

  table: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect
        width="18"
        height="18"
        x="3"
        y="3"
        rx="2"
        ry="2"
      />
      <line
        x1="3"
        x2="21"
        y1="9"
        y2="9"
      />
      <line
        x1="3"
        x2="21"
        y1="15"
        y2="15"
      />
      <line
        x1="9"
        x2="9"
        y1="9"
        y2="21"
      />
      <line
        x1="15"
        x2="15"
        y1="9"
        y2="21"
      />
    </svg>
  ),

  clock: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
      />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  reply: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="9 17 4 12 9 7" />
      <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
    </svg>
  ),

  replyAll: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="7 17 2 12 7 7" />
      <polyline points="12 17 7 12 12 7" />
      <path d="M22 18v-2a4 4 0 0 0-4-4H7" />
    </svg>
  ),

  forward: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="15 17 20 12 15 7" />
      <path d="M4 18v-2a4 4 0 0 1 4-4h12" />
    </svg>
  ),

  mixerHorizontal: ({ className }: IconType) => (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="0"
      viewBox="0 0 15 15"
      height="200px"
      width="200px"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.5 3C4.67157 3 4 3.67157 4 4.5C4 5.32843 4.67157 6 5.5 6C6.32843 6 7 5.32843 7 4.5C7 3.67157 6.32843 3 5.5 3ZM3 5C3.01671 5 3.03323 4.99918 3.04952 4.99758C3.28022 6.1399 4.28967 7 5.5 7C6.71033 7 7.71978 6.1399 7.95048 4.99758C7.96677 4.99918 7.98329 5 8 5H13.5C13.7761 5 14 4.77614 14 4.5C14 4.22386 13.7761 4 13.5 4H8C7.98329 4 7.96677 4.00082 7.95048 4.00242C7.71978 2.86009 6.71033 2 5.5 2C4.28967 2 3.28022 2.86009 3.04952 4.00242C3.03323 4.00082 3.01671 4 3 4H1.5C1.22386 4 1 4.22386 1 4.5C1 4.77614 1.22386 5 1.5 5H3ZM11.9505 10.9976C11.7198 12.1399 10.7103 13 9.5 13C8.28967 13 7.28022 12.1399 7.04952 10.9976C7.03323 10.9992 7.01671 11 7 11H1.5C1.22386 11 1 10.7761 1 10.5C1 10.2239 1.22386 10 1.5 10H7C7.01671 10 7.03323 10.0008 7.04952 10.0024C7.28022 8.8601 8.28967 8 9.5 8C10.7103 8 11.7198 8.8601 11.9505 10.0024C11.9668 10.0008 11.9833 10 12 10H13.5C13.7761 10 14 10.2239 14 10.5C14 10.7761 13.7761 11 13.5 11H12C11.9833 11 11.9668 10.9992 11.9505 10.9976ZM8 10.5C8 9.67157 8.67157 9 9.5 9C10.3284 9 11 9.67157 11 10.5C11 11.3284 10.3284 12 9.5 12C8.67157 12 8 11.3284 8 10.5Z"
        fill="currentColor"
      ></path>
    </svg>
  ),

  plus: ({ className }: IconType) => (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 448 512"
      height="200px"
      width="200px"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"></path>
    </svg>
  ),

  upload: ({ className }: IconType) => (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke-linecap="round"
      stroke-linejoin="round"
      height="200px"
      width="200px"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="17 8 12 3 7 8"></polyline>
      <line
        x1="12"
        y1="3"
        x2="12"
        y2="15"
      ></line>
    </svg>
  ),
  vim: ({ className }: IconType) => (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      version="1.1"
      viewBox="0 0 34 32"
      height="200px"
      width="200px"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M18.752 19.442c0.042 0.042 0.125 0.105 0.188 0.105h1.109c0.063 0 0.146-0.063 0.188-0.105l0.293-0.314c0.042-0.042 0.063-0.084 0.063-0.125l0.314-1.067c0.021-0.105 0-0.209-0.063-0.272l-0.23-0.188c-0.042-0.042-0.125-0.021-0.188-0.021h-1.004l-0.063-0.063c-0.042 0-0.084-0.021-0.126 0.021l-0.398 0.251c-0.042 0-0.063 0.105-0.084 0.146l-0.335 1.025c-0.042 0.105-0.021 0.23 0.063 0.314l0.272 0.293zM18.919 24.966l-0.084 0.021h-0.251l1.507-4.415c0.042-0.146-0.021-0.314-0.167-0.356l-0.084-0.021h-2.532c-0.105 0.021-0.188 0.105-0.209 0.209l-0.146 0.523c-0.042 0.146 0.063 0.272 0.209 0.314l0.063-0.021h0.377l-1.528 4.373c-0.042 0.146 0.021 0.335 0.167 0.398l0.084 0.063h2.344c0.125 0 0.23-0.105 0.272-0.23l0.146-0.502c0.063-0.147-0.021-0.314-0.167-0.356v0zM30.031 20.844l-0.398-0.523v-0.021c-0.063-0.063-0.125-0.125-0.209-0.125h-1.507c-0.084 0-0.146 0.084-0.209 0.125l-0.419 0.502h-0.649l-0.439-0.502v-0.021c-0.042-0.063-0.126-0.105-0.209-0.105h-0.837l4.227-4.227-4.729-4.687 4.227-4.352v-1.883l-0.586-0.753h-8.558l-0.691 0.732v0.607l-2.365-2.385-1.611 1.569-0.502-0.523h-8.454l-0.67 0.774v1.967l0.628 0.607h0.628v5.461l-2.929 2.929 2.929 2.93v6.696l1.088 0.607h2.427l1.904-1.988 4.52 4.52 3.034-3.034c0.021 0.084 0.084 0.105 0.188 0.146l0.084-0.042h1.967c0.126 0 0.23-0.021 0.251-0.125l0.146-0.418c0.042-0.146-0.021-0.272-0.167-0.314l-0.084 0.021h-0.084l0.712-2.239 0.481-0.481h1.046l-1.046 3.327c-0.042 0.146 0.042 0.23 0.188 0.293l0.084-0.042h1.904c0.105 0 0.209-0.021 0.251-0.125l0.167-0.377c0.063-0.146-0.021-0.272-0.146-0.335-0.021-0.021-0.063 0-0.105 0h-0.084l0.879-2.72h1.276l-1.067 3.327c-0.042 0.146 0.042 0.23 0.188 0.272l0.084-0.063h2.093c0.105 0 0.209-0.021 0.251-0.125l0.167-0.418c0.063-0.146-0.021-0.272-0.167-0.314-0.021-0.021-0.063 0.021-0.105 0.021h-0.146l1.172-3.871c0.042-0.105 0.021-0.23-0.021-0.293v0zM16.68 3.623l2.365 2.365v0.984l0.711 0.858h0.335l-6.068 5.859v-5.859h0.691l0.565-0.879v-1.862l-0.042-0.063 1.444-1.402zM4.167 16.010l2.532-2.532v5.064l-2.532-2.532zM12.307 24.025l12.22-12.555 4.478 4.499-4.227 4.227h-0.021c-0.063 0.021-0.105 0.063-0.146 0.105l-0.439 0.502h-0.607l-0.46-0.502c-0.042-0.063-0.126-0.125-0.209-0.125h-1.841c-0.125 0-0.23 0.084-0.272 0.209l-0.167 0.523c-0.042 0.146 0.021 0.272 0.167 0.335h0.314l-1.339 3.955-3.16 3.181-4.29-4.352z"></path>
    </svg>
  ),

  gmail: ({ className }: IconType) => (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height="200px"
      width="200px"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="m18.73 5.41-1.28 1L12 10.46 6.55 6.37l-1.28-1A2 2 0 0 0 2 7.05v11.59A1.36 1.36 0 0 0 3.36 20h3.19v-7.72L12 16.37l5.45-4.09V20h3.19A1.36 1.36 0 0 0 22 18.64V7.05a2 2 0 0 0-3.27-1.64z"></path>
    </svg>
  ),
  filledStar: ({ className }: IconType) => (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 576 512"
      height="200px"
      width="200px"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
    </svg>
  ),
  refresh: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  ),
  emailOpen: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
      <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
    </svg>
  ),
  clipboardChecked: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect
        width="8"
        height="4"
        x="8"
        y="2"
        rx="1"
        ry="1"
      />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="m9 14 2 2 4-4" />
    </svg>
  ),
  tag: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
      <circle
        cx="7.5"
        cy="7.5"
        r=".5"
        fill="currentColor"
      />
    </svg>
  ),
  folderMove: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 7.5V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-1.5" />
      <path d="M2 13h10" />
      <path d="m5 10-3 3 3 3" />
    </svg>
  ),
  notfOff: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M8.7 3A6 6 0 0 1 18 8a21.3 21.3 0 0 0 .6 5" />
      <path d="M17 17H3s3-2 3-9a4.67 4.67 0 0 1 .3-1.7" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      <path d="m2 2 20 20" />
    </svg>
  ),
  popup: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4" />
      <rect
        width="10"
        height="7"
        x="12"
        y="13"
        rx="2"
      />
    </svg>
  ),

  bold: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M14 12a4 4 0 0 0 0-8H6v8"></path>
      <path d="M15 20a4 4 0 0 0 0-8H6v8Z"></path>
    </svg>
  ),

  italic: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line
        x1="19"
        x2="10"
        y1="4"
        y2="4"
      ></line>
      <line
        x1="14"
        x2="5"
        y1="20"
        y2="20"
      ></line>
      <line
        x1="15"
        x2="9"
        y1="4"
        y2="20"
      ></line>
    </svg>
  ),
  underLine: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 4v6a6 6 0 0 0 12 0V4"></path>
      <line
        x1="4"
        x2="20"
        y1="20"
        y2="20"
      ></line>
    </svg>
  ),

  strikethrough: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 4H9a3 3 0 0 0-2.83 4"></path>
      <path d="M14 12a4 4 0 0 1 0 8H6"></path>
      <line
        x1="4"
        x2="20"
        y1="12"
        y2="12"
      ></line>
    </svg>
  ),

  code: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
  ),

  codeBlock: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m18 16 4-4-4-4"></path>
      <path d="m6 8-4 4 4 4"></path>
      <path d="m14.5 4-5 16"></path>
    </svg>
  ),
  hIcon: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 12h12" />
      <path d="M6 20V4" />
      <path d="M18 20V4" />
    </svg>
  ),

  h1: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 12h8" />
      <path d="M4 18V6" />
      <path d="M12 18V6" />
      <path d="m17 12 3-2v8" />
    </svg>
  ),

  h2: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 12h8" />
      <path d="M4 18V6" />
      <path d="M12 18V6" />
      <path d="M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1" />
    </svg>
  ),

  h3: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 12h8" />
      <path d="M4 18V6" />
      <path d="M12 18V6" />
      <path d="M17.5 10.5c1.7-1 3.5 0 3.5 1.5a2 2 0 0 1-2 2" />
      <path d="M17 17.5c2 1.5 4 .3 4-1.5a2 2 0 0 0-2-2" />
    </svg>
  ),

  h4: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 12h8" />
      <path d="M4 18V6" />
      <path d="M12 18V6" />
      <path d="M17 10v4h4" />
      <path d="M21 10v8" />
    </svg>
  ),

  h5: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 12h8" />
      <path d="M4 18V6" />
      <path d="M12 18V6" />
      <path d="M17 13v-3h4" />
      <path d="M17 17.7c.4.2.8.3 1.3.3 1.5 0 2.7-1.1 2.7-2.5S19.8 13 18.3 13H17" />
    </svg>
  ),

  h6: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 12h8" />
      <path d="M4 18V6" />
      <path d="M12 18V6" />
      <circle
        cx="19"
        cy="16"
        r="2"
      />
      <path d="M20 10c-2 2-3 3.5-3 6" />
    </svg>
  ),

  text: ({ className }: IconType) => (
    <svg
      stroke="currentColor"
      fill="currentColor"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="0"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="none"
        d="M0 0h24v24H0z"
      ></path>
      <path d="M2.5 4v3h5v12h3V7h5V4h-13zm19 5h-9v3h3v7h3v-7h3V9z"></path>
    </svg>
  ),
  highlight: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
      strokeLinejoin="round"
    >
      <path d="m9 11-6 6v3h9l3-3" />
      <path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4" />
    </svg>
  ),

  paintRoller: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
      strokeLinejoin="round"
    >
      <rect
        width="16"
        height="6"
        x="2"
        y="2"
        rx="2"
      />
      <path d="M10 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect
        width="4"
        height="6"
        x="8"
        y="16"
        rx="1"
      />
    </svg>
  ),

  circleOff: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
      strokeLinejoin="round"
    >
      <path d="m2 2 20 20" />
      <path d="M8.35 2.69A10 10 0 0 1 21.3 15.65" />
      <path d="M19.08 19.08A10 10 0 1 1 4.92 4.92" />
    </svg>
  ),
  pencil: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
      <path d="m15 5 4 4" />
    </svg>
  ),

  alignCenter: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line
        x1="21"
        x2="3"
        y1="6"
        y2="6"
      />
      <line
        x1="17"
        x2="7"
        y1="12"
        y2="12"
      />
      <line
        x1="19"
        x2="5"
        y1="18"
        y2="18"
      />
    </svg>
  ),
  alignleft: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line
        x1="21"
        x2="3"
        y1="6"
        y2="6"
      />
      <line
        x1="15"
        x2="3"
        y1="12"
        y2="12"
      />
      <line
        x1="17"
        x2="3"
        y1="18"
        y2="18"
      />
    </svg>
  ),

  alignRight: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line
        x1="21"
        x2="3"
        y1="6"
        y2="6"
      />
      <line
        x1="21"
        x2="9"
        y1="12"
        y2="12"
      />
      <line
        x1="21"
        x2="7"
        y1="18"
        y2="18"
      />
    </svg>
  ),

  justify: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line
        x1="3"
        x2="21"
        y1="6"
        y2="6"
      />
      <line
        x1="3"
        x2="21"
        y1="12"
        y2="12"
      />
      <line
        x1="3"
        x2="21"
        y1="18"
        y2="18"
      />
    </svg>
  ),
  infoBadge: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <line
        x1="12"
        x2="12"
        y1="16"
        y2="12"
      />
      <line
        x1="12"
        x2="12.01"
        y1="8"
        y2="8"
      />
    </svg>
  ),

  alarm: ({ className }: IconType) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle
        cx="12"
        cy="13"
        r="8"
      />
      <path d="M5 3 2 6" />
      <path d="m22 6-3-3" />
      <path d="M6.38 18.7 4 21" />
      <path d="M17.64 18.67 20 21" />
      <path d="m9 13 2 2 4-4" />
    </svg>
  ),

  calenderEdit: ({ className }: IconType) => (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path
        fill="none"
        d="M0 0h24v24H0z"
      ></path>
      <path d="M5 10h14v2h2V6c0-1.1-.9-2-2-2h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h7v-2H5V10zm0-4h14v2H5V6zm17.84 10.28-.71.71-2.12-2.12.71-.71a.996.996 0 0 1 1.41 0l.71.71c.39.39.39 1.02 0 1.41zm-3.54-.7 2.12 2.12-5.3 5.3H14v-2.12l5.3-5.3z"></path>
    </svg>
  ),
}
