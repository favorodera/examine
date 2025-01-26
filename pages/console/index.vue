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
        class="size-8 overflow-hidden b b-brand-green rounded-full transition-transform duration-500 hover:scale-110"
      >

        <img
          :src="instructor?.user_metadata.picture"
          :alt="instructor?.email"
          class="size-full object-cover"
        >
            
      </button>

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
          v-if="status === 'pending' && assessments === null"
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

    </template>

  </Layout>

</template>

<script setup lang="ts">
import type { RealtimeChannel } from '@supabase/realtime-js'

const instructor = useSupabaseUser()
const client = useSupabaseClient()
const assessmentChannel = ref<RealtimeChannel>()

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
</script>
