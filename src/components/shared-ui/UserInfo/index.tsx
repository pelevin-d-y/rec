import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import Img from 'src/components/shared-ui/Img'
import Button from 'src/components/shared-ui/Button'
import { formatTime } from 'src/helpers/utils/parseTime'
import { getBaseMutableData } from 'src/helpers/utils/base-mutable-data'
import UserInfoEmail from './UserInfoEmail'
import EditField from '../EditField'

export type UpdateMutableData = (
  val: ContactMutable,
  prevVal?: ContactMutable | undefined
) => Promise<void>

type Props = {
  className?: string
  data?: ContactMutable[]
  updateApiData: UpdateMutableData
}

const UserInfo: React.FC<Props> = ({ className, data, updateApiData }) => {
  const onSaveName = (val: string) => {
    const contactItem = data?.find((item) => item.type === 'name')

    if (contactItem) {
      updateApiData({ ...contactItem, data: val.split(' ') }, contactItem)
    } else {
      updateApiData({
        ...getBaseMutableData({ data: val.split(' '), type: 'name' }),
      })
    }
  }

  const name = (
    data?.find((item) => item.type === 'name')?.data as string[] | undefined
  )?.join(' ')

  return (
    <div className={classNames(s.container, className)}>
      <ul className={s.list}>
        {data && (
          <li className={s.item}>
            <UserInfoEmail data={data} updateApiData={updateApiData} />
          </li>
        )}
        <li className={s.item}>
          <div className={s.itemTitle}>
            <span>Name</span>
            <Img alt="icon" className={s.pen} img="pen.png" />
          </div>
          <EditField
            type="text"
            value={name || ''}
            classPrefix="profile-card-"
            onSave={(val: string) => onSaveName(val)}
          />
        </li>
        {/* {data.last_contact_time && (
          <li className={s.item}>
            <div className={s.itemTitle}>
              <span>Met</span>
              <Img alt="icon" className={s.pen} img="pen.png" />
            </div>
            <div className={s.value}>{formatTime(data.last_contact_time)}</div>
          </li>
        )}
        {data.last_client_text && (
          <li className={s.item}>
            <div className={s.itemTitle}>
              <span>Last Outreach</span>
              <Img alt="icon" className={s.pen} img="pen.png" />
            </div>
            <div className={classNames(s.value, s.outreach)}>
              {data.last_client_text}
            </div>
          </li>
        )} */}
      </ul>
    </div>
  )
}

const s = css`
  .container {
  }

  .list {
    width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .item {
    position: relative;
    padding: 14px 20px;

    font-size: 12px;
    line-height: 14px;
    border-bottom: 1px solid #dddddd;

    &:hover {
      .pen {
        opacity: 1;
      }
    }
  }

  .itemTitle {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin-bottom: 10px;
    white-space: nowrap;
    color: #adadad;
  }

  .pen {
    width: 15px;
    height: 13px;

    opacity: 0;
  }

  .outreach {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .triangle {
    margin-left: 4px;
    border: 5px solid transparent;
    border-top: 6px solid #1966ff;
  }
`

export { UserInfo }