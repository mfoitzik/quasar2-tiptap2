import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import testComponent from './TestComponent.vue'

export default Node.create({
  name: 'testComponent',

  group: 'block',

  atom: false,
  selectable: true,

//   addAttributes() {
//     return {
//       count: {
//         default: 0,
//       },
//     }
//   },

  parseHTML() {
    return [
      {
        tag: 'test-component',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['a', mergeAttributes({href:'test.html'}), ['img', mergeAttributes(HTMLAttributes)]]
  },

  addNodeView() {
    return VueNodeViewRenderer(testComponent)
  },
})