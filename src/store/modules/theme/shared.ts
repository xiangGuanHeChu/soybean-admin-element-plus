import { getColorPalette } from '@sa/color-palette';
import { getRgbOfColor } from '@sa/utils';
import { themeVars } from '@/theme/vars';
import { getElementPlusThemeVars } from './element-plus';

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
  const themeTokens: App.Theme.ThemeToken = {
    colors: {
      ...createThemePaletteColors({
        primary: '#646cff',
        info: '#2080f0',
        success: '#52c41a',
        warning: '#faad14',
        error: '#f5222d'
      }),
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
 * get theme token vars
 * @param tokens
 */
function getThemeTokenVars(tokens: App.Theme.BaseToken) {
  const themeTokenVars = {} as App.Theme.BaseTokenVars;
  const themeTokenVarsArray: string[] = [];

  function removeVarPrefix(value: string) {
    return value.replace('var(', '').replace(')', '');
  }

  function removeRgbPrefix(value: string) {
    return value.replace('rgb(', '').replace(')', '');
  }

  for (const [key, tokenValues] of Object.entries(themeVars as unknown as App.Theme.BaseToken)) {
    themeTokenVars[key] = {};

    for (const [tokenKey, tokenValue] of Object.entries(tokenValues)) {
      let cssVarsKey = removeVarPrefix(tokenValue);
      let cssValue = tokens[key][tokenKey];

      if (key === 'colors') {
        cssVarsKey = removeRgbPrefix(cssVarsKey);
        const { r, g, b } = getRgbOfColor(cssValue);
        cssValue = `${r}, ${g}, ${b}`;
      }

      themeTokenVars[key][tokenKey] = {
        cssVarsKey,
        cssValue
      };

      themeTokenVarsArray.push(`${cssVarsKey}: ${cssValue}`);
    }
  }

  const themeTokenVarStr = themeTokenVarsArray.join(';');

  const result = {
    themeTokenVars,
    themeTokenVarStr
  } as {
    themeTokenVars: App.Theme.ThemeTokenVars;
    themeTokenVarStr: string;
  };

  return result;
}

/**
 * add theme vars to html
 * @param tokens
 */
export function setupThemeVarsToHtml<T extends App.Theme.BaseToken>(tokens: T, darkTokens: T) {
  const { themeTokenVars, themeTokenVarStr: cssVarStr } = getThemeTokenVars(tokens);
  const { themeTokenVarStr: darkCssVarStr } = getThemeTokenVars(darkTokens);
  const elementPlusCssVarStr = getElementPlusThemeVars(themeTokenVars);
  const elementPlusDarkCssVarStr = getElementPlusThemeVars(themeTokenVars, true);

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
