import { Typeset } from '@gentleduck/registry-ui/typeset'

const SIZES = ['sm', 'default', 'lg'] as const

export default function Demo() {
  return (
    <div className="grid w-full max-w-xl gap-8">
      {SIZES.map((size) => (
        <section className="grid gap-2" key={size}>
          <span className="font-mono text-muted-foreground text-xs">size="{size}"</span>
          <Typeset size={size}>
            <h3>Release notes</h3>
            <p>
              The calendar now supports range selection. Pass <code>mode="range"</code> to turn it on.
            </p>
          </Typeset>
        </section>
      ))}
    </div>
  )
}
