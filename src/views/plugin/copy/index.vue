<script lang="ts" setup>
import { onMounted } from 'vue';
// import { useClipboard } from '@vueuse/core';
import { getProductCategroyApi } from '@/service/api';
defineOptions({ name: 'CopyPage' });

// const { copy, isSupported } = useClipboard();

// const source = ref('');

async function handleFetchData() {
  const res = await getProductCategroyApi();
  console.log(res.data);
}
onMounted(() => {
  handleFetchData();
});
</script>

<template>
  <div class="h-full">
    <ElCard header="文本复制" class="h-full card-wrapper"></ElCard>
  </div>
</template>
