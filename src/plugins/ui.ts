import type { App } from 'vue';
import ElementPlus, { ElTable } from 'element-plus';

/** global table column align */
ElTable.TableColumn.props.align = {
  type: String,
  default: 'center'
};

/** full import ElementPlus */
export const setupUI = (app: App) => {
  app.use(ElementPlus);
};
