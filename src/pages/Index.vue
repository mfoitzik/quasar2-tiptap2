<template>
  <q-page class="">
    <!--<button type="button" @click="consolehtml">TEST</button><button type="button" @click="testset">TESTSET</button><button type="button" @click="testimageset">TESTIMAGES</button><button type="button" @click="testparse">TESTPARSE</button>-->
    <tip-tap v-if="showEditor == true" ref="maineditor" />
    <q-footer class="column inline items-center no-wrap bg-grey-2 text-white">
      <div>
        <q-btn
          color="primary"
          @click="cancelbtn"
          label="Cancel"
          class="q-ma-sm"
          size="sm"
        /><q-btn
          color="primary"
          size="sm"
          label="OK"
          class="q-ma-sm"
          @click="okbtn"
        />
      </div>
    </q-footer>
  </q-page>
</template>

<script lang="ts">
import tipTap from '../components/Tiptap.vue';
import { defineComponent, onMounted, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'PageIndex',
  components: { tipTap },
//   props:{
//      testprop: {
//        type: String
//      }
//  },
  setup() {
    const maineditor =  ref<typeof tipTap>()
    const showEditor = ref(false)
    const route = useRoute()
    const okbtn = () => {
      window.parent.postMessage(
        {
          command: 'editorOk',
          content: '',
        },
        '*'
      );

    };
    const cancelbtn = () => {
      window.parent.postMessage(
        {
          command: 'editorCancel',
          content: '',
        },
        '*'
      );
    };
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
      // console.log(isNaN(parseFloat('-2.3px')))
      // console.log(parseFloat('-2.3px'))
    }
    const testimageset = () => {
      if (maineditor.value) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        // maineditor.value?.setImageSelections([{'url':'https://www.mifo.com/testimages/image5.jpg','thumbnailUrl':'https://www.mifo.com/testimages/image5_tn.jpg'},
        //                         {'url':'https://www.mifo.com/testimages/image6.jpg','thumbnailUrl':'https://www.mifo.com/testimages/image6_tn.jpg'},
        //                         {'url':'https://www.mifo.com/testimages/image7.jpg','thumbnailUrl':'https://www.mifo.com/testimages/image7_tn.jpg'},
        //                         {'url':'https://www.mifo.com/testimages/image8.jpg','thumbnailUrl':'https://www.mifo.com/testimages/image8_tn.jpg'},
        //                         {'url':'https://www.mifo.com/testimages/image9.jpg','thumbnailUrl':'https://www.mifo.com/testimages/image9_tn.jpg'},
        //                         {'url':'https://www.mifo.com/testimages/image10.jpg','thumbnailUrl':'https://www.mifo.com/testimages/image10_tn.jpg'},
        //                         {'url':'https://www.mifo.com/testimages/image11.jpg','thumbnailUrl':'https://www.mifo.com/testimages/image11_tn.jpg'},
        //                         {'url':'https://www.mifo.com/testimages/image12.jpg','thumbnailUrl':'https://www.mifo.com/testimages/image12_tn.jpg'}])
      }
    }
    onBeforeMount(() => {
      showEditor.value = true
      // console.log('BEFORE MOUNT!')
      // console.log(route.query.mike)
      if (route.query.mike == '456') {
        showEditor.value = true
      }
      // validatorToken.value = route.query.mike as string
    })
    onMounted(() => {
        // console.log('mounted!-------------line62')
        // console.log(maineditor.value?.token as string + 'himike')
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        // console.log(maineditor.value?.getContent())
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        // maineditor.value?.setImageSelections([{'url':'https://www.mifo.com/testimages/image1.jpg','thumbnailUrl':'https://www.mifo.com/testimages/image1_tn.jpg'},
        //                         {'url':'https://www.mifo.com/testimages/image2.jpg','thumbnailUrl':'https://www.mifo.com/testimages/image2_tn.jpg'},
        //                         {'url':'https://www.mifo.com/testimages/image3.jpg','thumbnailUrl':'https://www.mifo.com/testimages/image3_tn.jpg'},
        //                         {'url':'https://www.mifo.com/testimages/image4.jpg','thumbnailUrl':'https://www.mifo.com/testimages/image4_tn.jpg'},
        //                         {'url':'https://www.mifo.com/testimages/image5.jpg','thumbnailUrl':'https://www.mifo.com/testimages/image5_tn.jpg'},
        //                         {'url':'https://www.mifo.com/testimages/image6.jpg','thumbnailUrl':'https://www.mifo.com/testimages/image6_tn.jpg'},
        //                         {'url':'https://www.mifo.com/testimages/image7.jpg','thumbnailUrl':'https://www.mifo.com/testimages/image7_tn.jpg'},
        //                         {'url':'https://www.mifo.com/testimages/image8.jpg','thumbnailUrl':'https://www.mifo.com/testimages/image8_tn.jpg'},
        //                         {'url':'https://www.mifo.com/testimages/image9.jpg','thumbnailUrl':'https://www.mifo.com/testimages/image9_tn.jpg'},
        //                         {'url':'https://www.mifo.com/testimages/image10.jpg','thumbnailUrl':'https://www.mifo.com/testimages/image10_tn.jpg'},
        //                         {'url':'https://www.mifo.com/testimages/image11.jpg','thumbnailUrl':'https://www.mifo.com/testimages/image11_tn.jpg'},
        //                         {'url':'https://www.mifo.com/testimages/image12.jpg','thumbnailUrl':'https://www.mifo.com/testimages/image12_tn.jpg'}])
        window.addEventListener('message', (event) => {
           // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (event.data.command === 'set') {
            // console.log('LINE 86 I AM SETTING CONTENT')
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
            maineditor.value?.setContent(event.data.content)
          }
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (event.data.command === 'setimages') {
            // console.log('LINE 92 I AM SETTING IMAGES***************')
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
            // console.log(event.data.content)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
            maineditor.value?.setImageSelections(JSON.parse(event.data.content))
          }
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (event.data.command === 'get') {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
            window.parent.postMessage({command:'setblock', content: maineditor.value?.getContent()}, '*')
          }
        }, false);
      })
      return { maineditor, cancelbtn, consolehtml, okbtn, testset, testimageset, testparse, showEditor }
  }

});
</script>
