import { memo, PropsWithChildren } from 'react'
import { LayoutBox } from '@e1011/es-kit'

import classes from 'screens/sc/sc.module.scss'


type ScProps = PropsWithChildren & {
  title?: string
  className?: string
}

export const ScScreen
= memo<ScProps>(({ children, title, className }: ScProps) => (
  <LayoutBox
    width='100%'
    height='100%'
    justify='center'
    className={`${classes.sc} ${className}`}
  >
    {title && <h1>{title}</h1>}
    {children && children}
  </LayoutBox>
))

ScScreen.displayName = 'ScScreen'


export default ScScreen
