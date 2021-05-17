/* eslint-disable camelcase */

type Playlists = (
  | 'Meetings & Events'
  | 'Follow Ups'
  | 'Birthdays'
  | 'New Roles'
  | 'Time Lapsed: 90 Days'
  | 'Time Lapsed: 1 Year'
  | 'Travel: Who to Meet'
  | 'Relocation'
  | 'Holidays'
  | 'Share Strata'
  | 'Checking Emails'
  | 'Intros received'
  | 'Network Engagement'
  | 'Network Maintenance'
)[]

type Template = {
  Template: string
  Header: string
  Summary: string
  Subject: string
  Message: string
}

type UserData = {
  id?: number
  name?: string
  avatar?: string
  title?: string
  last_client_text?: string
  first_message_id?: string
  notes?: string
  next_outreach?: string
  template?: string
  description?: string
  position?: string
  event?: string
  address?: string
  lastMessage?: string
  last_contact_text?: string
  last_contact_time?: string
  playlists?: Playlists
  templateData?: Template
}

type List = {
  id: number
  title: string
  users: UserData[]
  description: string
  icon: string
}

type Lists = List[]
