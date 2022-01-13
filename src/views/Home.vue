<script setup>
import listToMatrix from '@/helper/listToMatrix'
import bingoChecker from '@/helper/bingoChecker'

import { ArrowRightIcon } from '@heroicons/vue/solid'
import { airtable } from '@/api/airtable'

const pools = ref([])
const records = ref([])

const updateRecords = async () => {
  const { data } = await airtable.get('pool?maxRecords=200&view=Grid%20view')
  records.value = data.records.map((v) => {
    let numbers = v.fields.numbers?.split(',')
    return {
      hash: v.id,
      id: v.fields.id,
      numbers,
      matrix: listToMatrix(numbers),
      specials: v.fields.specials?.split(','),
      status: v.fields.status,
      matches: bingoChecker(numbers, hits.value),
    }
  })

  pools.value = records.value
}

// 已開獎的號碼
const hits = ref([])

// 手動更新
const updateBingo = async () => {
  const { data: bingos } = await airtable.get(
    `bingo?maxRecords=100&view=Grid%20view`
  )

  hits.value = bingos.records.map((v) => v.fields.bingo)

  await updateRecords()
}

await updateBingo()

const checkAllPool = (matches) => {
  pools.value = records.value.filter((v) => {
    return v.matches >= matches
  })
}
</script>

<template>
  <div class="bg-gray-200 min-h-screen pt-20">
    <div
      class="max-w-screen-xl px-2 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-center"
    >
      <div class="lg:flex-1 lg:px-10">
        <h3 class="text-lg px-4 flex items-center">
          <span>目前開獎號碼</span>
          <button
            @click="updateBingo"
            type="button"
            class="ml-2 text-xs border border-indigo-500 bg-indigo-500 text-white rounded-md px-2 py-1 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
          >
            更新號碼
          </button>
        </h3>
        <p class="px-4 mt-1">
          <strong
            v-for="num in hits"
            class="inline-block px-1 py-2 lg:p-3 lg:text-3xl"
            >{{ num }}</strong
          >
        </p>
      </div>
      <div class="flex flex-col justify-center lg:flex-1">
        <div class="px-2 py-4 my-3 mx-auto rounded-md flex items-center">
          <div class="w-full text-center mx-auto">
            <button
              @click="checkAllPool(0)"
              type="button"
              class="border border-gray-700 bg-gray-700 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none focus:outline-none focus:shadow-outline"
            >
              全部
            </button>

            <button
              @click="checkAllPool(1)"
              type="button"
              class="border border-teal-500 bg-teal-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none focus:outline-none focus:shadow-outline"
            >
              中1條
            </button>

            <button
              @click="checkAllPool(2)"
              type="button"
              class="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none focus:outline-none focus:shadow-outline"
            >
              中2條
            </button>

            <button
              @click="checkAllPool(3)"
              type="button"
              class="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none focus:outline-none focus:shadow-outline"
            >
              中3條
            </button>
          </div>
        </div>
        <!-- Table -->
        <div
          class="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200"
        >
          <header
            class="px-5 py-4 border-b border-gray-100 flex justify-between"
          >
            <h2 class="font-bold text-gray-800">Bingo Pool</h2>
            <div>
              <strong>{{ pools.length }}張</strong>
            </div>
          </header>
          <div class="p-1">
            <div class="overflow-x-auto">
              <table class="table-auto w-full">
                <thead
                  class="text-xs font-semibold uppercase text-gray-400 bg-gray-50"
                >
                  <tr>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-left">卡片編號</div>
                    </th>
                    <!-- <th class="p-2 whitespace-nowrap">
                        <div class="font-semibold text-left">Pool</div>
                      </th> -->
                    <!-- <th class="p-2 whitespace-nowrap">
                        <div class="font-semibold text-left">Rows</div>
                      </th> -->
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-left">
                        前五個數字 (確認卡片用)
                      </div>
                    </th>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-left">中幾條</div>
                    </th>
                    <th class="p-2 whitespace-nowrap">
                      <div class="font-semibold text-center">看卡片</div>
                    </th>
                  </tr>
                </thead>
                <tbody class="text-sm divide-y divide-gray-100">
                  <tr v-for="row in pools" :key="row.id">
                    <td class="p-2 whitespace-nowrap">
                      <div class="text-left">#{{ row.id }}</div>
                    </td>
                    <!-- <td class="p-2 whitespace-nowrap">
                        <div class="text-left font-medium text-gray-900">
                          {{ row.numbers }}
                        </div>
                      </td> -->
                    <!-- <td class="p-2 whitespace-nowrap">
                        <div class="text-left font-medium text-gray-900">
                          {{ row.specials }}
                        </div>
                      </td> -->
                    <td class="p-2 whitespace-nowrap">
                      <p class="">
                        <strong
                          v-for="num in row.matrix[0]"
                          class="font-bold inline-block text-left lg:text-center lg:text-xl w-8 lg:w-12"
                          >{{ num }}</strong
                        >
                      </p>
                    </td>
                    <td class="p-2 whitespace-nowrap">
                      <div class="text-left">{{ row.matches }} / 3</div>
                    </td>
                    <td class="p-2 whitespace-nowrap text-right">
                      <router-link class="block text-center py-2" :to="`/bingo/${row.hash}`"
                        ><ArrowRightIcon class="inline-block w-4 h-4 text-indigo-500"
                      /></router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
