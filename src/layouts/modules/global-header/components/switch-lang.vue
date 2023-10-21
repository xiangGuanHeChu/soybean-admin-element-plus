<script setup lang="ts">
import { ref } from 'vue';
import { setLocale } from '@/locales';
import { localStg } from '@/utils/storage';

defineOptions({
  name: 'SwitchLang'
});

const locale = ref<App.I18n.LangType>(localStg.get('lang') || 'zh-CN');

type LocaleOption = {
  label: string;
  key: App.I18n.LangType;
};

const options: LocaleOption[] = [
  {
    label: '中文',
    key: 'zh-CN'
  },
  {
    label: 'English',
    key: 'en'
  }
];

function handleSelect(key: App.I18n.LangType) {
  locale.value = key;
  setLocale(key);
  localStg.set('lang', key);
}
</script>

<template>
  <ElDropdown placement="bottom">
    <ElButton text class="h-full">
      <div class="flex-y-center">
        <SvgIcon icon="heroicons:language" class="text-icon" />
      </div>
    </ElButton>
    <template #dropdown>
      <ElDropdownMenu :selected-keys="[locale]" :tab-index="0" class="switch-lang">
        <ElDropdownItem
          v-for="option in options"
          :key="option.key"
          :class="{ 'active-dropdown-menu': locale === option.key }"
          @click="handleSelect(option.key)"
        >
          {{ option.label }}
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

<style scoped>
.switch-lang :deep(.el-dropdown-menu__item:hover) {
  background-color: var(--el-fill-color-light);
  color: var(--el-text-color-regular);
}

.switch-lang :deep(.active-dropdown-menu) {
  background-color: var(--el-dropdown-menuItem-hover-fill);
  color: var(--el-dropdown-menuItem-hover-color);
}

.switch-lang :deep(.active-dropdown-menu:hover) {
  background-color: var(--el-dropdown-menuItem-hover-fill);
  color: var(--el-dropdown-menuItem-hover-color);
}
</style>
