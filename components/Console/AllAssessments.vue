<template>

  <main class="w-full flex flex-col gap-4">

    <template v-if=" filteredAssessments.length > 0 || status === 'success'">

      <div class="w-full flex items-center justify-between gap-4">

        <input
          v-model="searchQuery"
          type="search"
          class="max-w-40 b b-brand-gray rounded-md p-2 text-sm outline-none"
          placeholder="Search Assessments"
        >

        <UtilsSelect
          v-model="selectedFilter"
          :options="selectFilter"
        />

      </div>

    </template>

    <section class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,20rem),1fr))] w-full gap-4">

      <template v-if="filteredAssessments.length > 0 || status === 'success'">

        <button
          type="button"
          class="shadowed w-full flex items-center justify-center gap-3 rounded-3.5 bg-white p-8 duration-500 ease property-transform active:scale-98 hover:scale-101"
          @click="useModals('newAssessment', 'open')"
        >
          <span class="i-hugeicons:plus-sign-square size-20 op-10" />
        </button>

        <NuxtLink
          v-for="(assessment, index) in filteredAssessments.slice(splitter.start, splitter.end).reverse()"
          :key="index"
          :to="`/console/${assessment.assessment_id}`"
          class="shadowed w-full flex flex-col gap-2 rounded-lg bg-white p-4 duration-500 ease property-transform hover:scale-101"
        >

          <div class="flex items-center justify-between gap-4">

            <h2 class="truncate text-xl font-semibold">{{ assessment.assessment_name }}</h2>

            <span
              v-if="assessment.status === 'ended' || assessment.status === 'upcoming'"
              class="size-5 shrink-0"
              :class="{
                'i-hugeicons:checkmark-circle-02  text-brand-green': assessment.status === 'ended',
                'i-hugeicons:hourglass text-orange': assessment.status === 'upcoming',
              }"
            />

            <span
              v-else
              class="size-3 shrink-0 animate-pulse rounded-full bg-brand-green"
            />

          </div>

          <div class="text-base">
            <p>
              Date: {{ `${formatDateTime(assessment.date_time).formattedDate}
                ${formatDateTime(assessment.date_time).formattedTime}` }} UTC
            </p>
            <p>Candidates: {{ assessment.candidates[0].count }}</p>
            <p>Duration: {{ assessment.duration_mins }} mins.</p>
          </div>

        </NuxtLink>

        <template v-if="filteredAssessments.length > splitter.end">

          <div class="col-span-full mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              class="w-max flex items-center rounded-2 bg-brand-green px-3 py-2 text-white duration-500 ease property-background-color hover:bg-brand-green/70 disabled:opacity-50"
              :disabled="splitter.start === 0"
              @click="paginate('prev')"
            >
              <span class="i-hugeicons:arrow-left-02 size-4" />
            </button>

            <p class="text-center text-sm text-gray">
              {{ splitter.start + 1 }} to {{ Math.min(splitter.end, filteredAssessments.length) }} of {{
                filteredAssessments.length }} Assessments
            </p>

            <button
              type="button"
              class="w-max flex items-center rounded-2 bg-brand-green px-3 py-2 text-white duration-500 ease property-background-color hover:bg-brand-green/70 disabled:opacity-50"
              :disabled="splitter.end >= filteredAssessments.length"
              @click="paginate('next')"
            >
              <span class="i-hugeicons:arrow-right-02 size-4" />
            </button>
          </div>
            
        </template>

      </template>

    </section>

    <slot name="error" />

    <slot name="loading" />

    <template v-if="filteredAssessments.length === 0 && status === 'success'">

      <div class="mt-18 flex flex-col items-center gap-2 op-50">

        <span class="i-hugeicons:database size-6" />

        <p class="text-lg font-medium">
          No Assessment Found
        </p>

      </div>
    </template>

  </main>

</template>

<script lang="ts" setup>
const props = defineProps<{
  assessments: AllAssessments[] | []
  status: 'success' | 'pending' | 'error' | 'idle'
}>()

const searchQuery = ref('')

const selectFilter = ref([
  'All',
  'Upcoming',
  'Ongoing',
  'Completed',
])

const selectedFilter = ref('All')

const splitter = reactive({
  start: 0,
  end: 15,
})

const filteredAssessments = computed(() => {
  const query = searchQuery.value.toLowerCase()

  if (query) {
    return props.assessments.filter(
      assessment => assessment.assessment_name.toLowerCase().includes(query),
    )
  }

  if (selectedFilter.value === 'All') {
    return props.assessments
  }

  return props.assessments.filter(assessment => assessment?.status === selectedFilter.value.toLowerCase())
})

function paginate(direction: 'next' | 'prev') {
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
</script>
