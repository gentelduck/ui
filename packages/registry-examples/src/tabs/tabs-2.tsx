import { Button } from '@gentleduck/registry-ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@gentleduck/registry-ui/card'
import { DirectionProvider } from '@gentleduck/registry-ui/direction'
import { Input } from '@gentleduck/registry-ui/input'
import { Label } from '@gentleduck/registry-ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@gentleduck/registry-ui/tabs'

export default function Demo() {
  return (
    <DirectionProvider dir="rtl">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Tabs className="w-full" defaultValue="account">
          <TabsList>
            <TabsTrigger className="w-full" value="account">
              {'الحساب'}
            </TabsTrigger>
            <TabsTrigger className="w-full" value="password">
              {'كلمة المرور'}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>{'الحساب'}</CardTitle>
                <CardDescription>{'عدّل بيانات حسابك هنا، ثم اضغط «حفظ التغييرات» عند الانتهاء.'}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="tabs-rtl-name">{'الاسم'}</Label>
                  <Input defaultValue="أحمد علي" id="tabs-rtl-name" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tabs-rtl-username">{'اسم المستخدم'}</Label>
                  <Input defaultValue="ahmad.ali" id="tabs-rtl-username" />
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button>{'حفظ التغييرات'}</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>{'كلمة المرور'}</CardTitle>
                <CardDescription>{'غيّر كلمة المرور من هنا. سيتم تسجيل خروجك بعد الحفظ.'}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="tabs-rtl-current">{'كلمة المرور الحالية'}</Label>
                  <Input id="tabs-rtl-current" type="password" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tabs-rtl-new">{'كلمة المرور الجديدة'}</Label>
                  <Input id="tabs-rtl-new" type="password" />
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button>{'حفظ كلمة المرور'}</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DirectionProvider>
  )
}
