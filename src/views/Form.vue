<script>
import { airtable } from '@/api/airtable'

export default {
  data: () => ({
    inputArray: Array(25),
  }),

  methods: {
    async submit() {
      let numbers = this.inputArray.join(',')
      let response =  await airtable.post(`pool`, {
        fields: {numbers} 
      })

      alert(`剛剛送出那張的編號是${response.data.fields.id}`)
    }
  }
}
</script>

<template>
  <div class="bg-gray-200 h-screen pt-20">
    <div class="max-w-screen-xl px-2 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8">
      <!-- Table -->
      <div
        class="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200"
      >
        <div class="p-1">
          <div class="overflow-x-auto">
            <table class="table-auto w-full">
              <tbody class="text-xl divide-y divide-gray-100">
                <tr v-for="(row, i) in 5">
                  <td
                    v-for="(num, j) in 5"
                    class="p-2 text-center"
                    :key="i * 5 + j"
                  >
                    <input
                      class="w-12 p-2 text-xl text-center rounded-lg border-2 border-indigo-200"
                      type="number"
                      :tabindex="i * 5 + j + 1"
                      v-model="inputArray[i * 5 + j]"
                    />
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
          首頁
        </router-link>
        <button
          @click="submit"
          type="button"
          class="ml-8 border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none focus:outline-none focus:shadow-outline"
        >
          送出
        </button>
        
      </div>
    </div>
  </div>
</template>
