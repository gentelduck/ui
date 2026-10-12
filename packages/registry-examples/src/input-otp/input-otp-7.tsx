import { DirectionProvider } from '@gentleduck/registry-ui/direction'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@gentleduck/registry-ui/input-otp'

export default function Demo() {
  return (
    <DirectionProvider dir="rtl">
      <InputOTP aria-label="رمز التحقق" maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot />
          <InputOTPSlot />
          <InputOTPSlot />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot />
          <InputOTPSlot />
          <InputOTPSlot />
        </InputOTPGroup>
      </InputOTP>
    </DirectionProvider>
  )
}
