import { memo, useCallback, MouseEvent, KeyboardEvent } from 'react'
import { classNames, composeId } from '@e1011/es-kit'

import type { ButtonProps } from 'components/atoms/button/button.types'
import classes from 'components/atoms/button/button.module.scss'

export const keys = {
  ENTER: {
    key: 'Enter',
    keyCode: 13,
  },
}
/**
 * Button component for displaying buttons with optional features.
 * @component
 *
 * Generated component from Template
 * @param {object} props - The component props.
 * @param {string} props.label - The value to be displayed in the button.
 * @param {ReactNode} [props.children] - Additional content to be displayed inside the button.
 * @param {string} [props.variant] - The variant of the button (e.g., 'primary', 'secondary').
 * @param {boolean} [props.tiny] - Whether the button should be tiny.
 * @param {boolean} [props.truncate] - Whether the content inside the button should be truncated.
 * @param {boolean} [props.fluid] - Whether the button should have a fluid width.
 * @param {boolean} [props.animated=true] - Whether the button should have animation (default is true).
 * @param {string} [props.className] - Additional classes to be applied to the button.
 * @param {...object} props.props - Additional props to be spread to the underlying div element.
 *
 * @returns {JSX.Element} The rendered Button component.
 */
export const Button = memo(({
  label, children,
  variant, tiny, truncate, fluid,
  preventDefualt, stopPropagation,
  onClick,
  type = 'button',
  transparent,
  hasShadow,
  hasIcon,
  disabled,
  animated = false, className = '', id, ...props
}: ButtonProps) => {
  const textFromChildren: string | undefined = `${label || children?.toString()}`

  const clickHandler = useCallback((event: MouseEvent) => {
    if (preventDefualt) {
      event.preventDefault()
    }
    if (stopPropagation) {
      event.stopPropagation()
      event.nativeEvent.stopImmediatePropagation()
    }
    onClick?.(event)
  }, [onClick, preventDefualt, stopPropagation])

  const keyDownHandler = useCallback((event: KeyboardEvent) => {
    if (event.key === keys.ENTER.key) {
      if (preventDefualt) {
        event.preventDefault()
      }
      if (stopPropagation) {
        event.stopPropagation()
        event.nativeEvent.stopImmediatePropagation()
      }
      onClick?.(event)
    }
  }, [onClick, preventDefualt, stopPropagation])

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      tabIndex={-1}
      onClick={clickHandler}
      onKeyDown={keyDownHandler}
      className={classNames(
        classes.button,
        tiny && classes.tiny,
        variant && classes[variant],
        truncate && classes.truncate,
        fluid && classes.fluid,
        animated && classes.animated,
        transparent && classes.transparent,
        hasShadow && classes.hasShadow,
        hasIcon && classes.hasIcon,
        disabled && classes.disabled,
        className,
      )}
      id={`${id || (textFromChildren && composeId(textFromChildren))}`}
      data-testid={`${(props as Record<string, string>).dataTestId || (props as Record<string, string>)['data-testid'] || id || (textFromChildren && composeId(textFromChildren))}`}
      {...props}
    >
      <span>
        {label && label}
        {children || children}
      </span>
    </button>
  )
})

export type ButtonType = typeof Button

// Set display name for the component.
Button.displayName = 'Button'
