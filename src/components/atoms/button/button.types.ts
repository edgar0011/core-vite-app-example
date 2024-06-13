import { PropsWithChildren, MouseEvent, KeyboardEvent } from 'react'
import { CommonProps } from '@e1011/es-kit'

import { Alerts } from 'utils/ui/variants'


export type ButtonProps = PropsWithChildren & {
  id?: string
  type?: 'button' | 'submit' | 'reset' | undefined
  className?: string
  tiny?: boolean
  variant?: Alerts
  label?: string | number
  truncate?: boolean
  fluid?: boolean
  animated?: boolean
  transparent?: boolean
  hasShadow?: boolean
  preventDefualt?: boolean
  stopPropagation?: boolean
  onClick?: (event: MouseEvent | KeyboardEvent) => void
} & CommonProps
