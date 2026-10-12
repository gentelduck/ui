import { Button } from '@gentleduck/registry-ui/button'
import { Checkbox } from '@gentleduck/registry-ui/checkbox'
import { DirectionProvider } from '@gentleduck/registry-ui/direction'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@gentleduck/registry-ui/field'
import { Input } from '@gentleduck/registry-ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@gentleduck/registry-ui/select'
import { Textarea } from '@gentleduck/registry-ui/textarea'

export default function Demo() {
  return (
    <DirectionProvider dir="rtl">
      <div className="w-full max-w-lg">
        <form>
          <FieldGroup>
            <FieldSet>
              <FieldLegend>طريقة الدفع</FieldLegend>
              <FieldDescription>جميع المعاملات آمنة ومشفرة</FieldDescription>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="checkout-rtl-7j9-card-name-43j">الاسم على البطاقة</FieldLabel>
                  <Input id="checkout-rtl-7j9-card-name-43j" placeholder="أحمد خالد" required />
                </Field>
                <Field>
                  <FieldLabel htmlFor="checkout-rtl-7j9-card-number-uw1">رقم البطاقة</FieldLabel>
                  <Input id="checkout-rtl-7j9-card-number-uw1" placeholder="0000 0000 0000 0000" required />
                  <FieldDescription>أدخل رقم البطاقة المكوّن من 16 رقمًا</FieldDescription>
                </Field>
                <div className="grid grid-cols-3 gap-4">
                  <Field>
                    <FieldLabel htmlFor="checkout-rtl-exp-month-ts6">الشهر</FieldLabel>
                    <Select defaultValue="">
                      <SelectTrigger id="checkout-rtl-exp-month-ts6">
                        <SelectValue placeholder="اختر" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="01">01</SelectItem>
                        <SelectItem value="02">02</SelectItem>
                        <SelectItem value="03">03</SelectItem>
                        <SelectItem value="04">04</SelectItem>
                        <SelectItem value="05">05</SelectItem>
                        <SelectItem value="06">06</SelectItem>
                        <SelectItem value="07">07</SelectItem>
                        <SelectItem value="08">08</SelectItem>
                        <SelectItem value="09">09</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="11">11</SelectItem>
                        <SelectItem value="12">12</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="checkout-rtl-7j9-exp-year-f59">السنة</FieldLabel>
                    <Select defaultValue="">
                      <SelectTrigger id="checkout-rtl-7j9-exp-year-f59">
                        <SelectValue placeholder="اختر" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2025">2025</SelectItem>
                        <SelectItem value="2026">2026</SelectItem>
                        <SelectItem value="2027">2027</SelectItem>
                        <SelectItem value="2028">2028</SelectItem>
                        <SelectItem value="2029">2029</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="checkout-rtl-7j9-cvv">رمز الأمان</FieldLabel>
                    <Input id="checkout-rtl-7j9-cvv" placeholder="123" required />
                  </Field>
                </div>
              </FieldGroup>
            </FieldSet>
            <FieldSeparator />
            <FieldSet>
              <FieldLegend>عنوان الفواتير</FieldLegend>
              <FieldDescription>عنوان الفواتير المرتبط بطريقة الدفع الخاصة بك</FieldDescription>
              <FieldGroup>
                <Field orientation="horizontal">
                  <Checkbox defaultChecked id="checkout-rtl-7j9-same-as-shipping-wgm" />
                  <FieldLabel className="font-normal" htmlFor="checkout-rtl-7j9-same-as-shipping-wgm">
                    مطابق لعنوان الشحن
                  </FieldLabel>
                </Field>
              </FieldGroup>
            </FieldSet>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="checkout-rtl-7j9-optional-comments">تعليقات</FieldLabel>
                  <Textarea
                    className="resize-none"
                    id="checkout-rtl-7j9-optional-comments"
                    placeholder="أضف أي تعليقات إضافية"
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
            <Field orientation="horizontal">
              <Button type="submit">إرسال</Button>
              <Button type="button" variant="outline">
                إلغاء
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </DirectionProvider>
  )
}
