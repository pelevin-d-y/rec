import * as React from 'react'
import { get, post } from 'src/api'
import formatContactData from 'src/helpers/utils/format-contact-data'

type State = { data: any[]; isLoading: boolean }
type Action =
  | { type: 'UPDATE_PLAYLISTS_DATA'; payload: any[] }
  | { type: 'UPDATE_IS_LOADING'; payload: boolean }
type Dispatch = React.Dispatch<Action>

type ContextType = {
  state: State
  dispatch: Dispatch
  deletePlaylists: (ids: string[]) => Promise<any>
  getPlaylistsAsync: () => Promise<any>
  createPlaylist: (title: string, description?: string) => Promise<ListData[]>
}

const PlaylistsContext = React.createContext<ContextType | null>(null)

const playlistsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'UPDATE_PLAYLISTS_DATA': {
      return {
        ...state,
        data: action.payload,
      }
    }
    case 'UPDATE_IS_LOADING': {
      return {
        ...state,
        isLoading: action.payload,
      }
    }
    default: {
      return state
    }
  }
}

const PlaylistsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(playlistsReducer, {
    data: [],
    isLoading: false,
  })

  const getPlaylistsAsync = React.useCallback(async () => {
    try {
      const playlistsIds = await get.getPlaylistsIds()
      const playlistsData = await get.getPlaylistsData(
        playlistsIds.map((item: string) => item)
      )

      const contactsResp = await Promise.all<
        GetContactResp[] | Record<string, unknown>
      >(
        playlistsData.map((playlist) => {
          const { contacts: playlistContacts } = playlist
          return playlistContacts.length > 0
            ? get.getContactsMutable(
                playlistContacts.map((item: any) => item.contact_id)
              )
            : {}
        })
      )

      return new Promise((resolve) => {
        const playlistsWithContacts = playlistsData.map((item, index) => {
          let newItem = item
          newItem.contacts = contactsResp[index]
            ? Object.entries(contactsResp[index]).map(([id, contact]) =>
                formatContactData(contact as any, id)
              )
            : []

          return newItem
        })

        dispatch({
          type: 'UPDATE_PLAYLISTS_DATA',
          payload: playlistsWithContacts,
        })
        resolve(playlistsWithContacts)
      })
    } catch (err) {
      return new Promise((_, reject) => {
        // eslint-disable-next-line no-console
        console.log('getPlaylistsAsync err ==>', err)
        reject(new Error(err as any))
      })
    }
  }, [])

  const deletePlaylists = React.useCallback(
    (ids: string[]) =>
      post
        .postPlaylists(ids.map((item) => ({ id: item })))
        .then(() => getPlaylistsAsync())
        // eslint-disable-next-line no-console
        .catch((err) => console.log('deletePlaylists err', err)),
    [getPlaylistsAsync]
  )

  const createPlaylist = React.useCallback(
    (title: string, description?: string) =>
      post.postPlaylists([
        {
          info: {
            name: title,
            description: description || '',
          },
        },
      ]),
    []
  )

  const value: ContextType = React.useMemo(
    () => ({
      state,
      dispatch,
      deletePlaylists,
      getPlaylistsAsync,
      createPlaylist,
    }),
    [deletePlaylists, getPlaylistsAsync, createPlaylist, state]
  )

  return (
    <PlaylistsContext.Provider value={value}>
      {children}
    </PlaylistsContext.Provider>
  )
}

const usePlaylists = (): ContextType => {
  const context = React.useContext(PlaylistsContext)
  if (context === null) {
    throw new Error('usePlaylists must be used within a PlaylistsProvider')
  }
  return context
}

export { PlaylistsProvider, usePlaylists }
