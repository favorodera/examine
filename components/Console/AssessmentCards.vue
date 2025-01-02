<template>

  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-semibold">
        Assessments
      </h1>

      <ConsoleSelect
        v-if="filteredAssessments.length > 0"
        v-model="selectedFilter"
        :options="filter"
      />
    </div>
          
    <div class="w-full grid grid-cols-[repeat(auto-fit,minmax(min(100%,25rem),1fr))] gap-4">
      <NuxtLink
        v-for="(assessment, index) in filteredAssessments.slice(splitter.start, splitter.end)"
        :key="index"
        class="w-full flex flex-col gap-8 b-1 b-blue-500 rounded-lg p-4 hover:scale-101 property-transform duration-500 ease"
      >

        <div class="flex items-center justify-between gap-6">
          <h2 class="truncate font-medium">{{ assessment?.name }}</h2>

          <div class="flex items-center gap-2">
            <p> {{ assessment?.candidates.length }} </p>
            <span class="i-hugeicons:user" />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center gap-1">
            <span class="i-hugeicons:calendar-01" />
            <p class="text-xs text-gray">{{ assessment?.date }}</p>
          </div>

          <div class="flex items-center gap-1">
            <span class="i-hugeicons:clock-05" />
            <p class="text-xs text-gray">{{ assessment?.period_mins }}mins.</p>
          </div>

          <div class="flex items-center gap-1">
            <p class="text-xs text-gray">Status</p>
            <div
              class="size-3 rounded-full  "
              :class="{
                'bg-amber animate-pulse': assessment?.status === 'upcoming',
                'bg-green animate-pulse': assessment?.status === 'ongoing',
                'bg-gray': assessment?.status === 'ended',
              }"
            />
          </div>

        </div>

      </NuxtLink>
    
      <div
        v-if="filteredAssessments.length > 0"
        class="col-span-full flex items-center justify-center gap-12 mt-8"
      >
        <button
          type="button"
          class="bg-blue-500 hover:bg-blue-600 font-semibold px-4 py-2 rounded-lg transition-background-color duration-500 disabled:opacity-50"
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
          class="bg-blue-500 hover:bg-blue-600 font-semibold px-4 py-2 rounded-lg transition-background-color duration-500 disabled:opacity-50"
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
const user = useSupabaseUser()
const paginatedAssessments = ref<Assessment[]>([])
const splitter = reactive({
  start: 0,
  end: 12,
})

const filter = [
  'All',
  'Upcoming',
  'Ongoing',
  'Ended',
]

const selectedFilter = ref('All')

watch(selectedFilter, () => {
  splitter.start = 0
  splitter.end = 12
})

const filteredAssessments = computed(() => {
  if (selectedFilter.value === 'All') {
    return paginatedAssessments.value
  }
  return paginatedAssessments.value.filter(assessment => assessment?.status === selectedFilter.value.toLowerCase())
})

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

await useAsyncData(
  'all-assessments',
  async () => {
    const { data } = await useSupabaseClient()
      .from('central_database')
      .select('assessments')
      .eq('user_id', user.value?.id as string)
      .single()

    return paginatedAssessments.value.push(...data?.assessments as Assessment[])
  },
  {
    server: false,
  },
)
</script>
