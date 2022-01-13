<script setup>
import ButtonRepo from '@/components/ButtonRepo.vue'
</script>

<template>
  <div class="bg-gray-200 h-screen pt-20">
    <div
      class="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between"
    >
      
      <div class="mt-8 lg:mt-0">
        <p>新增bingo號碼</p>
        <div class="mt-4 inline-flex rounded-md">
          <a
            href="https://airtable.com/shrCR06FWla1V3CNm"
            target="_blank"
            class="inline-flex items-center justify-center px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-amber-400 border border-transparent rounded-md focus:outline-none"
            > 表單新增bingo號碼</a
          >

          <router-link to="/form"
            class="ml-4 inline-flex items-center justify-center px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-yellow-600 border border-transparent rounded-md focus:outline-none"
            >或是直接key號碼</router-link
          >
        </div>
      </div>

      <div class="mt-8 lg:mt-0">
        <p>新增開獎號碼</p>
        <div class="mt-4 inline-flex rounded-md">
          <a
            href="https://airtable.com/shr0YrI1QnDt2EBeh"
            target="_blank"
            class="inline-flex items-center justify-center px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md focus:outline-none"
            >新增開獎號碼</a
          >
        </div>
      </div>

      <div class="mt-8 lg:mt-0">
        <p>新增特別區開獎號碼</p>
        <div class="mt-4 inline-flex rounded-md">
          <a
            href="https://airtable.com/shrhaWKeGpZ4s09m2"
            target="_blank"
            class="inline-flex items-center justify-center px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-green-600 border border-transparent rounded-md focus:outline-none"
            >新增特別區開獎號碼</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
