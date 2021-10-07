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
    console.log()
    return [
      {
        tag: 'img'
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    console.log('LINE 34)))))))))))))))))))))))')
    // console.log(HTMLAttributes['href'])
    console.log(this.parent)
    return ['img', mergeAttributes(HTMLAttributes), 0]
  },
  
  addNodeView() {
    return VueNodeViewRenderer(Component)
  },
})