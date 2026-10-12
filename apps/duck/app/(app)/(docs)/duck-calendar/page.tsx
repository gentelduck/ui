import { Calendar, Feather, Globe, Keyboard, Layers, Zap } from 'lucide-react'
import { type IPackageFeature, PackageLanding } from '~/components/layouts/package-landing'

export const dynamic = 'force-static'
export const revalidate = false

const title = 'A calendar engine, not a widget'
const description =
  'Headless date logic with full keyboard and ARIA support. Four calendar systems and seven date adapters in about 5 KB gzipped.'

const features: IPackageFeature[] = [
  {
    description: 'You write the markup. Compound hooks on a framework-agnostic core handle state, ARIA, and keyboard.',
    icon: Calendar,
    title: 'Your markup',
  },
  {
    description:
      'Gregorian, Islamic, Persian, and Hebrew are built in. Switch between them without rewriting your date UI.',
    icon: Globe,
    title: 'Four calendar systems',
  },
  {
    description:
      'Native Date, date-fns, dayjs, luxon, and more. Write your own against the adapter contract if none of them fit.',
    icon: Layers,
    title: 'Seven date adapters',
  },
  {
    description:
      'A quarter of react-day-picker’s 20 KB. Zero dependencies, and the core ships nothing but the calendar.',
    icon: Feather,
    title: '5 KB gzipped',
  },
  {
    description:
      'Arrow keys move focus, Home and End jump to the row edges, and PageUp and PageDown change the month. The grid has full ARIA semantics.',
    icon: Keyboard,
    title: 'Keyboard and ARIA',
  },
  {
    description: 'One hook covers every selection mode. Switch between them with a single prop.',
    icon: Zap,
    title: 'Single, range, or multi',
  },
]

const INSTALL_CODE = `# Install
bun add @gentleduck/calendar

# Use it
import { NativeAdapter, useCalendar } from '@gentleduck/calendar'`

export default function DuckCalendarPage() {
  return (
    <PackageLanding
      actions={[
        { href: '/duck-calendar/introduction', label: 'Get started' },
        { href: '/duck-calendar/api/use-calendar', label: 'API reference' },
      ]}
      description={description}
      features={features}
      install={{
        code: INSTALL_CODE,
        description: 'Install the package, then pick a date adapter and a calendar system.',
      }}
      packageName="@gentleduck/calendar"
      slug="duck-calendar"
      source="packages/duck-calendar"
      title={title}
    />
  )
}
