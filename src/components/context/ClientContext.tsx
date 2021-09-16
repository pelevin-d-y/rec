import * as React from 'react'
import { get } from 'src/api'
import addAdditionFields from 'src/helpers/utils/add-addition-fields'
import testUsers from 'src/testUsers.json'
import formatContactData from 'src/helpers/utils/format-contact-data'
import { useQuery } from 'react-query'

type Action = { type: 'UPDATE_USER_DATA'; payload: MainUserData }

type State = MainUserData | undefined

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

const addAuthData = (clientData: MainUserData, authData: any): MainUserData => {
  const data: MainUserData = {
    ...clientData,
    authData,
    syncedEmails: [],
    unsyncEmails: [],
  }

  Object.entries(authData).forEach(([email, status]) => {
    if (status === 2) {
      if (data.syncedEmails) {
        data.syncedEmails.push(email)
      }
    }
    if (status === 1) {
      if (data.unsyncEmails) {
        data.unsyncEmails.push(email)
      }
    }
  })

  return data
}

const getMainUserData = ([recommendations, contact, auth]: [
  RecommendationUser[],
  GetContactResp,
  Record<string, unknown>
]): MainUserData => {
  const extendedUsers = addAdditionFields(recommendations)
  const formattedClientData = formatContactData(contact)
  const clientData = addAuthData(formattedClientData, auth)

  const mainUserData: MainUserData = {
    ...clientData,
    contacts:
      extendedUsers.length < 10 ? addAdditionFields(testUsers) : extendedUsers, // have to remove when API is fixed
  }

  return mainUserData
}

const ClientProvider: React.FC = ({ children }): JSX.Element => {
  const [state, dispatch] = React.useReducer(clientReducer, undefined)

  const mainUserData = useQuery({
    queryKey: ['mainUserData'],
    queryFn: () =>
      Promise.all([
        get.getRecommendations(),
        get.getContact(),
        get.getAuth(),
      ]).then((res) => getMainUserData(res)),
  })

  React.useEffect(() => {
    if (mainUserData.data) {
      dispatch({
        type: 'UPDATE_USER_DATA',
        payload: mainUserData.data,
      })
    }
  }, [mainUserData.data])

  const updateUserData = async (data: MainUserData) => {
    dispatch({ type: 'UPDATE_USER_DATA', payload: data })
  }

  const value: ContextType = React.useMemo(
    () => ({
      state,
      dispatch,
      query: mainUserData.data,
      updateUserData,
    }),
    [mainUserData.data, state]
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
