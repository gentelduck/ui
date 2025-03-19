import { cn } from '@gentelduck/cn/cn'
export function App() {
  return <div className={cn('pl-4 pr-4 pt-4 pb-4')}>hello world</div>
}




/*
 *                              [old_cls]       [new_cls]
 *                                |              |    
 * vite_dev: <div className={cn("pl-4 pr-4", "pt-4 pb-4")}>hello world</div>
 *
 * vite_res: <div class="pl-4 pr-4 pt-4 pb-4">hello world</div>
 */

