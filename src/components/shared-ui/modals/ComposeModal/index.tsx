import React from 'react'
import { css } from 'astroturf'
import { usePopup } from 'src/components/context/PopupContext'
import ModalBase from '../ModalBase'
import ModalContent from '../ModalContent'
import Button from '../../Button'

const ComposeModal: React.FC = () => {
  const { dispatch, state } = usePopup()
  const { data, emailModalIsOpen } = state

  const closeHandler = () => {
    dispatch({ type: 'TOGGLE_COMPOSE_POPUP', payload: null })
  }

  return (
    <ModalBase
      className={s.container}
      isOpen={emailModalIsOpen}
      onClose={closeHandler}
    >
      <div className={s.closeContainer}>
        <Button handler={closeHandler} className={s.close} variant="outlined">
          X
        </Button>
      </div>
      {data && (
        <ModalContent data={data} withAvatar closeHandler={closeHandler} />
      )}
    </ModalBase>
  )
}

const s = css`
  @import 'src/styles/preferences/_mixins.scss';

  .container {
    max-width: 900px;
  }

  .footer {
    margin-top: 29px;
  }

  .closeContainer {
    width: 30px;
    margin-left: calc(100% - 50px);
    margin-top: 15px;
  }

  .close {
    margin-left: calc(100% - 30px);
  }
`

export default ComposeModal
