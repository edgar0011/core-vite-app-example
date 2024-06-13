import { ReactNode } from 'react'
import { ErrorBoundary, LayoutBox, useThemePreference } from '@e1011/es-kit'
import { useTranslations } from '@e1011/i18n-kit/react'

import '@e1011/es-kit/dist/ui/index.css'


export const App = (): ReactNode => {
  useThemePreference()
  return <MainComponent />
}

export const MainComponent = (): ReactNode => {
  const { t } = useTranslations()

  return (
    <ErrorBoundary>
      <LayoutBox width='100%' align='center' direction='column' gap='1rem' padding='1rem'>
        <LayoutBox gap='1rem' padding='1rem' align='end' border='1px solid blue'>
          <h1>CMF_APP</h1>
          <h5>{t('common:app.title')}</h5>
        </LayoutBox>
      </LayoutBox>
    </ErrorBoundary>
  )
}

