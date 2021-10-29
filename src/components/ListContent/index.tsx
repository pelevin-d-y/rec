import React from 'react'
import { css } from 'astroturf'
import Table from 'src/components/shared-ui/ListTable'
import TableHeader from 'src/components/shared-ui/ListTableHeader'
import ListHeader from 'src/components/shared-ui/ListHeader'
import { usePlaylist } from 'src/components/context/PlaylistContext'
import { TableProvider } from 'src/components/context/TableContext'
import Loader from '../shared-ui/Loader'
import ListRecs from '../shared-ui/ListRecs'

const Content: React.FC = () => {
  const { state: data } = usePlaylist()

  return data ? (
    <div className={s.container}>
      {data && <ListHeader data={data} />}
      <div className={s.content}>
        <TableProvider>
          {/* <ListRecs list={data} contacts={contacts} /> */}
          {data && <TableHeader list={data} />}
          {data && <Table data={data} />}
        </TableProvider>
      </div>
    </div>
  ) : (
    <div className={s.loader}>
      <Loader />
    </div>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    display: flex;
    flex-flow: column nowrap;
    background: var(--white);
  }

  .loader {
    position: relative;
    height: 100px;
  }
`

export default Content
