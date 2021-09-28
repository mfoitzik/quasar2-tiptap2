<template>
  <q-page class="">
    <button type="button" @click="consolehtml">TEST</button><button type="button" @click="testset">TESTSET</button><button type="button" @click="testimageset">TESTIMAGES</button><button type="button" @click="testparse">TESTPARSE</button>
    <tip-tap ref="maineditor" />
  </q-page>
</template>

<script lang="ts">
import tipTap from '../components/Tiptap.vue';
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  components: { tipTap },
  
  setup() {
    const maineditor =  ref<typeof tipTap>()
    const consolehtml = () => {
      if (maineditor.value) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        console.log(maineditor.value.getContent())
      }
      
    }

    const testset = () => {
      if (maineditor.value) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        console.log(maineditor.value.setContent('<h1>hello world</h1>'))
      }
    }
    const testparse = () => {
      console.log(isNaN(parseFloat('-2.3px')))
      console.log(parseFloat('-2.3px'))
    }
    const testimageset = () => {
      if (maineditor.value) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        maineditor.value?.setImageSelections([{'url':'https://www.mifo.com/testimages/image5.jpg','thumbnailUrl':'https://www.mifo.com/testimages/image5_tn.jpg'},
                                {'url':'https://www.mifo.com/testimages/image6.jpg','thumbnailUrl':'https://www.mifo.com/testimages/image6_tn.jpg'},
                                {'url':'https://www.mifo.com/testimages/image7.jpg','thumbnailUrl':'https://www.mifo.com/testimages/image7_tn.jpg'},
                                {'url':'https://www.mifo.com/testimages/image8.jpg','thumbnailUrl':'https://www.mifo.com/testimages/image8_tn.jpg'},
                                {'url':'https://www.mifo.com/testimages/image9.jpg','thumbnailUrl':'https://www.mifo.com/testimages/image9_tn.jpg'},
                                {'url':'https://www.mifo.com/testimages/image10.jpg','thumbnailUrl':'https://www.mifo.com/testimages/image10_tn.jpg'},
                                {'url':'https://www.mifo.com/testimages/image11.jpg','thumbnailUrl':'https://www.mifo.com/testimages/image11_tn.jpg'},
                                {'url':'https://www.mifo.com/testimages/image12.jpg','thumbnailUrl':'https://www.mifo.com/testimages/image12_tn.jpg'}])
      }
    }
    onMounted(() => {
        console.log('mounted!')
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        console.log(maineditor.value?.getContent())
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        maineditor.value?.setImageSelections([{'url':'https://www.mifo.com/testimages/image1.jpg','thumbnailUrl':'https://www.mifo.com/testimages/image1_tn.jpg'},
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
                                {'url':'https://www.mifo.com/testimages/image12.jpg','thumbnailUrl':'https://www.mifo.com/testimages/image12_tn.jpg'}])
        window.addEventListener('message', (event) => {
           // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (event.data.command === 'set') {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
            maineditor.value?.setContent(event.data.content)
          }
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (event.data.command === 'get') {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
            window.parent.postMessage({command:'setblock', content: maineditor.value?.getContent()}, '*')
          }
        }, false);
      })
      return { maineditor, consolehtml, testset, testimageset, testparse }
    }

});
</script>
