import React, { useMemo, useState } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { getBaseMutableData } from 'src/helpers/utils/base-mutable-data'
import * as yup from 'yup'
import EmailPopover from './EmailPopover'
import EditField from '../EditField'
import { UpdateMutableData } from '.'
import { LoaderComponent } from '../Loader'

type Props = {
  className?: string
  data: ContactMutable[]
  updateApiData: UpdateMutableData
}

const schema = yup.string().email()

const UserInfoEmail: React.FC<Props> = ({ className, data, updateApiData }) => {
  const [isLoading, setIsLoading] = useState(false)

  const emails: ContactMutable[] | undefined = data?.filter(
    (item) => item.type === 'email'
  )

  const primaryEmail = useMemo(
    () => data?.find((item) => item.type === 'primaryEmail') || emails[0],
    [data, emails]
  )

  const emailsWithPrimary = useMemo(
    () =>
      emails.map((item) => ({
        ...item,
        status:
          item.data === primaryEmail.data
            ? 'Primary'
            : ('Set Primary' as 'Primary' | 'Set Primary'),
      })),
    [emails, primaryEmail.data]
  )

  const setPrimaryEmail = async (emailData: {
    status: 'Primary' | 'Set Primary'
    type: string
    data: string | string[]
    review: number
    meta: any
  }) => {
    setIsLoading(true)
    await updateApiData({ ...primaryEmail, data: emailData.data }, primaryEmail)
    setIsLoading(false)
  }

  const addEmail = async (value: string) => {
    setIsLoading(true)
    try {
      await schema.validate(value)
      await updateApiData(getBaseMutableData({ data: value, type: 'email' }))
      setIsLoading(false)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('err', err)
      setIsLoading(false)
    }
  }

  return (
    <div className={classNames(className, s.container)}>
      <EmailPopover data={emailsWithPrimary} setEmail={setPrimaryEmail} />
      {isLoading && <LoaderComponent />}
      {primaryEmail && (
        <EditField
          type="text"
          value={primaryEmail.data as string}
          onSave={(val: string) => {
            addEmail(val)
          }}
          classPrefix="profile-card-"
        />
      )}
    </div>
  )
}

const s = css`
  .container {
  }
`

export default UserInfoEmail