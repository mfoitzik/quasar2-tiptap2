import { Extension } from '@tiptap/core'
import '@tiptap/extension-text-style'

type FontColorOptions = {
  types: string[],
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontColor: {
      /**
       * Set the font size
       */
      setFontColor: (fontColor: string) => ReturnType,
      /**
       * Unset the font family
       */
      unsetFontColor: () => ReturnType,
    }
  }
}

export const FontColor = Extension.create<FontColorOptions>({
  name: 'fontColor',

  defaultOptions: {
    types: ['textStyle'],
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontColor: {
            default: null,
            renderHTML: attributes => {
              if (!attributes.fontColor) {
                return {}
              }

              return {
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                style: `color: ${attributes.fontColor}`,
              }
            },
            parseHTML: element => ({
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
              fontColor: element.style.color.replace(/['"]+/g, ''),
            }),
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      setFontColor: fontColor => ({ chain }) => {
        return chain()
          .setMark('textStyle', { fontColor })
          .run()
      },
      unsetFontColor: () => ({ chain }) => {
        return chain()
          .setMark('textStyle', { fontColor: null })
          .removeEmptyTextStyle()
          .run()
      },
    }
  },
})
