import { ReactElement, FC, PropsWithChildren } from 'react'
import { render, RenderOptions, RenderResult, configure } from '@testing-library/react'

type Props = PropsWithChildren<unknown>

const AllTheProviders: FC<Props> = function AllTheProviders ({ children }: Props): ReactElement<unknown> {
  return (
    <div id='jest-test-wrapper'>
      {children}
    </div>
  ) as ReactElement<unknown>
}

const customRender = (
  ui: ReactElement, options?: RenderOptions,
): RenderResult => render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

configure({ testIdAttribute: 'data-test-id' })

// override render method
export { customRender as render }
