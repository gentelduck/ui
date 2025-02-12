import Link from 'next/link'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { PieChart } from 'lucide-react'

import { Separator } from '@/registry/default/ui/'

export function Announcement() {
  return (
    <Link
      href="/docs/components/chart"
      className="group inline-flex items-center px-0.5 text-sm font-medium"
    >
      <PieChart className="h-4 w-4" />{' '}
      <Separator
        className="mx-2 h-4"
        orientation="vertical"
      />{' '}
      <span className="underline-offset-4 group-hover:underline">Introducing Charts</span>
      <ArrowRightIcon className="ml-1 h-4 w-4" />
    </Link>
  )
}

type FooProps = {
  name: string
}

const Foo: React.FC<FooProps> = ({ name }) => {
  return <>hello mr : {name}, how can i help you ?</>
}

export function foo({ name }: FooProps) {
  return <>hello mr : {name}, how can i help you ?</>
}
