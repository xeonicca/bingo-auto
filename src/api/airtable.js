import axios from 'axios'
import qs from 'qs'
import listToMatrix from '@/helper/listToMatrix'
import bingoChecker from '@/helper/bingoChecker'

export const airtable = axios.create({
  baseURL: `https://api.airtable.com/v0/appr4tWRQcT5MFp3D/`,
  headers: { Authorization: `Bearer keyPagIg3OoIgDKz6` },
  paramsSerializer(params) {
    return qs.stringify(params, { arrayFormat: 'indices' })
  },
})


export const fetchAllPools = async function(offset = '') {
  let params = {}
  if(offset !== '') {
    params.offset = offset
  }
  const { data } = await airtable.get('pool?pageSize=50&view=Grid%20view', {params})

  let records = data.records.map((v) => {
    let numbers = v.fields.numbers?.split(',')
    return {
      hash: v.id,
      id: v.fields.id,
      numbers,
      matrix: listToMatrix(numbers),
      specials: v.fields.specials?.split(','),
      status: v.fields.status,
      matches: 0,
    }
  })

  if(data.offset) {
    let moreData = await fetchAllPools(data.offset)
    records = records.concat(moreData)
  }

  return records
}

export const fetchAllNumbers = async function() {
  const { data } = await airtable.get(
    `bingo?pageSize=100&view=Grid%20view`
  )

  return data.records.map((v) => v.fields.bingo)
}