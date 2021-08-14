<template>
  
  <node-view-wrapper class="vue-componentx">
    <node-view-content class="content" />
      <div class="iWrapper" ref="iHandle" draggable @mousedown="beginResize"></div><div class="iSpan"><img @click="iClick" :src="iSrc" :style="iStyle" ref="iMain" /></div><button type="button" @click="tbtnx">test</button>
  </node-view-wrapper>
</template>

<script lang="ts">
import { NodeViewWrapper, NodeViewContent, nodeViewProps} from '@tiptap/vue-3'
import { defineComponent, onMounted, ref } from 'vue'


export default defineComponent({
  components: {
    NodeViewWrapper,
    NodeViewContent,
  },
  setup(props) {
    const iSrc = ref('')
    const iStyle = ref('')
    //const fontFamily = ref<SelectItem>({} as SelectItem)
    const iMain = ref<HTMLImageElement>()
    const iHandle =ref<HTMLDivElement>()
    let startX:number, startY:number, startWidth:number, startHeight:number, heightRatio:number, isShift: boolean = false
    
    const tbtn = () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.log(this.node.attrs)
    }

    const beginResize = (e: MouseEvent) => {
      console.log('resize begin: ' + e.clientX.toString())
      const dView = document.defaultView as Window
      
      startX = e.clientX
      startY = e.clientY
      if (iMain.value && document.defaultView){
        startWidth = parseInt(dView.getComputedStyle(iMain.value).width, 10)
        startHeight = parseInt(document.defaultView.getComputedStyle(iMain.value).height, 10)
        heightRatio = startWidth / startHeight
        document.documentElement.addEventListener('mousemove', startResizeDrag, false)
        document.documentElement.addEventListener('mouseup', endResizeDrag, false)
        document.documentElement.addEventListener('keydown', setKey, false)
        document.documentElement.addEventListener('keyup', unsetKey, false)
      }
      
    }

    const setKey = (e: KeyboardEvent) => {
      if (e.shiftKey) {
        isShift = true
      }
    }

    const unsetKey = (e: KeyboardEvent) => {
      if (e.shiftKey) {
        isShift = false
      }
    }

    const startResizeDrag = (e: MouseEvent) => {
      if (iMain.value){
        iMain.value.style.width = (startWidth + e.clientX - startX).toString() + 'px'
        //iMain.value.style.height = (startHeight + e.clientY - startY).toString() + 'px'
        if (isShift == false) {
          iMain.value.style.height = ((startWidth + e.clientX - startX) / heightRatio).toString() + 'px'
        } else {
          iMain.value.style.height = (startHeight + e.clientY - startY).toString() + 'px'
        }
       
        const tBound = iMain.value.getBoundingClientRect()
        const hBound = iHandle.value.getBoundingClientRect()
        iHandle.value.style.left = (tBound.right - (hBound.width / 2)).toString() + 'px'
        iHandle.value.style.top = (tBound.bottom - (hBound.height / 2)).toString() + 'px'
      }
      
    }

    const endResizeDrag = () => {
      document.documentElement.removeEventListener('mousemove', startResizeDrag, false)  
      document.documentElement.removeEventListener('mouseup', endResizeDrag, false)
    }

    const iClick = () => {
      const tBound = iMain.value.getBoundingClientRect()
      // console.log(tBound.width)
      // console.log(tBound.bottom)
      // console.log(tBound.right)
      // console.log(iHandle.value.style)
      const hBound = iHandle.value.getBoundingClientRect()
      iHandle.value.style.left = (tBound.right - (hBound.width / 2)).toString() + 'px'
      iHandle.value.style.top = (tBound.bottom - (hBound.height / 2)).toString() + 'px'
    }

    onMounted(() => {
      console.log('Component is mounted!')
      console.log(props.node.attrs)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      iSrc.value = props.node.attrs.src
      // props.updateAttributes({
      //   src: 
      // })
      //const tBound = iMain.value.getBoundingClientRect()
      console.log('LINE 39')
      console.log(iMain.value.src)
    })

    return { tbtn, iSrc, iStyle, iMain, iHandle, iClick, beginResize}
  },
  methods: {
    tbtnx() {
      console.log(this.iMain.src)
    },
    tbtny() {
      console.log(this.node.attrs.mike)
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
  display: none;
}
.content:hover {

  color:red;
}

.vue-componentx {
  border: none;
  display: inline-block;
  padding: 0;
  
}
.iWrapper {
  display:inline-block;
  background-color: red;
  height:10px;
  width: 10px;
  position:fixed;
  cursor:nwse-resize;
}

.iSpan {
  display:inline-flex;
  flex-grow:1;
  border:1px solid red;
}
</style>