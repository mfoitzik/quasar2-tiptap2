import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import Component from './Component.vue'

export default Node.create({
  name: 'image',

  group: 'block',

  content: 'inline*',

  addAttributes() {
    return {
      mike: {
        default: 'X',
      },
      src: {
        default: null
      },
      style: {
        default: null
      }
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
    return ['div', mergeAttributes(HTMLAttributes), 0]
  },

  addNodeView() {
    return VueNodeViewRenderer(Component)
  },
})