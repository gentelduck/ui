import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from '@gentleduck/registry-ui/avatar'
import { DirectionProvider } from '@gentleduck/registry-ui/direction'

const team = [
  {
    alt: 'فريق جنتل دك',
    fallback: 'جد',
    id: 'gentleduck',
    src: 'https://github.com/gentleeduck/gentleduck/blob/master/apps/duck-ui-docs/public/static/LOGO.png?raw=true',
  },
  { alt: 'أحمد علي', fallback: 'أع', id: 'ahmad', src: 'https://avatars.githubusercontent.com/u/108896341?v=4' },
  {
    alt: 'سارة خالد',
    fallback: 'سخ',
    id: 'sara',
    src: 'https://raw.githubusercontent.com/wildduck2/duck-starter-kit/15fbc61fb02cd21a873108b380ca12fe31f50099/apps/document-client/public/placeholder2.webp',
  },
  { alt: 'مريم حسن', fallback: 'مح', id: 'mariam' },
  { alt: 'يوسف عمر', fallback: 'يع', id: 'youssef' },
]

export default function Demo() {
  return (
    <DirectionProvider dir="rtl">
      <div className="flex flex-row flex-wrap items-center gap-12">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage alt="أحمد علي" src="https://avatars.githubusercontent.com/u/108896341?v=4" />
            <AvatarFallback>أع</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0.5">
            <span className="font-medium text-sm">أحمد علي</span>
            <span className="text-muted-foreground text-xs">مطوّر واجهات أمامية</span>
          </div>
        </div>
        <AvatarGroup imgs={team} maxVisible={3} />
      </div>
    </DirectionProvider>
  )
}
