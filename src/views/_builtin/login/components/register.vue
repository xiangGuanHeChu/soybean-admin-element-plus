<script setup lang="ts">
import { $t } from '@/locales';
import { useRouterPush } from '@/hooks/common/router';

defineOptions({
  name: 'CodeLogin'
});

const { toggleLoginModule } = useRouterPush();
</script>

<template>
  <ElForm>
    <ElFormItem>
      <ElInput size="large" :placeholder="$t('page.login.common.phonePlaceholder')" />
    </ElFormItem>
    <ElFormItem>
      <ElInput size="large" :placeholder="$t('page.login.common.codePlaceholder')" />
    </ElFormItem>
    <ElButton round class="w-full" @click="toggleLoginModule('pwd-login')">
      {{ $t('page.login.common.back') }}
    </ElButton>
  </ElForm>
</template>

<style scoped></style>
