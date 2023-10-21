type ElementPlusThemeColor = App.Theme.ThemeColorKey | 'danger';

type ElementPlusThemeColorLightNumber = 3 | 5 | 7 | 8 | 9;

type GetElementThemeColorVarsKey<T extends string> =
  | `--el-color-${T}`
  | `--el-color-${T}-rgb`
  | `--el-color-${T}-light-${ElementPlusThemeColorLightNumber}`
  | `--el-color-${T}-dark-2`;

type ElementPlusThemeVars = {
  [key in GetElementThemeColorVarsKey<ElementPlusThemeColor>]: string;
};

type ElementPlusThemeVarsMap = {
  [key in keyof ElementPlusThemeVars]: keyof App.Theme.ThemePaletteColor;
};

function createElementPlusThemeColorMap<T extends ElementPlusThemeColor>(color: T, dark = false) {
  const colorKey = color === 'danger' ? 'error' : color;

  const colorMap: Partial<ElementPlusThemeVarsMap> = {
    [`--el-color-${color}`]: colorKey,
    [`--el-color-${color}-rgb`]: colorKey,
    [`--el-color-${color}-light-3`]: dark ? 'primary-600' : 'primary-400',
    [`--el-color-${color}-light-5`]: dark ? 'primary-700' : 'primary-300',
    [`--el-color-${color}-light-7`]: dark ? 'primary-800' : 'primary-200',
    [`--el-color-${color}-light-8`]: dark ? 'primary-900' : 'primary-100',
    [`--el-color-${color}-light-9`]: dark ? 'primary-950' : 'primary-50',
    [`--el-color-${color}-dark-2`]: dark ? 'primary-900' : 'primary-100'
  };

  return colorMap as unknown as GetElementThemeColorVarsKey<T>;
}

function createElementPlusThemeColorsMap(dark = false) {
  const map = {} as ElementPlusThemeVarsMap;

  const colorKeys: ElementPlusThemeColor[] = ['primary', 'info', 'success', 'warning', 'error', 'danger'];

  colorKeys.forEach(key => {
    const colorMap = createElementPlusThemeColorMap(key, dark);

    Object.assign(map, colorMap);
  });

  return map;
}

export function getElementPlusThemeVars(themeTokenVars: App.Theme.ThemeTokenVars, dark = false) {
  const colorMap = createElementPlusThemeColorsMap(dark);

  const { colors } = themeTokenVars;

  const colorVarsArray: string[] = [];

  for (const [key, value] of Object.entries(colorMap)) {
    const { cssVarsKey } = colors[value];

    colorVarsArray.push(`${key}: rgb(var(${cssVarsKey}))`);
  }

  const cssVarStr = colorVarsArray.join(';');

  return cssVarStr;
}
