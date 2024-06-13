import { MouseEvent, PropsWithChildren } from 'react'
import { CommonProps } from '@e1011/es-kit'


import { ITextProps } from 'components/atoms/text/Text'

export type AnchorLinkProps = Partial<ITextProps> & PropsWithChildren & CommonProps & {
  id?: string
  onClick?: (event?: MouseEvent, href?: string, target?: string, text?: string) => void
  asLink?: boolean
}
