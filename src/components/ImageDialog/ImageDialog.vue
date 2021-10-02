<template>
  <div>
    <q-dialog v-model="sliders" style="width: 1200px;max-width:1200px;">
      <q-card style="width: 1200px;max-width:1200px;" class="q-px-sm q-pb-md">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Image Properties</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <div class="row">
            <div class="col-12">
              <q-input
                v-model="imageSrc"
                label="src"
                stack-label
                dense
                class="q-mx-sm"
                @update:model-value="imageSrcChanged"
              >
                <template v-slot:append>
                  <q-icon
                    name="more_horiz"
                    color="black"
                    size="xs"
                    @click="imageSelector = true"
                    style="align-self: flex-end; cursor: pointer"
                  />
                </template>
              </q-input>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <q-input
                v-model="imageAlt"
                label="alt"
                stack-label
                dense
                class="q-mx-sm"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-xs-4">
              <q-input
                v-model="imageWidth"
                label="width"
                stack-label
                dense
                :disable="imageWidthDisabled"
                @update:model-value="imageWidthChanged"
                class="q-mx-sm"
              />
            </div>
            <div class="col-xs-1">
              <q-select 
              v-model="imageWidthUom" 
              :options="imageWidthUomOptions" 
              dense 
              label="Unit" 
              @update:model-value = "v => changeImageWidthUom(v)"
              class="q-mx-sm" />
            </div>
            <!--<q-icon name="hyperlink_off" size="md" />
              <div style="height:25px;width:25px;border:1px solid red;"><q-icon name="hyperlink_off"  /></div>-->
            <div
              @click="imageConstrainProportions = false"
              v-if="imageConstrainProportions == true"
              class="
                col-xs-2
                flex
                justify-center
                items-center
                showPointer
                q-pt-md
              "
            >
              <div style="display: inline-block">
                <!--<span class="material-icons" style="font-size:30px;">
                  mdi-link
                </span>--><q-icon name="mdi-link" size="sm" />
              </div>
            </div>
            <div
              @click="imageConstrainProportions = true"
              v-if="imageConstrainProportions == false"
              class="
                col-xs-2
                flex
                justify-center
                items-center
                showPointer
                q-pt-md
              "
            >
              <div style="display: inline-block">
                <!--<span class="material-icons" style="font-size:30px;">
                  mdi-link-off
                </span>--><q-icon name="mdi-link-off" size="sm" />
              </div>
            </div>
            <div class="col-xs-4">
              <q-input
                v-model="imageHeight"
                label="height"
                stack-label
                dense
                :disable="imageHeightDisabled"
                @update:model-value="imageHeightChanged"
                class="q-mx-sm"
              />
            </div>
            <div class="col-xs-1">
              <q-select 
              v-model="imageHeightUom" 
              :options="imageHeightUomOptions" 
              dense 
              label="Unit"
              @update:model-value = "v => changeImageHeightUom(v)" 
              class="q-mx-sm" />
            </div>
          </div>
        </q-card-section>
        <div class="row">
          <div class="col-3">
          <q-item-label header>Float</q-item-label>
          <q-item dense>
            <q-item-section>
              <div class="row">
                <div class="col-6">
                  <q-btn-toggle
                    v-model="float"
                    toggle-color="primary"
                    size="sm"
                    :options="[
                      { label: 'None', value: 'none' },
                      { label: 'Left', value: 'left' },
                      { label: 'Right', value: 'right' },
                    ]"
                  />
                </div>
              </div>
            </q-item-section>
          </q-item>
        </div>
        <div class="col-9">
          <q-item-label header>Margin</q-item-label>
          <q-item dense>
            <q-item-section>
              <div class="row">
              <div class="col-3">
                <q-input
                  v-model="imageMargin"
                  label="Margin"
                  stack-label
                  dense
                  class="q-mx-sm"
                />
              </div>
              <div class="col-2">
                <q-select
                  v-model="imageMarginUom"
                  :options="imageUOMSelections"
                  label="Units"
                  dense
                  @update:model-value = "v => changeImageMarginUom(v)"
                  class="q-mx-sm"
                />
              </div>
              <div class="col-7 q-pt-lg">
                <q-slider
                  color="teal"
                  v-model="imageMarginNumber"
                  @update:model-value="imageMarginChange"
                  :min="0"
                  :max="100"
                  dense
                  class="q-mx-md"
                  style="width: auto"
                />
              </div>
            </div>
            </q-item-section>
          </q-item>
        </div>
        </div>
        
        
        <q-item-label header>Border</q-item-label>
        <q-item dense>
          <q-item-section>
            <div class="row">
              <div class="col-6">
                <q-select
                  v-model="imageBorderStyle"
                  :options="imageBorderStyleSelections"
                  label="Border Style"
                  dense
                  class="q-mx-sm"
                />
              </div>
              <div class="col-6">
                <q-input
                  v-model="imageBorderColor"
                  class="my-input q-mx-sm"
                  dense
                  label="Border Color"
                >
                  <template v-slot:append>
                    <q-icon
                      name="colorize"
                      class="cursor-pointer"
                      :style="borderBottomStyle"
                    >
                      <q-popup-proxy
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-color v-model="imageBorderColor" @update:model-value="imageBorderColorChange" />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
            <div class="row">
              <div class="col-3">
                <q-input
                  v-model="imageBorderWidth"
                  label="Border Width"
                  stack-label
                  dense
                  class="q-mx-sm"
                />
              </div>
              <div class="col-2">
                <q-select
                  v-model="imageBorderWidthUOM"
                  :options="imageUOMSelections"
                  label="Units"
                  dense
                  @update:model-value = "v => changeImageBorderUom(v)"
                  class="q-mx-sm"
                />
              </div>
              <div class="col-7 q-pt-lg">
                <q-slider
                  color="teal"
                  v-model="imageBorderWidthNumber"
                  @update:model-value="imageBorderChange"
                  :min="0"
                  :max="100"
                  dense
                  class="q-mx-md"
                  style="width: auto"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-3">
                <q-input
                  v-model="imageBorderRadius"
                  label="Border Radius"
                  stack-label
                  dense
                  class="q-mx-sm"
                />
              </div>
              <div class="col-2">
                <q-select
                  v-model="imageBorderRadiusUOM"
                  :options="imageUOMSelections"
                  @update:model-value = "v => changeImageBorderRadiusUom(v)"
                  label="Units"
                  dense
                  class="q-mx-sm"
                />
              </div>
              <div class="col-7 q-pt-lg">
                <q-slider
                  color="teal"
                  v-model="imageBorderRadiusNumber"
                  @update:model-value="imageBorderRadiusChange"
                  :min="0"
                  :max="100"
                  dense
                  class="q-mx-md"
                  style="width: auto"
                />
              </div>
            </div>
          </q-item-section>
        </q-item>

        <q-item-label header>Shadow</q-item-label>
        <q-item dense>
          <q-item-section>
            <div class="row">
              <div class="col-6">
                <q-btn-toggle
                  v-model="shadowOn"
                  toggle-color="primary"
                  @update:model-value="v => changeShadowOn(v)"
                  size="sm"
                  :options="[
                    { label: 'Off', value: 'off' },
                    { label: 'On', value: 'on' },
                  ]"
                />
              </div>
              <div class="col-6">
                <q-input
                  v-model="imageShadowColor"
                  class="my-input q-mx-sm"
                  dense
                  :disable="shadowEnabled"
                  label="Shadow Color"
                >
                  <template v-slot:append>
                    <q-icon
                      name="colorize"
                      class="cursor-pointer"
                      :style="imageShadowColorBottomBorder"
                    >
                      <q-popup-proxy
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-color v-model="imageShadowColor" @update:model-value="imageShadowColorChange" :disable="shadowEnabled" />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
            <div class="row">
              <div class="col-3">
                <q-input
                  v-model="imageShadowHOffset"
                  label="Horizontal Offset"
                  stack-label
                  dense
                  :disable="shadowEnabled"
                  class="q-mx-sm"
                />
              </div>
              <div class="col-2">
                <q-select
                  v-model="imageShadowHOffsetUOM"
                  :options="imageUOMSelections"
                  label="Units"
                  dense
                  :disable="shadowEnabled"
                  @update:model-value = "v => changeImageShadowHOffsetUom(v)"
                  class="q-mx-sm"
                />
              </div>
              <div class="col-7 q-pt-lg">
                <q-slider
                  color="teal"
                  v-model="imageShadowHOffsetNumber"
                  @update:model-value="imageShadowHOffsetChange"
                  :min="0"
                  :max="100"
                  dense
                  :disable="shadowEnabled"
                  class="q-mx-md"
                  style="width: auto"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-3">
                <q-input
                  v-model="imageShadowVOffset"
                  label="Vertical Offset"
                  stack-label
                  dense
                  :disable="shadowEnabled"
                  class="q-mx-sm"
                />
              </div>
              <div class="col-2">
                <q-select
                  v-model="imageShadowVOffsetUOM"
                  :options="imageUOMSelections"
                  label="Units"
                  dense
                  :disable="shadowEnabled"
                  @update:model-value = "v => changeImageShadowVOffsetUom(v)"
                  class="q-mx-sm"
                />
              </div>
              <div class="col-7 q-pt-lg">
                <q-slider
                  color="teal"
                  v-model="imageShadowVOffsetNumber"
                  @update:model-value="imageShadowVOffsetChange"
                  :min="0"
                  :max="100"
                  dense
                  :disable="shadowEnabled"
                  class="q-mx-md"
                  style="width: auto"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-3">
                <q-input
                  v-model="imageShadowBlur"
                  label="Blur"
                  stack-label
                  dense
                  :disable="shadowEnabled"
                  class="q-mx-sm"
                />
              </div>
              <div class="col-2">
                <q-select
                  v-model="imageShadowBlurUOM"
                  :options="imageUOMSelections"
                  label="Units"
                  dense
                  :disable="shadowEnabled"
                  @update:model-value = "v => changeImageShadowBlurUom(v)"
                  class="q-mx-sm"
                />
              </div>
              <div class="col-7 q-pt-lg">
                <q-slider
                  color="teal"
                  v-model="imageShadowBlurNumber"
                  @update:model-value="imageShadowBlurChange"
                  :min="0"
                  :max="100"
                  dense
                  :disable="shadowEnabled"
                  class="q-mx-md"
                  style="width: auto"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-3">
                <q-input
                  v-model="imageShadowSpread"
                  label="Spread"
                  stack-label
                  dense
                  :disable="shadowEnabled"
                  class="q-mx-sm"
                />
              </div>
              <div class="col-2">
                <q-select
                  v-model="imageShadowSpreadUOM"
                  :options="imageUOMSelections"
                  label="Units"
                  dense
                  :disable="shadowEnabled"
                  @update:model-value = "v => changeImageShadowSpreadUom(v)"
                  class="q-mx-sm"
                />
              </div>
              <div class="col-7 q-pt-lg">
                <q-slider
                  color="teal"
                  v-model="imageShadowSpreadNumber"
                  @update:model-value="imageShadowSpreadChange"
                  :min="0"
                  :max="100"
                  dense
                  :disable="shadowEnabled"
                  class="q-mx-md"
                  style="width: auto"
                />
              </div>
            </div>
            <div class="row">
              <q-separator />

              <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup />
                <q-btn flat label="OK" color="primary" @click="insertImage" />
              </q-card-actions>
            </div>
          </q-item-section>
        </q-item>
      </q-card>
    </q-dialog>
    <q-dialog v-model="imageSelector">
      <q-card>
        <q-card-section>
          <div class="text-h6">Select Image</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <div v-for="(n, index) in imageArray" :key="n" :id="'imageselector' + index" @click="imageSelect('imageselector' + index, index)" class="image-selection">
           <div class="icenter"><img :src="n.thumbnailUrl" /></div>
           <div class="icenter">{{n.url.split('/').pop()}}</div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Select" color="primary" @click="selectImage" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, ref, Ref } from 'vue'
import { Editor } from '@tiptap/vue-3'
import * as InjectionKeys from '../Types/injection-keys'
import ImageItem from '../Types/image-item'
import {iImageAttributes} from '../Types/image-attributes'
export default defineComponent({
  components: {

  },
  setup(props, {emit}) {
    const getPattributes = ref<iImageAttributes>(props.pattributes as iImageAttributes)
    const getMode = ref<string>(props.mode as string)
    const newMode = ref(props.mode)
    const editor = inject(InjectionKeys.editorKey) as Ref<Editor>
    // <q-select v-model="imageHeightUom" :options="imageUomOptions" dense label="Standard" />
    const imageHeightDisabled = ref(true)
    const imageWidthDisabled = ref(true)
    let imageAspectRatio = 1
    const imageHeightUom = ref('auto')
    const imageWidthUom = ref('auto')
    const imageHeightUomOptions = ['auto','px','%','vh']
    const imageWidthUomOptions = ['auto','px','%','vw']
    const iSettings = ref<HTMLDivElement>()
    const sliders = ref(false) // ref(props.myProp)
    // let { show } = toRefs(props)
    // const imageArray = ref<Array<ImageItem>>([])
    // const imageArray = ref<Array<ImageItem>>(props.images as Array<ImageItem>)
    const imageArray = inject(InjectionKeys.imageSelectionsKey) as Ref<ImageItem[]>
    const selectedImage = ref('')
    const imageConstrainProportions = ref(true)
    const imageSrc = ref('')
    const imageAlt = ref('')
    const imageHeight = ref('')
    const imageWidth = ref('')
    const imageBorderWidth = ref('')
    const imageBorderWidthNumber = ref(0)
    const imageBorderWidthUOM = ref('')
    const imageBorderStyle = ref('none')
    const imageBorderColor = ref('#183794ff')
    const imageShadowColor = ref('#183794ff')
    const borderBottomStyle = ref('border-bottom: 4px solid #183794ff;')
    const imageShadowColorBottomBorder = ref('border-bottom: 4px solid #183794ff;')
    const imageBorderRadius = ref('')
    const imageFloat = ref('')
    const imageBoxShadow = ref('')
    const imagePadding = ref('')
    const imageMargin = ref('')
    const imageMarginUom = ref('')
    const imageMarginNumber = ref(0)
    const shadowOn = ref('off')
    const shadowEnabled = ref(true)
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

    const float = ref('none')
    
    const imageBorderChange = (value: string) => {
      if (imageBorderStyle.value == 'none') {
        imageBorderStyle.value = 'solid'
      }
      if (imageBorderWidthUOM.value == '') {
        imageBorderWidthUOM.value = 'px'
      }
      imageBorderWidth.value = value + imageBorderWidthUOM.value
      // emit('newBorder', value)
      // updateStyle()
    }

    const imageMarginChange = (value: string) => {
      if (imageMarginUom.value == '') {
        imageMarginUom.value = 'px'
      }
      imageMargin.value = value + imageMarginUom.value
      // emit('newBorder', value)
      // updateStyle()
    }
    // imageSrcChanged
    const getImageDimensions = (inUrl: string) => {
      if (isValidHttpUrl(inUrl) == true && isValidImageUrl(inUrl) == true) {
        let img = document.createElement('img')
        img.src = inUrl
        img.onload = function() {
            img.style.visibility = 'hidden'
            document.body.appendChild(img)
            // console.log('IMAGE WIDTH: ' + img.clientWidth.toString())
            // console.log('IMAGE HEIGHT: ' + img.clientHeight.toString())
            imageHeight.value = img.clientHeight.toString()
            imageHeightUom.value = 'px'
            imageHeightDisabled.value = false
            imageWidth.value = img.clientWidth.toString()
            imageWidthUom.value = 'px'
            imageWidthDisabled.value = false
            imageAspectRatio = img.clientWidth / img.clientHeight
            imageConstrainProportions.value = true
            document.body.removeChild(img)
        }
      }
    }
    const imageSrcChanged = (value: string) => {
      getImageDimensions(value)
    }
    const imageBorderColorChange = (value: string) => {
      console.log('LINE572@@@@@@@@@@@@@@@@@')
      console.log(value)
      imageBorderColor.value = value
      borderBottomStyle.value = 'border-bottom: 4px solid ' + value + ';'
      // emit('newBorderColor', value)
    }

    const imageShadowColorChange = (value: string) => {
      imageShadowColor.value = value
      imageShadowColorBottomBorder.value = 'border-bottom: 4px solid ' + value + ';'
      // emit('newBorderColor', value)
    }

    const imageBorderRadiusChange = (value: string) => {
      if (imageBorderRadiusUOM.value == '') {
        imageBorderRadiusUOM.value = 'px'
      }
      imageBorderRadius.value = value + imageBorderRadiusUOM.value
      // emit('newBorder', value)
    }

    const imageShadowHOffsetChange = (value: string) => {
      if (imageShadowHOffsetUOM.value == '') {
        imageShadowHOffsetUOM.value = 'px'
      } 
      imageShadowHOffset.value = value + imageShadowHOffsetUOM.value
    }

    const imageShadowVOffsetChange = (value: string) => {
      if (imageShadowVOffsetUOM.value == '') {
        imageShadowVOffsetUOM.value = 'px'
      } 
      imageShadowVOffset.value = value + imageShadowVOffsetUOM.value
    }

    const imageShadowBlurChange = (value: string) => {
      if (imageShadowBlurUOM.value == '') {
        imageShadowBlurUOM.value = 'px'
      } 
      imageShadowBlur.value = value + imageShadowBlurUOM.value
    }

    const imageShadowSpreadChange = (value: string) => {
      if (imageShadowSpreadUOM.value == '') {
        imageShadowSpreadUOM.value = 'px'
      } 
      imageShadowSpread.value = value + imageShadowSpreadUOM.value
    }

    const iStop = (e:MouseEvent) => {
      e.stopPropagation()
    }
    const showSettings = () => {
      sliders.value = true
    }
    const imageSelect = (divId: string, inIndex: number) => {
      console.log('DIVID:' + divId)
      console.log('INDEX:' + inIndex.toString())
      const allImages = document.getElementsByClassName('image-selection')
      for(var index=0;index < allImages.length;index++){
      allImages[index].classList.remove('selected');
      const thisDiv = document.getElementById(divId)
      if (thisDiv) {
        thisDiv.classList.add('selected')
      }
      selectedImage.value = imageArray.value[inIndex].url
   }
    }

    const selectImage = () => {
      imageSrc.value = selectedImage.value
      getImageDimensions(selectedImage.value)
      imageSelector.value = false
    }
    const insertImage = () => {
      let widthStyle = ''
      let heightStyle = ''
      let borderStyle = ''
      let borderRadius = ''
      let borderShadow = ''
      let imageFloat = ''
      let marginStyle = ''

      if (float.value == 'left') {
        imageFloat = 'float: left;'
      } else if (float.value == 'right') {
        imageFloat = 'float: right;'
      } else {
        imageFloat = 'float: none;'
      }

      if (imageMargin.value == '' || imageMargin.value == 'none') {
        marginStyle = 'margin: none;'
      } else {
        marginStyle = 'margin: ' + imageMargin.value
      }

      if (imageWidthUom.value == 'auto') {
        widthStyle = 'width:auto;'
      } else {
        widthStyle = 'width:' + imageWidth.value + imageWidthUom.value + ';'
      }
      if (imageHeightUom.value == 'auto') {
        heightStyle = 'height:auto;'
      } else {
        heightStyle = 'height:' + imageHeight.value + imageHeightUom.value + ';'
      }
      if (imageBorderStyle.value == 'none') {
        borderStyle = 'border:none;'
      } else {
        borderStyle = 'border:' + imageBorderWidth.value + ' ' + imageBorderStyle.value + ' ' + imageBorderColor.value + ';'
      }
      if (imageBorderRadius.value == '') {
        borderRadius = 'border-radius:none;'
      } else {
        borderRadius = 'border-radius:' + imageBorderRadius.value + ';'
      }
      if (shadowOn.value == 'off') {
        borderShadow = 'box-shadow: none;'
      } else {
        // check for blank values
        if (imageShadowHOffset.value == '') {
          imageShadowHOffsetUOM.value = 'px'
          imageShadowHOffset.value = '0px'
        }
        if (imageShadowVOffset.value == '') {
          imageShadowVOffsetUOM.value = 'px'
          imageShadowVOffset.value = '0px'
        }
        if (imageShadowBlur.value == '') {
          imageShadowBlurUOM.value = 'px'
          imageShadowBlur.value = '0px'
        }
        if (imageShadowSpread.value == '') {
          imageShadowSpreadUOM.value = 'px'
          imageShadowSpread.value = '0px'
        }
        // end check for blanks
        borderShadow = 'box-shadow:' + imageShadowHOffset.value + ' ' + imageShadowVOffset.value + ' ' + imageShadowBlur.value + ' ' + imageShadowSpread.value + ' ' + imageShadowColor.value +  ';'
      }
      const fullStyle = widthStyle + heightStyle + borderStyle + borderRadius + borderShadow + imageFloat + marginStyle
      // console.log('COMPLETE STYLE: ' + fullStyle)
      // emit('newBorderColor', value)
      let getMode = ''
      if (props.pattributes) {
        const tAttr = props.pattributes as iImageAttributes
        getMode = tAttr.mode
      }
      if (getMode == 'edit') {
        emit('imagechanged', {src: imageSrc.value, alt: imageAlt.value, title: imageAlt.value, style: fullStyle })
      } else {
        if (selectedImage.value !== '') {
          editor.value.chain().focus().setImage({ src: selectedImage.value, alt: imageAlt.value, title: imageAlt.value, style: fullStyle }).run()
        }
      }
      
      sliders.value = false
    }

    const changeImageHeightUom = (inValue: string) => {
      if (inValue == 'auto') {
        imageHeightDisabled.value = true
      } else {
        imageHeightDisabled.value = false
      }
    }

    const changeImageWidthUom = (inValue: string) => {
      if (inValue == 'auto') {
        imageWidthDisabled.value = true
      } else {
        imageWidthDisabled.value = false
      }
    }

    const imageWidthChanged = (inValue: string) => {
      if (imageConstrainProportions.value == true && ((imageHeightUom.value == 'px' && imageWidthUom.value == 'px') || (imageHeightUom.value == '%' && imageWidthUom.value == '%'))) {
        imageHeight.value = (parseFloat(inValue) / imageAspectRatio).toFixed(0)
      }
    }

    const imageHeightChanged = (inValue: string) => {
      if (imageConstrainProportions.value == true && ((imageHeightUom.value == 'px' && imageWidthUom.value == 'px') || (imageHeightUom.value == '%' && imageWidthUom.value == '%'))) {
        imageWidth.value = (parseFloat(inValue) * imageAspectRatio).toFixed(0)
      }
    }

    const changeImageBorderUom = (inValue: string) => {
      // console.log('LINE 631: ' + inValue)
      if (imageBorderWidth.value != '') {
        imageBorderWidth.value = imageBorderWidth.value.replace('px', '')
        imageBorderWidth.value = imageBorderWidth.value.replace('%', '')
        imageBorderWidth.value = imageBorderWidth.value.replace('rem', '')
        imageBorderWidth.value = imageBorderWidth.value.replace('em', '')
        imageBorderWidth.value = imageBorderWidth.value.replace('pc', '')
        imageBorderWidth.value = imageBorderWidth.value.replace('pt', '')
        imageBorderWidth.value = imageBorderWidth.value + inValue
      }
    }
    const changeImageMarginUom = (inValue: string) => {
      // console.log('LINE 631: ' + inValue)
      if (imageMargin.value != '') {
        imageMargin.value = imageMargin.value.replace('px', '')
        imageMargin.value = imageMargin.value.replace('%', '')
        imageMargin.value = imageMargin.value.replace('rem', '')
        imageMargin.value = imageMargin.value.replace('em', '')
        imageMargin.value = imageMargin.value.replace('pc', '')
        imageMargin.value = imageMargin.value.replace('pt', '')
        imageMargin.value = imageMargin.value + inValue
      }
    }
    const changeImageBorderRadiusUom = (inValue: string) => {
      // console.log('LINE 631: ' + inValue)
      if (imageBorderRadius.value != '') {
        imageBorderRadius.value = imageBorderRadius.value.replace('px', '')
        imageBorderRadius.value = imageBorderRadius.value.replace('%', '')
        imageBorderRadius.value = imageBorderRadius.value.replace('rem', '')
        imageBorderRadius.value = imageBorderRadius.value.replace('em', '')
        imageBorderRadius.value = imageBorderRadius.value.replace('pc', '')
        imageBorderRadius.value = imageBorderRadius.value.replace('pt', '')
        imageBorderRadius.value = imageBorderRadius.value + inValue
      }
    }

    const changeImageShadowHOffsetUom = (inValue: string) => {
      // console.log('LINE 631: ' + inValue)
      if (imageShadowHOffset.value != '') {
        imageShadowHOffset.value = imageShadowHOffset.value.replace('px', '')
        imageShadowHOffset.value = imageShadowHOffset.value.replace('%', '')
        imageShadowHOffset.value = imageShadowHOffset.value.replace('rem', '')
        imageShadowHOffset.value = imageShadowHOffset.value.replace('em', '')
        imageShadowHOffset.value = imageShadowHOffset.value.replace('pc', '')
        imageShadowHOffset.value = imageShadowHOffset.value.replace('pt', '')
        imageShadowHOffset.value = imageShadowHOffset.value + inValue
      }
    }

    const changeImageShadowVOffsetUom = (inValue: string) => {
      // console.log('LINE 631: ' + inValue)
      if (imageShadowVOffset.value != '') {
        imageShadowVOffset.value = imageShadowVOffset.value.replace('px', '')
        imageShadowVOffset.value = imageShadowVOffset.value.replace('%', '')
        imageShadowVOffset.value = imageShadowVOffset.value.replace('rem', '')
        imageShadowVOffset.value = imageShadowVOffset.value.replace('em', '')
        imageShadowVOffset.value = imageShadowVOffset.value.replace('pc', '')
        imageShadowVOffset.value = imageShadowVOffset.value.replace('pt', '')
        imageShadowVOffset.value = imageShadowVOffset.value + inValue
      }
    }

    const changeImageShadowBlurUom = (inValue: string) => {
      // console.log('LINE 631: ' + inValue)
      if (imageShadowBlur.value != '') {
        imageShadowBlur.value = imageShadowBlur.value.replace('px', '')
        imageShadowBlur.value = imageShadowBlur.value.replace('%', '')
        imageShadowBlur.value = imageShadowBlur.value.replace('rem', '')
        imageShadowBlur.value = imageShadowBlur.value.replace('em', '')
        imageShadowBlur.value = imageShadowBlur.value.replace('pc', '')
        imageShadowBlur.value = imageShadowBlur.value.replace('pt', '')
        imageShadowBlur.value = imageShadowBlur.value + inValue
      }
    }

    const changeImageShadowSpreadUom = (inValue: string) => {
      // console.log('LINE 631: ' + inValue)
      if (imageShadowSpread.value != '') {
        imageShadowSpread.value = imageShadowSpread.value.replace('px', '')
        imageShadowSpread.value = imageShadowSpread.value.replace('%', '')
        imageShadowSpread.value = imageShadowSpread.value.replace('rem', '')
        imageShadowSpread.value = imageShadowSpread.value.replace('em', '')
        imageShadowSpread.value = imageShadowSpread.value.replace('pc', '')
        imageShadowSpread.value = imageShadowSpread.value.replace('pt', '')
        imageShadowSpread.value = imageShadowSpread.value + inValue
      }
    }

    const changeShadowOn = (inValue: string) => {
      if (inValue == 'on') {
        // reverse logic because true disables
        shadowEnabled.value = false
      } else {
        shadowEnabled.value = true
      }
    }

    // START UTILITY FUNCTIONS
    const isValidHttpUrl = (inUrl: string) => {
      let url: URL
      
      try {
        url = new URL(inUrl)
      } catch (_) {
        return false; 
      }

      return url.protocol === 'http:' || url.protocol === 'https:'
    }

    const isValidImageUrl = (inUrl: string) => {
      if (typeof inUrl !== 'string') return false
      return ((/\.(apng|avif|gif|jpg|jpeg|jfif|pjpeg|pjp|png|svg|webp)$/.exec(inUrl.toLowerCase())) != null)
    }
    const showDialog = () => {
        if (props.pattributes) {
          console.log('LINE 836!!!!!!!!!!!!!!!!!!!!!!!!')
          console.log(props.pattributes)
          const inAttributes = props.pattributes as iImageAttributes
          if (props.pattributes.mode == 'edit') {
            if (inAttributes.float == 'left') {
              float.value = 'left'
            } else if (inAttributes.float == 'right') {
              float.value = 'right'
            } else {
              float.value = 'none'
            }
            imageSrc.value = inAttributes.src
            imageAlt.value = inAttributes.alt
            imageWidth.value = inAttributes.width
            imageWidthUom.value = inAttributes.widthUom
            if (inAttributes.widthUom != 'auto') {
              imageWidthDisabled.value = false
            }
            imageHeight.value = inAttributes.height
            imageHeightUom.value = inAttributes.heightUom
            if (inAttributes.heightUom != 'auto') {
              imageHeightDisabled.value = false
            }
            imageBorderStyle.value = inAttributes.borderStyle
            imageBorderColor.value = inAttributes.borderColor
            imageBorderColorChange(inAttributes.borderColor)
            imageBorderWidth.value = inAttributes.borderWidth + inAttributes.borderWidthUom
            imageBorderWidthUOM.value = inAttributes.borderWidthUom
            imageMargin.value = inAttributes.margin + inAttributes.marginUom
            imageMarginUom.value = inAttributes.marginUom
            imageBorderRadius.value = inAttributes.borderRadius + inAttributes.borderRadiusUom
            imageBorderRadiusUOM.value = inAttributes.borderRadiusUom
            if (inAttributes.hOffset != '') {
              shadowOn.value = 'on'
              shadowEnabled.value = false
            } else {
              shadowOn.value = 'off'
              shadowEnabled.value = true
            }
            imageShadowColor.value = inAttributes.shadowColor
            imageShadowColorChange(inAttributes.shadowColor)
            imageShadowHOffset.value = inAttributes.hOffset + inAttributes.hOffsetUom
            imageShadowHOffsetUOM.value = inAttributes.hOffsetUom
            imageShadowVOffset.value = inAttributes.vOffset + inAttributes.vOffsetUom
            imageShadowVOffsetUOM.value = inAttributes.vOffsetUom
            imageShadowBlur.value = inAttributes.blur + inAttributes.blurUom
            imageShadowBlurUOM.value = inAttributes.blurUom
            imageShadowSpread.value = inAttributes.spread + inAttributes.spreadUom
            imageShadowSpreadUOM.value = inAttributes.spreadUom
          }
        }
        sliders.value = true
      }
    // END UTILITY FUNCTIONS
    // watch(
    //     () => props.show,
    //     (newValue, oldValue) => {
    //       // console.log("deep ", cars.value, prevCars.value);
    //       sliders.value = newValue
    //     },
    //     { deep: true }
    //   );

    return { imageSrc, iSettings, iStop, showSettings,
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
      imageMarginUom,
      imageMarginNumber,
      changeImageMarginUom,
      imageMarginChange,
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
      imageSelector,
      imageArray,
      imageSelect,
      selectedImage,
      selectImage,
      insertImage,
      borderBottomStyle,
      imageBorderColorChange,
      imageSrcChanged,
      imageHeightUom,
      imageHeightUomOptions,
      imageWidthUom,
      imageWidthUomOptions,
      imageHeightDisabled,
      imageWidthDisabled,
      changeImageHeightUom,
      changeImageWidthUom,
      imageHeightChanged,
      imageWidthChanged,
      changeImageBorderUom,
      changeImageBorderRadiusUom,
      changeImageShadowHOffsetUom,
      changeImageShadowVOffsetUom,
      changeImageShadowBlurUom,
      changeImageShadowSpreadUom,
      imageShadowColor,
      imageShadowColorBottomBorder,
      imageShadowColorChange,
      shadowEnabled,
      changeShadowOn,
      getPattributes,
      getMode,
      newMode,
      showDialog,
      float
      }
  },
    props: {
        images: Array,
        pattributes: Object,
        mode: String
    },
    // methods: {
    //   showDialog() {
    //     console.log('SHOW DIALOG TRIGGERED')
    //     console.log('LINE 925@@@@@@@@@@@@@@@@@@')
    //     console.log(this.newMode)
    //     console.log(this.getPattributes)
    //     this.sliders = true
    //   }
    // }
    // watch: {
    // show(value:boolean, oldValue:boolean) {
    //   console.log('NEW WATCH VALUE: ' + value.toString())
    //   console.log('OLD WATCH VALUE: ' + oldValue.toString())
    //   this.sliders = value
    // },
    // images(value:Array<ImageItem>, oldValue:Array<ImageItem>) {
    //   console.log('NEW WATCH VALUE: ' + value.toString())
    //   console.log('OLD WATCH VALUE: ' + oldValue.toString())
    //   this.imageArray = value
    // }
  // }
})

</script>
<style scoped>
  .image-selection {
    display: inline-block;
    margin: 8px;
    
  }
  .image-selection img {
    border: 2px solid gray;
  }
  .image-selection:hover img {
    border: 2px dotted rgba(73, 164, 255, 0.986);
    cursor: pointer;
  }
  .image-selection.selected img {
    border: 2px solid dodgerblue;
  }
  .icenter {
    text-align:center;
  }
</style>
