import { Input } from '@gentelduck/registry-ui-duckui/input'
import { Button } from '@gentelduck/registry-ui-duckui/button'

export default function InputWithButton() {
  return (
    <div className='flex w-full max-w-sm items-center space-x-2'>
      <Input type='email' placeholder='Email' />
      <Button type='submit'>Subscribe</Button>
    </div>
  )
}
