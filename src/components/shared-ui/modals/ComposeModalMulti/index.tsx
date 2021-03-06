import React, { useState, useEffect } from 'react'
import { usePopup } from 'src/components/context/PopupContext'

import { differenceWith } from 'lodash'
import ModalBase from '../ModalBase'
import UsersManager from './UsersManager'
import ModalContent from '../ModalContent'

const comparator = (
  a: FormattedContact | RecommendationUser,
  b: FormattedContact | RecommendationUser
) => a.contact_id === b.contact_id

const ComposeModalMulti: React.FC = () => {
  const { state, dispatch } = usePopup()
  const { data: popupData, dataMulti: usersData, multiEmailsIsOpen } = state

  const [unselectedContacts, setUnselectedContacts] = useState<
    Array<FormattedContact | RecommendationUser>
  >([])

  const [selectedContacts, setSelectedContacts] = useState<
    Array<FormattedContact | RecommendationUser>
  >([])

  useEffect(() => {
    if (usersData?.length) {
      if (unselectedContacts) {
        const filteredUsers = differenceWith<
          FormattedContact | RecommendationUser,
          FormattedContact | RecommendationUser
        >(usersData, unselectedContacts, comparator)
        setSelectedContacts(filteredUsers)
      }
    }
  }, [unselectedContacts, setUnselectedContacts, usersData])

  useEffect(() => {
    if (selectedContacts?.length) {
      dispatch({
        type: 'UPDATE_POPUP_DATA',
        payload: selectedContacts[0],
      })
    }
  }, [dispatch, selectedContacts, multiEmailsIsOpen])

  const selectUser = (user: RecommendationUser | FormattedContact) => {
    dispatch({
      type: 'UPDATE_POPUP_DATA',
      payload: user,
    })
  }

  const addUserHandler = (user: RecommendationUser | FormattedContact) => {
    const isInclude = selectedContacts.find(
      (item) => item.contact_id === user.contact_id
    )
    if (!isInclude) {
      setSelectedContacts([...selectedContacts, user])
      if (unselectedContacts) {
        setUnselectedContacts(
          unselectedContacts.filter(
            (item) => item.contact_id !== user.contact_id
          )
        )
      }
      selectUser(user)
    }
  }

  const removeUser = (user: RecommendationUser | FormattedContact) => {
    setSelectedContacts(
      selectedContacts.filter((item) => item.contact_id !== user.contact_id)
    )
    if (unselectedContacts) {
      setUnselectedContacts([...unselectedContacts, user])
    }
  }

  const closeHandler = () => {
    setSelectedContacts([])
    setUnselectedContacts([])
    dispatch({ type: 'TOGGLE_COMPOSE_MULTI_POPUP' })
    dispatch({ type: 'UPDATE_COMPOSE_MULTI_DATA', payload: null })
    dispatch({ type: 'UPDATE_POPUP_DATA', payload: null })
  }

  return (
    <ModalBase
      styles={{
        maxWidth: '1055px',
        display: 'grid',
        gridTemplateColumns: '2fr 4fr',
      }}
      isOpen={multiEmailsIsOpen}
      onClose={closeHandler}
    >
      <UsersManager
        selectedContacts={selectedContacts}
        removeUser={removeUser}
        selectUser={selectUser}
        unselectedContacts={unselectedContacts}
        addUserHandler={addUserHandler}
      />
      {popupData && (
        <ModalContent
          data={popupData}
          closeHandler={closeHandler}
          isSent={popupData?.isSent}
        />
      )}
    </ModalBase>
  )
}

export default ComposeModalMulti
