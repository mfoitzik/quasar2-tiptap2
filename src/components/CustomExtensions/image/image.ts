import {
  Node,
  nodeInputRule,
  mergeAttributes,
} from '@tiptap/core'

export interface ImageOptions {
  inline: boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  HTMLAttributes: Record<string, any>,
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    image: {
      /**
       * Add an image
       */
      setImage: (options: { src: string, alt?: string, title?: string, style?: string }) => ReturnType,
    }
  }
}

export const inputRegex = /!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/

export const Image = Node.create<ImageOptions>({
  name: 'image',

  defaultOptions: {
    inline: true,
    HTMLAttributes: {},
  },

  inline() {
    return this.options.inline
  },

  group() {
    return this.options.inline ? 'inline' : 'block'
  },

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      style: {
        default: null,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'img',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
  },

  addCommands() {
    return {
      setImage: options => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: options,
        })
      },
    }
  },

  addInputRules() {
    return [
      nodeInputRule(inputRegex, this.type, match => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const [, alt, src, title, style] = match

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        return { src, alt, title, style }
      }),
    ]
  },
})
