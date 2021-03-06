import React, { useMemo } from 'react'
import classNames from 'classnames'
import { css } from 'astroturf'
import { usePlaylist } from 'src/components/context/PlaylistContext'
import SvgIcon from '../SvgIcon'
import CardRecs from '../cards/CardRecs'
import Typography from '../Typography'

type Props = {
  className?: string
  contacts?: RecommendationUser[]
  playlistData: ListData
}

const ListRecs: React.FC<Props> = ({ className, contacts, playlistData }) => {
  const { addUsers, getPlaylistData } = usePlaylist()

  const filteredContacts = useMemo(
    () =>
      contacts?.filter(
        (item) =>
          !playlistData?.contacts?.find(
            (listUser) => listUser.contact_id === item.contact_id
          )
      ),
    [contacts, playlistData]
  )

  const addUserHandler = async (user: RecommendationUser) => {
    try {
      await addUsers(playlistData.playlist_id, [user])
      await getPlaylistData(playlistData.playlist_id)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('🚀 ~ file: index.tsx ~ line 33 ~ addUserHandler ~ err', err)
    }
  }

  return filteredContacts?.length !== 0 ? (
    <div className={classNames(className, s.container)}>
      <div className={s.header}>
        <SvgIcon className={s.svg} icon="recs.svg" />
        <Typography className={s.title} fontVariant="inter">
          Add these recs to list?
        </Typography>
      </div>
      <div className={s.cards}>
        {filteredContacts?.map((user) => (
          <CardRecs addUser={addUserHandler} key={user.address} data={user} />
        ))}
      </div>
    </div>
  ) : null
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    padding: 12px 16px 23px 30px;

    @include mobile {
      padding-left: 16px;
    }
  }

  .header {
    display: flex;
    align-items: center;
  }

  .svg {
    width: 24px;
    height: 24px;
    color: var(--primary1);
    margin-right: 16px;
  }

  .title {
    font-size: 14px;
    line-height: 17px;
  }

  .cards {
    display: flex;
    overflow: scroll;
    min-height: 150px;
    padding: 19px 19px 9px 19px;
  }
`

export default ListRecs
