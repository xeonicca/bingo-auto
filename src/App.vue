<script setup>
import { ref } from 'vue'

</script>

<template>
  <div>
    <header class="fixed w-screen bg-white shadow" v-if="$route.meta.title">
      <div class="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8 flex items-center justify-between">
        <h1
          class="text-3xl font-bold leading-tight text-gray-900"
        >
          {{ $route.meta.title }}
        </h1>

        <nav>
          <router-link class="text-gray-600" to="/about">填號碼</router-link>
          <span class="px-2">/</span>
          <router-link class="text-gray-600" to="/">home</router-link>
        </nav>
      </div>
    </header>
    <main>
      <router-view v-slot="{ Component }">
        <suspense>
          <template #default>
            <component :is="Component"/>
          </template>
          <template #fallback>
            <div>Loading...</div>
          </template>
        </suspense>
      </router-view>
    </main>
  </div>
</template>
