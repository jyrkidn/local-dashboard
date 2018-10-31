import api from './api'

class Weather {
  async get (city) {
    const query = `select item from weather.forecast where woeid in (select woeid from geo.places(1) where text='${city}') and u='c'`

    const response = await this.performQuery(query)

    return response.query.results.channel.item
  }

  async performQuery (query) {
    const endpoint = `https://query.yahooapis.com/v1/public/yql?q=${query}&format=json`

    const result = await api(endpoint)

    return result
  }
}

export default new Weather()
