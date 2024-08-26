import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon, CircleIcon } from 'lucide-react'
import { CheckCircledIcon, CrossCircledIcon, QuestionMarkCircledIcon, StopwatchIcon } from '@radix-ui/react-icons'
import { TableContentDataType } from './table'
import { HeaderColumns, PriorityType, StatusType } from '../example/TableMainDemo'

export type TableDataType = {
  task: React.ReactNode | string
  title: React.ReactNode | string
  status: StatusType
  label: React.ReactNode | string
  priority: PriorityType
}

export const tableData: TableContentDataType<HeaderColumns, TableDataType>[] = [
  {
    task: { children: 'TASK-8782' },
    title: {
      children: <p> You can't compress the program without quantifying the open-source SSD pixel! </p>,
      // withLabel: {
      //   type: 'notification',
      //   children: 'Documentation',
      // },
    },
    status: { children: 'In Progress' },
    label: { children: 'Documentation' },
    priority: { children: 'Medium' },
  },
  {
    task: { children: 'TASK-7878' },
    title: { children: 'Try to calculate the EXE feed, maybe it will index the multi-byte pixel!' },
    status: { children: 'Backlog' },
    label: { children: 'Documentation' },
    priority: { children: 'Medium' },
  },
  {
    task: { children: 'TASK-7878' },
    title: { children: 'Try to calculate the EXE feed, maybe it will index the multi-byte pixel!' },
    status: { children: 'Backlog' },
    label: { children: 'Documentation' },
    priority: { children: 'Medium' },
  },
  {
    task: { children: 'TASK-7839' },
    title: { children: 'We need to bypass the neural TCP card!' },
    status: { children: 'Todo' },
    label: { children: 'bug' },
    priority: { children: 'High' },
  },
  {
    task: { children: 'TASK-5562' },
    title: {
      children: 'The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwtaskth!',
    },
    status: { children: 'Backlog' },
    label: { children: 'feature' },
    priority: { children: 'Medium' },
  },
  {
    task: { children: 'TASK-8686' },
    title: { children: "I'll parse the wireless SSL protocol, that should drive the API panel!" },
    status: { children: 'Canceled' },
    label: { children: 'feature' },
    priority: { children: 'Medium' },
  },
  {
    task: { children: 'TASK-1280' },
    title: { children: 'Use the digital TLS panel, then you can transmit the haptic system!' },
    status: { children: 'Done' },
    label: { children: 'bug' },
    priority: { children: 'High' },
  },
  {
    task: { children: 'TASK-7262' },
    title: {
      children: 'The UTF8 application is down, parse the neural bandwtaskth so we can back up the PNG firewall!',
    },
    status: { children: 'Done' },
    label: { children: 'feature' },
    priority: { children: 'High' },
  },
  {
    task: { children: 'TASK-1138' },
    title: { children: "Generating the driver won't do anything, we need to quantify the 1080p SMTP bandwtaskth!" },
    status: { children: 'In Progress' },
    label: { children: 'feature' },
    priority: { children: 'Medium' },
  },
  {
    task: { children: 'TASK-7184' },
    title: { children: 'We need to program the back-end THX pixel!' },
    status: { children: 'Todo' },
    label: { children: 'feature' },
    priority: { children: 'Low' },
  },
  {
    task: { children: 'TASK-5160' },
    title: { children: "Calculating the bus won't do anything, we need to navigate the back-end JSON protocol!" },
    status: { children: 'In Progress' },
    label: { children: 'Documentation' },
    priority: { children: 'High' },
  },
  {
    task: { children: 'TASK-5618' },
    title: { children: "Generating the driver won't do anything, we need to index the online SSL application!" },
    status: { children: 'Done' },
    label: { children: 'Documentation' },
    priority: { children: 'Medium' },
  },
  {
    task: { children: 'TASK-6699' },
    title: { children: "I'll transmit the wireless JBOD capacitor, that should hard drive the SSD feed!" },
    status: { children: 'Backlog' },
    label: { children: 'Documentation' },
    priority: { children: 'Medium' },
  },
  {
    task: { children: 'TASK-2858' },
    title: { children: 'We need to overrtaske the online UDP bus!' },
    status: { children: 'Backlog' },
    label: { children: 'bug' },
    priority: { children: 'Medium' },
  },
  {
    task: { children: 'TASK-9864' },
    title: { children: "I'll reboot the 1080p FTP panel, that should matrix the HEX hard drive!" },
    status: { children: 'Done' },
    label: { children: 'bug' },
    priority: { children: 'High' },
  },
  {
    task: { children: 'TASK-8404' },
    title: { children: 'We need to generate the virtual HEX alarm!' },
    status: { children: 'In Progress' },
    label: { children: 'bug' },
    priority: { children: 'Low' },
  },
  {
    task: { children: 'TASK-5365' },
    title: { children: "Backing up the pixel won't do anything, we need to transmit the primary IB array!" },
    status: { children: 'In Progress' },
    label: { children: 'Documentation' },
    priority: { children: 'Low' },
  },
  {
    task: { children: 'TASK-1780' },
    title: { children: 'The CSS feed is down, index the bluetooth transmitter so we can compress the CLI protocol!' },
    status: { children: 'Todo' },
    label: { children: 'Documentation' },
    priority: { children: 'High' },
  },
  {
    task: { children: 'TASK-6938' },
    title: { children: 'Use the redundant SCSI application, then you can hack the optical alarm!' },
    status: { children: 'Todo' },
    label: { children: 'Documentation' },
    priority: { children: 'High' },
  },
  {
    task: { children: 'TASK-9885' },
    title: { children: 'We need to compress the auxiliary VGA driver!' },
    status: { children: 'Backlog' },
    label: { children: 'bug' },
    priority: { children: 'High' },
  },
  {
    task: { children: 'TASK-3216' },
    title: { children: "Transmitting the transmitter won't do anything, we need to compress the virtual HDD sensor!" },
    status: { children: 'Backlog' },
    label: { children: 'Documentation' },
    priority: { children: 'Medium' },
  },
  {
    task: { children: 'TASK-9285' },
    title: { children: 'The IP monitor is down, copy the haptic alarm so we can generate the HTTP transmitter!' },
    status: { children: 'Todo' },
    label: { children: 'bug' },
    priority: { children: 'High' },
  },
  {
    task: { children: 'TASK-1024' },
    title: {
      children: "Overrtasking the microchip won't do anything, we need to transmit the digital OCR transmitter!",
    },
    status: { children: 'In Progress' },
    label: { children: 'Documentation' },
    priority: { children: 'Low' },
  },
  {
    task: { children: 'TASK-7068' },
    title: { children: "You can't generate the capacitor without indexing the wireless HEX pixel!" },
    status: { children: 'Canceled' },
    label: { children: 'bug' },
    priority: { children: 'Low' },
  },
  {
    task: { children: 'TASK-6502' },
    title: { children: "Navigating the microchip won't do anything, we need to bypass the back-end SQL bus!" },
    status: { children: 'Todo' },
    label: { children: 'bug' },
    priority: { children: 'High' },
  },
  {
    task: { children: 'TASK-5326' },
    title: { children: 'We need to hack the redundant UTF8 transmitter!' },
    status: { children: 'Todo' },
    label: { children: 'bug' },
    priority: { children: 'Low' },
  },
  {
    task: { children: 'TASK-6274' },
    title: { children: 'Use the virtual PCI circuit, then you can parse the bluetooth alarm!' },
    status: { children: 'Canceled' },
    label: { children: 'Documentation' },
    priority: { children: 'Low' },
  },
]

export const labels = [
  {
    value: 'bug',
    label: 'Bug',
  },
  {
    value: 'feature',
    label: 'Feature',
  },
  {
    value: 'Documentation',
    label: 'Documentation',
  },
]

export const statuses = [
  {
    value: 'Backlog',
    label: 'Backlog',
    icon: QuestionMarkCircledIcon,
  },
  {
    value: 'Todo',
    label: 'Todo',
    icon: CircleIcon,
  },
  {
    value: 'In Progress',
    label: 'In Progress',
    icon: StopwatchIcon,
  },
  {
    value: 'Done',
    label: 'Done',
    icon: CheckCircledIcon,
  },
  {
    value: 'Canceled',
    label: 'Canceled',
    icon: CrossCircledIcon,
  },
]

export const priorities = [
  {
    label: 'Low',
    value: 'Low',
    icon: ArrowDownIcon,
  },
  {
    label: 'Medium',
    value: 'Medium',
    icon: ArrowRightIcon,
  },
  {
    label: 'High',
    value: 'High',
    icon: ArrowUpIcon,
  },
]
