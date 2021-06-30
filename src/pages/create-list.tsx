import Layout from 'src/layouts/Layout'
import CreateListContent from 'src/components/CreateListContent'
import 'react-quill/dist/quill.snow.css'
import { PopupProvider } from 'src/components/context/PopupContext'
import { TemplatesProvider } from 'src/components/context/TemplatesContext'
import EmailModal from 'src/components/shared-ui/modals/ContactModal'
import { css } from 'astroturf'
import MultiEmailsModal from 'src/components/shared-ui/modals/MultiEmailsModal'

const List: React.FC = () => (
  <TemplatesProvider>
    <PopupProvider>
      <Layout className={s.layout}>
        <CreateListContent />
        <EmailModal />
        <MultiEmailsModal />
      </Layout>
    </PopupProvider>
  </TemplatesProvider>
)

const s = css`
  .layout {
    background: var(--white);
  }
`

export default List
