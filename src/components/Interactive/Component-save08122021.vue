<template>
  
  <node-view-wrapper class="vue-component">
    <span class="label" contenteditable="false">Vue Component</span>
    
    <node-view-content class="content" /><button type="button" @click="tbtnx">test</button><button type="button" @click="tbtny">test2</button>
  </node-view-wrapper>
</template>

<script>
import { NodeViewWrapper, NodeViewContent, nodeViewProps} from '@tiptap/vue-3'
import { defineComponent } from 'vue'


export default defineComponent({
  components: {
    NodeViewWrapper,
    NodeViewContent,
  },
  setup() {
    const tbtn = () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      // console.log(this.node.attrs)
    }

    return { tbtn}
  },
  methods: {
    tbtnx() {
      this.updateAttributes({mike: '123'})
    },
    tbtny() {
      // console.log(this.node.attrs.mike)
    }
  },
  props: nodeViewProps,
})
</script>

<style lang="scss">
.vue-component {
  background: #FAF594;
  border: 3px solid #0D0D0D;
  border-radius: 0.5rem;
  margin: 1rem 0;
  position: relative;
}

.label {
  margin-left: 1rem;
  background-color: #0D0D0D;
  font-size: 0.6rem;
  letter-spacing: 1px;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
  position: absolute;
  top: 0;
  padding: 0.25rem 0.75rem;
  border-radius: 0 0 0.5rem 0.5rem;
}

.content {
  margin: 2.5rem 1rem 1rem;
  padding: 0.5rem;
  border: 2px dashed #0D0D0D20;
  border-radius: 0.5rem;
}
.content:hover {

  color:red;
}
</style>