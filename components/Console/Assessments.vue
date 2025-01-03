<template>

  <div class="flex flex-col gap-4 mt-8 w-full max-w-[90rem] self-center">
    <div class="flex items-center justify-end">
      <!-- ADD SEARCH -->

      <ConsoleSelect
        v-model="selectedFilter"
        :options="filter"
      />
    </div>
          
    <div class="w-full grid grid-cols-[repeat(auto-fit,minmax(min(100%,25rem),1fr))] gap-4">
      <NuxtLink
        v-for="(assessment, index) in filteredAssessments.slice(splitter.start, splitter.end)"
        :key="index"
        :to="`/console/assessment-${assessment.id}`"
        class="card w-full flex flex-col gap-2 bg-white rounded-lg p-4 hover:scale-101 property-transform duration-500 ease"
      >

        <div class="flex items-center justify-between gap-4">
          <h2 class="truncate font-semibold text-brand-dark text-xl">{{ assessment?.name }}</h2>

          <span
            v-if="assessment?.status === 'completed' || assessment?.status === 'upcoming'"
            class="size-5"
            :class="{
              'i-hugeicons:checkmark-circle-02  text-brand-green': assessment?.status === 'completed',
              'i-hugeicons:hourglass text-[#ff784b]': assessment?.status === 'upcoming',
            }"
          />

          <span
            v-else
            class="size-3 rounded-full bg-brand-green animate-pulse "
          />
          
        </div>

        <div class="text-base text-brand-dark">
          <p class="text-brand-gray">Status: {{ assessment.status }}</p>
          <p>Date: {{ assessment.date_time }}</p>
          <p>Candidates: {{ assessment.candidates.length }}</p>
          <p>Duration: {{ assessment.duration_mins }} mins.</p>
        </div>

      </NuxtLink>
    
      <div
        v-if="filteredAssessments.length > 0"
        class="col-span-full flex items-center justify-center gap-12 mt-8"
      >
        <button
          type="button"
          class="w-max flex gap-2 items-center px-4 py-2 bg-brand-green hover:bg-brand-green/80 property-background-color duration-500 ease text-white rounded-2 disabled:opacity-50"
          :disabled="splitter.start === 0"
          @click="paginate('prev')"
        >
          <span class="i-hugeicons:arrow-left-02 size-6" />
        </button>

        <p class="text-sm text-gray">
          Showing {{ Math.min(splitter.end, filteredAssessments?.length) }} of {{ filteredAssessments?.length }}
        </p>

        <button
          type="button"
          class="w-max flex gap-2 items-center px-4 py-2 bg-brand-green hover:bg-brand-green/80 property-background-color duration-500 ease text-white rounded-2 disabled:opacity-50"
          :disabled="splitter.end >= filteredAssessments?.length"
          @click="paginate('next')"
        >
          <span class="i-hugeicons:arrow-right-02 size-6" />
        </button>
      </div>

    </div>
  </div>
  
</template>

<script setup lang="ts">
// State for paginated assessments
const paginatedAssessments = ref<Assessment[]>([])

// Reactive object to manage pagination
const splitter = reactive({
  start: 0,
  end: 12,
})

// Filter options for assessments
const filter = [
  'All',
  'Upcoming',
  'Ongoing',
  'Completed',
]

// State for the currently selected filter
const selectedFilter = ref('All')

// Watcher to reset pagination when filter changes
watch(selectedFilter, () => {
  splitter.start = 0
  splitter.end = 12
})

// Computed property to filter assessments based on the selected filter
const filteredAssessments = computed(() => {
  if (selectedFilter.value === 'All') {
    return paginatedAssessments.value
  }
  return paginatedAssessments.value.filter(assessment => assessment?.status === selectedFilter.value.toLowerCase())
})

// Function to handle pagination
const paginate = (direction: 'next' | 'prev') => {
  const totalAssessments = filteredAssessments.value.length

  if (direction === 'next') {
    if (splitter.end < totalAssessments) {
      splitter.start += 12
      splitter.end += 12
    }
  }
  else {
    if (splitter.start > 0) {
      splitter.start -= 12
      splitter.end -= 12
    }
  }
}

// Fetch all assessments asynchronously
await useAsyncData(
  'all-assessments',
  async () => {
    const data = await $fetch('/api/assessments', { method: 'get' })
    return paginatedAssessments.value.push(...data) // Push fetched data into paginatedAssessments
  },
  {
    server: false,
  },
)
</script>

<style scoped lang="css">
.card {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px;
}
</style>
