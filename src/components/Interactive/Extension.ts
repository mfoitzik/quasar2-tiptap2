import { Node } from '@tiptap/core'
import { VueNodeViewRenderer, mergeAttributes } from '@tiptap/vue-3'
import Component from './Component.vue'

export default Node.create({
  name: 'image',

  group: 'inline',

  content: 'inline*',
  inline: true,
  draggable: true,

  // addAttributes() {
  //   return {
  //     src: {
  //       default: null
  //     },
  //     alt: {
  //       default: null
  //     }
  //   }
  // },

  parseHTML() {
    return [
      {
        tag: 'img'
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['img', mergeAttributes(HTMLAttributes), 0]
  },

  addNodeView() {
    return VueNodeViewRenderer(Component)
  },
})