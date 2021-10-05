<template>
  <node-view-wrapper>
      <img src="https://tackleb2b.com/pimages/365197/27/tn_365197275083.jpg" />
  </node-view-wrapper>
</template>

<script>
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3'

export default {
  components: {
    NodeViewWrapper,
  },
  mounted() {
      console.log('I AM MOUNTED')
      // console.log(props)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      // this.props.nodeViewProps.src = '123'
  },

  props: nodeViewProps,

}
</script>