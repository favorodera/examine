<template>

  <Layout>

    <template #homeNav>

      <NuxtLink
        to="/"
        class="flex items-center gap-1"
      >
        <span class="i-hugeicons:school-report-card size-8 text-brand-green" />
        <p class="text-lg font-semibold">Examine</p>

      </NuxtLink>

      <button
        type="button"
        class="relative size-8 overflow-hidden b b-brand-green rounded-full bg-gray transition-transform duration-500 hover:scale-110"
        @click="() => isDropdownActive = !isDropdownActive"
      >

        <img
          v-if="instructor?.user_metadata?.picture"
          :src="instructor.user_metadata.picture"
          :alt="instructor?.email"
          class="size-full object-cover"
        >

        <p
          v-else
          class="size-full text-center text-xl uppercase"
        >
          {{ instructor?.user_metadata.name?.slice(0, 1) }}
        </p>
      </button>

      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition duration-300 ease-in"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >

        <div
          v-if="isDropdownActive"
          class="shadowed absolute right-0 top-14 flex flex-col items-center justify-between gap-12 b-brand-gray rounded-lg bg-white p-4"
        >

          <div class="flex items-start gap-2">
            <div
              class="size-12 overflow-hidden b b-brand-green rounded-full bg-gray"
            >

              <img
                v-if="instructor?.user_metadata?.picture"
                :src="instructor.user_metadata.picture"
                :alt="instructor?.email"
                class="size-full object-cover"
              >

              <p
                v-else
                class="size-full text-center text-4xl uppercase"
              >
                {{ instructor?.user_metadata.name?.slice(0, 1) }}
              </p>
            
            </div>
            <div class="flex flex-col">

              <p
                class="line-clamp-1 truncate text-xl font-medium"
              >
                {{ instructor?.user_metadata.name }}
              </p>

              <p class="line-clamp-1 truncate text-base font-medium op-50">
                {{ instructor?.email }}
              </p>
            </div>
          </div>

          <button
            type="button"
            class="w-max rounded-2 bg-red-600 px-3 py-1 text-white font-medium duration-500 ease property-background-color hover:bg-red-500"
            @click="() => {
              isDropdownActive = !isDropdownActive
              return signOut()
            }"
          >
            Sign Out
          </button>
        </div>
      </Transition>

    </template>

    <template #body>

      <ConsoleAllAssessments
        :assessments="assessments || []"
        :status="status"
      >

        <template
          v-if="status === 'error'"
          #error
        >
          <div class="mt-18 flex flex-col items-center gap-2 text-red">

            <span class="i-hugeicons:alert-02 size-6" />

            <p class="text-lg font-medium">
              Error Fetching Assessments
            </p>

            <button
              type="button"
              class="rounded-md bg-brand-green px-3 py-1 text-lg text-white font-medium transition-background-color duration-500 hover:bg-brand-green/70"
              @click="refresh()"
            >
              Retry
            </button>

          </div>

        </template>

        <template
          v-if="status === 'pending' && assessments === undefined"
          #loading
        >

          <div class="mt-18 flex flex-col items-center gap-2 text-orange">

            <span class="i-hugeicons:reload size-6 animate-spin" />

            <p class="text-lg font-medium">
              Fetching Assessments...
            </p>

          </div>

        </template>

      </ConsoleAllAssessments>

      <ModalsNewAssessment />

      <ModalsProfileUpdate />

    </template>

  </Layout>

</template>

<script setup lang="ts">
import type { RealtimeChannel } from '@supabase/realtime-js'

useSeoMeta({
  title: 'Console',
  description: 'Simplify your assessments management experience with examine',
  ogTitle: 'Examine | Console',
  ogDescription: 'Simplify your assessments management experience with examine',
  ogUrl: 'https://examine-app.vercel.app/console',
  ogSiteName: 'Examine',
  twitterTitle: 'Examine | Console',
  twitterDescription: 'Simplify your assessments management experience with examine',
})

const instructor = useSupabaseUser()
const client = useSupabaseClient()
const assessmentChannel = ref<RealtimeChannel>()
const isDropdownActive = ref(false)

const { data: assessments, status, refresh, clear } = useAsyncData(
  'all-assessments',
  () => $fetch('/api/all-assessments', { method: 'GET', timeout: 30000 }),
  { server: false },
)

onMounted(() => {

  assessmentChannel.value = client.channel('assessments')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'assessments', filter: `instructor_id=eq.${instructor.value?.id}` },
      () => refresh(),
      
    )
    .subscribe()

})

onUnmounted(() => {
  clear()

  client.removeChannel(assessmentChannel.value!)
  
})

onBeforeUnmount(() => useModalsState().ProfileUpdate === false)

client.auth.onAuthStateChange(
  async (event, session) => {
    if (event !== 'SIGNED_OUT') {
      if (session?.user.user_metadata.is_on_base && session?.user.user_metadata.name !== '') {
        return
      }
      else if ((!session?.user.user_metadata.is_on_base || session?.user.user_metadata.is_on_base === false)
        && (session?.user.user_metadata.name === '' || !session?.user.user_metadata.name)) {
        useModals('ProfileUpdate', 'open')
      }
      else {

        await $fetch('/api/create-instructor', { method: 'POST', timeout: 3000 })
          .then(async () => {
            await client.auth.updateUser({
              data: {
                is_on_base: true,
              },
            })
          })
      }
          
    }
  
  })

</script>
