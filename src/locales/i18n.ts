import i18n, { init } from '@e1011/i18n-kit/react'
import { en, cz } from '@e1011/i18n-kit/locales'

import common from 'locales/en/common.json'

const browserLangToLocale: Record<string, string> = {
  cs: 'cz',
  en: 'en',
}

init({
  lng: browserLangToLocale.en,
  fallbackLng: browserLangToLocale.cs,
  debug: true,
  resources: {
    en: { ...en, common },
    cz,
  },
})

export default i18n
