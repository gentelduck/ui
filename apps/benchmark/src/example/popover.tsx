import { Button } from "@gentleduck/registry-ui-duckui/button"
import { Input } from "@gentleduck/registry-ui-duckui/input"
import { Label } from "@gentleduck/registry-ui-duckui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@gentleduck/registry-ui-duckui/popover"

export default function PopoverDemo() {
  return (
    <Popover >
      <PopoverTrigger>
        Open popover
      </PopoverTrigger>
      <PopoverContent side="left" className="w-80">
        <div className="gap-4 grid">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-muted-foreground text-sm">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="gap-2 grid">
            <div className="items-center gap-4 grid grid-cols-3">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8"
              />
            </div>
            <div className="items-center gap-4 grid grid-cols-3">
              <Label htmlFor="maxWidth">Max. width</Label>
              <Input
                id="maxWidth"
                defaultValue="300px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="items-center gap-4 grid grid-cols-3">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="items-center gap-4 grid grid-cols-3">
              <Label htmlFor="maxHeight">Max. height</Label>
              <Input
                id="maxHeight"
                defaultValue="none"
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
