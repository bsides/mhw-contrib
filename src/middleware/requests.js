import axios from 'axios'

const API_URL = `https://mhw-db.com`
const API_WEAPONS = `/weapons`
const API_ARMORS = `/armors`

export async function getWeapons() {
  try {
    const response = await axios.get(`${API_URL}${API_WEAPONS}`)
    console.log(response.data)
    return response.data
  } catch (message) {
    return message // will always be of the type { error: { code: 'error code', message: 'error message' }}
  }
}
export async function getArmors() {
  try {
    const response = await axios.get(`${API_URL}${API_ARMORS}`)
    console.log(response.data)
    return response.data
  } catch (message) {
    return message // will always be of the type { error: { code: 'error code', message: 'error message' }}
  }
}
