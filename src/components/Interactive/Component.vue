<template>
  
  <node-view-wrapper as="p" class="vue-componentx">
    <node-view-content class="content" />
      <div class="iSettings" ref="iSettings" @mousedown = "iStop" @click="showSettings"><q-icon name="settings" class="iSettingsIcon" /></div>
      <div class="iHandle" ref="iHandle" @mousedown="beginResize"></div>
      <div class="iSpan" ref="iWrapper"><img @mousedown = "iStop" @click="iClick" :src="imageSrc" :style="iStyle" :alt="iAlt" ref="iMain" /></div>
      <image-dialog ref="iDialog" :pattributes="outAttributes" :mode="imageDialogMode" />
  </node-view-wrapper>
</template>

<script lang="ts">
import { NodeViewWrapper, NodeViewContent, nodeViewProps} from '@tiptap/vue-3'
import { defineComponent, onMounted, ref } from 'vue'
import imageDialog from '../ImageDialog/ImageDialog.vue'

export default defineComponent({
  components: {
    NodeViewWrapper,
    NodeViewContent,
    imageDialog
  },
  setup(props) {
    interface imageDialog {
        showDialog: () => void
    }
    const iDialog = ref<imageDialog>()
    const iStyle = ref('')
    const iAlt = ref('')
    const imageSelection = ref([])
    const outAttributes = ref([])
    const imageDialogMode = ref('')
    //const fontFamily = ref<SelectItem>({} as SelectItem)
    const iMain = ref<HTMLImageElement>()
    const iHandle =ref<HTMLDivElement>()
    const iWrapper = ref<HTMLDivElement>()
    const iSettings = ref<HTMLDivElement>()
    const sliders = ref(false)
    const imageConstrainProportions = ref(true)
    const imageSrc = ref('')
    const imageAlt = ref('')
    const imageHeight = ref('')
    const imageWidth = ref('')
    const imageBorderWidth = ref('')
    const imageBorderWidthNumber = ref(1)
    const imageBorderWidthUOM = ref('')
    const imageBorderStyle = ref('none')
    const imageBorderColor = ref('#FB67DD88')
    const imageBorderRadius = ref('')
    const imageFloat = ref('')
    const imageBoxShadow = ref('')
    const imagePadding = ref('')
    const imageMargin = ref('')
    const shadowOn = ref('off')
    const imageBorderRadiusUOM = ref('')
    const imageBorderRadiusNumber = ref('')

    const imageShadowHOffset = ref('')
    const imageShadowHOffsetUOM = ref('')
    const imageShadowHOffsetNumber = ref('')

    const imageShadowVOffset = ref('')
    const imageShadowVOffsetUOM = ref('')
    const imageShadowVOffsetNumber = ref('')

    const imageShadowBlur = ref('')
    const imageShadowBlurUOM = ref('')
    const imageShadowBlurNumber = ref('')

    const imageShadowSpread = ref('')
    const imageShadowSpreadUOM = ref('')
    const imageShadowSpreadNumber = ref('')
    const imageBorderStyleSelections = [
        'none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'
      ]
    const imageUOMSelections = [
        'px', '%', 'em', 'rem', 'pc', 'pt'
      ]

    const slide = ref(1)
    const slideVol = ref(39)
    const slideAlarm = ref(56)
    const slideVibration = ref(63)
    const imageSelector = ref(false)
    let startX:number, startY:number, startWidth:number, startHeight:number, heightRatio:number, isShift = false
    
    const tbtn = () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.log('TEST TEST 312')
      // console.log(this.node.attrs)
    }
    const updateStyle = () => {
      console.log('border:' + imageBorderWidth.value + ' ' + imageBorderStyle.value + ' ' + imageBorderColor.value)
      iStyle.value='border:' + imageBorderWidth.value + ' ' + imageBorderStyle.value + ' ' + imageBorderColor.value
    }
    const setBorderStyle = () => {
      console.log(iStyle.value)
      iStyle.value='width:1000px'
    }

    const imageBorderChange = (value: string) => {
      imageBorderWidth.value = value + imageBorderWidthUOM.value
      updateStyle()
    }

    const imageBorderRadiusChange = (value: string) => {
      imageBorderRadius.value = value + imageBorderRadiusUOM.value
    }

    const imageShadowHOffsetChange = (value: string) => {
      imageShadowHOffset.value = value + imageShadowHOffsetUOM.value
    }

    const imageShadowVOffsetChange = (value: string) => {
      imageShadowVOffset.value = value + imageShadowVOffsetUOM.value
    }

    const imageShadowBlurChange = (value: string) => {
      imageShadowBlur.value = value + imageShadowBlurUOM.value
    }

    const imageShadowSpreadChange = (value: string) => {
      imageShadowSpread.value = value + imageShadowSpreadUOM.value
    }

    const beginResize = (e: MouseEvent) => {
      e.stopPropagation()
      e.preventDefault()
      console.log('resize begin: ' + isShift.toString())
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
      console.log('key own')
      if (e.shiftKey) {
        isShift = true
      }
    }

    const unsetKey = (e: KeyboardEvent) => {
      console.log('KEY UP')
      console.log(e)
      if (e.key.toUpperCase() == 'SHIFT') {
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
        if (iHandle.value && iSettings.value) {
          const hBound = iHandle.value.getBoundingClientRect()
          iHandle.value.style.left = (tBound.right - (hBound.width / 2)).toString() + 'px'
          iHandle.value.style.top = (tBound.bottom - (hBound.height / 2)).toString() + 'px'
          const sBound = iSettings.value.getBoundingClientRect()
          iSettings.value.style.left = (tBound.right - sBound.width).toString() + 'px'
          iSettings.value.style.top = (tBound.top).toString() + 'px'
        }
        
      }
      
    }

    const endResizeDrag = () => {
      document.documentElement.removeEventListener('mousemove', startResizeDrag, false)  
      document.documentElement.removeEventListener('mouseup', endResizeDrag, false)
    }

    const iClick = (e: MouseEvent) => {
      // iStyle.value = ''
      e.stopPropagation()
      iHandle.value?.classList.add('iHandleShow')
      iWrapper.value?.classList.add('iSpanBorder')
      iSettings.value?.classList.add('iSettingsShow')
      if (iHandle.value && iSettings.value && iMain.value) {
        const tBound = iMain.value.getBoundingClientRect()
        // console.log(tBound.bottom)
        // console.log(tBound.right)
        // console.log(iHandle.value.style) -- border:4px solid red;
        const hBound = iHandle.value.getBoundingClientRect()
        const sBound = iSettings.value.getBoundingClientRect()
        iHandle.value.style.left = (tBound.right - (hBound.width / 2)).toString() + 'px'
        iHandle.value.style.top = (tBound.bottom - (hBound.height / 2)).toString() + 'px'
        iSettings.value.style.left = (tBound.right - sBound.width).toString() + 'px'
        iSettings.value.style.top = (tBound.top).toString() + 'px'
        // console.log(tBound.width)
      }
      
    }

    const iStop = (e:MouseEvent) => {
      e.stopPropagation()
    }
    const parseBoxShadow = (inCss: string) => {
      const cleanedInput = inCss.replace(/, /g,',').split(' ')
      const outArray = []
      if (cleanedInput.length > 0) {
        for (let i = 0; i < cleanedInput.length; i++) {
          
        }
      }
      return cleanedInput
    }
    const showSettings = () => {
      // console.log('show settings')
      // sliders.value = true
      if (iMain.value) {
        console.log(iMain.value.src)
        console.log(iMain.value.alt)
        console.log(iMain.value.style.width)
        console.log(iMain.value.style.height)
        console.log(iMain.value.style.borderStyle)
        console.log(iMain.value.style.borderColor)
        console.log(iMain.value.style.borderWidth)
        console.log(iMain.value.style.borderRadius)
        const getShadowComponents: string[] = parseBoxShadow(iMain.value.style.boxShadow)
        if (getShadowComponents[0]) {

        }
        console.log(iMain.value.style.boxShadow.replace(/, /g,','))
      }
      
      if (iDialog.value){
        iDialog.value.showDialog()
      }

    }
    const tbtnx = () => {
      // console.log(this.iMain.src)
      sliders.value = true
      // iStyle.value = 'border:4px solid red;'
    }
    onMounted(() => {
      console.log('Component is mounted!')
      console.log(props?.node?.attrs)
      console.log('AFTER Component is mounted!')
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      imageSrc.value = props?.node?.attrs.src
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      iAlt.value = props?.node?.attrs.alt
      
      console.log('I AM GOING TO SET STYLE')
      console.log(props?.node?.attrs.style)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      iStyle.value = props?.node?.attrs.style
      // props.updateAttributes({
      //   src: 
      // })
      //const tBound = iMain.value.getBoundingClientRect()
      console.log('LINE 39')
      console.log(iMain?.value?.src)
      document.documentElement.addEventListener('mousedown', function(event){
        iHandle.value?.classList.remove('iHandleShow')
        iWrapper.value?.classList.remove('iSpanBorder')
        iSettings.value?.classList.remove('iSettingsShow')
        console.log(event)
        }, false)
      const getEditor = window.document.getElementsByClassName('ProseMirror')[0]
      if(getEditor){
        getEditor.addEventListener('scroll', function(){
          if (iMain.value && iHandle.value && iSettings.value){
            const tBound = iMain.value.getBoundingClientRect()
            const hBound = iHandle.value.getBoundingClientRect()
            iHandle.value.style.left = (tBound.right - (hBound.width / 2)).toString() + 'px'
            iHandle.value.style.top = (tBound.bottom - (hBound.height / 2)).toString() + 'px'
            const sBound = iSettings.value.getBoundingClientRect()
            iSettings.value.style.left = (tBound.right - sBound.width).toString() + 'px'
            iSettings.value.style.top = (tBound.top).toString() + 'px'
          }
        }, false)
      }
      
    })

    return { tbtn, tbtnx, iStyle, iMain, iHandle, imageSrc, iWrapper, iSettings, iClick, iStop, beginResize, showSettings,
      sliders,

      slide,
      slideVol,
      slideAlarm,
      slideVibration,
      imageAlt,
      imageHeight,
      imageWidth,
      imageBorderWidth,
      imageBorderWidthNumber,
      imageBorderStyle,
      imageBorderColor,
      imageBorderRadius,
      imageFloat,
      imageBoxShadow,
      imagePadding,
      imageMargin,
      imageConstrainProportions,
      imageBorderWidthUOM,
      imageBorderStyleSelections,
      shadowOn,
      imageUOMSelections,
      imageBorderChange,
      imageBorderRadiusUOM,
      imageBorderRadiusNumber,
      imageBorderRadiusChange,
      imageShadowHOffset,
      imageShadowHOffsetUOM,
      imageShadowHOffsetNumber,
      imageShadowHOffsetChange,
      imageShadowVOffset,
      imageShadowVOffsetUOM,
      imageShadowVOffsetNumber,
      imageShadowVOffsetChange,
      imageShadowBlur,
      imageShadowBlurUOM,
      imageShadowBlurNumber,
      imageShadowBlurChange,
      imageShadowSpread,
      imageShadowSpreadUOM,
      imageShadowSpreadNumber,
      imageShadowSpreadChange,
      setBorderStyle,
      imageSelector,
      iAlt,
      iDialog,
      imageSelection,
      outAttributes,
      imageDialogMode
      }
  },
  methods: {
    
    tbtny() {
      if (this.node) {
        console.log(this.node.attrs.mike)
      }
      
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
.iHandle {
  display:none;
  background-color: #1B749D;
  height:10px;
  width: 10px;
  position:fixed;
  cursor:nwse-resize;
}

.iHandle.iHandleShow {
  display: inline-block;
}


.iSpan {
  display:inline-flex;
  flex-grow:1;
  border:1px solid transparent;
}

.iSpan.iSpanBorder {
  border:1px solid #1B749D !important;
}

.iSettings {
  display:none;
  background-color: #1B749D;
  color: white;
  text-align:center;
  height:18px;
  width: 18px;
  position:fixed;
  cursor:pointer;
}

.iSettings.iSettingsShow {
  display: inline-Block;
}

.iSettingsIcon {
  margin-bottom:4px;
}

.iconSize {
  font-size: 20px;
}

.showPointer {
  cursor: pointer;
}

.color-picker {
  max-width: 250px;
}
</style>