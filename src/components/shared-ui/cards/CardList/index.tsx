import React from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import AvatarsList from 'src/components/shared-ui/AvatarsList'
import { usePlaylists } from 'src/components/context/PlaylistsContext'
import { useRouter } from 'next/router'
import { usePopup } from 'src/components/context/PopupContext'
import { useMediaQuery } from 'react-responsive'
import CloseButton from '../../Close'
import Typography from '../../Typography'

type Props = {
  className?: string
  data: ListData
  showButtonAddList?: boolean
}

const CardList: React.FC<Props> = ({
  className,
  data: { info, playlist_id: playlistId, contacts, contactsData },
}) => {
  const router = useRouter()
  const { createPlaylist, getPlaylists } = usePlaylists()
  const { dispatch: popupDispatch } = usePopup()
  const isDesktop = useMediaQuery({ query: '(min-width: 769px)' })
  const id = playlistId
  const deleteHandler = async () => {
    popupDispatch({ type: 'TOGGLE_DELETE_LIST_POPUP' })
    popupDispatch({ type: 'UPDATE_LIST_ID_DATA', payload: id })
  }

  const moveToListPage = () => {
    router.push(`/list?id=${id}`)
  }

  const duplicateList = async () => {
    await createPlaylist({
      title: info?.name as string,
      description: info?.description,
      contacts: contacts?.map((item) => ({
        contact_id: item.contact_id,
      })),
    })
    getPlaylists()
  }

  return (
    <div
      className={classNames(s.container, s['card-shadow'], className)}
      onClick={moveToListPage}
      onKeyDown={moveToListPage}
      role="button"
      tabIndex={0}
    >
      <CloseButton className={s.removeButton} handler={deleteHandler} />
      {/* {image && <Img img={image} alt="icon" className={s.image} />} */}
      <Typography className={s.title} tagVariant="h4" fontVariant="inter">
        {info?.name}
      </Typography>
      {info?.description && (
        <div className={s.description}>{info.description}</div>
      )}
      {contacts && contactsData && (
        <AvatarsList
          avatarWidth={isDesktop ? 47 : 42}
          avatarHeight={isDesktop ? 47 : 42}
          className={s.avatars}
          users={contacts}
          showHiddenUsers
        />
      )}
    </div>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .usersCount {
    margin-top: 20px;
    margin-bottom: 16px;

    font-size: 18px;
    font-weight: var(--bold);
  }

  .removeButton {
    position: absolute;
    right: 10px;
    top: 10px;
    display: none;
  }

  .container {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-flow: column nowrap;

    padding: 17px 21px 23px 21px;

    text-decoration: none;
    cursor: pointer;
    color: var(--shades1);
    border: 1px solid var(--shades2);
    box-shadow: 0px 1px 1px rgba(34, 34, 34, 0.0989128);
    border-radius: 6px;

    &:hover {
      border: 1px solid var(--primary1);
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.119865),
        0px 1px 1px rgba(34, 34, 34, 0.0989128);
      border-radius: 6px;

      .removeButton {
        display: block;
      }
    }

    @include mobile {
      padding: 12px;

      .removeButton {
        display: block;
      }
    }
  }

  .card-shadow {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
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
    padding-right: 50px;
    margin-bottom: 10px;

    font-weight: var(--bold);
  }

  .description {
    padding-right: 50px;

    font-size: 12px;
    line-height: 22px;
  }

  .tasks {
    margin-top: 7px;
  }

  .avatars {
    margin-top: 15px;
    margin-bottom: 20px;

    @include mobile {
      display: flex;
      flex-flow: column nowrap;
    }
  }

  .actions {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    margin-top: auto;
  }

  .dots {
    min-width: 48px;
  }
`

export default CardList
