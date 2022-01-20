import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import CardContainer from '../cards/CardContainer'
import Avatar from '../Avatar'

type Props = {
  className?: string
  data?: RecommendationUser | null
  template?: Template
}

const PinnedCard: React.FC<Props> = ({ className, data }) =>
  data ? (
    <CardContainer className={classNames(className, s.container)}>
      <Avatar
        className={s.avatar}
        width={38}
        height={38}
        image={data.image_url}
      />
      <div className={s.info}>
        <div className={s.name}>{data.name}</div>
      </div>
    </CardContainer>
  ) : null

const s = css`
  .container {
    position: relative;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 18px 50px 20px 20px;
  }

  .avatar {
    flex: 0 0 auto;
    margin-right: 14px;
  }

  .info {
    width: 100%;

    font-size: 12px;
    line-height: 14px;
  }

  .name {
    margin-bottom: 5px;
    font-weight: var(--bold);
  }

  .pin {
    position: absolute;
    top: 17px;
    right: 9px;

    margin-left: auto;
  }

  .checkbox {
    margin-right: 19px;
  }
`

export default PinnedCard
