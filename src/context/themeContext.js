import React from 'react';

const colors = {
  primary: '#db0504',
  primaryDarker: '#800100',
  secondary: '#e84a07',
  secondaryDarker: '#612004',
  tertiary: '#ff9900',
  light: '#eff5dc',
  textLight: '#ccd2df',
  textDark: '#800100',
  bgLight: '#fff0f0',
  bgPrimaryLight: '#ffbfbf',
  bgPrimaryLighter: '#fff0f0',
  bgDark: '#272727',
  bgDarker: '#212121',
};

export const themes = {
  light: {
    primary: colors.primary,
    primaryDarker: colors.primaryDarker,
    secondary: colors.secondary,
    secondaryDarker: colors.secondaryDarker,
    tertiary: colors.tertiary,
    light: colors.light,
    foreground: colors.textDark,
    background: colors.bgLight,
    controlForeground: colors.textDark,
    controlBackground: colors.bgPrimaryLight,
    controlBackgroundFocus: colors.bgPrimaryLighter,
  },
  dark: {
    primary: colors.primary,
    primaryDarker: colors.primaryDarker,
    secondary: colors.secondary,
    secondaryDarker: colors.secondaryDarker,
    tertiary: colors.tertiary,
    light: colors.light,
    foreground: colors.textLight,
    background: colors.bgDark,
    controlForeground: colors.textLight,
    controlBackground: colors.bgDarker,
    controlBackgroundFocus: colors.bgDark,
  },
};

export const ThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => { }
});
