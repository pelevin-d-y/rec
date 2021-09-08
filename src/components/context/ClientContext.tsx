import * as React from 'react'
import { getAuth, getContact, getRecommendations } from 'src/api'
import addAdditionFields from 'src/helpers/utils/add-addition-fields'
import testUsers from 'src/testUsers.json'
import formatContactData from 'src/helpers/utils/format-contact-data'

type Action = { type: 'UPDATE_USER_DATA'; payload: MainUserData }

type State = MainUserData | null

type ContextType = {
  state: State
  dispatch: React.Dispatch<Action>
  updateUserData: (data: MainUserData) => void
}

const ClientContext = React.createContext<ContextType | null>(null)

const clientReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'UPDATE_USER_DATA': {
      return {
        ...state,
        ...action.payload,
      }
    }
    default: {
      return state
    }
  }
}

const getMainUserData = async () => {
  const requests = await Promise.all([
    getRecommendations(),
    getContact(),
    getAuth(),
  ])

  const [recommendations, contactResponse, authResponse] = requests
  const extendedUsers = addAdditionFields(recommendations)
  const mainUserData: MainUserData = {
    ...formatContactData(contactResponse.data),
    avatar: 'thor.jpeg',
    contacts:
      extendedUsers.length < 10 ? addAdditionFields(testUsers) : extendedUsers, // have to remove when API is fixed
    strataEmail: Object.keys(authResponse.data)[0],
  }

  return mainUserData
}

const ClientProvider: React.FC = ({ children }): JSX.Element => {
  const [state, dispatch] = React.useReducer(clientReducer, null)

  React.useEffect(() => {
    const setClientData = async () => {
      try {
        const mainUserData = await getMainUserData()
        dispatch({
          type: 'UPDATE_USER_DATA',
          payload: mainUserData,
        })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('setClientData err', err)
      }
    }

    setClientData()
  }, [])

  const updateUserData = async (data: MainUserData) => {
    dispatch({ type: 'UPDATE_USER_DATA', payload: data })
  }

  const value: ContextType = React.useMemo(
    () => ({
      state,
      dispatch,
      updateUserData,
    }),
    [state]
  )

  return (
    <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
  )
}

const useClient = (): ContextType => {
  const context = React.useContext(ClientContext)
  if (context === null) {
    throw new Error('useClient must be used within a clientProvider')
  }
  return context
}

export { ClientProvider, useClient }
