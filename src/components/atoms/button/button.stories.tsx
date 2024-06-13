import { StoryFn as Story, Meta } from '@storybook/react'
import { LayoutBox } from '@e1011/es-kit'

import { Button } from 'components/atoms/button/Button'
import type { ButtonProps } from 'components/atoms/button/button.types'
import { Alerts } from 'utils/ui/variants'
import { Link } from 'components/atoms/text/Link'


export default {
  title: 'e1011/atoms/button/Button',
  component: Button,
} as Meta


const ButtonTemplate: Story<ButtonProps> = (args) => (
  <LayoutBox width='100%' column align='center' gap='1rem'>
    <LayoutBox width='100%' height='100%' justify='center' align='center' gap='1rem'>
      <Button {...args}>01</Button>
      <Button {...args}>Some Text <Link href='https://www.google.com' target='sdsdsd'>Link to google.com</Link></Button>
      {/* Tiny is suitable only for numbers */}
      <Button tiny {...args}>4</Button>
      <Button variant={Alerts.info} {...args}>11</Button>
      <Button variant={Alerts.warning} {...args}>86</Button>
      <Button variant={Alerts.success} {...args}>999</Button>
      <Button variant={Alerts.error} {...args}>0909</Button>
      <Button variant={Alerts.error} {...args}>Can it handle long text?</Button>

      <LayoutBox width='100px'>
        <Button variant={Alerts.error} truncate fluid {...args}>
          Can it handle long text and be truncated?
        </Button>
      </LayoutBox>
    </LayoutBox>
    <LayoutBox width='280px' height='100%' justify='center' align='center' gap='1rem'>
      <Button variant={Alerts.error} truncate fluid {...args}>Can it handle long text?</Button>
      <Button variant={Alerts.error} fluid {...args}>Can it handle long text?</Button>
    </LayoutBox>
  </LayoutBox>
)

export const ButtonBase = ButtonTemplate.bind({})
ButtonBase.args = {}
