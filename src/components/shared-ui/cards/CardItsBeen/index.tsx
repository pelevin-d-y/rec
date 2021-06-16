import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import SvgIcon from 'src/components/shared-ui/SvgIcon'
import Pin from 'src/components/shared-ui/Pin'
import AvatarsList from 'src/components/shared-ui/AvatarsList'
import { usePopup } from 'src/components/context/PopupContext'
import { useUsers } from 'src/components/context/UsersContext'
import CardContainer from '../CardContainer'
import CardActions from '../CardActions'

type Props = {
  className?: string
  data?: List
}

const CardItsBeen: React.FC<Props> = ({ className, data }) => {
  const { dispatch: popupDispatch } = usePopup()
  const { dispatch: usersDispatch } = useUsers()
  const openModalHandler = () => {
    usersDispatch({ type: 'UPDATE_USERS_DATA', payload: data?.users || [] })
    popupDispatch({ type: 'TOGGLE_RECOMMENDATIONS_POPUP' })
  }

  return (
    <CardContainer className={classNames(s.container, className)}>
      <Pin className={s.star} />
      <div className={s.header}>
        <div className={s.cardName}>{data?.description}</div>
        <div className={s.title}>{data?.title}</div>
        <SvgIcon
          className={s.clock}
          icon={require('public/svg/clock.svg?include')}
        />
      </div>
      {data?.users && <AvatarsList className={s.avatars} users={data.users} />}
      <CardActions
        className={s.actions}
        mainAction={openModalHandler}
        mainText="View List"
      />
    </CardContainer>
  )
}

const s = css`
  .container {
    overflow: hidden;
    position: relative;
    padding: 26px 24px 26px 15px;
  }

  .star {
    position: absolute;
    top: 14px;
    right: 17px;
    z-index: 10;
  }

  .header {
    position: relative;
    margin-bottom: 44px;
  }

  .clock {
    position: absolute;
    right: 16px;
    top: 11px;

    width: 66px;
    height: 66px;
    color: #4da9ff;
  }

  .cardName {
    font-size: 24px;
    line-height: 42px;
    font-weight: var(--semiBold);
  }
  .title {
    font-size: 38px;
    line-height: 42px;
    font-weight: var(--bold);
  }

  .avatars {
    display: flex;
    flex-flow: row nowrap;
    margin-bottom: 18px;
  }

  .actions {
    max-width: 100%;
  }

  .button {
    margin-left: 17px;
  }

  .buttonList {
    max-width: 70%;
    width: 100%;
  }

  .buttonDots {
    max-width: 30%;
    width: 100%;
  }
`

export default CardItsBeen
