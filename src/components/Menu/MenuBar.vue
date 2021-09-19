<template>
    <q-toolbar v-if="editor" class="toolbar-border q-pa-xs wrap">
        <q-btn flat padding="xs" icon="undo" @click="editor.chain().focus().undo().run()" >
            <q-tooltip class="menu-button-tooltip">
            <div class="tooltip-wrapper">
                <div>Undo</div>
                <div>
                    <div><strong>Shortcuts</strong></div>
                    <div>Windows/Linus: <strong>Control Z</strong></div>
                    <div>MacOS: <strong>Cmd Z</strong></div>
                </div>
            </div>
            </q-tooltip>
        </q-btn>
        <q-btn flat padding="xs" icon="redo" @click="editor.chain().focus().redo().run()">
            <q-tooltip class="menu-button-tooltip">
            <div>Redo</div>
            <div>
                <div><strong>Shortcuts</strong></div>
                <div>Windows/Linus: <strong>Control Shift Z</strong></div>
                <div>MacOS: <strong>Cmd Shift Z</strong></div>
            </div>
            </q-tooltip>
        </q-btn>
        <q-separator vertical inset />
        <q-btn flat padding="xs" icon="format_bold" @click="editor.chain().focus().toggleBold().run()" :class="{ 'menu-button-active': editor.isActive('bold') }">
            <q-tooltip class="menu-button-tooltip">
            <div>Make Text <span style="font-weight:bold;">Bold</span></div>
            <div>
                <div><strong>Shortcuts</strong></div>
                <div>Windows/Linus: <strong>Control B</strong></div>
                <div>MacOS: <strong>Cmd B</strong></div>
            </div>
            </q-tooltip>
        </q-btn>
        <q-btn flat padding="xs" icon="format_italic" @click="editor.chain().focus().toggleItalic().run()" :class="{ 'menu-button-active': editor.isActive('italic') }">
            <q-tooltip class="menu-button-tooltip">
            <div>Make Text <span style="font-style:italic;">Italic</span></div>
            <div>
                <div><strong>Shortcuts</strong></div>
                <div>Windows/Linus: <strong>Control I</strong></div>
                <div>MacOS: <strong>Cmd I</strong></div>
            </div>
            </q-tooltip>
        </q-btn>
        <q-btn flat padding="xs" icon="format_underlined" @click="editor.chain().focus().toggleUnderline().run()" :class="{ 'menu-button-active': editor.isActive('underline') }">
            <q-tooltip class="menu-button-tooltip">
            <div>Make Text <u>Underline</u></div>
            <div>
                <div><strong>Shortcuts</strong></div>
                <div>Windows/Linus: <strong>Control U</strong></div>
                <div>MacOS: <strong>Cmd U</strong></div>
            </div>
            </q-tooltip>
        </q-btn>
        <q-btn flat padding="xs" icon="strikethrough_s" @click="editor.chain().focus().toggleStrike().run()" :class="{ 'menu-button-active': editor.isActive('strike') }">
            <q-tooltip class="menu-button-tooltip">
            <div>Make Text <span style="text-decoration: line-through;">Strikethrough</span></div>
            <div>
                <div><strong>Shortcuts</strong></div>
                <div>Windows/Linus: <strong>Control X</strong></div>
                <div>MacOS: <strong>Cmd X</strong></div>
            </div>
            </q-tooltip>
        </q-btn>
        <q-separator vertical inset />
        <q-select
            v-model="fontFamily"
            :options="fontFamilyOptions"
            label="Font Family"
            color="teal"
            dense
            options-selected-class="selected-item-color"
            class="font-family-select"
            @update:model-value = "v => changeFontFamily(v.value)"
        >
            <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
                <q-item-section>
                <q-item-label v-html="scope.opt.label" />
                </q-item-section>
                <q-item-section avatar>
                <q-icon :name="scope.opt.icon" />
                </q-item-section>
            </q-item>
            </template>
        </q-select>
        <q-select
            v-model="fontSize"
            :options="fontSizeOptions"
            label="Font Size"
            color="teal"
            dense
            options-selected-class="selected-item-color"
            class="font-family-select"
            @update:model-value = "v => changeFontSize(v.value)"
        >
            <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
                <q-item-section>
                <q-item-label v-html="scope.opt.label" />
                </q-item-section>
                <q-item-section avatar>
                <q-icon :name="scope.opt.icon" />
                </q-item-section>
            </q-item>
            </template>
        </q-select>
        <q-select
            v-model="blockType"
            :options="blockTypeOptions"
            label="Block Type"
            color="teal"
            dense
            options-selected-class="selected-item-color"
            class="font-family-select"
            @update:model-value = "v => changeBlockType(v.value)"
        >
            <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
                <q-item-section>
                <q-item-label v-html="scope.opt.label" />
                </q-item-section>
                <q-item-section avatar>
                <q-icon :name="scope.opt.icon" />
                </q-item-section>
            </q-item>
            </template>
        </q-select>
        <q-separator vertical inset />
        <q-btn flat padding="xs" icon="format_align_left" @click="toggleTextAlignment('left')" :class="{ 'menu-button-active': editor.isActive({ textAlign: 'left' }) }">
            <q-tooltip class="menu-button-tooltip">
            <div>Text Align Left</div>
            <div>
                <div><strong>Shortcuts</strong></div>
                <div>Windows/Linus: <strong>Control Shift L</strong></div>
                <div>MacOS: <strong>Cmd Shift L</strong></div>
            </div>
            </q-tooltip>
        </q-btn>
        <q-btn flat padding="xs" icon="format_align_center" @click="toggleTextAlignment('center')" :class="{ 'menu-button-active': editor.isActive({ textAlign: 'center' }) }">
            <q-tooltip class="menu-button-tooltip">
            <div>Text Align Center</div>
            <div>
                <div><strong>Shortcuts</strong></div>
                <div>Windows/Linus: <strong>Control Shift E</strong></div>
                <div>MacOS: <strong>Cmd Shift E</strong></div>
            </div>
            </q-tooltip>
        </q-btn>
        <q-btn flat padding="xs" icon="format_align_right" @click="toggleTextAlignment('right')" :class="{ 'menu-button-active': editor.isActive({ textAlign: 'right' }) }">
            <q-tooltip class="menu-button-tooltip">
            <div>Text Align Right</div>
            <div>
                <div><strong>Shortcuts</strong></div>
                <div>Windows/Linus: <strong>Control Shift R</strong></div>
                <div>MacOS: <strong>Cmd Shift R</strong></div>
            </div>
            </q-tooltip>
        </q-btn>
        <q-btn flat padding="xs" icon="format_align_justify" @click="toggleTextAlignment('justify')" :class="{ 'menu-button-active': editor.isActive({ textAlign: 'justify' }) }">
            <q-tooltip class="menu-button-tooltip">
            <div>Text Align Justify</div>
            <div>
                <div><strong>Shortcuts</strong></div>
                <div>Windows/Linus: <strong>Control Shift J</strong></div>
                <div>MacOS: <strong>Cmd Shift J</strong></div>
            </div>
            </q-tooltip>
        </q-btn>
        <q-separator vertical inset />
        <q-btn flat padding="xs" icon="format_list_bulleted" @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'menu-button-active': editor.isActive('bulletList') }">
            <q-tooltip class="menu-button-tooltip">
            <div>Bulleted List</div>
            <div>
                <div><strong>Shortcuts</strong></div>
                <div>Windows/Linus: <strong>Control Shift 8</strong></div>
                <div>MacOS: <strong>Cmd Shift 8</strong></div>
            </div>
            </q-tooltip>
        </q-btn>
        <q-btn flat padding="xs" icon="format_list_numbered" @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'menu-button-active': editor.isActive('orderedList') }">
            <q-tooltip class="menu-button-tooltip">
            <div>Ordered List</div>
            <div>
                <div><strong>Shortcuts</strong></div>
                <div>Windows/Linus: <strong>Control Shift 7</strong></div>
                <div>MacOS: <strong>Cmd Shift 7</strong></div>
            </div>
            </q-tooltip>
        </q-btn>
        <q-btn flat padding="xs" icon="code" @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'menu-button-active': editor.isActive('codeBlock') }">
            <q-tooltip class="menu-button-tooltip">
            <div>Code Block</div>
            <div>
                <div><strong>Shortcuts</strong></div>
                <div>Windows/Linus: <strong>Control Alt C</strong></div>
                <div>MacOS: <strong>Cmd Alt C</strong></div>
            </div>
            </q-tooltip>
        </q-btn>
        <q-btn flat padding="xs" icon="format_indent_increase" @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'menu-button-active': editor.isActive('blockquote') }">
            <q-tooltip class="menu-button-tooltip">
            <div>Block Quote</div>
            <div>
                <div><strong>Shortcuts</strong></div>
                <div>Windows/Linus: <strong>Control Shift B</strong></div>
                <div>MacOS: <strong>Cmd Shift B</strong></div>
            </div>
            </q-tooltip>
        </q-btn>
        <q-separator vertical inset />
        <q-btn flat padding="xs" icon="insert_photo" @click="addImage">
            <q-tooltip class="menu-button-tooltip">
            <div>Insert Image</div>
            </q-tooltip>
        </q-btn>
        <q-btn flat padding="xs" icon="link" @click="setLink" :class="{ 'menu-button-active': editor.isActive('link') }">
            <q-tooltip class="menu-button-tooltip">
            <div>Link</div>
            <div>
                <div><strong>Shortcuts</strong></div>
                <div>Windows/Linus: <strong>Control Shift 8</strong></div>
                <div>MacOS: <strong>Cmd Shift 8</strong></div>
            </div>
            </q-tooltip>
        </q-btn>
        <q-btn flat padding="xs" icon="horizontal_rule" @click="editor.chain().focus().setHorizontalRule().run()">
            <q-tooltip class="menu-button-tooltip">
            <div>Insert Horizontal Rule</div>
            <div>
                <div><strong>Shortcuts</strong></div>
                <div>Windows/Linus: <strong>Control Shift 8</strong></div>
                <div>MacOS: <strong>Cmd Shift 8</strong></div>
            </div>
            </q-tooltip>
        </q-btn>
        <q-separator vertical inset />
        <q-btn flat padding="xs" icon="format_color_text">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-color 
                    v-model="fontColor"
                    @update:model-value = "changeTextColor()"
                />
            </q-popup-proxy>
            <q-tooltip class="menu-button-tooltip">
            <div>Set Text Color</div>
            <div>
                <div><strong>Shortcuts</strong></div>
                <div>Windows/Linus: <strong>Control Shift 8</strong></div>
                <div>MacOS: <strong>Cmd Shift 8</strong></div>
            </div>
            </q-tooltip>
        </q-btn>
        <q-btn flat padding="xs" icon="border_color">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-color v-model="fontHighlight"
              @update:model-value = "changeHighlightColor()"
               />
            </q-popup-proxy>
            <q-tooltip class="menu-button-tooltip">
            <div>Set Text Color</div>
            <div>
                <div><strong>Shortcuts</strong></div>
                <div>Windows/Linus: <strong>Control Shift 8</strong></div>
                <div>MacOS: <strong>Cmd Shift 8</strong></div>
            </div>
            </q-tooltip>
        </q-btn>
        <q-btn flat padding="xs" icon="highlight" @click="editor.chain().focus().toggleHighlight().run()" :class="{ 'menu-button-active': editor.isActive('highlight') }">
            <q-tooltip class="menu-button-tooltip">
            <div><mark>Highlight</mark> Text</div>
            <div>
                <div><strong>Shortcuts</strong></div>
                <div>Windows/Linus: <strong>Control Shift H</strong></div>
                <div>MacOS: <strong>Cmd Shift H</strong></div>
            </div>
            </q-tooltip>
        </q-btn>
        <q-separator vertical inset />
        <q-btn flat padding="xs" icon="format_clear" @click="editor.chain().focus().unsetAllMarks().run()">
            <q-tooltip class="menu-button-tooltip">
            <div>Clear Formating</div>
            <div>
                <div><strong>Shortcuts</strong></div>
                <div>Windows/Linus: <strong>Control Shift 8</strong></div>
                <div>MacOS: <strong>Cmd Shift 8</strong></div>
            </div>
            </q-tooltip>
        </q-btn>
        <q-btn flat padding="xs" icon="format_clear" @click="imageSelector = true">
        </q-btn>
    </q-toolbar>
    <image-dialog :show="imageSelector" @newBorder="testEmit" :images="imageSelection" ref="iDialog" />
</template>

<script lang="ts">
import { Editor } from '@tiptap/vue-3';
import { defineComponent, inject, Ref, ref } from 'vue';
import * as InjectionKeys from '../Types/injection-keys'
import SelectItem from '../Types/select-item'
import imageDialog from '../ImageDialog/ImageDialog.vue'
export default defineComponent({
  components: {
      imageDialog
  },

  setup() {
    interface imageDialog {
        showDialog: () => void
    }
    const iDialog = ref<imageDialog>()
    const imageSelection = ref([
                                {'url':'https://www.mifo.com/testimages/image1.jpg','thumbnailUrl':'https://www.mifo.com/testimages/image1_tn.jpg'},
                                {'url':'https://www.mifo.com/testimages/image2.jpg','thumbnailUrl':'https://www.mifo.com/testimages/image2_tn.jpg'},
                                {'url':'https://www.mifo.com/testimages/image3.jpg','thumbnailUrl':'https://www.mifo.com/testimages/image3_tn.jpg'},
                                {'url':'https://www.mifo.com/testimages/image4.jpg','thumbnailUrl':'https://www.mifo.com/testimages/image4_tn.jpg'},
                                {'url':'https://www.mifo.com/testimages/image5.jpg','thumbnailUrl':'https://www.mifo.com/testimages/image5_tn.jpg'},
                                {'url':'https://www.mifo.com/testimages/image6.jpg','thumbnailUrl':'https://www.mifo.com/testimages/image6_tn.jpg'},
                                {'url':'https://www.mifo.com/testimages/image7.jpg','thumbnailUrl':'https://www.mifo.com/testimages/image7_tn.jpg'},
                                {'url':'https://www.mifo.com/testimages/image8.jpg','thumbnailUrl':'https://www.mifo.com/testimages/image8_tn.jpg'},
                                {'url':'https://www.mifo.com/testimages/image9.jpg','thumbnailUrl':'https://www.mifo.com/testimages/image9_tn.jpg'},
                                {'url':'https://www.mifo.com/testimages/image10.jpg','thumbnailUrl':'https://www.mifo.com/testimages/image10_tn.jpg'},
                                {'url':'https://www.mifo.com/testimages/image11.jpg','thumbnailUrl':'https://www.mifo.com/testimages/image11_tn.jpg'},
                                {'url':'https://www.mifo.com/testimages/image12.jpg','thumbnailUrl':'https://www.mifo.com/testimages/image12_tn.jpg'},
                                ])
    const editor = inject(InjectionKeys.editorKey) as Ref<Editor>
    const fontFamily = inject(InjectionKeys.fontFamilyKey) as Ref<SelectItem>
    const fontFamilyOptions = inject(InjectionKeys.fontFamilyOptionsKey) as Ref<SelectItem[]>
    const fontSize = inject(InjectionKeys.fontSizeKey) as Ref<SelectItem>
    const fontSizeOptions = inject(InjectionKeys.fontSizeOptionsKey) as Ref<SelectItem[]>
    const blockType = inject(InjectionKeys.blockTypeKey) as Ref<SelectItem>
    const blockTypeOptions = inject(InjectionKeys.blockTypeOptionsKey) as Ref<SelectItem[]>
    const fontColor = inject('fontColor') as Ref<string>
    const fontHighlight = inject('fontHighlight') as Ref<string>
    const imageSelector = ref(false)
    fontFamily.value = fontFamilyOptions.value[0]
    fontSize.value = fontSizeOptions.value[0]
    blockType.value = blockTypeOptions.value[0]
    function setLink() {
        const url = window.prompt('URL')
        if (url) {
            editor.value?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
        }
    }

    function checkMark(inMark) {
        if (editor.value.getAttributes(inMark).fontSize) {
            return true
        } else {
            return false
        }
    }
    const testEmit = (e) => {
        // console.log('EVENT EMITTED: ' + e)
        console.log(e)
    }
    const changeFontFamily = (value: string) => {
        editor.value.chain().focus().setFontFamily(value).run()
    }

    const changeFontSize = (value) => {
        editor.value.chain().focus().setFontSize(value).run()
    }
    const changeBlockType = (value) => {
        switch(value) {
            case 'paragraph':
                editor.value.chain().focus().setParagraph().run()
                break
            case 'h1':
                editor.value.chain().focus().toggleHeading({ level: 1 }).run()
                break
            case 'h2':
                editor.value.chain().focus().toggleHeading({ level: 2 }).run()
                break
            case 'h3':
                editor.value.chain().focus().toggleHeading({ level: 3 }).run()
                break
            case 'h4':
                editor.value.chain().focus().toggleHeading({ level: 4 }).run()
                break
            case 'h5':
                editor.value.chain().focus().toggleHeading({ level: 5 }).run()
                break
            case 'h6':
                editor.value.chain().focus().toggleHeading({ level: 6 }).run()
                break                
            default:
                editor.value.chain().focus().setParagraph().run()
        } 
    }

    const addImage = () => {
    console.log('SET IMAGE SELECTOR TRUEXXX')
    // imageSelector.value = true
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    
    if (iDialog.value){
        iDialog.value.showDialog()
    }

    // iDialog.showSettings()
    //   const url = window.prompt('URL')
    //   if (url) {
    //     editor.value.chain().focus().setImage({ src: url }).run()
    //   }
    }

    const changeTextColor = () => {
        editor.value.chain().focus().setFontColor(fontColor.value).run()
    }

    const changeHighlightColor = () => {
        editor.value.chain().focus().setFontBackgroundColor(fontHighlight.value).run()
    }

    const toggleTextAlignment = (value) => {
        if (value === 'left') {
            if (editor.value.isActive({ textAlign: 'left' })) {
                editor.value.chain().focus().unsetTextAlign().run()
            } else {
                editor.value.chain().focus().setTextAlign('left').run()
            }
        }

        if (value === 'center') {
            if (editor.value.isActive({ textAlign: 'center' })) {
                editor.value.chain().focus().unsetTextAlign().run()
            } else {
                editor.value.chain().focus().setTextAlign('center').run()
            }
        }

        if (value === 'right') {
            if (editor.value.isActive({ textAlign: 'right' })) {
                editor.value.chain().focus().unsetTextAlign().run()
            } else {
                editor.value.chain().focus().setTextAlign('right').run()
            }
        }

        if (value === 'justify') {
            if (editor.value.isActive({ textAlign: 'justify' })) {
                editor.value.chain().focus().unsetTextAlign().run()
            } else {
                editor.value.chain().focus().setTextAlign('justify').run()
            }
        }
    }
    return { 
        editor, 
        setLink, 
        checkMark, 
        addImage, 
        fontFamily, 
        fontFamilyOptions, 
        changeFontFamily, 
        fontSize, 
        fontSizeOptions, 
        changeFontSize, 
        blockType, 
        blockTypeOptions, 
        changeBlockType,
        toggleTextAlignment,
        fontColor,
        changeTextColor,
        changeHighlightColor,
        fontHighlight,
        imageSelector,
        testEmit,
        imageSelection,
        iDialog
    }
  },
})
</script>