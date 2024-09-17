import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from '@e1011/es-kit'

import './index.scss'
import './locales/i18n'

import { MainComponent } from 'app/App'


declare let loadedJSMountPointId: string

declare let loadedJSAPI: Record<string, unknown>

let rootElm: HTMLElement | undefined

if (typeof loadedJSMountPointId !== 'undefined') {
  console.log('loadedJSMountPointId', loadedJSMountPointId)
  console.log('loadedJSAPI', loadedJSAPI)

  rootElm = window.getCMFNamespace().mountPoints[Symbol.for(loadedJSMountPointId) as symbol] as HTMLElement
}

// example
// const userInfo = (window.getCMFNamespace() as CMFType).getAppUserInfo('ui-coreVite');

// const appConfig = (window.getCMFNamespace() as CMFType).getAppConfig('ui-coreVite');


class UiApp extends HTMLElement {
  connectedCallback(): void {
    const mountPoint = document.createElement('div')

    this.appendChild(mountPoint)

    const reactRoot = createRoot(mountPoint)

    reactRoot.render(
      <StrictMode>
        <ErrorBoundary>
          <MainComponent />
        </ErrorBoundary>
      </StrictMode>,
    )
  }
}

if (rootElm) {
  rootElm.style.width = '100%'
  rootElm.style.height = '100%'
  const reactRoot = createRoot(rootElm)

  reactRoot.render(
    <StrictMode>
      <ErrorBoundary>
        <MainComponent />
      </ErrorBoundary>
    </StrictMode>,
  )
} else {
  customElements.define('ui-app-xx', UiApp)
  // throw new Error('Missing CMF Module element with mountPointId')
  console.error('Missing CMF Module element with mountPointId')
}
