type Data = {
  type: string
  data: string | any[]
}[]

const formatContactData = (data: Data, id?: string): any => {
  const parsedContact: any = {
    emails: data.flatMap((item: any) =>
      item.type === 'email' ? item.data : []
    ),
    shortName: data.flatMap((item: any) =>
      item.type === 'name_short' ? item.data : []
    )[0],
    fullName: data.flatMap((item: any) =>
      item.type === 'name' ? item.data.join(' ') : []
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
  }

  if (id) {
    parsedContact.id = id
  }

  return parsedContact
}

export default formatContactData
