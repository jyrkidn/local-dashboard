export default async (url, method = 'json') => {
  try {
    const headers = new Headers({
      'Accept': 'application/json'
    })

    url = url.replace(/(?<!:)\/\//g, '/')

    const request = new Request(url, {
      headers
    })

    const response = await fetch(request)
    const result = await response[method]()

    return result
  } catch (error) {
    console.error(error)

    return {}
  }
}
