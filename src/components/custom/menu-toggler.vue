<script lang="ts" setup>
defineOptions({ name: 'MenuToggle' });

interface Props {
  collapsed?: boolean;
}

defineProps<Props>();
</script>

<template>
  <ElButton text class="h-full text-icon">
    <SvgIcon v-if="collapsed" icon="line-md:menu-fold-right" />
    <SvgIcon v-else icon="line-md:menu-fold-left" />
  </ElButton>
</template>

<style scoped></style>
