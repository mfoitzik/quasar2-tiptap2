<template>
  <div class="row editor-wrapper">
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
import Image from '@tiptap/extension-image'
import Dropcursor from '@tiptap/extension-dropcursor'
import Underline from '@tiptap/extension-underline'
import MenuBar from './Menu/MenuBar.vue'
import initialContent from './Content/initial-content'
import { defineComponent, ref, provide } from 'vue';
export default defineComponent({
  components: {
    EditorContent, MenuBar
  },

  setup() {
    const editor = ref(useEditor({
      content: initialContent,
      extensions: [
        StarterKit,
        Document,
        Paragraph,
        Text,
        Heading,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
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
        Image,
        Dropcursor,
        Underline,
        
      ],
      autofocus: true,
      onSelectionUpdate({ editor }) {
        fontFamily.value = fontFamilyOptions.value[0]
        fontFamilyOptions.value.forEach(element => {
            element.icon = ''
        });
        fontSize.value = fontSizeOptions.value[0]
        fontSizeOptions.value.forEach(element => {
            element.icon = ''
        });
        fontFamilyOptions.value.forEach(element => {
            const qRemoved = element.value.replace(/["]+/g, '')
            if (editor.isActive('textStyle', { fontFamily: element.value }) || editor.isActive('textStyle', { fontFamily: qRemoved })) {
                element.icon = 'done' 
                fontFamily.value = element
            }
        });
        fontSizeOptions.value.forEach(element => {
            if (editor.isActive('textStyle', { fontSize: element.value })) {
                element.icon = 'done' 
                fontSize.value = element
            }
        });
      },
    }))

    const fontFamilyOptions = ref([
        {
          label: 'default',
          value: '',
          icon: ''
        },
        {
          label: 'garamond',
          value: '"Palatino Linotype", Palatino, Palladio, "URW Palladio L", "Book Antiqua", Baskerville, "Bookman Old Style", "Bitstream Charter", "Nimbus Roman No9 L", Garamond, "Apple Garamond", "ITC Garamond Narrow", "New Century Schoolbook", "Century Schoolbook", "Century Schoolbook L", Georgia, serif',
          icon: ''
        },
        {
          label: 'georgia',
          value: 'Constantia, "Lucida Bright", Lucidabright, "Lucida Serif", Lucida, "DejaVu Serif", "Bitstream Vera Serif", "Liberation Serif", Georgia, serif',
          icon: ''
        },
        {
          label: 'helvetica',
          value: 'Frutiger, "Frutiger Linotype", Univers, Calibri, "Gill Sans", "Gill Sans MT", "Myriad Pro", Myriad, "DejaVu Sans Condensed", "Liberation Sans", "Nimbus Sans L", Tahoma, Geneva, "Helvetica Neue", Helvetica, Arial, sans-serif',
          icon: ''
        },
        {
          label: 'impact',
          value: 'Impact, Haettenschweiler, "Franklin Gothic Bold", Charcoal, "Helvetica Inserat", "Bitstream Vera Sans Bold", "Arial Black", sans-serif',
          icon: ''
        },
        {
          label: 'mono',
          value: 'Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace',
          icon: ''
        },
        {
          label: 'system',
          value: 'system, -apple-system, ".SFNSText-Regular", "San Francisco", "Roboto", "Segoe UI", "Helvetica Neue", "Lucida Grande", sans-serif',
          icon: ''
        },
        {
          label: 'times',
          value: 'Cambria, "Hoefler Text", Utopia, "Liberation Serif", "Nimbus Roman No9 L Regular", Times, "Times New Roman", serif',
          icon: ''
        },
        {
          label: 'trebuchet',
          value: '"Segoe UI", Candara, "Bitstream Vera Sans", "DejaVu Sans", "Bitstream Vera Sans", "Trebuchet MS", Verdana, "Verdana Ref", sans-serif',
          icon: ''
        },
        {
          label: 'verdana',
          value: 'Corbel, "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", "DejaVu Sans", "Bitstream Vera Sans", "Liberation Sans", Verdana, "Verdana Ref", sans-serif',
          icon: ''
        }
      ])
    const fontFamily = ref({})
    const fontSize = ref({})
    const fontSizeOptions = ref([
        {
          label: 'default',
          value: '',
          icon: ''
        },
        {
          label: '12px',
          value: '12px',
          icon: ''
        },
        {
          label: '14px',
          value: '14px',
          icon: ''
        },
        {
          label: '16px',
          value: '16px',
          icon: ''
        },
        {
          label: '18px',
          value: '18px',
          icon: ''
        },
        {
          label: '20px',
          value: '20px',
          icon: ''
        },
        {
          label: '22px',
          value: '22px',
          icon: ''
        },
        {
          label: '24px',
          value: '24px',
          icon: ''
        },
        {
          label: '26px',
          value: '26px',
          icon: ''
        },
        {
          label: '28px',
          value: '28px',
          icon: ''
        },
        {
          label: '30px',
          value: '30px',
          icon: ''
        },
      ])
    const blockType = ref({})
    const blockTypeOptions = ref([
        {
        label: 'paragraph',
        value: 'paragraph',
        icon: ''
        },
        {
        label: 'Heading 1',
        value: 'h1',
        icon: ''
        },
        {
        label: 'Heading 2',
        value: 'h2',
        icon: ''
        },
        {
        label: 'Heading 3',
        value: 'h3',
        icon: ''
        },
        {
        label: 'Heading 4',
        value: 'h4',
        icon: ''
        },
        {
        label: 'Heading 5',
        value: 'h5',
        icon: ''
        },
        {
        label: 'Heading 6',
        value: 'h6',
        icon: ''
        },
    ])
    const fontColor = ref('#000000FF')
    const fontHighlight = ref('00FFFF')
    function getContent() {
        return editor?.value?.getHTML()
    }
    const setContent = (val: string) => {
        editor?.value?.commands?.setContent(val)
    }
   
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    provide('mainEditor', editor)
    provide('fontFamily', fontFamily)
    provide('fontFamilyOptions', fontFamilyOptions)
    provide('fontSize', fontSize)
    provide('fontSizeOptions', fontSizeOptions)
    provide('blockType', blockType)
    provide('blockTypeOptions', blockTypeOptions)
    provide('fontColor', fontColor)
    provide('fontHighlight', fontHighlight)
    return { editor, getContent, setContent, fontFamilyOptions, fontFamily, fontSize, fontSizeOptions, blockType, blockTypeOptions, fontColor, fontHighlight }
  },
})
</script>