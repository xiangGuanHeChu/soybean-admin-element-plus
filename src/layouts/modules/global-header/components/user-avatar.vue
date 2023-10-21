<script setup lang="ts">
import { ElMessageBox } from 'element-plus';
import { useRouterPush } from '@/hooks/common/router';
import { $t } from '@/locales';
import { useAuthStore } from '@/store/modules/auth';

defineOptions({
  name: 'UserAvatar'
});

const { resetStore } = useAuthStore();
const { routerPushByKey } = useRouterPush();

function logout() {
  ElMessageBox.confirm($t('common.logoutConfirm'), $t('common.tip'), {
    confirmButtonText: $t('common.confirm'),
    cancelButtonText: $t('common.cancel')
  }).then(() => {
    resetStore();
  });
}
</script>

<template>
  <ElDropdown>
    <ElButton text class="h-full">
      <div class="flex-y-center">
        <SvgIcon icon="ph:user-circle" class="text-icon-large" />
        <span class="pl-8px text-16px font-medium">Soybean</span>
      </div>
    </ElButton>
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem @click="routerPushByKey('user-center')">
          <div class="flex-y-center">
            <SvgIcon icon="ph:user-circle" class="text-icon" />
            <span class="pl-8px">{{ $t('common.userCenter') }}</span>
          </div>
        </ElDropdownItem>
        <ElDropdownItem divided @click="logout">
          <div class="flex-y-center">
            <SvgIcon icon="ph:sign-out" class="text-icon" />
            <span class="pl-8px">{{ $t('common.logout') }}</span>
          </div>
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

<style scoped></style>
