import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { useClient } from 'src/components/context/ClientContext'
import Profile from './PersonalizationProfile'
import PersonalizationSection from './PersonalizationSection'
import Accounts from './PersonalizationAccounts'
import Subscription from './Subscription'
import Notification from './PersonalizationNotification'
import PasswordChangeForm from './PesonalizationPasswordChange'
import PersonalizationInvites from './PersonalizationInvites'

type Props = {
  className?: string
}

const PersonalizationContent: React.FC<Props> = ({ className }) => {
  const { state: clientState } = useClient()

  return (
    <div className={classNames(className, s.container)}>
      {clientState ? (
        <>
          <PersonalizationSection className={s.section} title="Profile">
            <Profile data={clientState} />
          </PersonalizationSection>
          <PersonalizationSection className={s.section} title="Accounts">
            <Accounts data={clientState} />
          </PersonalizationSection>
          <PersonalizationSection className={s.section} title="Password">
            <PasswordChangeForm />
          </PersonalizationSection>
          <PersonalizationSection className={s.section} title="Subscription">
            <Subscription />
          </PersonalizationSection>
          <PersonalizationSection className={s.section} title="Notification">
            <Notification />
          </PersonalizationSection>
          <PersonalizationSection className={s.section} title="Invites">
            <PersonalizationInvites />
          </PersonalizationSection>
        </>
      ) : null}
    </div>
  )
}

const s = css`
  .container {
    padding: 10px 14px 14px;
  }

  .section {
    margin-bottom: 11px;
  }
`

export default PersonalizationContent
