import { Extension } from '@tiptap/core'
import '@tiptap/extension-text-style'

type FontSizeOptions = {
  types: string[],
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      /**
       * Set the font size
       */
      setFontSize: (fontSize: string) => ReturnType,
      /**
       * Unset the font family
       */
      unsetFontSize: () => ReturnType,
    }
  }
}

export const FontSize = Extension.create<FontSizeOptions>({
  name: 'fontSize',

  defaultOptions: {
    types: ['textStyle'],
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            renderHTML: attributes => {
              if (!attributes.fontSize) {
                return {}
              }

              return {
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                style: `font-size: ${attributes.fontSize}`,
              }
            },
            parseHTML: element => ({
              fontSize: element.style.fontSize.replace(/['"]+/g, ''),
            }),
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      setFontSize: fontSize => ({ chain }) => {
        return chain()
          .setMark('textStyle', { fontSize })
          .run()
      },
      unsetFontSize: () => ({ chain }) => {
        return chain()
          .setMark('textStyle', { fontSize: null })
          .removeEmptyTextStyle()
          .run()
      },
    }
  },
})
