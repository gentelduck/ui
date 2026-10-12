import { Typeset } from '@gentleduck/registry-ui/typeset'

const TAGS = ['react', 'tailwind', 'a11y']

export default function Demo() {
  return (
    <Typeset className="w-full max-w-xl">
      <p>This list is part of the prose, so it gets bullets and indents:</p>
      <ul>
        {TAGS.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <p>
        This one is a component. <code>data-not-typeset</code> keeps prose styles off it and its children:
      </p>
      <ul className="flex gap-2" data-not-typeset="">
        {TAGS.map((tag) => (
          <li className="rounded-full border px-2.5 py-0.5 text-xs" key={tag}>
            {tag}
          </li>
        ))}
      </ul>
    </Typeset>
  )
}
