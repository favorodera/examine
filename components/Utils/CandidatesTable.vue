<template>
  <div class="w-full overflow-x-auto">
    <table class="w-full overflow-hidden rounded-lg bg-white">
      <thead class="b-b b-b-brand-gray/20">
        <tr>
          <th class="select-none p-2">
            <button
              type="button"
              class="w-max flex items-center justify-center gap-2 rounded-md px-2 py-1 outline-0 duration-500 ease property-background-color hover:bg-brand-gray/20"
              @click="sort('candidate_id')"
            >
              <span>ID</span>
              <span
                class="size-4 shrink-0"
                :class="{
                  'i-hugeicons:arrow-up-02': sortOrder === 'asc' && sortBy === 'candidate_id',
                  'i-hugeicons:arrow-down-02': sortOrder === 'desc' && sortBy === 'candidate_id',
                  'i-hugeicons:arrow-up-down': sortOrder === null && sortBy === 'candidate_id' || sortBy !== 'candidate_id',
                }"
              />
            </button>
          </th>

          <th class="select-none p-2">
            <button
              type="button"
              class="w-max flex items-center justify-center gap-2 rounded-md px-2 py-1 outline-0 duration-500 ease property-background-color hover:bg-brand-gray/20"
              @click="sort('candidate_department')"
            >
              <span>Department</span>
              <span
                class="size-4 shrink-0"
                :class="{
                  'i-hugeicons:arrow-up-02': sortOrder === 'asc' && sortBy === 'candidate_department',
                  'i-hugeicons:arrow-down-02': sortOrder === 'desc' && sortBy === 'candidate_department',
                  'i-hugeicons:arrow-up-down': sortOrder === null && sortBy === 'candidate_department' || sortBy !== 'candidate_department',
                }"
              />
            </button>
          </th>

          <th class="select-none p-2">
            <button
              type="button"
              class="w-max flex items-center justify-center gap-2 rounded-md px-2 py-1 outline-0 duration-500 ease property-background-color hover:bg-brand-gray/20"
              @click="sort('candidate_email')"
            >
              <span>Email</span>
              <span
                class="size-4 shrink-0"
                :class="{
                  'i-hugeicons:arrow-up-02': sortOrder === 'asc' && sortBy === 'candidate_email',
                  'i-hugeicons:arrow-down-02': sortOrder === 'desc' && sortBy === 'candidate_email',
                  'i-hugeicons:arrow-up-down': sortOrder === null && sortBy === 'candidate_email' || sortBy !== 'candidate_email',
                }"
              />
            </button>
          </th>

          <th class="select-none p-2">
            <button
              type="button"
              class="w-max flex items-center justify-center gap-2 rounded-md px-2 py-1 outline-0 duration-500 ease property-background-color hover:bg-brand-gray/20"
              @click="sort('name')"
            >
              <span>Name</span>
              <span
                class="size-4 shrink-0"
                :class="{
                  'i-hugeicons:arrow-up-02': sortOrder === 'asc' && sortBy === 'name',
                  'i-hugeicons:arrow-down-02': sortOrder === 'desc' && sortBy === 'name',
                  'i-hugeicons:arrow-up-down': sortOrder === null && sortBy === 'name' || sortBy !== 'name',
                }"
              />
            </button>
          </th>

          <th class="select-none p-2">
            <button
              type="button"
              class="w-max flex items-center justify-center gap-2 rounded-md px-2 py-1 outline-0 duration-500 ease property-background-color hover:bg-brand-gray/20"
              @click="sort('score')"
            >
              <span>Score (%)</span>
              <span
                class="size-4 shrink-0"
                :class="{
                  'i-hugeicons:arrow-up-02': sortOrder === 'asc' && sortBy === 'score',
                  'i-hugeicons:arrow-down-02': sortOrder === 'desc' && sortBy === 'score',
                  'i-hugeicons:arrow-up-down': sortOrder === null && sortBy === 'score' || sortBy !== 'score',
                }"
              />
            </button>
          </th>

          <th class="select-none p-2">
            <button
              type="button"
              class="w-max flex items-center justify-center gap-2 rounded-md px-2 py-1 outline-0 duration-500 ease property-background-color hover:bg-brand-gray/20"
              @click="sort('time_spent_mins')"
            >
              <span>Time Spent (Mins)</span>
              <span
                class="size-4 shrink-0"
                :class="{
                  'i-hugeicons:arrow-up-02': sortOrder === 'asc' && sortBy === 'time_spent_mins',
                  'i-hugeicons:arrow-down-02': sortOrder === 'desc' && sortBy === 'time_spent_mins',
                  'i-hugeicons:arrow-up-down': sortOrder === null && sortBy === 'time_spent_mins' || sortBy !== 'time_spent_mins',
                }"
              />
            </button>
          </th>

          <th class="select-none p-2">
            <button
              type="button"
              class="w-max flex items-center justify-center gap-2 rounded-md px-2 py-1 outline-0 duration-500 ease property-background-color hover:bg-brand-gray/20"
              @click="sort('remark')"
            >
              <span>Remark</span>
              <span
                class="size-4 shrink-0"
                :class="{
                  'i-hugeicons:arrow-up-02': sortOrder === 'asc' && sortBy === 'remark',
                  'i-hugeicons:arrow-down-02': sortOrder === 'desc' && sortBy === 'remark',
                  'i-hugeicons:arrow-up-down': sortOrder === null && sortBy === 'remark' || sortBy !== 'remark',
                }"
              />
            </button>
          </th>
        </tr>
      </thead>

      <tbody>
        <template v-if="filteredAndSortedCandidates.slice(splitter.start, splitter.end).length > 0">
          <tr
            v-for="candidate in paginatedCandidates"
            :key="candidate.candidate_id"
            class="b-b border-brand-gray/20 hover:bg-brand-gray/5"
          >
            <td class="p-3">
              <NuxtLink :to="`/${useRoute().params.assessmentId}/${encodeURIComponent(candidate.candidate_id)}` ">
                {{ candidate.candidate_id }}
              </NuxtLink>
            </td>
            <td class="p-3">
              {{ candidate.candidate_department }}
            </td>
            <td class="p-3">
              {{ candidate.candidate_email }}
            </td>
            <td class="p-3">
              {{ candidate.name }}
            </td>
            <td class="p-3">
              {{ candidate.score }}
            </td>
            <td class="p-3">
              {{ candidate.time_spent_mins }}
            </td>
            <td
              class="p-3"
              :class="{
                'text-brand-green': candidate.remark === 'pass',
                'text-red-500': candidate.remark === 'fail',
              }"
            >
              {{ candidate.remark }}
            </td>
          </tr>

          <tr>
            <td
              colspan="7"
              class="p-3"
            >
              <template v-if="filteredAndSortedCandidates.length > splitter.end">
                <div class="mt-4 flex items-center justify-end gap-4">
                  <button
                    type="button"
                    class="w-max flex items-center rounded-2 bg-brand-green px-3 py-2 text-white duration-500 ease property-background-color hover:bg-brand-green/70 disabled:opacity-50"
                    :disabled="splitter.start === 0"
                    @click="paginate('prev')"
                  >
                    <span class="i-hugeicons:arrow-left-02 size-4" />
                  </button>

                  <p class="text-center text-sm text-brand-gray">
                    {{ splitter.start + 1 }} to {{ Math.min(splitter.end, filteredAndSortedCandidates.length) }} of {{
                      filteredAndSortedCandidates.length }} Candidates
                  </p>

                  <button
                    type="button"
                    class="w-max flex items-center rounded-2 bg-brand-green px-3 py-2 text-white duration-500 ease property-background-color hover:bg-brand-green/70 disabled:opacity-50"
                    :disabled="splitter.end >= filteredAndSortedCandidates.length"
                    @click="paginate('next')"
                  >
                    <span class="i-hugeicons:arrow-right-02 size-4" />
                  </button>
                </div>

              </template>
              
            </td>
          </tr>
        </template>

        <template v-else>
          <tr>
            <td colspan="7">
              <div class="mt-12 min-w-full flex flex-col items-center justify-center gap-2 op-50">
                <span class="i-hugeicons:database size-6" />
                <p class="text-lg font-medium">
                  No Candidate Found
                </p>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  candidates: AssessmentDetails['candidates']
  searchQuery: string
}>()

const sortBy = ref<keyof {
  candidate_id: string
  name: string
  score: number
  remark: string
  time_spent_mins: number
  candidate_email: string
  candidate_department: string
} | null>(null)
const sortOrder = ref<'asc' | 'desc' | null>(null)

const splitter = reactive({
  start: 0,
  end: 10,
})

const sort = (field: keyof {
  candidate_id: string
  name: string
  score: number
  remark: string
  time_spent_mins: number
  candidate_email: string
  candidate_department: string
}) => {
  if (sortBy.value === field) {
    if (sortOrder.value === null) {
      sortOrder.value = 'asc'
    }
    else if (sortOrder.value === 'asc') {
      sortOrder.value = 'desc'
    }
    else {
      sortBy.value = null
      sortOrder.value = null
    }
  }
  else {
    sortBy.value = field
    sortOrder.value = 'asc'
  }
}

const filteredCandidates = computed(() => {
  if (!props.searchQuery) return props.candidates

  const query = props.searchQuery.toLowerCase()
  return props.candidates.filter(candidate =>
    candidate.candidate_id.toLowerCase().includes(query)
    || candidate.name.toLowerCase().includes(query)
    || candidate.score.toString().includes(query)
    || candidate.time_spent_mins.toString().includes(query)
    || candidate.remark?.toLowerCase().includes(query),
  )
})

const filteredAndSortedCandidates = computed(() => {
  if (!sortBy.value || !sortOrder.value) {
    return filteredCandidates.value
  }

  return [...filteredCandidates.value].sort((a, b) => {
    const aValue = a[sortBy.value!]!
    const bValue = b[sortBy.value!]!

    const modifier = sortOrder.value === 'asc' ? 1 : -1

    if (aValue < bValue) return -1 * modifier
    if (aValue > bValue) return 1 * modifier
    return 0
  })
})

const paginatedCandidates = computed(() =>
  filteredAndSortedCandidates.value.slice(splitter.start, splitter.end),
)

const paginate = (direction: 'next' | 'prev') => {
  const totalItems = filteredAndSortedCandidates.value.length
  if (direction === 'next') {
    if (splitter.end < totalItems) {
      splitter.start += 10
      splitter.end += 10
    }
  }
  else {
    if (splitter.start > 0) {
      splitter.start -= 10
      splitter.end -= 10
    }
  }
}

watch(() => props.searchQuery, () => {
  splitter.start = 0
  splitter.end = 10
})

watch([sortBy, sortOrder], () => {
  splitter.start = 0
  splitter.end = 10
})
</script>
