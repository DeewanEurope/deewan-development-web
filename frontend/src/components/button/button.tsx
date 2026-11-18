import type { MouseEventHandler, ReactNode } from 'react'
import RegionLink from '../regionLink/regionLink'
import './button.scss'

type ButtonProps = {
  children: ReactNode
  variant?: 'amber' | 'teal' | 'soft' | 'solid-amber' | 'solid-soft'
  to?: string
  href?: string
  onClick?: MouseEventHandler<HTMLElement>
  type?: 'button' | 'submit'
  className?: string
}

function Button({
  children,
  variant = 'amber',
  to,
  href,
  onClick,
  type = 'button',
  className = '',
}: ButtonProps) {
  const classes = `dw-button dw-button-${variant} ${className}`
  const label = <span>{children}</span>

  if (to) {
    return (
      <RegionLink to={to} className={classes} onClick={onClick}>
        {label}
      </RegionLink>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {label}
      </a>
    )
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {label}
    </button>
  )
}

export default Button
