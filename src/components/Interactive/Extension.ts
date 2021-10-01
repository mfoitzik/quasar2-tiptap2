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
    console.log('I AM RENDERING AT LINE 34+++++++++++++++++++++++++++++++++++++++++++++++')
    console.log(this.options.att)
    const xb = this.options as Record<string, unknown>
    console.log(xb.HTMLAttributes)
    
    console.log(HTMLAttributes)
    return ['img', mergeAttributes(HTMLAttributes), 0]
  },

  addNodeView() {
    return VueNodeViewRenderer(Component)
  },
})