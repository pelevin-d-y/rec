const parseMessage = (
  string: string,
  contactName?: string, // usually the person to whom the letter is addressed
  clientName?: string // strata client
): string => {
  const comparator = new Map()

  comparator.set('<ContactName>', contactName || `[Contact name]`)
  comparator.set('<ClientName>', clientName || `[Client name]`)

  comparator.set('<Contact Name>', contactName || `[Contact name]`)
  comparator.set('<Client Name>', clientName || `[Client name]`)
  // comparator.set('<Intro Name>', clientName || `[Client name]`)

  comparator.set(/(\r\n|\r|\n)/g, '<br />')

  let newString = string
  if (newString) {
    comparator.forEach((value, key) => {
      newString = newString.replaceAll(key, value)
    })
  }
  return newString
}

export default parseMessage
