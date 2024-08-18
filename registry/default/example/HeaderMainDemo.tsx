import { Calendar, Cloudy, HandshakeIcon, Home, Inbox, Mail, Send, ServerCog, Settings } from 'lucide-react'
import { Button, Header, TooltipProvider } from '../ui'
import { toast } from 'sonner'
import { useAtom } from 'jotai'
import { buttonVarieties } from '@/hooks/use-varieties'
import { cn } from '@/lib'

export default function HeaderMainDemo() {
  //NOTE: that's a state in the example
  const [variety] = useAtom(buttonVarieties)
  //NOTE: you will use your own variables not this state in the example
  const { open } = variety.default.variety!
  const O = open!

  return (
    <div>
      <TooltipProvider>
        <Header<typeof O>
          header={{
            isCollabsed: open,
            className: 'border-r-border border-r-solid border-r h-[300px] justify-center',
          }}
          switcher={{
            accounts: emails,
          }}
          nav={{
            navigationKeys: hi,
            nav: {
              group: [1, 1],
              router: {},
              pathname: '',
            },
          }}
          footer={{
            buttons: [
              <Button
                isCollapsed={open}
                icon={<Inbox />}
                className={cn('my-1 mx-2 justify-between', O ? 'w-[50.8px]' : 'w-[250px]')}
                title={'collapsed'}
                variant={'secondary'}
                label={{
                  children: '',
                }}
                command={{
                  label: 'Ctrl+O' as string,
                  key: 'o' as string,
                  action: () => {},
                }}
              />,
            ],
          }}
        />
      </TooltipProvider>
    </div>
  )
}

const hi = [
  {
    title: 'Home',
    route: '/home',
    children: 'Home',
    icon: <Home />,
    label: {
      children: '21',
    },
  },
  {
    title: 'Calendar',
    route: '/calendar',
    children: 'Calendar',
    icon: <Calendar />,
    label: {
      children: '20',
    },
  },
]

const emails = [
  { email: 'wildduck@duck.org', icon: Mail, label: 'mail' },
  { email: 'mona@gmail.com', icon: Cloudy, label: 'cloud' },
  { email: 'hannan@duck.du', icon: ServerCog, label: 'server' },
]
