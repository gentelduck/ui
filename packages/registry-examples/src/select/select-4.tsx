'use client'
import { DirectionProvider } from '@gentleduck/registry-ui/direction'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@gentleduck/registry-ui/select'

export default function Demo() {
  return (
    <DirectionProvider dir="rtl">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="اختر فاكهة" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>الفواكه</SelectLabel>
            <SelectItem value="apple">تفاح</SelectItem>
            <SelectItem value="banana">موز</SelectItem>
            <SelectItem value="blueberry">توت أزرق</SelectItem>
            <SelectItem value="grapes">عنب</SelectItem>
            <SelectItem value="pineapple">أناناس</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </DirectionProvider>
  )
}
