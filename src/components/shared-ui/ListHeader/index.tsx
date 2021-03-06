import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import PreviousPage from 'src/components/shared-ui/PreviousPage'
import TextareaAutosize from 'react-textarea-autosize'
import { css } from 'astroturf'
import { useDebounce } from 'use-debounce/lib'
import { post } from 'src/api'
import { useRouter } from 'next/router'

type Props = {
  className?: string
  data: any
  updateNewList?: (type: 'title' | 'description', text: string) => void
}

const ListHeader: React.FC<Props> = ({ className, data, updateNewList }) => {
  const router = useRouter()
  const [fields, setFields] = useState({
    title: data.info?.name,
    description: data.info?.description,
  })

  const [debounceFields] = useDebounce(fields, 500)

  useEffect(() => {
    setFields({ title: data.info?.name, description: data.info?.description })
  }, [data.contacts, data.info?.description, data.info?.name])

  useEffect(() => {
    const updatePlaylist = () => {
      if (
        debounceFields.title !== data.title ||
        debounceFields.description !== data.description
      ) {
        if (data.playlist_id) {
          post
            .postPlaylists([
              {
                playlist_id: data.playlist_id,
                info: {
                  name: debounceFields.title,
                  description: debounceFields.description,
                },
              },
            ])
            .catch((err) => {
              console.log('ListHeader err =>', err)
            })
        }
      }
    }

    updatePlaylist()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return (
    <div className={classNames(className, s.container)}>
      <PreviousPage
        text="Back to lists"
        handler={() => router.push('/lists')}
      />

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
    color: var(--neutral1);
    border: none;
    font-size: 24px;
    line-height: 29px;
    font-weight: var(--bold);
  }

  .description {
    overflow: hidden;
    display: block;
    width: 100%;
    resize: none;
    color: var(--neutral1);
    border: none;
    font-weight: var(--medium);
    font-size: 16px;
    line-height: 19px;
  }

  .userCount {
    margin-top: 8px;
    font-size: 14px;
    font-weight: var(--bold);
    color: var(--primary1);
  }

  .inputWrapper {
    position: relative;
  }

  .button {
    max-width: 200px;
    width: 100%;
    margin-top: 30px;
  }

  .loader {
    width: 100%;
    height: 100%;
  }
`

export default ListHeader
