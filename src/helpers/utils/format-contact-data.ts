type Data = ContactMutable[]

const types = [
  'name_short',
  'name',
  'image',
  'company',
  'title',
  'phone',
  'Notes',
  'email',
  'primaryEmail',
  'name_suffix',
  'Playlist_Notes',
]

const formatContactData = (data: Data, id?: string): FormattedContact => {
  data.forEach((item) => {
    if (!types.includes(item.type)) {
      console.warn(`unexpected type from mutable API ${item.type}`)
    }
  })

  // Names
  const name =
    data.find((item) => {
      return item.type === 'name' && item.meta.type === 'primary'
    }) || data.find((item) => item.type === 'name')

  const names = data.filter((item) => item.type === 'name')

  // Emails
  const emails = data.flatMap((item: any) =>
    item.type === 'email' ? item : []
  )
  const primaryEmail = data.find((item) => item.meta.type === 'primary')

  const parsedContact: any = {
    names,
    name,
    emails,
    primaryEmail,
    shortName: data.flatMap((item: any) =>
      item.type === 'name_short' ? item.data : []
    )[0],
    avatar: data.flatMap((item: any) =>
      item.type === 'image' ? item.meta.cached : []
    )[0],
    company:
      data.flatMap((item: any) =>
        item.type === 'company' ? item.data : []
      )[0] || '',
    title:
      data.flatMap((item: any) =>
        item.type === 'title' ? item.data : []
      )[0] || '',
    phone:
      data.flatMap((item: any) =>
        item.type === 'phone' ? item.data : []
      )[0] || '',
    Notes:
      data.flatMap((item: any) =>
        item.type === 'Notes' ? item.data : []
      )[0] || '',
    Playlist_Notes:
      data.flatMap((item: any) =>
        item.type === 'Playlist_Notes'
          ? [
              {
                text: item.meta.text,
                playlistId: item.data,
              },
            ]
          : []
      ) || [],
  }

  if (id) {
    parsedContact.contact_id = id
  }

  return parsedContact
}

export default formatContactData
