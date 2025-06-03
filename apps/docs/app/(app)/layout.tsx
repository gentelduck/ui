import { SiteHeader } from '~/components/layouts/site-header'
import { SiteFooter } from '~/components/layouts/site-footer'
import { CommandMenu } from '~/components/layouts'

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div data-wrapper="" className="flex items-center place-content-center min-h-screen flex-col gap-8">
      <SelectDemo />
    </div>
    // <CommandMenu />
    // <SiteHeader />
    // <main className="flex flex-1 flex-col">{children}</main>
    //   <SiteFooter />
  )
}

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@gentleduck/registry-ui-duckui/select'
import { Calendar, Clock, MicOff, Users, Video, X } from 'lucide-react'

export function SelectDemo() {
  return (
    <>
      <Select open={true}>
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder="Choose a meeting" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Upcoming Meetings</SelectLabel>

            <SelectItem value="daily-standup">
              <div className="flex items-start gap-2">
                <Video className="mt-1 size-4.5 text-blue-500" />
                <div className="space-y-0.5">
                  <div className="font-medium">Daily Standup</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    9:00 AM - 9:15 AM
                  </div>
                </div>
              </div>
            </SelectItem>

            <SelectItem value="team-sync">
              <div className="flex items-start gap-2">
                <Users className="mt-1 h-4 w-4 text-green-600" />
                <div className="space-y-0.5">
                  <div className="font-medium">Team Sync</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Tomorrow at 11:00 AM
                  </div>
                </div>
              </div>
            </SelectItem>

            <SelectItem value="1on1">
              <div className="flex items-start gap-2">
                <MicOff className="mt-1 h-4 w-4 text-gray-500" />
                <div className="space-y-0.5">
                  <div className="font-medium">1-on-1 with Ahmed</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    2:00 PM - 2:30 PM
                  </div>
                </div>
              </div>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>{' '}
    </>
  )
}
