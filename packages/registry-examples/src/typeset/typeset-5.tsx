import { Typeset } from '@gentleduck/registry-ui/typeset'

export default function Demo() {
  return (
    <Typeset className="w-full max-w-xl [--typeset-flow:1.75em] [--typeset-font-heading:ui-serif,Georgia,serif] [--typeset-leading:1.9]">
      <h2>A slower read</h2>
      <p>
        Set the typeset variables on the container to change the rhythm. Here the blocks have more room and the headings
        use a serif.
      </p>
      <p>Everything else, from heading sizes to list indents, follows from those values.</p>
    </Typeset>
  )
}
