// import NativeButton from './duck/button/native'
// import NativeTextarea from './duck/textarea/native'
// import DuckButton from './duck/button/duck'
// import ShadcnButton from './duck/button/button'
// import DuckTextarea from './duck/textarea/duck'
// import ShadcnTextarea from './duck/textarea/textarea'
// import DuckTabs from './duck/tabs/duck'
// import ShadcnTabs from './duck/tabs/tabs'
// import DuckToggleGroup from './duck/toggle-group/duck'
// import ShadcnToggleGroup from './duck/toggle-group/toggle-group'
// import DuckToggle from './duck/toggle/duck'
// import ShadcnToggle from './duck/toggle/toggle'
// import DuckBadge from './duck/badge/duck'
// import ShadcnBadge from './duck/badge/badge'

// import { lazy } from 'react'

// import DuckLabel from './duck/label/duck'
// import ShadcnLabel from './duck/label/label'
// import DuckCheckbox from './duck/checkbox/duck'
// import ShadcnCheckbox from './duck/checkbox/checkbox'
// import DuckSwitch from './duck/switch/duck'
// import ShadcnSwitch from './duck/switch/switch'
import DuckRadioExp from './duck/radio-group/experimental'
import DuckRadioGroup from './duck/radio-group/duck'
import ShadcnRadioGroup from './duck/radio-group/radio-group'
// import DuckInput from './duck/input/duck'
// import ShadcnInput from './duck/input/input'
// import DuckScrollAreaExp from './duck/scroll-area/experimental'
// import DuckScrollArea from './duck/scroll-area/duck'
// import ShadcnScrollArea from './duck/scroll-area/scroll-area'
// import DuckHoverCard from './duck/hover-card/duck'
// import ShadcnHoverCard from './duck/hover-card/hover-card'
// import DuckSlider from './duck/slider/duck'
// import ShadcnSlider from './duck/slider/slider'
// import DuckAccordion from './duck/accordion/duck'
// import ShadcnAccordion from './duck/accordion/accordion'
// import DuckProgress from './duck/progress/duck'
// import ShadcnProgress from './duck/progress/progress'
// import DuckSelect from './duck/select/duck'
// import ShadcnSelect from './duck/select/select'
// import DuckSeparator from './duck/separator/duck'
// import DuckSeparatorExp from './duck/separator/experimental'
// import ShadcnSeparator from './duck/separator/separator'
// import DuckSkeleton from './duck/skeleton/duck'
// import ShadcnSkeleton from './duck/skeleton/skeleton'
// import DuckSheet from './duck/sheet/duck'
// import ShadcnSheet from './duck/sheet/sheet'
// import DuckDrawer from './duck/drawer/duck'
// import ShadcnDrawer from './duck/drawer/drawer'
// import DuckSonner from './duck/sonner/duck'
// import ShadcnSonner from './duck/sonner/sonner'
// function Ui() {
//   return (<>
//     {/* <div className='flex flex-col gap-4 p-4'>
//       <NativeButton />
//       <NativeTextarea />
//     </div> */}

//     {/* <div className='flex flex-col gap-4 p-4'>
//       <DuckButton />
//       <DuckTextarea />
//       <DuckTabs />
//       <DuckToggleGroup />
//       <DuckToggle />
//       <DuckBadge />
//       <DuckLabel />
//       <DuckCheckbox />
//       <DuckSwitch />
//     </div>

//     <div className='flex flex-col gap-4 p-4'>
//       <ShadcnButton />
//       <ShadcnTextarea />
//       <ShadcnTabs />
//       <ShadcnToggleGroup />
//       <ShadcnToggle />
//       <ShadcnBadge />
//       <ShadcnLabel />
//       <ShadcnCheckbox />
//       <ShadcnSwitch />
//     </div> */}
//   </>

//   )
// }

function App() {
  return (
    <div className='flex flex-col mx-10 h-screen justify-center  items-center gap-4'>
      {/* <Ui /> */}
      {/* <DuckSonner /> */}
      <DuckRadioExp />  Experimental
      <DuckRadioGroup  />   radix ui based 
      <ShadcnRadioGroup  />  other 
    </div>
  )
}

export default App
