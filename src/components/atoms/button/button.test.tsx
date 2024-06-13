/**
 * @jest-environment jsdom
 */

import { Button } from 'components/atoms/button/Button'
import classes from 'components/atoms/button/button.module.scss'
import { render } from 'utils/test/test-utils'

describe('components/atoms/button/Button', () => {
  it('renders Button with classes', async () => {
    const rendered = render(<Button className='anotherClass' />)

    const elements = rendered?.container.querySelectorAll('.anotherClass')

    const element = elements[0] as HTMLElement

    expect(rendered?.container).toBeDefined()
    expect(elements?.length).toEqual(1)
    expect(element?.getAttribute('class')?.includes('anotherClass')).toEqual(true)
    expect(element?.getAttribute('class')?.includes(classes.button)).toEqual(true)
  })
})
