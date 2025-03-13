import { defineConfig, s } from 'velite'
// import { docs } from '~/velite-configs'

import { getHighlighter, loadTheme } from '@shikijs/compat'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
// @ts-ignore
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import { codeImport } from 'remark-code-import'
import remarkGfm from 'remark-gfm'
import { Pluggable, PluggableList, Plugin } from 'unified'
import { rehypeNpmCommand } from './lib/rehype-npm-command'
import { UnistNode, UnistTree } from './types/unist'
import {
  metadataPlugin,
  rehypeComponent,
  rehypeExtractTitle,
  rehypePreBlockSource,
} from './velite-configs/plugins'
import { Nodes } from 'hast'

// `s` is extended from Zod with some custom schemas,
// you can also import re-exported `z` from `velite` if you don't need these extension schemas.

// rehypeExtractTitle.js
// ! FIX: type error
const config = defineConfig({
  collections: {
    docs: {
      name: 'Docs',
      pattern: 'docs/**/*.mdx',
      schema: s
        .object({
          title: s.string().max(99),
          metadata: s.metadata(),
          description: s.string(),
          links: s.object({ doc: s.string(), api: s.string() }).optional(),
          excerpt: s.excerpt(),
          content: s.markdown(),
          body: s.mdx(),
          toc: s.toc(),
        })
        //NOTE:: more additional fields (computed fields)
        .transform((data, { path, meta }) => ({
          ...data,
          slug: `${meta.path.split('/').slice(-3, -1).join('/')}/${meta.path.split('/').pop()?.replace('.mdx', '')}`,
          permalink: `${meta.path.split('/').slice(-2, -1).join('/')}/${meta.path.split('/').pop()?.replace('.mdx', '')}`,
          sourceFilePath: path,
          sourceFileName: meta.path.split('/').pop(),
          sourceFileDir: meta.path.split('/').slice(-3, -1).join('/'),
          contentType: meta.path.split('.').pop(),
          flattenedPath: meta.path
            .split('/')
            .slice(-2, -1)
            .join('/')
            .replace(/\.mdx$/, ''),
        })),
    },
  },
  mdx: {
    remarkPlugins: [remarkGfm, codeImport],

    rehypePlugins: [
      rehypeSlug,
      rehypeComponent,
      rehypeExtractTitle,
      metadataPlugin,
      [
        rehypePrettyCode,
        {
          theme: {
            dark: 'catppuccin-mocha',
            light: 'catppuccin-latte',
          },
          getHighlighter,
          onVisitLine(node: UnistNode) {
            // console.log(node)
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children?.length === 0) {
              node.children = [{ type: 'text', value: ' ' }]
            }
          },
          onVisitHighlightedLine(node: UnistNode): void {
            // @ts-ignore
            node?.properties?.className.push('line--highlighted')
          },
          onVisitHighlightedWord(node: UnistNode): void {
            // @ts-ignore
            node?.properties?.className.push('word--highlighted')
          },
        },
      ],
      rehypePreBlockSource,

      () =>
        (tree: UnistTree): UnistTree => {
          tree.children.map((node: UnistNode) => {
            // console.dir(node, { depth: 7 })
          })
          return tree
        },
      rehypeNpmCommand,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['subheading-anchor'],
            ariaLabel: 'Link to section',
          },
        },
      ],
    ] as PluggableList,
  },
}) as any

export default config
