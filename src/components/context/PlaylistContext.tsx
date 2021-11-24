import * as React from 'react'
import { get, post } from 'src/api'
import formatContactData from 'src/helpers/utils/format-contact-data'
import { useRouter } from 'next/router'

type Action =
  | { type: 'UPDATE_LIST'; payload: any }
  | { type: 'UPDATE_SELECTED_USERS'; payload: any[] }
type State = Playlist | null

type Dispatch = React.Dispatch<Action>
type ContextType = {
  state: State
  dispatch: Dispatch
  getPlaylistData: () => void
  removeUsers: (userData: any) => Promise<any>
  addUsers: (users: (UserData | FormattedContacts)[]) => Promise<any>
}

const PlaylistContext = React.createContext<ContextType | null>(null)

const playlistReducer = (state: State, action: any): State => {
  switch (action.type) {
    case 'UPDATE_LIST': {
      return action.payload
    }
    default: {
      return state
    }
  }
}

const PlaylistProvider: React.FC = ({ children }) => {
  const router = useRouter()
  const [state, dispatch] = React.useReducer(playlistReducer, null)

  const getPlaylistData = React.useCallback(async () => {
    try {
      const playlist = await get.getPlaylistsData([router.query.id] as string[])
      const newPlaylist = playlist[0]

      if (newPlaylist.contacts.length > 0) {
        const contactsResp = await get.getContactsMutable(
          newPlaylist.contacts.map((item) => item.contact_id)
        )

        newPlaylist.contacts = Object.entries(contactsResp).map(
          ([id, contact]) => formatContactData(contact, id)
        )
      }

      dispatch({ type: 'UPDATE_LIST', payload: newPlaylist })
    } catch (err) {
      console.log('getPlaylistData err =>', err)
    }
  }, [router.query.id])

  const removeUsers = React.useCallback(
    (users: (UserData | FormattedContacts)[]) => {
      if (state?.id) {
        return post
          .postPlaylists([
            {
              id: state.id,
              contacts: users.map((item) => ({
                contact_id: 'id' in item ? item.id : item.contact_id,
                review: 2,
              })),
            },
          ])
          .then(() => getPlaylistData())
          .catch((err: any) => console.log('removeUser err =>', err))
      }
      return new Promise((resolve, reject) =>
        reject(new Error('List id is undefined'))
      )
    },
    [state?.id, getPlaylistData]
  )

  const addUsers = React.useCallback(
    (users: (UserData | FormattedContacts)[]) => {
      if (state?.id) {
        const contacts = users.map((item) => ({
          contact_id: 'id' in item ? item?.id : item?.contact_id,
          review: 1,
        }))

        return post
          .postPlaylists([
            {
              id: state.id,
              contacts,
            },
          ])
          .then(() => getPlaylistData())
          .catch((err: any) => console.log('addUser err =>', err))
      }

      return new Promise((resolve, reject) =>
        reject(new Error('List id is undefined'))
      )
    },
    [state?.id, getPlaylistData]
  )

  React.useEffect(() => {
    if (router.query.id && !state) {
      getPlaylistData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.id])

  const value: ContextType = React.useMemo(
    () => ({
      state,
      dispatch,
      getPlaylistData,
      addUsers,
      removeUsers,
    }),
    [state, getPlaylistData, addUsers, removeUsers]
  )

  return (
    <PlaylistContext.Provider value={value}>
      {children}
    </PlaylistContext.Provider>
  )
}

const usePlaylist = (): ContextType => {
  const context = React.useContext(PlaylistContext)
  if (context === null) {
    throw new Error('usePlaylist must be used within a PlaylistProvider')
  }
  return context
}

export { PlaylistProvider, usePlaylist }
