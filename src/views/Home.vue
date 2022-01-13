<script setup>
import bingoChecker from '@/helper/bingoChecker'


import { ArrowRightIcon } from '@heroicons/vue/solid'
import { fetchAllPools, fetchAllNumbers, fetchSpecialAllNumbers } from '@/api/airtable'

const pools = ref([])
const records = ref([])

records.value = await fetchAllPools()
pools.value = records.value

const updateRecords = async () => {
  // records.value = await fetchAllPools()

  records.value.forEach(v => {
    v.matches = bingoChecker(v.numbers, hits.value)
    v.specialMatches = v.specials.filter(k => specials.value.includes(k))
  })
  pools.value = records.value
}

// 已開獎的號碼
const hits = ref([])
// 已開獎的特別號
const specials = ref([])


// 手動更新
const updateBingo = async () => {
  hits.value = await fetchAllNumbers()
  specials.value = await fetchSpecialAllNumbers()
  await updateRecords()
}

await updateBingo()

const checkAllPool = (matches) => {
  pools.value = records.value.filter((v) => {
    return v.matches >= matches
  })
}

const checkGrandPrice = () => {
  pools.value = records.value.filter((v) => {
    return v.matches >= 3 && v.specials.length > 0
  })
}

const matchOneCount = computed(() => {
  return records.value.filter((v) => {
    return v.matches >= 1
  }).length
})

const matchTwoCount = computed(() => {
  return records.value.filter((v) => {
    return v.matches >= 2
  }).length
})

const matchThreeCount = computed(() => {
  return records.value.filter((v) => {
    return v.matches >= 3
  }).length
})

const specialMatchesCount = computed(() => {
  return records.value.filter((v) => {
    return v.matches >= 3 && v.specials.length > 0
  }).length
})


</script>

<template>
  <div class="bg-gray-200 min-h-screen pt-20">
    <div
      class="max-w-screen-xl px-2 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-start lg:justify-center"
    >
      <div class="lg:flex-1 lg:px-10 lg:relative">
        <div class="w-full lg:pt-20 lg:fixed lg:top-[100px] lg:w-[600px]">
          <h3 class="text-lg lg:text-4xl px-4 flex items-center">
            <span>目前開獎號碼</span>
            <button
              @click="updateBingo"
              type="button"
              class="ml-2 text-xs lg:text-lg border border-indigo-500 bg-indigo-500 text-white rounded-md px-2 py-1 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
            >
              更新號碼
            </button>
          </h3>
          <p class="px-4 pt-2 mt-1">
            <span
              v-for="num in hits"
              :key="num"
              class="inline-block mb-3 bg-stone-500 rounded-full py-2 lg:py-4 text-center object-right-top text-white text-sm lg:text-2xl mr-1 w-10 lg:w-20 font-bold"
              >{{ num }}</span
            >
          </p>
        </div>
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
              中1條 ({{ matchOneCount }})
            </button>

            <button
              @click="checkAllPool(2)"
              type="button"
              class="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none focus:outline-none focus:shadow-outline"
            >
              中2條 ({{ matchTwoCount }})
            </button>

            <button
              @click="checkAllPool(3)"
              type="button"
              class="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none focus:outline-none focus:shadow-outline"
            >
              中3條 ({{ matchThreeCount }})
            </button>

            <button
              @click="checkGrandPrice()"
              type="button"
              class="border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none focus:outline-none focus:shadow-outline"
            >
              中大獎 ({{ specialMatchesCount }})
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
                      <div class="font-semibold text-left">編號</div>
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
                      <div class="font-semibold text-left">特別號</div>
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
                          :key="num"
                          class="font-bold inline-block text-center lg:text-xl w-7 lg:w-12"
                          >{{ num }}</strong
                        >
                      </p>
                    </td>
                    <td class="p-2 whitespace-nowrap">
                      <div class="text-left">{{ row.matches }} / 3</div>
                    </td>
                    <td class="p-2 whitespace-nowrap">
                      <div class="font-bold text-center">{{ row.specialMatches.length }}</div>
                    </td>
                    <td class="p-2 whitespace-nowrap text-right">
                      <router-link
                        class="block text-center py-2"
                        :to="`/bingo/${row.hash}`"
                        ><ArrowRightIcon
                          class="inline-block w-4 h-4 text-indigo-500"
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
