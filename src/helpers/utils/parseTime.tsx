import format from 'date-fns/format'
import parse from 'date-fns/parse'

export const formatTime = (date: string): string => {
  if (!date) {
    return 'not found'
  }
  return format(parse(date, 'y-M-d H:m:s', new Date()), 'MMMM dd, yyyy')
}

export const parseDate = (date: string): Date =>
  parse(date, 'y-M-d H:m:s', new Date())
