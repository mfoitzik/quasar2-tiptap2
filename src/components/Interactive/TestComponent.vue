<template>
  <node-view-wrapper>
      <img @click="tclick" src="https://tackleb2b.com/pimages/365197/27/tn_365197275083.jpg" />
  </node-view-wrapper>
</template>

<script lang="ts">
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3'
import { defineComponent } from 'vue'
export default defineComponent({
  components: {
    NodeViewWrapper
  },
  setup(props) {
      const tclick = () => {
          console.log('test')
          console.log(props.extension?.parent)
          // emit('tstemit', 'test')
      }
      return {
          tclick
      }
  }
  ,

  props: nodeViewProps,

})

</script>