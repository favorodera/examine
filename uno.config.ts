import { defineConfig, presetAttributify, presetIcons, presetTypography, presetUno, presetWebFonts, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  shortcuts: [
    // ...
  ],
  theme: {},
  safelist: [
  ],
  extendTheme: (theme) => {
    return {
      ...theme,
      breakpoints: {
        ...theme.breakpoints,
        break: '999px',
      },
      colors: {
        ...theme.colors,
        brand: {
          background: '#f2f2f2',
          green: '#32bc9b',
          gray: '#979797',
          dark: '#030303',
        },
      },
    }
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
        // ...
      },
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        // ...
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
