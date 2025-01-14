<template>

  <Layout>

    <template #nav>

      <nav class="shadowed sticky z-1 w-full flex justify-center bg-white p-4">

        <div class="max-w-360 w-full flex items-center justify-between">

          <NuxtLink
            to="/"
            class="flex items-center gap-1"
          >
            <span class="i-hugeicons:school-report-card size-8 text-brand-green" />
            <p class="text-lg font-semibold">Examine</p>

          </NuxtLink>

          <button
            type="button"
            class="size-8 overflow-hidden b b-brand-green rounded-full rounded-md transition-transform duration-500 hover:scale-110"
          >

            <img
              :src="user?.user_metadata.picture"
              :alt="user?.email"
              class="size-full object-cover"
            >
            
          </button>

        </div>

      </nav>

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

          <div class="mt-18 flex flex-col items-center gap-4 text-red">

            <span class="i-hugeicons:alert-02 size-8" />

            <p class="text-xl font-semibold">
              Error Fetching Assessments
            </p>

            <button
              type="button"
              class="rounded-md bg-brand-green px-3 py-1 text-white font-medium transition-background-color duration-500 hover:bg-brand-green/70"
              @click="refresh()"
            >
              Retry
            </button>

          </div>

        </template>

        <template
          v-if="status === 'pending'"
          #loading
        >

          <div class="mt-18 flex flex-col items-center gap-4 text-orange">

            <span class="i-hugeicons:reload size-8 animate-spin" />

            <p class="text-xl font-semibold">
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
const user = useSupabaseUser()
const createUpdate = useCreateUpdate()

const { data: assessments, status, refresh } = useAsyncData(
  'all-assessments',
  () => $fetch('/api/allAssessments', { method: 'GET', timeout: 30000 }),
  { server: false },
)

watch(createUpdate, () => {
  if (createUpdate.assessment) {
    refresh()
  }
})
</script>
