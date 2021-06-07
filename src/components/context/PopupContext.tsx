import * as React from 'react'
import testTemplates from 'src/testTemplates.json'
import findTemplate from 'src/helpers/utils/find-template'

type Action =
  | { type: 'TOGGLE_CONTACT_POPUP'; payload: UserData }
  | { type: 'TOGGLE_CONTACTS_POPUP' }
  | { type: 'TOGGLE_RECOMMENDATIONS_POPUP' }
  | { type: 'TOGGLE_ADD_CONTACT_POPUP' }
  | { type: 'TOGGLE_CREATE_LIST_POPUP' }
  | { type: 'UPDATE_POPUP_DATA'; payload: UserData }

type State = {
  emailModalIsOpen: boolean
  multiEmailsIsOpen: boolean
  recommendationsIsOpen: boolean
  addContactModalIsOpen: boolean
  createListModalIsOpen: boolean
  data: UserData
}

type ContextType = {
  state: State
  dispatch: React.Dispatch<Action>
}

const PopupContext = React.createContext<ContextType | null>(null)

const popupReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'TOGGLE_CONTACT_POPUP': {
      const templateData = findTemplate(testTemplates, action.payload?.template)

      return {
        ...state,
        data: { ...action.payload, templateData },
        emailModalIsOpen: !state.emailModalIsOpen,
      }
    }
    case 'TOGGLE_CONTACTS_POPUP': {
      return {
        ...state,
        multiEmailsIsOpen: !state.multiEmailsIsOpen,
      }
    }
    case 'TOGGLE_RECOMMENDATIONS_POPUP': {
      return {
        ...state,
        recommendationsIsOpen: !state.recommendationsIsOpen,
      }
    }
    case 'TOGGLE_ADD_CONTACT_POPUP': {
      return {
        ...state,
        addContactModalIsOpen: !state.addContactModalIsOpen,
      }
    }
    case 'TOGGLE_CREATE_LIST_POPUP': {
      return {
        ...state,
        createListModalIsOpen: !state.createListModalIsOpen,
      }
    }
    case 'UPDATE_POPUP_DATA': {
      return {
        ...state,
        data: action.payload,
      }
    }
    default: {
      return {
        emailModalIsOpen: false,
        multiEmailsIsOpen: false,
        recommendationsIsOpen: false,
        addContactModalIsOpen: false,
        createListModalIsOpen: false,
        data: {},
      }
    }
  }
}

const PopupProvider: React.FC = ({ children }): JSX.Element => {
  const [state, dispatch] = React.useReducer(popupReducer, {
    emailModalIsOpen: false,
    multiEmailsIsOpen: false,
    recommendationsIsOpen: false,
    addContactModalIsOpen: false,
    createListModalIsOpen: false,
    data: {},
  })

  const value: ContextType = React.useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  )

  return <PopupContext.Provider value={value}>{children}</PopupContext.Provider>
}

const usePopup = (): ContextType => {
  const context = React.useContext(PopupContext)
  if (context === null) {
    throw new Error('usePopup must be used within a PopupProvider')
  }
  return context
}

export { PopupProvider, usePopup }
