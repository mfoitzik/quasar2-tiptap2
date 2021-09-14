import { Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import Component from './Component.vue'

export default Node.create({
  name: 'image',

  group: 'block',

  content: 'inline*',

  addAttributes() {
    return {
      src: {
        default: null
      },
      alt: {
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
    console.log('I AM INSIDE EXTENSION')
    console.log(HTMLAttributes)
    return ['img', HTMLAttributes, 0]
  },

  addNodeView() {
    return VueNodeViewRenderer(Component)
  },
})