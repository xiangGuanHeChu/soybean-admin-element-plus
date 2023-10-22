import { getColorPalette } from '@sa/color-palette';
import { mixColor, getRgbOfColor } from '@sa/utils';
import { themeVars } from '@/theme/vars';

const DARK_CLASS = 'dark';

/**
 * init theme settings
 * @param darkMode is dark mode
 */
export function initThemeSettings(colors: App.Theme.ThemeTokenColor) {
  const { primary: themeColor, info, success, warning, error } = colors;

  const themeSettings: App.Theme.ThemeSetting = {
    colorScheme: 'light',
    themeColor,
    otherColor: {
      info,
      success,
      warning,
      error
    }
  };

  return themeSettings;
}

/**
 * create theme token
 * @param darkMode is dark mode
 */
export function createThemeToken() {
  const paletteColors = createThemePaletteColors({
    primary: '#646cff',
    info: '#2080f0',
    success: '#52c41a',
    warning: '#faad14',
    error: '#f5222d'
  });

  const themeTokens: App.Theme.ThemeToken = {
    colors: {
      ...paletteColors,
      nprogress: paletteColors.primary,
      container: 'rgba(255, 255, 255, 0.8)',
      layout: 'rgba(247, 250, 252, 1)',
      base_text: 'rgba(0, 0, 0, 0.88)'
    },
    boxShadow: {
      header: '0 1px 2px rgb(0, 21, 41, 0.08)',
      sider: '2px 0 8px 0 rgb(29, 35, 41, 0.05)',
      tab: '0 1px 2px rgb(0, 21, 41, 0.08)'
    }
  };

  const darkThemeTokens: App.Theme.ThemeToken = {
    colors: {
      ...themeTokens.colors,
      container: 'rgb(33, 33, 33)',
      layout: 'rgb(18, 18, 18)',
      base_text: 'rgba(255, 255, 255, 0.88)'
    },
    boxShadow: {
      ...themeTokens.boxShadow
    }
  };

  return {
    themeTokens,
    darkThemeTokens
  };
}

/**
 * add theme vars to html
 * @param tokens
 */
export function setupThemeVarsToHtml<T extends App.Theme.BaseToken>(tokens: T, darkTokens: T) {
  const cssVarStr = getCssVarByTokens(tokens);
  const darkCssVarStr = getCssVarByTokens(darkTokens);

  const paletteColors = tokens.colors as App.Theme.ThemePaletteColor;
  const elementPlusCssVarStr = getElementPlusThemeVars(paletteColors);
  const elementPlusDarkCssVarStr = getElementPlusThemeVars(paletteColors, true);

  const css = `
    :root {
      ${elementPlusCssVarStr}
    }

    html {
      ${cssVarStr};
    }
  `;

  const darkCss = `
    html.${DARK_CLASS} {
      ${darkCssVarStr};
      ${elementPlusDarkCssVarStr};
    `;

  const style = document.createElement('style');

  style.innerText = css + darkCss;

  document.head.appendChild(style);
}

/**
 * toggle css dark mode
 * @param darkMode
 */
export function toggleCssDarkMode(darkMode = false) {
  function addDarkClass() {
    document.documentElement.classList.add(DARK_CLASS);
  }

  function removeDarkClass() {
    document.documentElement.classList.remove(DARK_CLASS);
  }

  if (darkMode) {
    addDarkClass();
  } else {
    removeDarkClass();
  }
}

/**
 * create theme palette colors
 * @param colors theme colors
 */
function createThemePaletteColors(colors: App.Theme.ThemeColor) {
  const colorKeys = Object.keys(colors) as App.Theme.ThemeColorKey[];
  const colorPaletteVar = {} as App.Theme.ThemePaletteColor;

  colorKeys.forEach(key => {
    const { palettes, main } = getColorPalette(colors[key], key);

    colorPaletteVar[key] = main.hexcode;

    palettes.forEach(item => {
      colorPaletteVar[`${key}-${item.number}`] = item.hexcode;
    });
  });

  return colorPaletteVar;
}

/**
 * get css var by tokens
 * @param tokens theme base tokens
 */
function getCssVarByTokens(tokens: App.Theme.BaseToken) {
  const styles: string[] = [];

  function removeVarPrefix(value: string) {
    return value.replace('var(', '').replace(')', '');
  }

  function removeRgbPrefix(value: string) {
    return value.replace('rgb(', '').replace(')', '');
  }

  for (const [key, tokenValues] of Object.entries(themeVars)) {
    for (const [tokenKey, tokenValue] of Object.entries(tokenValues)) {
      let cssVarsKey = removeVarPrefix(tokenValue);
      let cssValue = tokens[key][tokenKey];

      if (key === 'colors') {
        cssVarsKey = removeRgbPrefix(cssVarsKey);
        const { r, g, b } = getRgbOfColor(cssValue);
        cssValue = `${r}, ${g}, ${b}`;
      }

      styles.push(`${cssVarsKey}: ${cssValue}`);
    }
  }

  const styleStr = styles.join(';');

  return styleStr;
}

type ElementPlusThemeColor = App.Theme.ThemeColorKey | 'danger';

type ElementPlusThemeColorLightNumber = 3 | 5 | 7 | 8 | 9;

type GetElementThemeColorVarsKey<T extends string> =
  | `--el-color-${T}`
  | `--el-color-${T}-rgb`
  | `--el-color-${T}-light-${ElementPlusThemeColorLightNumber}`
  | `--el-color-${T}-dark-2`;

type ElementPlusThemeVars<T extends ElementPlusThemeColor = ElementPlusThemeColor> = {
  [key in GetElementThemeColorVarsKey<T>]: string;
};

function getElementPlusColorVarsByColor<T extends ElementPlusThemeColor>(
  colorKey: T,
  colorValue: string,
  darkTheme = false
) {
  const colorSchema = darkTheme ? 'dark' : 'light';

  const mixColorMap = {
    light: {
      lightMix: '#ffffff',
      darkMix: '#000000'
    },
    dark: {
      lightMix: '#141414',
      darkMix: '#ffffff'
    }
  };

  const { r, g, b } = getRgbOfColor(colorValue);

  const colorVars: Partial<ElementPlusThemeVars> = {
    [`--el-color-${colorKey}`]: colorValue,
    [`--el-color-${colorKey}-rgb`]: `${r}, ${g}, ${b}`,
    [`--el-color-${colorKey}-dark-2`]: mixColor(colorValue, mixColorMap[colorSchema].darkMix, 0.2)
  };

  const colorIndexes: ElementPlusThemeColorLightNumber[] = [3, 5, 7, 8, 9];

  colorIndexes.forEach(index => {
    const mColor = mixColor(colorValue, mixColorMap[colorSchema].lightMix, index / 10);

    colorVars[`--el-color-${colorKey}-light-${index}`] = mColor;
  });

  return colorVars as ElementPlusThemeVars<T>;
}

function getElementPlusThemeVars(colors: App.Theme.ThemePaletteColor, darkTheme = false) {
  const cssVars = {} as ElementPlusThemeVars;

  const elementPlusColors: ElementPlusThemeColor[] = ['primary', 'info', 'success', 'warning', 'error', 'danger'];

  elementPlusColors.forEach(colorKey => {
    const key = colorKey === 'danger' ? 'error' : colorKey;

    const color = colors[key];

    const colorVars = getElementPlusColorVarsByColor(key, color, darkTheme);

    Object.assign(cssVars, colorVars);
  });

  const cssVarStr = Object.entries(cssVars)
    .map(([key, value]) => `${key}: ${value}`)
    .join(';');

  return cssVarStr;
}
