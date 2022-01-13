<script setup>
import { airtable } from '@/api/airtable'
import listToMatrix from '@/helper/listToMatrix'
import bingoChecker from '@/helper/bingoChecker'

const $route = useRoute()
const hash = $route.params.hash

const { data } = await airtable.get(`pool/${hash}`)
const { data: bingos } = await airtable.get(
  `bingo?maxRecords=100&view=Grid%20view`
)

const hits = bingos.records.map((v) => v.fields.bingo)
const id = data.fields.id
const numbers = data.fields.numbers?.split(',')
const matrix = listToMatrix(data.fields.numbers?.split(','))

const isWonCount = bingoChecker(numbers, hits, 2)
// const numbers = listToMatrix(data.fields.numbers?.split(','))
</script>

<template>
  <div class="bg-gray-200 min-h-screen pt-20">
    <div
      class="max-w-screen-xl px-2 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8"
    >
      <!-- Table -->
      <div
        class="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200"
      >
        <header class="px-5 py-4 border-b border-gray-100 flex justify-between">
          <h2 class="font-semibold text-gray-800">卡片 #{{ id }}</h2>
          <span>{{ isWonCount }} / 3</span>
        </header>
        <div class="p-1">
          <div class="overflow-x-auto">
            <table class="table-fixed w-full">
              <tbody class="text-xl divide-y divide-gray-100">
                <tr v-for="row in matrix">
                  <td v-for="num in row" class="p-1">
                    <div
                      class="text-center font-bold py-4"
                      :class="{
                        'bg-rose-400': hits.indexOf(Number(num)) !== -1,
                      }"
                    >
                      {{ num }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="text-center pt-8 px-2">
        <router-link
          to="/"
          class="w-full border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
        >
          上一頁
        </router-link>
      </div>
    </div>
  </div>
</template>
