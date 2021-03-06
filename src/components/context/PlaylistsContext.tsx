import chunk from 'lodash/chunk'
import * as React from 'react'
import { get, post } from 'src/api'
import { fetchDataQueue } from 'src/helpers/utils/fetchDataQueue'
import formatContactData from 'src/helpers/utils/format-contact-data'

type State = { data: ListData[]; isLoading: boolean }
type Action =
  | { type: 'UPDATE_PLAYLISTS_DATA'; payload: any[] }
  | { type: 'UPDATE_IS_LOADING'; payload: boolean }
type Dispatch = React.Dispatch<Action>

type CreatePlaylistData = {
  title: string
  description?: string
  contacts?: RecommendationUser[] | FormattedContact[]
}

type ContextType = {
  state: State
  dispatch: Dispatch
  deletePlaylists: (ids: string[]) => Promise<any>
  getPlaylists: () => void
  createPlaylist: (data: CreatePlaylistData) => Promise<ListData[]>
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

  const getPlaylists = React.useCallback(async () => {
    try {
      const playlistsIds = await get.getPlaylistsIds()

      const contactsChunks = chunk(playlistsIds, 90)
      const requests = contactsChunks.map((contactChunk) => {
        return () => get.getPlaylistsData(contactChunk)
      })
      const responses = await fetchDataQueue(requests)
      const playlistsData = responses.flat()

      const contactsResp = await Promise.all<
        ContactMutable[] | Record<string, unknown>
      >(
        playlistsData.map((playlist) => {
          const { contacts: playlistContacts } = playlist

          if (playlistContacts && playlistContacts.length > 0) {
            return get.getContactsMutable(
              playlistContacts
                .map((item: any) => item.contact_id)
                .filter((_, index) => index <= 9) // for playlist we need only first 10 avatars
            )
          }
          return {}
        })
      )

      const playlistsWithContacts = playlistsData.map((item, index) => {
        let newItem = item

        const contacts = contactsResp[index]
        if (contacts) {
          const formattedData = Object.entries(contacts).map(
            ([id, contact]) => {
              const contactData = formatContactData(contact as any, id)

              return contactData
            }
          )

          newItem.contactsData = formattedData
        } else {
          newItem.contactsData = []
        }

        return newItem
      })

      return dispatch({
        type: 'UPDATE_PLAYLISTS_DATA',
        payload: playlistsWithContacts,
      })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('getPlaylists err ==>', err)
      return Promise.reject(new Error(err as any))
    }
  }, [])

  const deletePlaylists = React.useCallback(
    (ids: string[]) =>
      post
        .postPlaylists(ids.map((item) => ({ playlist_id: item })))
        .then(() => getPlaylists())
        // eslint-disable-next-line no-console
        .catch((err) => console.log('deletePlaylists err', err)),
    [getPlaylists]
  )

  const createPlaylist = React.useCallback((data: CreatePlaylistData) => {
    const { title, description, contacts } = data

    return post
      .postCreatePlaylist([
        {
          info: {
            name: title,
            description: description || '',
          },
          contacts:
            contacts?.map((item) => ({
              contact_id: item.contact_id,
            })) || [],
        },
      ])
      .catch((err) => Promise.reject(err))
  }, [])

  const value: ContextType = React.useMemo(
    () => ({
      state,
      dispatch,
      deletePlaylists,
      getPlaylists,
      createPlaylist,
    }),
    [deletePlaylists, getPlaylists, createPlaylist, state]
  )

  React.useEffect(() => {
    const getPlaylistsAsync = async () => {
      try {
        dispatch({ type: 'UPDATE_IS_LOADING', payload: true })
        await getPlaylists()
        dispatch({ type: 'UPDATE_IS_LOADING', payload: false })
      } catch (err) {
        console.warn('getPlaylistsAsync err =>', err)
      }
    }
    getPlaylistsAsync()
  }, [getPlaylists])

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
