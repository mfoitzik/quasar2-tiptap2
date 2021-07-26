<template>
  <q-page class="">
    <tip-tap ref="maineditor" />
  </q-page>
</template>

<script lang="ts">
import tipTap from '../components/Tiptap.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  components: { tipTap },
  setup() {
    const maineditor = ref<typeof tipTap>()

      return {maineditor}
    }

});
</script>
