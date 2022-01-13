<script setup>
import { HomeIcon } from "@heroicons/vue/solid";
</script>

<template>
  <header class="fixed w-screen bg-white shadow" v-if="$route.meta.title">
    <div
      class="
        px-4
        py-6
        mx-auto
        max-w-7xl
        sm:px-6
        lg:px-8
        flex
        items-center
        justify-between
      "
    >
      <h1 class="text-3xl font-bold leading-tight text-gray-900">
        {{ $route.meta.title }}
      </h1>

      <nav class="inline-flex items-center">
        <router-link class="text-gray-600" to="/about">填號碼</router-link>
        <span class="px-2">/</span>
        <router-link class="text-gray-600" to="/"
          ><HomeIcon class="inline-block w-4 h-4"
        /></router-link>
      </nav>
    </div>
  </header>
  <main>
    <router-view v-slot="{ Component, route }">
      <Suspense timeout="0">
        <template #default>
          <component :is="Component" :key="route.path" />
        </template>
        <template #fallback>
          <div class="bg-gray-200 min-h-screen">
            <div class="flex items-center justify-center w-full h-screen">
              <div
                class="
                  flex
                  justify-center
                  items-center
                  space-x-1
                  text-sm text-gray-700
                "
              >
                <svg
                  fill="none"
                  class="w-6 h-6 animate-spin"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
                    fill="currentColor"
                    fill-rule="evenodd"
                  />
                </svg>

                <div>Loading ...</div>
              </div>
            </div>
          </div>
        </template>
      </Suspense>
    </router-view>
  </main>
</template>
