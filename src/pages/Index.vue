<template>
  <q-page class="">
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
    onMounted(() => {
        console.log('mounted!')
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
      return { maineditor }
    }

});
</script>
