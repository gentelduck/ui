'use client'

import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/navigation'
import * as React from 'react'

import { cn } from '@gentleduck/libs/cn'
import { Button } from '@gentleduck/registry-ui-duckui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@gentleduck/registry-ui-duckui/drawer'
import { Icons } from '~/components/icons'
import { docsConfig } from '~/config/docs'
import { siteConfig } from '~/config/site'
import { PanelsTopLeft } from 'lucide-react'
import { ScrollArea } from '@gentleduck/registry-ui-duckui/scroll-area'

export function MobileNav() {
  const [open, setOpen] = React.useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size={'icon'}
          icon={<PanelsTopLeft />}
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"></Button>
      </DrawerTrigger>
      <DrawerContent className="pr-0 pb-4">
        <ScrollArea>
          <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6 hide-scroll">
            <div className="flex flex-col space-y-3">
              {docsConfig.mainNav?.map(
                (item) =>
                  item.href && (
                    <MobileLink key={item.href} href={item.href} onOpenChange={setOpen}>
                      {item.title}
                    </MobileLink>
                  ),
              )}
            </div>
            <div className="flex flex-col space-y-2">
              {docsConfig.sidebarNav.map((item, index) => (
                <div key={index} className="flex flex-col space-y-3 pt-6">
                  <h4 className="font-medium">{item.title}</h4>
                  {item?.items?.length &&
                    item.items.map((item) => (
                      <React.Fragment key={item.href}>
                        {!item.disabled &&
                          (item.href ? (
                            <MobileLink href={item.href} onOpenChange={setOpen} className="text-muted-foreground">
                              {item.title}
                              {item.label && (
                                <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                                  {item.label}
                                </span>
                              )}
                            </MobileLink>
                          ) : (
                            item.title
                          ))}
                      </React.Fragment>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({ href, onOpenChange, className, children, ...props }: MobileLinkProps) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(className)}
      {...props}>
      {children}
    </Link>
  )
}
