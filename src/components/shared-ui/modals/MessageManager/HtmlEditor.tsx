import classNames from 'classnames'
import { css } from 'astroturf'
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('./ReactQuillWrapper'), {
  ssr: false,
})

type Props = {
  className?: string
  value?: string
  setEditorValue: (field: SendMessageField, value: any) => void
}

const modules = {
  toolbar: {
    container: '#editorToolbar',
    toolbar: ['bold', 'italic', 'link', 'image', 'size', 'list'],
  },
}

const HtmlEditorModal: React.FC<Props> = ({
  className,
  value,
  setEditorValue,
}) => {
  return (
    <ReactQuill
      value={value}
      setEditorValue={setEditorValue}
      className={className}
    />
  )
}

const s = css`
  .container {
  }
`

export default HtmlEditorModal
