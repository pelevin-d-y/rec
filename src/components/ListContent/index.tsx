import React, { useEffect, useState } from 'react'
import { css } from 'astroturf'
import Table from 'src/components/ListContent/ListTable'
import ListHeader from 'src/components/shared-ui/ListHeader'
import { usePlaylist } from 'src/components/context/PlaylistContext'
import { useClient } from 'src/components/context/ClientContext'
import { TableProvider } from 'src/components/context/TableContext'
import { useRouter } from 'next/router'
import { useParams } from 'react-router-dom'
import { LoaderAbsolute } from '../shared-ui/Loader'
import ListRecs from '../shared-ui/ListRecs'
import TableActions from '../shared-ui/TableActions'
import AddUserView from '../shared-ui/AddUserView'

const Content: React.FC = () => {
  const {
    state: playlistData,
    addUsers: addUserToPlaylist,
    getPlaylistDataPaginated,
  } = usePlaylist()
  const { state: clientState } = useClient()
  const router = useRouter()

  const { page: pageQuery } = useParams()
  const [page, setPage] = useState(pageQuery ? parseInt(pageQuery, 10) : 1)

  const goToPage = (newPage: number) => {
    router.push(`?id=${router.query.id}&page=${newPage}`)
    setPage(newPage)
  }

  useEffect(() => {
    if (router.query.id) {
      getPlaylistDataPaginated(router.query.id as string, page)
    }
  }, [getPlaylistDataPaginated, page, router.query.id])

  const addUser = async (user: FormattedContact) => {
    if (playlistData) {
      try {
        await addUserToPlaylist(playlistData?.playlist_id, [user])
        await getPlaylistDataPaginated(playlistData?.playlist_id)
      } catch (err) {
        console.log('addUser err ==>', err)
      }
    }
  }

  return playlistData ? (
    <div className={s.container}>
      {playlistData && <ListHeader data={playlistData} />}
      <div className={s.content}>
        <TableProvider>
          {clientState.data?.contacts && (
            <ListRecs
              contacts={clientState.data.contacts}
              playlistData={playlistData}
            />
          )}

          {playlistData && (
            <div className={s.tableActions}>
              <AddUserView data={playlistData?.contacts} handler={addUser} />
              <TableActions
                data={playlistData}
                buttons={[
                  'contact',
                  // 'dots',
                  // 'filter',
                  'removeContacts',
                ]}
              />
            </div>
          )}
          {playlistData && (
            <Table
              data={playlistData}
              showPagination
              currentPage={page}
              pages={playlistData.pages || 1}
              onChangePage={(newPage) => goToPage(newPage)}
            />
          )}
        </TableProvider>
      </div>
    </div>
  ) : (
    <div className={s.loader}>
      <LoaderAbsolute />
    </div>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    display: flex;
    flex-flow: column nowrap;
    background: var(--shades2);
  }

  .tableActions {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    padding: 21px 23px 23px 20px;

    @include mobile {
      padding: 16px 12px;

      flex-flow: column nowrap;
      align-items: flex-start;
    }
  }

  .loader {
    position: relative;
    height: 100px;
  }
`

export default Content
