<template>
  <div class="row editor-wrapper">
    <!--<button type="button" @click="testbtn">test content</button>-->
    <menu-bar class="editor-menu" />
    <editor-content :editor="editor" />
  </div>
  
</template>

<script lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Heading from '@tiptap/extension-heading'
import Text from '@tiptap/extension-text'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import FontFamily from '@tiptap/extension-font-family'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import FontSize from './CustomExtensions/font-size'
import FontColor from './CustomExtensions/font-color'
import FontBackgroundColor from './CustomExtensions/font-background-color'
import Image from './CustomExtensions/image'
import Dropcursor from '@tiptap/extension-dropcursor'
import Underline from '@tiptap/extension-underline'
import MenuBar from './Menu/MenuBar.vue'
import imageItem from './Types/image-item'
import initialContent from './Content/initial-content'
import { defineComponent, ref, provide } from 'vue';
import blockTypes from './SelectItems/block-type'
import SelectItem from './Types/select-item'
import fontFamilies from './SelectItems/font-family'
import fontSizes from './SelectItems/font-size'
import * as InjectionKeys from './Types/injection-keys'
import VueComponent from './Interactive/Extension'
import testComponent from './Interactive/TestExtension'
import Gapcursor from '@tiptap/extension-gapcursor'

export default defineComponent({
  components: {
    EditorContent, MenuBar
  },
  setup() {
    const editor = useEditor({
      content: initialContent,
      extensions: [
        StarterKit,
        Document,
        Paragraph,
        Text,
        Heading,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        TextStyle,
        FontFamily,
        Highlight.configure({ multicolor: true }),
        Link.configure({openOnClick: false}),
        FontSize,
        FontColor,
        FontBackgroundColor,
        Gapcursor,
        Image,
        Dropcursor,
        Underline,
        VueComponent,
        testComponent
      ],
      autofocus: true,
      onSelectionUpdate({ editor }) {
        fontFamily.value = fontFamilyOptions.value[0]
        fontFamilyOptions.value.forEach(element => {
            element.icon = ''
        })
        fontSize.value = fontSizeOptions.value[0]
        fontSizeOptions.value.forEach(element => {
            element.icon = ''
        })
        fontFamilyOptions.value.forEach(element => {
            const qRemoved = element.value.replace(/["]+/g, '')
            if (editor.isActive('textStyle', { fontFamily: element.value }) || editor.isActive('textStyle', { fontFamily: qRemoved })) {
                element.icon = 'done' 
                fontFamily.value = element
            }
        })
        fontSizeOptions.value.forEach(element => {
            if (editor.isActive('textStyle', { fontSize: element.value })) {
                element.icon = 'done' 
                fontSize.value = element
            }
        })
        blockType.value = blockTypeOptions.value[0]
        blockTypeOptions.value.forEach(element => {
            element.icon = ''
        });
        if (editor.isActive('paragraph')) {
          blockType.value = blockTypeOptions.value[0]
          blockTypeOptions.value[0].icon = 'done'
        }
        if (editor.isActive('heading', { level: 1 })) {
          blockType.value = blockTypeOptions.value[1]
          blockTypeOptions.value[1].icon = 'done'
        }
        if (editor.isActive('heading', { level: 2 })) {
          blockType.value = blockTypeOptions.value[2]
          blockTypeOptions.value[2].icon = 'done'
        }
        if (editor.isActive('heading', { level: 3 })) {
          blockType.value = blockTypeOptions.value[3]
          blockTypeOptions.value[3].icon = 'done'
        }
        if (editor.isActive('heading', { level: 4 })) {
          blockType.value = blockTypeOptions.value[4]
          blockTypeOptions.value[4].icon = 'done'
        }
        if (editor.isActive('heading', { level: 5 })) {
          blockType.value = blockTypeOptions.value[5]
          blockTypeOptions.value[5].icon = 'done'
        }
        if (editor.isActive('heading', { level: 6 })) {
          blockType.value = blockTypeOptions.value[6]
          blockTypeOptions.value[6].icon = 'done'
        }
      },
    })

    const fontFamilyOptions = ref<SelectItem[]>(fontFamilies)
    const fontFamily = ref<SelectItem>({} as SelectItem)
    const fontSize = ref<SelectItem>({} as SelectItem)
    const fontSizeOptions = ref<SelectItem[]>(fontSizes)
    const blockType = ref<SelectItem>({} as SelectItem)
    const blockTypeOptions = ref<SelectItem[]>(blockTypes)
    const fontColor = ref('#000000FF')
    const fontHighlight = ref('00FFFF')
    const imageSelections = ref<imageItem[]>([])
    const getContent = ():string => {
        return editor?.value?.getHTML() || ''
    }
    const setContent = (val: string) => {
        editor?.value?.commands.setContent(val)
    }
    const setImageSelections = (val: imageItem[]) => {
        imageSelections.value = val
    }

    const testbtn = () => {
      console.log(editor.value?.schema)
    }
   
    provide(InjectionKeys.editorKey, editor)
    provide(InjectionKeys.fontFamilyKey, fontFamily)
    provide(InjectionKeys.fontFamilyOptionsKey, fontFamilyOptions)
    provide(InjectionKeys.fontSizeKey, fontSize)
    provide(InjectionKeys.fontSizeOptionsKey, fontSizeOptions)
    provide(InjectionKeys.blockTypeKey, blockType)
    provide(InjectionKeys.blockTypeOptionsKey, blockTypeOptions)
    provide(InjectionKeys.imageSelectionsKey, imageSelections)
    provide('fontColor', fontColor)
    provide('fontHighlight', fontHighlight)
    return { testbtn, editor, getContent, setContent, setImageSelections, fontFamilyOptions, fontFamily, fontSize, fontSizeOptions, blockType, blockTypeOptions, fontColor, fontHighlight, imageSelections }
  },
  methods: {
    getMoreContent() {
      return this.editor?.getHTML() || ''
    }
  }
})
</script>