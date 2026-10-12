'use client'

import { Label } from '@gentleduck/registry-ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@gentleduck/registry-ui/tabs'
import { Textarea } from '@gentleduck/registry-ui/textarea'
import * as React from 'react'

function MountedAt() {
  const [time] = React.useState(() => new Date().toLocaleTimeString())
  return <span className="font-mono text-foreground">{time}</span>
}

export default function Demo() {
  return (
    <Tabs className="w-full max-w-sm" defaultValue="draft">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="draft">Draft</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
      </TabsList>
      <TabsContent className="space-y-3 rounded-lg border p-4" renderOnce value="draft">
        <div className="grid gap-2">
          <Label htmlFor="tabs-render-once-draft">Release notes</Label>
          <Textarea id="tabs-render-once-draft" placeholder="Type something, switch tabs, then come back." rows={4} />
        </div>
        <p className="text-muted-foreground text-xs">
          <code>renderOnce</code>: mounted at <MountedAt />, and kept mounted when you switch away.
        </p>
      </TabsContent>
      <TabsContent className="space-y-3 rounded-lg border p-4" value="activity">
        <ul className="space-y-2 text-sm">
          <li>Deployed v2.4.1</li>
          <li>Merged PR #847</li>
          <li>Upgraded to Team</li>
        </ul>
        <p className="text-muted-foreground text-xs">
          Default: mounted at <MountedAt />, and unmounted when you switch away.
        </p>
      </TabsContent>
    </Tabs>
  )
}
