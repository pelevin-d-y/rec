import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Pin from 'src/components/shared-ui/Pin'

type Props = {
  className?: string
}

const data = [
  {
    event1: 'Send next steps',
    event2: 'Ask for deck',
    avatars: [
      { avatar: require('public/images/gino.jpeg') },
      { avatar: require('public/images/maker.jpeg') },
      { avatar: require('public/images/mary.jpeg') },
    ],
  },
  {
    event1: 'Mark to meet again',
    event2: 'Plan in 30 Days',
    avatars: [
      { avatar: require('public/images/steve.jpeg') },
      { avatar: require('public/images/phil.jpeg') },
    ],
  },
]

const Events: React.FC<Props> = ({ className }) => (
  <ul className={classNames(s.container, className)}>
    {data.map((item) => (
      <li className={s.item} key={item.event1}>
        <Pin className={s.star} />
        <div className={s.info}>
          <div className={s.advise}>{item.event1}</div>
          <div className={s.event}>{item.event2}</div>
        </div>
      </li>
    ))}
  </ul>
)

const s = css`
  .container {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  .item {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin-bottom: 18px;
  }
  .star {
    margin-right: 8px;
  }
  .info {
    font-size: 12px;
    line-height: 14px;
  }
  .advise {
    margin-bottom: 4px;
    font-weight: var(--bold);
  }
  .event {
    color: var(--blue);
  }
  .avatars {
    margin-left: auto;
  }
`

export default Events
