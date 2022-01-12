import axios from 'axios'
import qs from 'qs'
export const airtable = axios.create({
  baseURL: `https://api.airtable.com/v0/appr4tWRQcT5MFp3D/`,
  headers: { Authorization: `Bearer keyPagIg3OoIgDKz6` },
  paramsSerializer(params) {
    return qs.stringify(params, { arrayFormat: 'indices' })
  },
})
