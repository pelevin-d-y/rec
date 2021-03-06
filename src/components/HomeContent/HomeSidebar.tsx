import React from 'react'
import { css } from 'astroturf'
import Spotlight from 'src/components/shared-ui/Spotlight'
import classNames from 'classnames'
import PinnedUsers from '../shared-ui/PinnedUsers'

type Props = {
  className?: string
}

const ContentSidebar: React.FC<Props> = ({ className }) => (
  <div className={classNames(className, s.container)}>
    <Spotlight className={s.spotlight} />
    <PinnedUsers />
  </div>
)

const s = css`
  .container {
    width: 30%;
    min-height: 100vh;

    border-radius: 10px;
  }

  .spotlight {
    margin-bottom: 10px;
  }
`

export default ContentSidebar
