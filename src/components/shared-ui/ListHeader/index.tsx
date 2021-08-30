import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import PreviousPage from 'src/components/shared-ui/PreviousPage'
import TextareaAutosize from 'react-textarea-autosize'
import { css } from 'astroturf'
import { useDebounce } from 'use-debounce/lib'
import { getContactsMutable } from 'src/api'

type Props = {
  className?: string
  data: any
  updateNewList?: (type: 'title' | 'description', text: string) => void
}

const ListHeader: React.FC<Props> = ({ className, data, updateNewList }) => {
  const [fields, setFields] = useState({
    title: data.info?.name,
    description: data.info?.description,
  })

  const [contacts, setContacts] = useState<null | any[]>(null)

  const [debounceFields] = useDebounce(fields, 1000)

  useEffect(() => {
    setFields({ title: data.info?.name, description: data.info?.description })

    if (data.contacts) {
      Promise.all(
        data?.contacts.map((item: any) => getContactsMutable(item.contact_id))
      ).then((res) =>
        setContacts(res.map((item: any) => Object.values(item.data)[0]))
      )
    }
  }, [data.contacts, data.info?.description, data.info?.name])

  useEffect(() => {
    if (
      debounceFields.title !== data.title ||
      debounceFields.description !== data.description
    ) {
      // console.log('request to update')
    }
  }, [data, debounceFields])

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (updateNewList) {
      updateNewList('title', e.target.value)
    } else {
      setFields({
        title: e.target.value,
        description: debounceFields.description,
      })
    }
  }

  const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (updateNewList) {
      updateNewList('description', e.target.value)
    } else {
      setFields({ title: debounceFields.title, description: e.target.value })
    }
  }

  console.log('contacts', contacts)

  return (
    <div className={classNames(className, s.container)}>
      <PreviousPage text="Back to list" />
      <input
        className={s.title}
        name="title"
        placeholder="Enter name..."
        onChange={handleTitleChange}
        defaultValue={fields.title || ''}
      />
      <TextareaAutosize
        className={s.description}
        name="description"
        placeholder="Enter description..."
        defaultValue={fields.description || ''}
        onChange={handleDescChange}
      />
      {contacts && (
        <div className={s.userCount}>{contacts.length} Contacts</div>
      )}
    </div>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    padding: 12px 16px 23px 30px;

    @include mobile {
      padding-left: 16px;
    }
  }
  .title {
    display: block;
    margin-top: 13px;
    margin-bottom: 0;
    width: 100%;

    border: none;
    font-size: 26px;
    line-height: 42px;
    font-weight: var(--bold);
  }

  .description {
    display: block;
    width: 100%;
    resize: none;

    border: none;
    font-weight: var(--bold);
    font-size: 16px;
  }

  .userCount {
    margin-top: 8px;
    font-size: 14px;
    font-weight: var(--bold);
    color: var(--blue);
  }
`

export default ListHeader
