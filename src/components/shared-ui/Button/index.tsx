import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'

type Props = {
  className?: string
  variant: 'outlined' | 'contained'
  isArrow?: boolean
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  handler?: () => void
}

const Button: React.FC<Props> = React.forwardRef<HTMLButtonElement, Props>(
  (
    {
      className,
      children,
      variant,
      isArrow,
      type,
      handler,
      disabled,
      ...props
    },
    ref
  ) => (
    <button
      className={classNames(
        s.button,
        s[variant],
        isArrow && s.arrowButton,
        className
      )}
      // eslint-disable-next-line react/button-has-type
      type={type || 'button'}
      ref={ref}
      onClick={handler}
      disabled={disabled}
      {...props}
    >
      <span className={s.text}>{children}</span>
      {isArrow && <SvgIcon className={s.arrow} icon="inputArrow.svg" />}
    </button>
  )
)

const s = css`
  .button {
    position: relative;
    overflow: hidden;
    display: inline-block;
    padding: 7px 11px;
    height: 32px;
    font-size: 14px;
    border: 1px solid var(--neutral1);
    border-radius: 16px;

    transition: all 0.3s linear;
    cursor: pointer;
  }

  .button:disabled {
    pointer-events: none;
    opacity: 0.2;
  }

  .arrowButton {
    padding-right: 15px;
  }

  .outlined {
    color: var(--neutral1);
    background: var(--shades2);

    &:hover {
      color: var(--shades2);
      background: var(--neutral1);
    }
  }

  .contained {
    background: var(--neutral1);
    color: var(--shades2);

    &:hover {
      background: var(--shades2);
      color: var(--neutral1);
    }
  }

  .arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
  }
`

export default Button
