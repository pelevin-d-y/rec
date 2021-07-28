import React from 'react'
import { css } from 'astroturf'
import Spotlight from 'src/components/shared-ui/Spotlight'
import ImportantSteps from 'src/components/shared-ui/PinnedCards'
import classNames from 'classnames'

type Props = {
  className?: string
}

const testData = {
  reconnects: 12,
  intros: 19,
  followups: 3,
}


const ContentSidebar: React.FC<Props> = ({ className }) => (
  <div className={classNames(className, s.container)}>
    <Spotlight className={s.spotlight} data={testData}/>
    <ImportantSteps />
  </div>
)

const s = css`
  .container {
    width: 30%;
    height: 100vh;

    border-radius: 10px;
  }

  .spotlight {
    margin-bottom: 10px;
  }
`

export default ContentSidebar
