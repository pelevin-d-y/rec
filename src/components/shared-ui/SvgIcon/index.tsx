import React from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'

type Props = {
  className?: string
  icon: string
}

const SvgIcon: React.FC<Props> = ({ className, icon }) => (
  <div
    className={classNames(className, s.container)}
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
      __html: require(`public/svg/${icon}?include`),
    }}
  />
)

const s = css`
  .container {
    display: inline-block;
    line-height: 0;
  }
`

export default SvgIcon
