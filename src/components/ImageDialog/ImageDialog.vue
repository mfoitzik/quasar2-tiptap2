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
            <div class="col-xs-5">
              <q-input
                v-model="imageHeight"
                label="height"
                stack-label
                dense
                class="q-mx-sm"
              />
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
            <div class="col-xs-5">
              <q-input
                v-model="imageWidth"
                label="width"
                stack-label
                dense
                class="q-mx-sm"
              />
            </div>
          </div>
        </q-card-section>

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
                      style="border-bottom: 4px solid red"
                    >
                      <q-popup-proxy
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-color v-model="imageBorderColor" />
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
                  size="sm"
                  :options="[
                    { label: 'Off', value: 'off' },
                    { label: 'On', value: 'on' },
                  ]"
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
                      style="border-bottom: 4px solid red"
                    >
                      <q-popup-proxy
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-color v-model="imageBorderColor" />
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
                  class="q-mx-sm"
                />
              </div>
              <div class="col-2">
                <q-select
                  v-model="imageShadowHOffsetUOM"
                  :options="imageUOMSelections"
                  label="Units"
                  dense
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
                  class="q-mx-sm"
                />
              </div>
              <div class="col-2">
                <q-select
                  v-model="imageShadowVOffsetUOM"
                  :options="imageUOMSelections"
                  label="Units"
                  dense
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
                  class="q-mx-sm"
                />
              </div>
              <div class="col-2">
                <q-select
                  v-model="imageShadowBlurUOM"
                  :options="imageUOMSelections"
                  label="Units"
                  dense
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
                  class="q-mx-sm"
                />
              </div>
              <div class="col-2">
                <q-select
                  v-model="imageShadowSpreadUOM"
                  :options="imageUOMSelections"
                  label="Units"
                  dense
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
                  class="q-mx-md"
                  style="width: auto"
                />
              </div>
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
import { defineComponent, ref } from 'vue'
import ImageItem from '../Types/image-item'
export default defineComponent({
  components: {

  },
  setup(props, {emit}) {
    const iSettings = ref<HTMLDivElement>()
    const sliders = ref(false)
    // const imageArray = ref<Array<ImageItem>>([])
    const imageArray = ref<Array<ImageItem>>(props.images as Array<ImageItem>)
    const selectedImage = ref('')
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
    
    const imageBorderChange = (value: string) => {
      imageBorderWidth.value = value + imageBorderWidthUOM.value
      emit('newBorder', value)
      // updateStyle()
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
      imageSelector.value = false
    }

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
      selectImage
      }
  },
    props: {
        show: Boolean,
        images: Array
    },
    watch: {
    show(value:boolean, oldValue:boolean) {
      console.log('NEW WATCH VALUE: ' + value.toString())
      console.log('OLD WATCH VALUE: ' + oldValue.toString())
      this.sliders = true
    },
    // images(value:Array<ImageItem>, oldValue:Array<ImageItem>) {
    //   console.log('NEW WATCH VALUE: ' + value.toString())
    //   console.log('OLD WATCH VALUE: ' + oldValue.toString())
    //   this.imageArray = value
    // }
  }
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
