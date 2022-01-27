import React from 'react'
import { css } from 'astroturf'
import classNames from 'classnames'

type Data = {
  month: string
  day: string
  title: string
  description: string
}
type Props = {
  className?: string
  data: Data
}

const UpcomingHeader: React.FC<Props> = ({ className, data }) => {
  const { month, day, title, description } = data

  return (
    <div className={classNames(className, s.container)}>
      <div className={s.date}>
        <div className={s.month}>{month}</div>
        <div className={s.day}>{day}</div>
      </div>
      <div className={s.text}>
        <div className={s.bigText}>{title}</div>
        <div className={s.smallText}>{description}</div>
      </div>
    </div>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';
  .container {
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    padding: 12px 16px 10px 16px;
    @include mobile {
      flex-flow: column nowrap;
      align-items: center;
    }
  }
  .date {
    display: flex;
    flex-flow: column nowrap;
    min-width: 45px;
    margin-right: 28px;
    overflow: hidden;
    background: var(--white);
    border-radius: 6px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.119865),
      0px 1px 1px rgba(34, 34, 34, 0.0989128);
    @include mobile {
      margin-right: 0;
      margin-bottom: 10px;
    }
  }
  .text {
    margin-top: 3px;
    @include mobile {
      text-align: center;
    }
  }
  .month {
    padding: 2px 0;
    text-transform: uppercase;
    font-size: 9px;
    line-height: 11px;
    text-align: center;
    background: #ff0000;
    color: var(--white);
  }
  .day {
    padding: 4px;
    line-height: 24px;
    text-align: center;
    font-size: 20px;
    font-weight: var(--bold);
  }
  .bigText {
    margin-bottom: 3px;
    font-size: 22px;
    line-height: 22px;
    font-weight: var(--bold);
  }
  .smallText {
    font-size: 12px;
    line-height: 22px;
  }
`

export default UpcomingHeader