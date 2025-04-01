import { ColorBase } from './registry-colors.dto'

export const registry_themes: ColorBase = [
  {
    name: 'matsu',
    label: 'Matsu',
    activeColor: {
      light: '111.7 9.7% 71%',
      dark: '111.7 9.7% 51%',
    },
    cssVars: {
      theme: {
        'font-weight-light': '700',
        'font-weight-normal': '700',
        'font-weight-medium': '700',
        'font-weight-semibold': '700',
        'font-sans': 'Nunito, sans-serif',
        'font-serif': 'PT Serif, serif',
        'shadow-xs': '0 2px 0 0 var(--border)',
        'shadow-sm': '0 2px 0 0 var(--border)',
        'shadow-md': '0 2px 0 0 var(--border)',
        'shadow-lg': '0 2px 0 0 var(--border)',
        'shadow-xl': '0 2px 0 0 var(--border)',
        'shadow-2xl': '0 2px 0 0 var(--border)',
        'shadow-3xl': '0 2px 0 0 var(--border)',
      },
      light: {
        background: 'oklch(0.91 0.048 83.6)',
        foreground: 'oklch(0.41 0.077 78.9)',
        card: 'oklch(0.92 0.042 83.6)',
        'card-foreground': 'oklch(0.41 0.077 74.3)',
        popover: 'oklch(0.92 0.042 83.6)',
        'popover-foreground': 'oklch(0.41 0.077 74.3)',
        primary: 'oklch(0.71 0.097 111.7)',
        'primary-foreground': 'oklch(0.98 0.005 0)',
        'primary-border': 'oklch(0.59 0.096 111.8)',
        secondary: 'oklch(0.88 0.055 83.6)',
        'secondary-foreground': 'oklch(0.51 0.077 78.9)',
        muted: 'oklch(0.86 0.064 83.7)',
        'muted-foreground': 'oklch(0.51 0.077 74.3)',
        accent: 'oklch(0.86 0.055 83.6)',
        'accent-foreground': 'oklch(0.26 0.016 0)',
        destructive: 'oklch(0.63 0.24 29.2)',
        'destructive-foreground': 'oklch(0.97 0.018 0)',
        'destructive-border': 'oklch(0.43 0.24 29.2)',
        border: 'oklch(0.74 0.063 80.8)',
        input: 'oklch(0.74 0.063 80.8)',
        ring: 'oklch(0.51 0.077 74.3)',
        radius: '0.625rem',
        'chart-1': 'oklch(0.66 0.19 41.6)',
        'chart-2': 'oklch(0.68 0.16 184.9)',
        'chart-3': 'oklch(0.48 0.09 210.9)',
        'chart-4': 'oklch(0.85 0.19 85.4)',
        'chart-5': 'oklch(0.74 0.19 66.3)',
        'sidebar-foreground': 'oklch(0.41 0.077 78.9)',
        'sidebar-background': 'oklch(0.87 0.059 83.7)',
        'sidebar-primary': 'oklch(0.26 0.016 0)',
        'sidebar-primary-foreground': 'oklch(0.98 0.005 0)',
        'sidebar-accent': 'oklch(0.83 0.058 83.6)',
        'sidebar-accent-foreground': 'oklch(0.26 0.016 0)',
        'sidebar-border': 'oklch(0.91 0.005 0)',
        'sidebar-ring': 'oklch(0.71 0.005 0)',
      },
      dark: {
        background: 'oklch(0.21 0.048 83.6)',
        foreground: 'oklch(0.91 0.077 78.9)',
        card: 'oklch(0.22 0.042 83.6)',
        'card-foreground': 'oklch(0.91 0.077 74.3)',
        popover: 'oklch(0.22 0.042 83.6)',
        'popover-foreground': 'oklch(0.91 0.077 74.3)',
        primary: 'oklch(0.81 0.097 111.7)',
        'primary-foreground': 'oklch(0.18 0.005 0)',
        'primary-border': 'oklch(0.69 0.096 111.8)',
        secondary: 'oklch(0.28 0.055 83.6)',
        'secondary-foreground': 'oklch(0.91 0.077 78.9)',
        muted: 'oklch(0.26 0.064 83.7)',
        'muted-foreground': 'oklch(0.81 0.077 74.3)',
        accent: 'oklch(0.26 0.055 83.6)',
        'accent-foreground': 'oklch(0.96 0.016 0)',
        destructive: 'oklch(0.53 0.24 29.2)',
        'destructive-foreground': 'oklch(0.97 0.018 0)',
        'destructive-border': 'oklch(0.33 0.24 29.2)',
        border: 'oklch(0.34 0.063 80.8)',
        input: 'oklch(0.34 0.063 80.8)',
        ring: 'oklch(0.81 0.077 74.3)',
        radius: '0.625rem',
        'chart-1': 'oklch(0.76 0.19 41.6)',
        'chart-2': 'oklch(0.78 0.16 184.9)',
        'chart-3': 'oklch(0.58 0.09 210.9)',
        'chart-4': 'oklch(0.75 0.19 85.4)',
        'chart-5': 'oklch(0.64 0.19 66.3)',
        'sidebar-foreground': 'oklch(0.91 0.077 78.9)',
        'sidebar-background': 'oklch(0.17 0.059 83.7)',
        'sidebar-primary': 'oklch(0.96 0.016 0)',
        'sidebar-primary-foreground': 'oklch(0.18 0.005 0)',
        'sidebar-accent': 'oklch(0.23 0.058 83.6)',
        'sidebar-accent-foreground': 'oklch(0.96 0.016 0)',
        'sidebar-border': 'oklch(0.31 0.005 0)',
        'sidebar-ring': 'oklch(0.81 0.005 0)',
      },
    },
    css: {
      '@layer base': {
        body: {
          'font-weight': 'var(--font-weight-bold)',
        },
        '.border': {
          'border-width': '2px !important',
        },
        '.border-l': {
          'border-left-width': '2px !important',
        },
        '.border-r': {
          'border-right-width': '2px !important',
        },
        '.border-t': {
          'border-top-width': '2px !important',
        },
        '.border-b': {
          'border-bottom-width': '2px !important',
        },
        '.shadow-primary': {
          'box-shadow': '0 2px 0 0 var(--primary-border)',
        },
        '.shadow-destructive': {
          'box-shadow': '0 2px 0 0 var(--destructive)',
        },
        '.shadow-destructive-border': {
          'box-shadow': '0 2px 0 0 var(--destructive-border)',
        },
        '.texture': {
          'background-image': 'url(https://matsu-theme.vercel.app/texture.jpg)',
          'background-size': '100% 100%',
          'background-repeat': 'repeat',
          opacity: '0.12',
          'mix-blend-mode': 'multiply',
          'z-index': '100',
          isolation: 'isolate',
          position: 'fixed',
          inset: '0',
          width: '100vw',
          height: '100dvh',
          'pointer-events': 'none',
        },
      },
    },
  },
  {
    name: 'zinc',
    label: 'Zinc',
    activeColor: {
      light: '240 5.9% 10%',
      dark: '240 5.2% 33.9%',
    },
    cssVars: {
      light: {
        background: '0 0% 100%',
        foreground: '240 10% 3.9%',
        card: '0 0% 100%',
        'card-foreground': '240 10% 3.9%',
        popover: '0 0% 100%',
        'popover-foreground': '240 10% 3.9%',
        primary: '240 5.9% 10%',
        'primary-foreground': '0 0% 98%',
        secondary: '240 4.8% 95.9%',
        'secondary-foreground': '240 5.9% 10%',
        muted: '240 4.8% 95.9%',
        'muted-foreground': '240 3.8% 46.1%',
        accent: '240 4.8% 95.9%',
        'accent-foreground': '240 5.9% 10%',
        destructive: '0 84.2% 60.2%',
        'destructive-foreground': '0 0% 98%',
        border: '240 5.9% 90%',
        input: '240 5.9% 90%',
        ring: '240 5.9% 10%',
        radius: '0.5rem',
        'chart-1': '12 76% 61%',
        'chart-2': '173 58% 39%',
        'chart-3': '197 37% 24%',
        'chart-4': '43 74% 66%',
        'chart-5': '27 87% 67%',
      },
      dark: {
        background: '240 10% 3.9%',
        foreground: '0 0% 98%',
        card: '240 10% 3.9%',
        'card-foreground': '0 0% 98%',
        popover: '240 10% 3.9%',
        'popover-foreground': '0 0% 98%',
        primary: '0 0% 98%',
        'primary-foreground': '240 5.9% 10%',
        secondary: '240 3.7% 15.9%',
        'secondary-foreground': '0 0% 98%',
        muted: '240 3.7% 15.9%',
        'muted-foreground': '240 5% 64.9%',
        accent: '240 3.7% 15.9%',
        'accent-foreground': '0 0% 98%',
        destructive: '0 62.8% 30.6%',
        'destructive-foreground': '0 0% 98%',
        border: '240 3.7% 15.9%',
        radius: '0.5rem',
        input: '240 3.7% 15.9%',
        ring: '240 4.9% 83.9%',
        'chart-1': '220 70% 50%',
        'chart-2': '160 60% 45%',
        'chart-3': '30 80% 55%',
        'chart-4': '280 65% 60%',
        'chart-5': '340 75% 55%',
      },
    },
  },
  {
    name: 'slate',
    label: 'Slate',
    activeColor: {
      light: '215.4 16.3% 46.9%',
      dark: '215.3 19.3% 34.5%',
    },
    cssVars: {
      light: {
        background: '0 0% 100%',
        foreground: '222.2 84% 4.9%',
        card: '0 0% 100%',
        'card-foreground': '222.2 84% 4.9%',
        popover: '0 0% 100%',
        'popover-foreground': '222.2 84% 4.9%',
        primary: '222.2 47.4% 11.2%',
        'primary-foreground': '210 40% 98%',
        secondary: '210 40% 96.1%',
        'secondary-foreground': '222.2 47.4% 11.2%',
        muted: '210 40% 96.1%',
        'muted-foreground': '215.4 16.3% 46.9%',
        accent: '210 40% 96.1%',
        'accent-foreground': '222.2 47.4% 11.2%',
        destructive: '0 84.2% 60.2%',
        'destructive-foreground': '210 40% 98%',
        border: '214.3 31.8% 91.4%',
        input: '214.3 31.8% 91.4%',
        ring: '222.2 84% 4.9%',
        radius: '0.5rem',
        'chart-1': '12 76% 61%',
        'chart-2': '173 58% 39%',
        'chart-3': '197 37% 24%',
        'chart-4': '43 74% 66%',
        'chart-5': '27 87% 67%',
      },
      dark: {
        background: '222.2 84% 4.9%',
        foreground: '210 40% 98%',
        card: '222.2 84% 4.9%',
        'card-foreground': '210 40% 98%',
        popover: '222.2 84% 4.9%',
        'popover-foreground': '210 40% 98%',
        primary: '210 40% 98%',
        'primary-foreground': '222.2 47.4% 11.2%',
        secondary: '217.2 32.6% 17.5%',
        'secondary-foreground': '210 40% 98%',
        muted: '217.2 32.6% 17.5%',
        'muted-foreground': '215 20.2% 65.1%',
        accent: '217.2 32.6% 17.5%',
        'accent-foreground': '210 40% 98%',
        destructive: '0 62.8% 30.6%',
        'destructive-foreground': '210 40% 98%',
        border: '217.2 32.6% 17.5%',
        input: '217.2 32.6% 17.5%',
        radius: '0.5rem',
        ring: '212.7 26.8% 83.9%',
        'chart-1': '220 70% 50%',
        'chart-2': '160 60% 45%',
        'chart-3': '30 80% 55%',
        'chart-4': '280 65% 60%',
        'chart-5': '340 75% 55%',
      },
    },
  },
  {
    name: 'stone',
    label: 'Stone',
    activeColor: {
      light: '25 5.3% 44.7%',
      dark: '33.3 5.5% 32.4%',
    },
    cssVars: {
      light: {
        background: '0 0% 100%',
        foreground: '20 14.3% 4.1%',
        card: '0 0% 100%',
        'card-foreground': '20 14.3% 4.1%',
        popover: '0 0% 100%',
        'popover-foreground': '20 14.3% 4.1%',
        primary: '24 9.8% 10%',
        'primary-foreground': '60 9.1% 97.8%',
        secondary: '60 4.8% 95.9%',
        'secondary-foreground': '24 9.8% 10%',
        muted: '60 4.8% 95.9%',
        'muted-foreground': '25 5.3% 44.7%',
        accent: '60 4.8% 95.9%',
        'accent-foreground': '24 9.8% 10%',
        destructive: '0 84.2% 60.2%',
        'destructive-foreground': '60 9.1% 97.8%',
        border: '20 5.9% 90%',
        input: '20 5.9% 90%',
        ring: '20 14.3% 4.1%',
        radius: '0.95rem',
        'chart-1': '12 76% 61%',
        'chart-2': '173 58% 39%',
        'chart-3': '197 37% 24%',
        'chart-4': '43 74% 66%',
        'chart-5': '27 87% 67%',
      },
      dark: {
        background: '20 14.3% 4.1%',
        foreground: '60 9.1% 97.8%',
        card: '20 14.3% 4.1%',
        'card-foreground': '60 9.1% 97.8%',
        popover: '20 14.3% 4.1%',
        'popover-foreground': '60 9.1% 97.8%',
        primary: '60 9.1% 97.8%',
        'primary-foreground': '24 9.8% 10%',
        secondary: '12 6.5% 15.1%',
        'secondary-foreground': '60 9.1% 97.8%',
        muted: '12 6.5% 15.1%',
        'muted-foreground': '24 5.4% 63.9%',
        accent: '12 6.5% 15.1%',
        'accent-foreground': '60 9.1% 97.8%',
        destructive: '0 62.8% 30.6%',
        radius: '0.95rem',
        'destructive-foreground': '60 9.1% 97.8%',
        border: '12 6.5% 15.1%',
        input: '12 6.5% 15.1%',
        ring: '24 5.7% 82.9%',
        'chart-1': '220 70% 50%',
        'chart-2': '160 60% 45%',
        'chart-3': '30 80% 55%',
        'chart-4': '280 65% 60%',
        'chart-5': '340 75% 55%',
      },
    },
  },
  {
    name: 'gray',
    label: 'Gray',
    activeColor: {
      light: '220 8.9% 46.1%',
      dark: '215 13.8% 34.1%',
    },
    cssVars: {
      light: {
        background: '0 0% 100%',
        foreground: '224 71.4% 4.1%',
        card: '0 0% 100%',
        'card-foreground': '224 71.4% 4.1%',
        popover: '0 0% 100%',
        'popover-foreground': '224 71.4% 4.1%',
        primary: '220.9 39.3% 11%',
        'primary-foreground': '210 20% 98%',
        secondary: '220 14.3% 95.9%',
        'secondary-foreground': '220.9 39.3% 11%',
        muted: '220 14.3% 95.9%',
        'muted-foreground': '220 8.9% 46.1%',
        accent: '220 14.3% 95.9%',
        'accent-foreground': '220.9 39.3% 11%',
        destructive: '0 84.2% 60.2%',
        'destructive-foreground': '210 20% 98%',
        border: '220 13% 91%',
        input: '220 13% 91%',
        ring: '224 71.4% 4.1%',
        radius: '0.35rem',
        'chart-1': '12 76% 61%',
        'chart-2': '173 58% 39%',
        'chart-3': '197 37% 24%',
        'chart-4': '43 74% 66%',
        'chart-5': '27 87% 67%',
      },
      dark: {
        background: '224 71.4% 4.1%',
        foreground: '210 20% 98%',
        card: '224 71.4% 4.1%',
        'card-foreground': '210 20% 98%',
        popover: '224 71.4% 4.1%',
        'popover-foreground': '210 20% 98%',
        primary: '210 20% 98%',
        'primary-foreground': '220.9 39.3% 11%',
        secondary: '215 27.9% 16.9%',
        'secondary-foreground': '210 20% 98%',
        muted: '215 27.9% 16.9%',
        'muted-foreground': '217.9 10.6% 64.9%',
        accent: '215 27.9% 16.9%',
        'accent-foreground': '210 20% 98%',
        destructive: '0 62.8% 30.6%',
        'destructive-foreground': '210 20% 98%',
        radius: '0.35rem',
        border: '215 27.9% 16.9%',
        input: '215 27.9% 16.9%',
        ring: '216 12.2% 83.9%',
        'chart-1': '220 70% 50%',
        'chart-2': '160 60% 45%',
        'chart-3': '30 80% 55%',
        'chart-4': '280 65% 60%',
        'chart-5': '340 75% 55%',
      },
    },
  },
  {
    name: 'neutral',
    label: 'Neutral',
    activeColor: {
      light: '0 0% 45.1%',
      dark: '0 0% 32.2%',
    },
    cssVars: {
      light: {
        background: '0 0% 100%',
        foreground: '0 0% 3.9%',
        card: '0 0% 100%',
        'card-foreground': '0 0% 3.9%',
        popover: '0 0% 100%',
        'popover-foreground': '0 0% 3.9%',
        primary: '0 0% 9%',
        'primary-foreground': '0 0% 98%',
        secondary: '0 0% 96.1%',
        'secondary-foreground': '0 0% 9%',
        muted: '0 0% 96.1%',
        'muted-foreground': '0 0% 45.1%',
        accent: '0 0% 96.1%',
        'accent-foreground': '0 0% 9%',
        destructive: '0 84.2% 60.2%',
        'destructive-foreground': '0 0% 98%',
        radius: '0.35rem',
        border: '0 0% 89.8%',
        input: '0 0% 89.8%',
        ring: '0 0% 3.9%',
        'chart-1': '12 76% 61%',
        'chart-2': '173 58% 39%',
        'chart-3': '197 37% 24%',
        'chart-4': '43 74% 66%',
        'chart-5': '27 87% 67%',
      },
      dark: {
        background: '0 0% 3.9%',
        foreground: '0 0% 98%',
        card: '0 0% 3.9%',
        'card-foreground': '0 0% 98%',
        popover: '0 0% 3.9%',
        'popover-foreground': '0 0% 98%',
        primary: '0 0% 98%',
        'primary-foreground': '0 0% 9%',
        secondary: '0 0% 14.9%',
        'secondary-foreground': '0 0% 98%',
        muted: '0 0% 14.9%',
        'muted-foreground': '0 0% 63.9%',
        accent: '0 0% 14.9%',
        'accent-foreground': '0 0% 98%',
        destructive: '0 62.8% 30.6%',
        'destructive-foreground': '0 0% 98%',
        border: '0 0% 14.9%',
        radius: '0.35rem',
        input: '0 0% 14.9%',
        ring: '0 0% 83.1%',
        'chart-1': '220 70% 50%',
        'chart-2': '160 60% 45%',
        'chart-3': '30 80% 55%',
        'chart-4': '280 65% 60%',
        'chart-5': '340 75% 55%',
      },
    },
  },
  {
    name: 'red',
    label: 'Red',
    activeColor: {
      light: '0 72.2% 50.6%',
      dark: '0 72.2% 50.6%',
    },
    cssVars: {
      light: {
        background: '0 0% 100%',
        foreground: '0 0% 3.9%',
        card: '0 0% 100%',
        'card-foreground': '0 0% 3.9%',
        popover: '0 0% 100%',
        'popover-foreground': '0 0% 3.9%',
        primary: '0 72.2% 50.6%',
        'primary-foreground': '0 85.7% 97.3%',
        secondary: '0 0% 96.1%',
        'secondary-foreground': '0 0% 9%',
        muted: '0 0% 96.1%',
        'muted-foreground': '0 0% 45.1%',
        accent: '0 0% 96.1%',
        'accent-foreground': '0 0% 9%',
        destructive: '0 84.2% 60.2%',
        'destructive-foreground': '0 0% 98%',
        border: '0 0% 89.8%',
        input: '0 0% 89.8%',
        ring: '0 72.2% 50.6%',
        radius: '0.4rem',
        'chart-1': '12 76% 61%',
        'chart-2': '173 58% 39%',
        'chart-3': '197 37% 24%',
        'chart-4': '43 74% 66%',
        'chart-5': '27 87% 67%',
      },
      dark: {
        background: '0 0% 3.9%',
        foreground: '0 0% 98%',
        card: '0 0% 3.9%',
        'card-foreground': '0 0% 98%',
        popover: '0 0% 3.9%',
        'popover-foreground': '0 0% 98%',
        primary: '0 72.2% 50.6%',
        'primary-foreground': '0 85.7% 97.3%',
        secondary: '0 0% 14.9%',
        'secondary-foreground': '0 0% 98%',
        muted: '0 0% 14.9%',
        'muted-foreground': '0 0% 63.9%',
        accent: '0 0% 14.9%',
        'accent-foreground': '0 0% 98%',
        destructive: '0 62.8% 30.6%',
        'destructive-foreground': '0 0% 98%',
        border: '0 0% 14.9%',
        radius: '0.4rem',
        input: '0 0% 14.9%',
        ring: '0 72.2% 50.6%',
        'chart-1': '220 70% 50%',
        'chart-2': '160 60% 45%',
        'chart-3': '30 80% 55%',
        'chart-4': '280 65% 60%',
        'chart-5': '340 75% 55%',
      },
    },
  },
  {
    name: 'rose',
    label: 'Rose',
    activeColor: {
      light: '346.8 77.2% 49.8%',
      dark: '346.8 77.2% 49.8%',
    },
    cssVars: {
      light: {
        background: '0 0% 100%',
        foreground: '240 10% 3.9%',
        card: '0 0% 100%',
        'card-foreground': '240 10% 3.9%',
        popover: '0 0% 100%',
        'popover-foreground': '240 10% 3.9%',
        primary: '346.8 77.2% 49.8%',
        'primary-foreground': '355.7 100% 97.3%',
        secondary: '240 4.8% 95.9%',
        'secondary-foreground': '240 5.9% 10%',
        muted: '240 4.8% 95.9%',
        'muted-foreground': '240 3.8% 46.1%',
        accent: '240 4.8% 95.9%',
        'accent-foreground': '240 5.9% 10%',
        destructive: '0 84.2% 60.2%',
        'destructive-foreground': '0 0% 98%',
        border: '240 5.9% 90%',
        input: '240 5.9% 90%',
        ring: '346.8 77.2% 49.8%',
        radius: '0.5rem',
        'chart-1': '12 76% 61%',
        'chart-2': '173 58% 39%',
        'chart-3': '197 37% 24%',
        'chart-4': '43 74% 66%',
        'chart-5': '27 87% 67%',
      },
      dark: {
        background: '20 14.3% 4.1%',
        foreground: '0 0% 95%',
        popover: '0 0% 9%',
        'popover-foreground': '0 0% 95%',
        card: '24 9.8% 10%',
        'card-foreground': '0 0% 95%',
        primary: '346.8 77.2% 49.8%',
        'primary-foreground': '355.7 100% 97.3%',
        secondary: '240 3.7% 15.9%',
        'secondary-foreground': '0 0% 98%',
        muted: '0 0% 15%',
        'muted-foreground': '240 5% 64.9%',
        accent: '12 6.5% 15.1%',
        'accent-foreground': '0 0% 98%',
        destructive: '0 62.8% 30.6%',
        'destructive-foreground': '0 85.7% 97.3%',
        border: '240 3.7% 15.9%',
        input: '240 3.7% 15.9%',
        radius: '0.5rem',
        ring: '346.8 77.2% 49.8%',
        'chart-1': '220 70% 50%',
        'chart-2': '160 60% 45%',
        'chart-3': '30 80% 55%',
        'chart-4': '280 65% 60%',
        'chart-5': '340 75% 55%',
      },
    },
  },
  {
    name: 'orange',
    label: 'Orange',
    activeColor: {
      light: '24.6 95% 53.1%',
      dark: '20.5 90.2% 48.2%',
    },
    cssVars: {
      light: {
        background: '0 0% 100%',
        foreground: '20 14.3% 4.1%',
        card: '0 0% 100%',
        'card-foreground': '20 14.3% 4.1%',
        popover: '0 0% 100%',
        'popover-foreground': '20 14.3% 4.1%',
        primary: '24.6 95% 53.1%',
        'primary-foreground': '60 9.1% 97.8%',
        secondary: '60 4.8% 95.9%',
        'secondary-foreground': '24 9.8% 10%',
        muted: '60 4.8% 95.9%',
        'muted-foreground': '25 5.3% 44.7%',
        accent: '60 4.8% 95.9%',
        'accent-foreground': '24 9.8% 10%',
        destructive: '0 84.2% 60.2%',
        'destructive-foreground': '60 9.1% 97.8%',
        border: '20 5.9% 90%',
        input: '20 5.9% 90%',
        ring: '24.6 95% 53.1%',
        radius: '0.95rem',
        'chart-1': '12 76% 61%',
        'chart-2': '173 58% 39%',
        'chart-3': '197 37% 24%',
        'chart-4': '43 74% 66%',
        'chart-5': '27 87% 67%',
      },
      dark: {
        background: '20 14.3% 4.1%',
        foreground: '60 9.1% 97.8%',
        card: '20 14.3% 4.1%',
        'card-foreground': '60 9.1% 97.8%',
        popover: '20 14.3% 4.1%',
        'popover-foreground': '60 9.1% 97.8%',
        primary: '20.5 90.2% 48.2%',
        'primary-foreground': '60 9.1% 97.8%',
        secondary: '12 6.5% 15.1%',
        'secondary-foreground': '60 9.1% 97.8%',
        muted: '12 6.5% 15.1%',
        'muted-foreground': '24 5.4% 63.9%',
        accent: '12 6.5% 15.1%',
        'accent-foreground': '60 9.1% 97.8%',
        destructive: '0 72.2% 50.6%',
        'destructive-foreground': '60 9.1% 97.8%',
        border: '12 6.5% 15.1%',
        input: '12 6.5% 15.1%',
        radius: '0.95rem',
        ring: '20.5 90.2% 48.2%',
        'chart-1': '220 70% 50%',
        'chart-2': '160 60% 45%',
        'chart-3': '30 80% 55%',
        'chart-4': '280 65% 60%',
        'chart-5': '340 75% 55%',
      },
    },
  },
  {
    name: 'green',
    label: 'Green',
    activeColor: {
      light: '142.1 76.2% 36.3%',
      dark: '142.1 70.6% 45.3%',
    },
    cssVars: {
      light: {
        background: '0 0% 100%',
        foreground: '240 10% 3.9%',
        card: '0 0% 100%',
        'card-foreground': '240 10% 3.9%',
        popover: '0 0% 100%',
        'popover-foreground': '240 10% 3.9%',
        primary: '142.1 76.2% 36.3%',
        'primary-foreground': '355.7 100% 97.3%',
        secondary: '240 4.8% 95.9%',
        'secondary-foreground': '240 5.9% 10%',
        muted: '240 4.8% 95.9%',
        'muted-foreground': '240 3.8% 46.1%',
        accent: '240 4.8% 95.9%',
        'accent-foreground': '240 5.9% 10%',
        destructive: '0 84.2% 60.2%',
        'destructive-foreground': '0 0% 98%',
        border: '240 5.9% 90%',
        radius: '0.95rem',
        input: '240 5.9% 90%',
        ring: '142.1 76.2% 36.3%',
        'chart-1': '12 76% 61%',
        'chart-2': '173 58% 39%',
        'chart-3': '197 37% 24%',
        'chart-4': '43 74% 66%',
        'chart-5': '27 87% 67%',
      },
      dark: {
        radius: '0.95rem',
        background: '20 14.3% 4.1%',
        foreground: '0 0% 95%',
        popover: '0 0% 9%',
        'popover-foreground': '0 0% 95%',
        card: '24 9.8% 10%',
        'card-foreground': '0 0% 95%',
        primary: '142.1 70.6% 45.3%',
        'primary-foreground': '144.9 80.4% 10%',
        secondary: '240 3.7% 15.9%',
        'secondary-foreground': '0 0% 98%',
        muted: '0 0% 15%',
        'muted-foreground': '240 5% 64.9%',
        accent: '12 6.5% 15.1%',
        'accent-foreground': '0 0% 98%',
        destructive: '0 62.8% 30.6%',
        'destructive-foreground': '0 85.7% 97.3%',
        border: '240 3.7% 15.9%',
        input: '240 3.7% 15.9%',
        ring: '142.4 71.8% 29.2%',
        'chart-1': '220 70% 50%',
        'chart-2': '160 60% 45%',
        'chart-3': '30 80% 55%',
        'chart-4': '280 65% 60%',
        'chart-5': '340 75% 55%',
      },
    },
  },
  {
    name: 'blue',
    label: 'Blue',
    activeColor: {
      light: '221.2 83.2% 53.3%',
      dark: '217.2 91.2% 59.8%',
    },
    cssVars: {
      light: {
        background: '0 0% 100%',
        foreground: '222.2 84% 4.9%',
        card: '0 0% 100%',
        'card-foreground': '222.2 84% 4.9%',
        popover: '0 0% 100%',
        'popover-foreground': '222.2 84% 4.9%',
        primary: '221.2 83.2% 53.3%',
        'primary-foreground': '210 40% 98%',
        secondary: '210 40% 96.1%',
        'secondary-foreground': '222.2 47.4% 11.2%',
        muted: '210 40% 96.1%',
        'muted-foreground': '215.4 16.3% 46.9%',
        accent: '210 40% 96.1%',
        'accent-foreground': '222.2 47.4% 11.2%',
        destructive: '0 84.2% 60.2%',
        'destructive-foreground': '210 40% 98%',
        border: '214.3 31.8% 91.4%',
        input: '214.3 31.8% 91.4%',
        radius: '0.5rem',
        ring: '221.2 83.2% 53.3%',
        'chart-1': '12 76% 61%',
        'chart-2': '173 58% 39%',
        'chart-3': '197 37% 24%',
        'chart-4': '43 74% 66%',
        'chart-5': '27 87% 67%',
      },
      dark: {
        background: '222.2 84% 4.9%',
        foreground: '210 40% 98%',
        card: '222.2 84% 4.9%',
        'card-foreground': '210 40% 98%',
        popover: '222.2 84% 4.9%',
        'popover-foreground': '210 40% 98%',
        primary: '217.2 91.2% 59.8%',
        'primary-foreground': '222.2 47.4% 11.2%',
        secondary: '217.2 32.6% 17.5%',
        'secondary-foreground': '210 40% 98%',
        muted: '217.2 32.6% 17.5%',
        'muted-foreground': '215 20.2% 65.1%',
        accent: '217.2 32.6% 17.5%',
        'accent-foreground': '210 40% 98%',
        destructive: '0 62.8% 30.6%',
        'destructive-foreground': '210 40% 98%',
        border: '217.2 32.6% 17.5%',
        radius: '0.5rem',
        input: '217.2 32.6% 17.5%',
        ring: '224.3 76.3% 48%',
        'chart-1': '220 70% 50%',
        'chart-2': '160 60% 45%',
        'chart-3': '30 80% 55%',
        'chart-4': '280 65% 60%',
        'chart-5': '340 75% 55%',
      },
    },
  },
  {
    name: 'yellow',
    label: 'Yellow',
    activeColor: {
      light: '47.9 95.8% 53.1%',
      dark: '47.9 95.8% 53.1%',
    },
    cssVars: {
      light: {
        background: '0 0% 100%',
        foreground: '20 14.3% 4.1%',
        card: '0 0% 100%',
        'card-foreground': '20 14.3% 4.1%',
        popover: '0 0% 100%',
        'popover-foreground': '20 14.3% 4.1%',
        primary: '47.9 95.8% 53.1%',
        'primary-foreground': '26 83.3% 14.1%',
        secondary: '60 4.8% 95.9%',
        'secondary-foreground': '24 9.8% 10%',
        muted: '60 4.8% 95.9%',
        'muted-foreground': '25 5.3% 44.7%',
        accent: '60 4.8% 95.9%',
        'accent-foreground': '24 9.8% 10%',
        destructive: '0 84.2% 60.2%',
        'destructive-foreground': '60 9.1% 97.8%',
        border: '20 5.9% 90%',
        input: '20 5.9% 90%',
        ring: '20 14.3% 4.1%',
        radius: '0.95rem',
        'chart-1': '12 76% 61%',
        'chart-2': '173 58% 39%',
        'chart-3': '197 37% 24%',
        'chart-4': '43 74% 66%',
        'chart-5': '27 87% 67%',
      },
      dark: {
        background: '20 14.3% 4.1%',
        foreground: '60 9.1% 97.8%',
        card: '20 14.3% 4.1%',
        'card-foreground': '60 9.1% 97.8%',
        popover: '20 14.3% 4.1%',
        'popover-foreground': '60 9.1% 97.8%',
        primary: '47.9 95.8% 53.1%',
        'primary-foreground': '26 83.3% 14.1%',
        secondary: '12 6.5% 15.1%',
        'secondary-foreground': '60 9.1% 97.8%',
        muted: '12 6.5% 15.1%',
        'muted-foreground': '24 5.4% 63.9%',
        accent: '12 6.5% 15.1%',
        'accent-foreground': '60 9.1% 97.8%',
        destructive: '0 62.8% 30.6%',
        'destructive-foreground': '60 9.1% 97.8%',
        border: '12 6.5% 15.1%',
        radius: '0.95rem',
        input: '12 6.5% 15.1%',
        ring: '35.5 91.7% 32.9%',
        'chart-1': '220 70% 50%',
        'chart-2': '160 60% 45%',
        'chart-3': '30 80% 55%',
        'chart-4': '280 65% 60%',
        'chart-5': '340 75% 55%',
      },
    },
  },
  {
    name: 'violet',
    label: 'Violet',
    activeColor: {
      light: '262.1 83.3% 57.8%',
      dark: '263.4 70% 50.4%',
    },
    cssVars: {
      light: {
        background: '0 0% 100%',
        foreground: '224 71.4% 4.1%',
        card: '0 0% 100%',
        'card-foreground': '224 71.4% 4.1%',
        popover: '0 0% 100%',
        'popover-foreground': '224 71.4% 4.1%',
        primary: '262.1 83.3% 57.8%',
        'primary-foreground': '210 20% 98%',
        secondary: '220 14.3% 95.9%',
        'secondary-foreground': '220.9 39.3% 11%',
        muted: '220 14.3% 95.9%',
        'muted-foreground': '220 8.9% 46.1%',
        accent: '220 14.3% 95.9%',
        'accent-foreground': '220.9 39.3% 11%',
        destructive: '0 84.2% 60.2%',
        'destructive-foreground': '210 20% 98%',
        radius: '0.95rem',
        border: '220 13% 91%',
        input: '220 13% 91%',
        ring: '262.1 83.3% 57.8%',
        'chart-1': '12 76% 61%',
        'chart-2': '173 58% 39%',
        'chart-3': '197 37% 24%',
        'chart-4': '43 74% 66%',
        'chart-5': '27 87% 67%',
      },
      dark: {
        background: '224 71.4% 4.1%',
        foreground: '210 20% 98%',
        card: '224 71.4% 4.1%',
        'card-foreground': '210 20% 98%',
        popover: '224 71.4% 4.1%',
        'popover-foreground': '210 20% 98%',
        primary: '263.4 70% 50.4%',
        'primary-foreground': '210 20% 98%',
        secondary: '215 27.9% 16.9%',
        'secondary-foreground': '210 20% 98%',
        muted: '215 27.9% 16.9%',
        'muted-foreground': '217.9 10.6% 64.9%',
        accent: '215 27.9% 16.9%',
        'accent-foreground': '210 20% 98%',
        destructive: '0 62.8% 30.6%',
        'destructive-foreground': '210 20% 98%',
        border: '215 27.9% 16.9%',
        radius: '0.5rem',
        input: '215 27.9% 16.9%',
        ring: '263.4 70% 50.4%',
        'chart-1': '220 70% 50%',
        'chart-2': '160 60% 45%',
        'chart-3': '30 80% 55%',
        'chart-4': '280 65% 60%',
        'chart-5': '340 75% 55%',
      },
    },
  },
] as const

export type Theme = (typeof registry_themes)[number]
