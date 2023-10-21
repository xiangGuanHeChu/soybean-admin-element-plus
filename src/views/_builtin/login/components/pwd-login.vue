<script setup lang="ts">
import { $t } from '@/locales';
import { loginModuleLabels } from '@/constants/app';
import { useRouterPush } from '@/hooks/common/router';

defineOptions({
  name: 'PwdLogin'
});

const { toggleLoginModule } = useRouterPush();
</script>

<template>
  <ElForm>
    <ElFormItem>
      <ElInput size="large" :placeholder="$t('page.login.common.userNamePlaceholder')" />
    </ElFormItem>
    <ElFormItem>
      <ElInput size="large" :placeholder="$t('page.login.common.passwordPlaceholder')" />
    </ElFormItem>
    <ElSpace direction="vertical" fill size="large" class="w-full">
      <div class="flex-y-center justify-between">
        <ElCheckbox>{{ $t('page.login.pwdLogin.rememberMe') }}</ElCheckbox>
        <ElButton link>{{ $t('page.login.pwdLogin.forgetPassword') }}</ElButton>
      </div>
      <ElButton type="primary" size="large" round>{{ $t('common.confirm') }}</ElButton>
      <div class="flex-y-center justify-between">
        <ElButton class="flex-1" block @click="toggleLoginModule('code-login')">
          {{ loginModuleLabels['code-login'] }}
        </ElButton>
        <div class="w-12px"></div>
        <ElButton class="flex-1" block @click="toggleLoginModule('register')">
          {{ loginModuleLabels.register }}
        </ElButton>
      </div>
    </ElSpace>
  </ElForm>
</template>

<style scoped></style>
