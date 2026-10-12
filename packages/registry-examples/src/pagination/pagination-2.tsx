import { DirectionProvider } from '@gentleduck/registry-ui/direction'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@gentleduck/registry-ui/pagination'

export default function Demo() {
  return (
    <DirectionProvider dir="rtl">
      <Pagination aria-label="التنقل بين الصفحات">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious aria-label="الانتقال إلى الصفحة السابقة" href="#" text="السابق" />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink href="#">١</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink href="#" isActive>
              ٢
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink href="#">٣</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationEllipsis text="صفحات أخرى" />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext aria-label="الانتقال إلى الصفحة التالية" href="#" text="التالي" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </DirectionProvider>
  )
}
