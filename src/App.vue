<script setup lang="ts">
// import { useThemeStore } from './store/modules/theme';

defineOptions({
  name: 'App'
});
</script>

<template>
  <ElConfigProvider>
    <RouterView />
  </ElConfigProvider>
</template>

<style scoped></style>
