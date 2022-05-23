/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Extension } from '@tiptap/core'
import '@tiptap/extension-text-style'

type FontBackgroundColorOptions = {
  types: string[],
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontBackgroundColor: {
      /**
       * Set the font size
       */
      setFontBackgroundColor: (fontBackgroundColor: string) => ReturnType,
      /**
       * Unset the font family
       */
      unsetFontBackgroundColor: () => ReturnType,
    }
  }
}

export const FontBackgroundColor = Extension.create<FontBackgroundColorOptions>({
  name: 'fontBackgroundColor',

  defaultOptions: {
    types: ['textStyle'],
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontBackgroundColor: {
            default: null,
            renderHTML: attributes => {
              if (!attributes.fontBackgroundColor || attributes.fontBackgroundColor.fontBackgroundColor == '') {
                return {}
              }
              if(attributes.fontBackgroundColor.fontBackgroundColor) {
                return {
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                  style: `background-color: ${attributes.fontBackgroundColor.fontBackgroundColor}`,
                }
              } else {
                return {
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                  style: `background-color: ${attributes.fontBackgroundColor}`,
                }
              }
            },
            parseHTML: element => ({
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
              fontBackgroundColor: element.style.backgroundColor.replace(/['"]+/g, ''),
            }),
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      setFontBackgroundColor: fontBackgroundColor => ({ chain }) => {
        return chain()
          .setMark('textStyle', { fontBackgroundColor })
          .run()
      },
      unsetFontBackgroundColor: () => ({ chain }) => {
        return chain()
          .setMark('textStyle', { fontBackgroundColor: null })
          .removeEmptyTextStyle()
          .run()
      },
    }
  },
})
