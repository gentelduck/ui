import { Typeset } from '@gentleduck/registry-ui/typeset'

export default function Demo() {
  return (
    <Typeset className="w-full max-w-xl">
      <h2>Ship the source, not a black box</h2>
      <p>
        Every component lands in your repo as plain files. Read them, change them, and commit them like the rest of your
        code. Run <code>duck add button</code> to try it.
      </p>
      <h3>What you get</h3>
      <ul>
        <li>Accessible primitives with keyboard support built in</li>
        <li>
          Variants written with <code>cva()</code>
        </li>
        <li>Theme tokens in CSS variables, with dark mode included</li>
      </ul>
      <blockquote>Own the code, and upgrades become a diff you can read.</blockquote>
      <pre>
        <code>{`import { Button } from '@/components/ui/button'

export function Save() {
  return <Button>Save</Button>
}`}</code>
      </pre>
      <table>
        <thead>
          <tr>
            <th>Package</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>@gentleduck/primitives</code>
            </td>
            <td>Headless behavior</td>
          </tr>
          <tr>
            <td>
              <code>@gentleduck/registry-ui</code>
            </td>
            <td>Styled components</td>
          </tr>
        </tbody>
      </table>
      <p>
        Read the <a href="#installation">installation guide</a> to set up your project.
      </p>
    </Typeset>
  )
}
