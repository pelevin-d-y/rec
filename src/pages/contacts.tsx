import React from 'react'
import Layout from 'src/layouts/Layout'
import { PopupProvider } from 'src/components/context/PopupContext'
import { TemplatesProvider } from 'src/components/context/TemplatesContext'
import { css } from 'astroturf'
import { TableProvider } from 'src/components/context/TableContext'
import { PlaylistsProvider } from 'src/components/context/PlaylistsContext'
import AllContactsContent from 'src/components/AllContactsContent'
import { PlaylistProvider } from 'src/components/context/PlaylistContext'
import { PinnedProvider } from 'src/components/context/PinnedContext'

type Props = {
  className?: string
}

const Contacts: React.FC<Props> = () => (
  <Layout className={s.layout}>
    <PinnedProvider>
      <PlaylistsProvider>
        <PlaylistProvider>
          <PopupProvider>
            <TableProvider>
              <AllContactsContent />
            </TableProvider>
          </PopupProvider>
        </PlaylistProvider>
      </PlaylistsProvider>
    </PinnedProvider>
  </Layout>
)

const s = css`
  .layout {
    background: var(--neutral5);
  }
`

export default Contacts
