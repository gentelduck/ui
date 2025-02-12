import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/registry/registry-ui-components/accordion'
import { Plus } from 'lucide-react'

export default function Accordion1Demo() {
  return (
    <Accordion
      type="multiple"
      className="w-full"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger
          className="hover:no-underline"
          icon={{ children: Plus, className: '!size-[20px]' }}
        >
          Is it accessible?
        </AccordionTrigger>
        <AccordionContent>
          Yes. This accordion is built following the WAI-ARIA design patterns to ensure accessibility for users with
          disabilities. Each trigger is keyboard-navigable, and the content is properly associated with its trigger for
          screen readers. This makes it usable across a wide range of devices and assistive technologies.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger
          className="hover:no-underline"
          icon={{ children: Plus, className: '!size-[20px]' }}
        >
          Is it styled?
        </AccordionTrigger>
        <AccordionContent>
          Yes. The accordion comes with a modern and clean default styling that seamlessly integrates with other UI
          components in the registry. You can also customize the styles with utility classes or by overriding the
          default class names, ensuring it matches the aesthetic of your application.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger
          className="hover:no-underline"
          icon={{ children: Plus, className: '!size-[20px]' }}
        >
          Is it animated?
        </AccordionTrigger>
        <AccordionContent>
          Yes. By default, the accordion includes smooth and responsive animations for expanding and collapsing content.
          These animations provide a visually appealing user experience, while also making the state transitions more
          intuitive. If you prefer, the animations can be disabled or replaced with your own custom effects.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger
          className="hover:no-underline"
          icon={{ children: Plus, className: '!size-[20px]' }}
        >
          How customizable is it?
        </AccordionTrigger>
        <AccordionContent>
          The accordion is highly customizable. You can modify its behavior, appearance, and animations through props,
          custom styles, and utility classes. Whether you need to adjust the spacing, colors, or even change the way it
          functions, the accordion is designed to be flexible and adaptable to your project's needs.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger
          className="hover:no-underline"
          icon={{ children: Plus, className: '!size-[20px]' }}
        >
          What are some use cases for this component?
        </AccordionTrigger>
        <AccordionContent>
          Accordions are versatile and can be used in a variety of scenarios, such as:
          <ul className="list-disc ml-5 mt-2">
            <li>FAQ sections to organize questions and answers.</li>
            <li>Collapsible menus or sub-menus in navigation systems.</li>
            <li>Displaying content-heavy sections in a compact way, such as product details or documentation.</li>
            <li>Interactive forms where users can expand and fill sections as needed.</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
