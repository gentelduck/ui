import fs from 'fs'
import path from 'path'
import { UnistNode, UnistTree } from 'types/unist'
import { u } from 'unist-builder'
import { visit } from 'unist-util-visit'

import { Index } from '../__ui_registry__'
import { styles } from '../registry/styles'

export function rehypeComponent() {
  return async (tree: UnistTree) => {
    visit(tree, (node: UnistNode) => {
      // src prop overrides both name and fileName.
      const { value: srcPath } =
        (getNodeAttributeByName(node, 'src') as {
          name: string
          value?: string
          type?: string
        }) || {}

      if (node.name === 'ComponentSource') {
        const name = getNodeAttributeByName(node, 'name')?.value as string
        const fileName = getNodeAttributeByName(node, 'fileName')?.value as string | undefined

        if (!name && !srcPath) {
          return null
        }

        try {
          const component = Index[`${name}`]
          const files = component.files[0]
          let items: ItemType[] = get_component_source(files)

          // console.log(src)
          // Add code as children so that rehype can take over at build time.

          node.children?.push(
            ...items.map(
              item =>
                u('element', {
                  tagName: 'pre',
                  properties: {
                    __src__: item.src,
                  },
                  children: [
                    u('element', {
                      tagName: 'code',
                      properties: {
                        className: ['language-tsx'],
                        title: srcPath,
                      },
                      children: [
                        {
                          type: 'text',
                          value: item.src,
                        },
                      ],
                    }),
                  ],
                }) as UnistNode
            )
          )
        } catch (error) {
          console.error(error)
        }
      }

      // if (node.name === 'ComponentPreview') {
      //   const name = getNodeAttributeByName(node, 'name')?.value as string
      //
      //   if (!name) {
      //     return null
      //   }
      //
      //   try {
      //     const component = Index[`${name}`]
      //     const src = component.files[0][0].path
      //
      //     // Read the source file.
      //     const filePath = path.join(process.cwd(), 'registry', src)
      //     let source = fs.readFileSync(filePath, 'utf8')
      //
      //     // Replace imports.
      //     // TODO: Use @swc/core and a visitor to replace this.
      //     // For now a simple regex should do.
      //     source = source.replaceAll(`@/registry/`, '@/components/')
      //     source = source.replaceAll('export default', 'export')
      //
      //     // Add code as children so that rehype can take over at build time.
      //     node.children?.push(
      //       u('element', {
      //         tagName: 'pre',
      //         properties: {
      //           __src__: src,
      //         },
      //         children: [
      //           u('element', {
      //             tagName: 'code',
      //             properties: {
      //               className: ['language-tsx'],
      //             },
      //             children: [
      //               {
      //                 type: 'text',
      //                 value: source,
      //               },
      //             ],
      //           }),
      //         ],
      //       })
      //     )
      //   } catch (error) {
      //     console.error(error)
      //   }
      // }

      // if (node.name === "ComponentExample") {
      //   const source = getComponentSourceFileContent(node)
      //   if (!source) {
      //     return
      //   }

      //   // Replace the Example component with a pre element.
      //   node.children?.push(
      //     u("element", {
      //       tagName: "pre",
      //       properties: {
      //         __src__: src,
      //       },
      //       children: [
      //         u("element", {
      //           tagName: "code",
      //           properties: {
      //             className: ["language-tsx"],
      //           },
      //           children: [
      //             {
      //               type: "text",
      //               value: source,
      //             },
      //           ],
      //         }),
      //       ],
      //     })
      //   )

      //   const extractClassname = getNodeAttributeByName(
      //     node,
      //     "extractClassname"
      //   )
      //   if (
      //     extractClassname &&
      //     typeof extractClassname.value !== "undefined" &&
      //     extractClassname.value !== "false"
      //   ) {
      //     // Extract className from string
      //     // TODO: Use @swc/core and a visitor to extract this.
      //     // For now, a simple regex should do.
      //     const values = source.match(/className="(.*)"/)
      //     const className = values ? values[1] : ""

      //     // Add the className as a jsx prop so we can pass it to the copy button.
      //     node.attributes?.push({
      //       name: "extractedClassNames",
      //       type: "mdxJsxAttribute",
      //       value: className,
      //     })

      //     // Add a pre element with the className only.
      //     node.children?.push(
      //       u("element", {
      //         tagName: "pre",
      //         properties: {},
      //         children: [
      //           u("element", {
      //             tagName: "code",
      //             properties: {
      //               className: ["language-tsx"],
      //             },
      //             children: [
      //               {
      //                 type: "text",
      //                 value: className,
      //               },
      //             ],
      //           }),
      //         ],
      //       })
      //     )
      //   }
      // }

      // if (node.name === "ComponentSource") {
      //   const source = getComponentSourceFileContent(node)
      //   if (!source) {
      //     return
      //   }

      //   // Replace the Source component with a pre element.
      //   node.children?.push(
      //     u("element", {
      //       tagName: "pre",
      //       properties: {
      //         __src__: src,
      //       },
      //       children: [
      //         u("element", {
      //           tagName: "code",
      //           properties: {
      //             className: ["language-tsx"],
      //           },
      //           children: [
      //             {
      //               type: "text",
      //               value: source,
      //             },
      //           ],
      //         }),
      //       ],
      //     })
      //   )
      // }
    })
  }
}

function getNodeAttributeByName(node: UnistNode, name: string) {
  return node.attributes?.find(attribute => attribute.name === name)
}

type ItemType = { name: string; type: string; src: string }
function get_component_source(files: { type: string; path: string }[]) {
  let item: ItemType[] = []
  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(process.cwd(), 'registry', files[i].path)
    let source = `// ${files[i].path.split('/').splice(1).join('/')}\n`
    try {
      source += fs.readFileSync(filePath, 'utf8')

      // Replace imports.
      // TODO: Use @swc/core and a visitor to replace this.
      // For now a simple regex should do.
      source = source.replaceAll(`@/registry/`, '@/components/')
      source = source.replaceAll('export default', 'export')
      item.push({ name: files[i].path.split('/')?.pop() ?? 'file', type: files[i].type, src: source })
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error)
    }
  }
  return item
}
