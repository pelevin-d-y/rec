import React from 'react'
import CardContainer from 'src/components/shared-ui/cards/CardContainer'
import classNames from 'classnames'
import { css } from 'astroturf'
import { usePopup } from 'src/components/context/PopupContext'
import { usePinned } from 'src/components/context/PinnedContext'
import PinnedCard from './PinnedCard'

type Props = {
  className?: string
}

const PinnedUsers: React.FC<Props> = ({ className }) => {
  const { dispatch: popupDispatch } = usePopup()
  const { state } = usePinned()

  const openModal = () => {
    popupDispatch({
      type: 'UPDATE_COMPOSE_MULTI_DATA',
      payload: state.data as RecommendationUser[],
    })
    popupDispatch({ type: 'TOGGLE_PINNED_USERS_POPUP' })
  }

  return (
    <CardContainer className={classNames(className, s.container)}>
      <div className={s.header}>
        <div className={s.headerText}>
          <div className={s.headerImportant}>Pinned</div>
        </div>
        <button className={s.headerAction} type="button" onClick={openModal}>
          Add/Create List
        </button>
      </div>
      {!state.data?.length && (
        <div className={s.paragraph}>
          Pin actions, playlist and people to remember to followup up later.
        </div>
      )}
      <div className={s.cards}>
        {state.data?.map((item) => (
          <PinnedCard
            className={s.card}
            key={item.first_message_id}
            data={item}
            template={item.templateData}
          />
        ))}
      </div>
    </CardContainer>
  )
}

const s = css`
  .container {
    padding: 24px 13px 22px 16px;
  }

  .header {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    align-items: center;

    width: 100%;
  }

  .headerText {
    font-weight: var(--bold);
    font-size: 24px;
    line-height: 31px;
  }

  .headerAction {
    margin-left: auto;

    color: var(--blue);
    border: none;
    background: none;
    cursor: pointer;
  }

  .cards {
    margin-top: 19px;
  }

  .card {
    margin-bottom: 5px;
  }

  .paragraph {
    max-width: 80%;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
  }
`

export default PinnedUsers
