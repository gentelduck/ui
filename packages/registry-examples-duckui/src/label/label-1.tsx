import { Checkbox } from '@gentelduck/registry-ui-duckui/checkbox'
import { Label } from '@gentelduck/registry-ui-duckui/label'

export default function LabelDemo() {
    return (
        <div>
            <div className='flex items-center space-x-2'>
                <Checkbox id='terms' />
                <Label htmlFor='terms'>Accept terms and conditions</Label>
            </div>
        </div>
    )
}
