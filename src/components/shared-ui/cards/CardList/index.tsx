import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import AvatarsList from 'src/components/shared-ui/AvatarsList'
import CardContainer from '../CardContainer'
import CardActions from '../CardActions'

type Props = {
  className?: string
  title: string
  description: string
  image: string
  users: UserData[]
}

const CardList: React.FC<Props> = ({
  className,
  title,
  description,
  users,
  image,
}) => (
  <CardContainer className={classNames(s.container, className)}>
    <img src={image} alt="icon" className={s.image} />
    <div className={s.title}>{title}</div>
    <div className={s.description}>{description}</div>
    <AvatarsList
      avatarWidth={38}
      avatarHeight={38}
      className={s.avatars}
      users={users}
    />
    <CardActions mainText="View List" mainAction={() => null} />
  </CardContainer>
)

const s = css`
  .container {
    position: relative;
    padding: 11px 16px 25px 21px;
  }

  .image {
    position: absolute;
    top: 20;
    right: 18px;

    width: 50px;
    height: 50px;
    object-fit: contain;
  }

  .title {
    font-size: 24px;
    line-height: 42px;
    font-weight: var(--bold);
  }

  .description {
    font-size: 12px;
    line-height: 22px;
  }

  .avatars {
    margin-top: 17px;
    margin-bottom: 20px;
  }
`

export default CardList
