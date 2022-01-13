<script>
import { airtable } from '@/api/airtable'

export default {
  data: () => ({
    inputArray: Array(25),
    specialArray: Array(7)
  }),

  methods: {
    async submit() {
      let numbers = this.inputArray.join(',')
      let specials = this.specialArray.join(',')
      let response =  await airtable.post(`pool`, {
        fields: {numbers, specials}
      })

      alert(`剛剛送出那張的編號是${response.data.fields.id}`)
      this.clearForm()
    },

    clearForm() {
      this.inputArray = Array(25)
      this.specialArray = Array(7)
    }
  }
}
</script>

<template>
  <div class="bg-gray-200 min-h-screen pt-20">
    <div class="max-w-screen-xl px-2 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8">
      <!-- Table -->
      <div
        class="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200"
      >
        <div class="p-1">
          <h2 class="pl-4 py-2 text-lg font-bold" >一般號</h2>
          <div class="overflow-x-auto">
            <table class="table-auto w-full">
              <tbody class="text-xl divide-y divide-gray-100">
                <tr v-for="(row, i) in 5">
                  <td
                    v-for="(num, j) in 5"
                    class="p-1 text-center"
                    :key="i * 5 + j"
                  >
                    <input
                      class="w-full p-2 text-xl text-center rounded-lg border-2 border-indigo-200"
                      type="tel"
                      :tabindex="i * 5 + j + 1"
                      v-model="inputArray[i * 5 + j]"
                      maxlength="2"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div
        class="mt-4 w-full max-w-2xl mx-auto bg-stone-100 shadow-lg rounded-sm border border-gray-200"
      >
        <div class="p-1">
          <h2 class="pl-4 py-2 text-lg font-bold" >特殊號</h2>
          <div class="overflow-x-auto">
            <table class="table-auto w-full">
              <tbody class="text-xl divide-y divide-gray-100">
                <tr>
                  <td
                    v-for="(num, i) in 7"
                    class="p-1 text-center"
                    :key="26 + i"
                  >
                    <input
                      class="w-full p-2 text-xl text-center rounded-lg border-2 border-indigo-200"
                      type="tel"
                      :tabindex="26 + i"
                      v-model="specialArray[i]"
                      maxlength="2"
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
          @click="clearForm"
          type="button"
          class="ml-4 border border-stone-500 bg-stone-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none focus:outline-none focus:shadow-outline"
        >
          清除
        </button>
        <button
          @click="submit"
          type="button"
          class="ml-4 border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none focus:outline-none focus:shadow-outline"
        >
          送出
        </button>
      </div>
    </div>
  </div>
</template>
