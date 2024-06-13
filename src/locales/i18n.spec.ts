import i18n, {
  init, t, getResource, getLanguage, getResourceBundle, addResourceBundle,
} from '@e1011/i18n-kit'
import { en, cz } from '@e1011/i18n-kit/locales'

describe('i18n, i18next, react-i18next', () => {
  beforeEach(() => {
    init({
      lng: 'en',
      fallbackLng: 'cs',
      debug: true,
      resources: {
        en,
        cz,
      },
    })
  })
  it('should instantiate i18n', () => {
    console.log(i18n)
    console.log(Object.keys(i18n))
    console.log('getLanguage()', getLanguage())
    console.log('i18n.resolvedLanguage', i18n.resolvedLanguage)
    console.log('i18n.languages', i18n.languages)
    console.log('i18n.getDataByLanguage(i18n.resolvedLanguage)', i18n.getDataByLanguage(i18n.resolvedLanguage ?? ''))
    console.log('i18n.t(\'common:confirm\')', t('common:confirm'))
    console.log('i18n.t(\'common:application.numof\', { num: 111 })', t('common:application.numof', { num: 111 }))

    expect(i18n).toBeDefined()
  })

  it('should add resource', () => {
    console.log(getResource('en', 'common', 'confirm'))

    console.log(getResourceBundle('en', 'common'))
    console.log('i18n.t(\'user123:email\')', t('user123:email', ''))

    expect(t('user123:email', '')).toEqual('')


    addResourceBundle('en', 'user123', {
      email: 'Email of User',
    })

    expect(t('user123:email', '')).toEqual('Email of User')
  })
})

