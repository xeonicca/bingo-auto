<script setup>
import { airtable } from "@/api/airtable";

let result = await airtable.get("pool?maxRecords=500&view=Grid%20view");
const { records } = result.data;
</script>

<template>
  <div class="bg-gray-50">
    <div
      class="
        max-w-screen-xl
        px-4
        py-12
        mx-auto
        sm:px-6
        lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between
      "
    >
      <!-- component -->
      <section class="antialiased bg-gray-100 text-gray-600 h-screen px-4">
        <div class="flex flex-col justify-center h-full">
          <!-- Table -->
          <div
            class="
              w-full
              max-w-2xl
              mx-auto
              bg-white
              shadow-lg
              rounded-sm
              border border-gray-200
            "
          >
            <header class="px-5 py-4 border-b border-gray-100">
              <h2 class="font-semibold text-gray-800">Customers</h2>
            </header>
            <div class="p-3">
              <div class="overflow-x-auto">
                <table class="table-auto w-full">
                  <thead
                    class="
                      text-xs
                      font-semibold
                      uppercase
                      text-gray-400
                      bg-gray-50
                    "
                  >
                    <tr>
                      <th class="p-2 whitespace-nowrap">
                        <div class="font-semibold text-left">id</div>
                      </th>
                      <th class="p-2 whitespace-nowrap">
                        <div class="font-semibold text-left">Pool</div>
                      </th>
                      <th class="p-2 whitespace-nowrap">
                        <div class="font-semibold text-left">Rows</div>
                      </th>
                      <th class="p-2 whitespace-nowrap">
                        <div class="font-semibold text-left">Status</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="text-sm divide-y divide-gray-100">
                    <tr v-for="row in records" :key="row.id">
                      <td class="p-2 whitespace-nowrap">
                        <div class="text-left">{{ row.id }}</div>
                      </td>
                      <td class="p-2 whitespace-nowrap">
                        <div class="text-left font-medium text-green-200">
                          {{ row.numbers }}
                        </div>
                      </td>
                      <td class="p-2 whitespace-nowrap">
                        <div class="text-left font-medium text-green-500">
                          {{ row.specials }}
                        </div>
                      </td>
                      <td class="p-2 whitespace-nowrap">
                        <div class="text-left">{{ row.status }}</div>
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
