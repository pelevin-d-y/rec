import classNames from 'classnames'
import { css } from 'astroturf'
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

type Props = {
  className?: string
  value?: string
  setEditorValue: (field: SendMessageField, value: any) => void
}

const modules = {
  toolbar: {
    container: '#editorToolbar',
  },
}

const formats = ['bold', 'italic', 'link', 'size', 'list']

const HtmlEditorModal: React.FC<Props> = ({
  className,
  value,
  setEditorValue,
}) => (
  <div className={classNames(className, s.container, 'modal-editor')}>
    <ReactQuill
      theme="snow"
      value={value || ''}
      modules={modules}
      formats={formats}
      onChange={(quillValue) => setEditorValue('body', quillValue)}
    />
  </div>
)

const s = css`
  .container {
  }
`

export default HtmlEditorModal