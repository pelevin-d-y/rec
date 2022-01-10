import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import parseMessage from 'src/helpers/utils/parse-message'
import { apiHelpers, get} from 'src/api/requests'
import Avatar from '../shared-ui/Avatar'
import PopoverDots from '../shared-ui/popover/PopoverDots'
import PopoverActions from '../shared-ui/popover/PopoverActions'
import UserHeader from '../shared-ui/UserHeader'
import { usePopup } from '../context/PopupContext'
import { UserInfo } from '../shared-ui/UserInfo'

type Props = {
  className?: string
  data: UserData
}

const ContactCard: React.FC<Props> = ({ className, data }) => {
  const { dispatch } = usePopup()

  const buttonHandler = () => {
    dispatch({ type: 'TOGGLE_COMPOSE_POPUP', payload: data })
  }

  const [mutableData, setMutableData] = useState<ContactMutable[] | undefined>(
    undefined
  )

  useEffect(() => {
    get.getContactsMutable([data.contact_id]).then((res) => {
      setMutableData(Object.values(res)[0])
    })
  }, [data.contact_id])

  const updateMutableData = async (
    newVal: ContactMutable,
    prevVal?: ContactMutable
  ) => {
    try {
      await apiHelpers.updateMutableData(data.contact_id, newVal, prevVal)
      const contactMutableRes = await get.getContactsMutable([data.contact_id])
      setMutableData(Object.values(contactMutableRes)[0])
    } catch (err) {
      console.warn('updateMutableData ==>', err)
    }
  }

  return (
    <div className={classNames(className, s.container)}>
      <div className={s.header}>
        <Avatar className={s.avatar} image={data?.avatar} />
        <div className={s.headerInfo}>
          <div className={s.name}>{data?.name}</div>
          {data.templateData && (
            <UserHeader
              className={s.message}
              text={parseMessage(data?.templateData?.Subject, data.name)}
            />
          )}
        </div>
        <div className={s.actions}>
          <PopoverDots className={s.dots} variant="outlined" />
          <PopoverActions
            className={s.buttonPopup}
            variant="contained"
            buttonClickHandler={buttonHandler}
            isArrow
          >
            Appreciate you!
          </PopoverActions>
        </div>
      </div>
      <UserInfo data={mutableData} updateApiData={updateMutableData} />
    </div>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    min-width: 350px;
    padding: 37px 24px 47px 18px;
    border-right: 1px solid #dddddd;

    @include mobile {
      min-width: auto;
      max-width: 350px;
      border-right: none;
      align-self: center;
    }
  }

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .headerInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .avatar {
    margin-bottom: 22px;
    width: 119px !important;
    height: 119px !important;
  }

  .actions {
    margin-bottom: 47px;
  }

  .name {
    font-size: 24px;
    text-align: center;
    margin-bottom: 12px;
  }

  .message {
    margin-bottom: 19px;
    max-width: 264px;
  }

  .dots {
    margin-right: 6px;
  }

  .buttonPopup {
    width: 199px;
  }
`

export default ContactCard