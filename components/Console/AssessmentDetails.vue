<template>

  <template v-if="(assessment) || (assessment && status === 'success')">

    <section class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,27rem),1fr))] w-full gap-8">

      <button
        type="button"
        class="shadowed relative w-full flex flex-col gap-3 rounded-3.5 bg-white p-8 duration-500 ease property-transform active:scale-98 hover:scale-101"
        @click="copyAssessmentUrl"
      >

        <h1 class="text-xl font-semibold">
          Access Code
        </h1>
        <p class="line-clamp-1 text-start text-lg font-medium">
          {{ assessment?.access_code }}
        </p>

        <p
          class="absolute right-4 top-2 text-xs font-medium"
          :class="{
            'text-brand-green': isAccessCodeCopied,
          }"
        >
          {{ isAccessCodeCopied ? 'COPIED' : 'CLICK TO COPY URL' }}

          <span
            v-if="isAccessCodeCopied"
            class="i-hugeicons:checkmark-circle-02 size-4 text-brand-green"
          />
        </p>

      </button>

      <div class="shadowed w-full flex flex-col gap-3 rounded-3.5 bg-white p-8">

        <h1 class="text-xl font-semibold">
          Overall Score
        </h1>
        <p class="text-lg text-brand-green font-medium">
          {{ assessment.marks_obtainable }}%
        </p>

      </div>

      <div class="shadowed w-full flex flex-col gap-3 rounded-3.5 bg-white p-8">

        <h1 class="text-xl font-semibold">
          Number of Candidates
        </h1>
        <p class="text-lg text-brand-green font-medium">
          {{ assessment.candidates.length }}
        </p>

      </div>

      <div class="shadowed w-full flex flex-col gap-3 rounded-3.5 bg-white p-8">

        <h1 class="text-xl font-semibold">
          Average Score
        </h1>
        <p class="text-lg text-brand-green font-medium">
          {{ averageScore.toFixed(2) }}%
        </p>

      </div>

      <div class="shadowed w-full flex flex-col gap-3 rounded-3.5 bg-white p-8">

        <h1 class="text-xl font-semibold">
          Passed Candidates
        </h1>
        <p class="text-lg text-brand-green font-medium">
          {{ assessment.candidates.filter(candidate => candidate.remark === 'pass').length }}
        </p>

      </div>

      <div class="shadowed w-full flex flex-col gap-3 rounded-3.5 bg-white p-8">

        <h1 class="text-xl font-semibold">
          Failed Candidates
        </h1>
        <p class="text-lg text-red-500 font-medium">
          {{ assessment.candidates.filter(candidate => candidate.remark === 'fail').length }}
        </p>

      </div>

      <section class="grid col-span-full grid-cols-[repeat(auto-fit,minmax(min(100%,27rem),1fr))] w-full gap-8">

        <div class="shadowed w-full flex flex-col gap-3 rounded-3.5 bg-white p-8">

          <h1 class="text-xl font-semibold">
            Best Candidate
          </h1>

          <div class="flex flex-col gap-2 text-lg font-semibold">

            <p class="line-clamp-1">
              Name: {{ bestCandidate?.name }}
            </p>

            <p class="line-clamp-1">
              ID: {{ bestCandidate?.candidate_id }}
            </p>

            <p class="line-clamp-1">
              Department: {{ bestCandidate?.candidate_department }}
            </p>

            <p>
              Score: {{ bestCandidate?.score }}%
            </p>

          </div>

        </div>

        <div class="shadowed w-full flex flex-col gap-3 rounded-3.5 bg-white p-8">

          <h1 class="text-xl font-semibold">
            Worst Candidate
          </h1>

          <div class="flex flex-col gap-2 text-lg font-semibold">

            <p class="line-clamp-1">
              Name: {{ worstCandidate?.name }}
            </p>

            <p class="line-clamp-1">
              ID: {{ worstCandidate?.candidate_id }}
            </p>

            <p class="line-clamp-1">
              Department: {{ worstCandidate?.candidate_department }}
            </p>

            <p>
              Score: {{ worstCandidate?.score }}%
            </p>

          </div>

        </div>

      </section>

    </section>

    <section class="shadowed w-full flex flex-col gap-3 rounded-3.5 bg-white p-8">

      <p class="text-xl font-semibold">
        Candidates Table
      </p>

      <input
        id="candidates-table-search"
        v-model="searchQuery"
        type="search"
        name="candidates-table-search"
        placeholder="Search Candidates..."
        class="max-w-[15rem] b b-brand-gray rounded-md p-2 outline-none"
      >

      <UtilsCandidatesTable
        :candidates="assessment.candidates"
        :search-query="searchQuery"
      />

    </section>

    <section class="shadowed mb-8 w-full flex flex-col gap-3 rounded-3.5 bg-white p-8">
      
      <div class="w-full flex items-center justify-between gap-4">

        <p class="text-xl font-semibold">
          Questions
        </p>

        <button
          v-if="assessment.status === 'upcoming'"
          type="button"
          class="w-max flex items-center rounded-2 bg-brand-green px-3 py-2 text-white duration-500 ease property-background-color hover:bg-brand-green/70"
          @click="useModals('newQuestion', 'open')"
        >
          Add
          <span class="i-hugeicons:plus-sign size-4" />
        </button>

      </div>

      <template v-if="assessment.questions.questions.length > 0 ">

        <div class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,30rem),1fr))] w-full gap-8">
          <div
            v-for="question in assessment.questions.questions.slice(splitter.start, splitter.end)"
            :key="question.id"
            class="shadowed w-full flex flex-col gap-3 rounded-3.5 bg-white p-4"
          >
            <h1 class="text-5 font-normal">
              {{ question.id }}. {{ question.question }} ({{ question.marks_obtainable }} marks)
            </h1>
        
            <ol class="list-upper-alpha">
              <li
                v-for="(option, PropertyKey) in question.options"
                :key="PropertyKey"
                class="ml-4 font-semibold"
                :class="{
                  'text-brand-green': PropertyKey.toString().toUpperCase() === assessment.correct_answers.correct_answers[question.id - 1],
                }"
              >
                <span>
                  {{ option }}
                </span>
              </li>
            </ol>
          </div>
        </div>

        <template v-if="assessment.questions.questions.length > splitter.end">
          <div class="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              class="w-max flex items-center rounded-2 bg-brand-green px-3 py-2 text-white duration-500 ease property-background-color hover:bg-brand-green/70 disabled:opacity-50"
              :disabled="splitter.start === 0"
              @click="paginateQuestions('prev')"
            >
              <span class="i-hugeicons:arrow-left-02 size-4" />
            </button>

            <p class="text-center text-sm text-gray">
              {{ splitter.start + 1 }} to {{ Math.min(splitter.end, assessment.questions.questions.length) }} of {{ assessment.questions.questions.length }} Questions
            </p>

            <button
              type="button"
              class="w-max flex items-center rounded-2 bg-brand-green px-3 py-2 text-white duration-500 ease property-background-color hover:bg-brand-green/70 disabled:opacity-50"
              :disabled="splitter.end >= assessment.questions.questions.length"
              @click="paginateQuestions('next')"
            >
              <span class="i-hugeicons:arrow-right-02 size-4" />
            </button>
          </div>

        </template>

      </template>

      <template v-else>

        <div class="mt-12 min-w-full flex flex-col items-center justify-center gap-2 op-50">
          <span class="i-hugeicons:database size-6" />
          <p class="text-sm font-medium">
            No Question Found
          </p>
        </div>
      </template>

    </section>

  </template>

  <slot name="error" />

  <slot name="loading" />

  <template v-if="!assessment && status === 'success'">

    <div class="m-a flex flex-col items-center gap-2 op-50">

      <span class="i-hugeicons:database size-6" />

      <p class="text-lg font-semibold">
        Assessment not Found
      </p>

      <button
        type="button"
        class="rounded-md bg-brand-green px-3 py-1 text-white font-medium transition-background-color duration-500 hover:bg-brand-green/70"
        @click="navigateTo('/console')"
      >
        Back to Console
      </button>

    </div>
  </template>

</template>

<script setup lang="ts">
const isAccessCodeCopied = ref(false)
const searchQuery = ref('')

const props = defineProps<{
  assessment: AssessmentDetails | null
  status: 'success' | 'pending' | 'error' | 'idle'
}>()

const copyAssessmentUrl = () => {
  navigator.clipboard.writeText(`${window.location.origin}/${props.assessment?.assessment_id}?accessCode=${props.assessment?.access_code}`)
  isAccessCodeCopied.value = true
  setTimeout(() => {
    isAccessCodeCopied.value = false
  }, 2000)
}

const averageScore = computed(() => {
  if (props.assessment && props.assessment.candidates.length > 0) {
    const sumOfScores = props.assessment.candidates.reduce((sum, candidate) => sum + candidate.score, 0)
    const numberOfCandidates = props.assessment.candidates.length
    return sumOfScores / numberOfCandidates
  }
  return 0
})

const bestCandidate = computed(() => {
  if (props.assessment && props.assessment.candidates.length > 0) {
    const sortedCandidates = [...props.assessment.candidates]
    sortedCandidates.sort((a, b) => b.score - a.score)
    return sortedCandidates[0]
  }
  return null
})

const worstCandidate = computed(() => {
  if (props.assessment && props.assessment.candidates.length > 0) {
    const sortedCandidates = [...props.assessment.candidates]
    sortedCandidates.sort((a, b) => a.score - b.score)
    return sortedCandidates[0]
  }
  return null
})

const splitter = reactive({
  start: 0,
  end: 6,
})

function paginateQuestions(direction: 'next' | 'prev') {
  const totalQuestions = props.assessment?.questions.questions.length ?? 0
  if (direction === 'next') {
    if (splitter.end < totalQuestions) {
      splitter.start += 6
      splitter.end += 6
    }
  }
  else {
    if (splitter.start > 0) {
      splitter.start -= 6
      splitter.end -= 6
    }
  }
}
</script>
