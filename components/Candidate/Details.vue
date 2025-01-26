<template>

  <template v-if="candidateDetails?.assessments.correct_answers && status==='success'">

    <section class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,27rem),1fr))] w-full gap-8">

      <div class="shadowed w-full flex flex-col gap-3 rounded-3.5 bg-white p-8">

        <h1 class="text-xl font-semibold">
          Bio
        </h1>

        <div class="flex flex-col gap-1">

          <p class="line-clamp-1 text-lg font-medium">
            Name: {{ candidateDetails.name }}
          </p>

          <p class="text-lg font-medium">
            ID: {{ candidateDetails.candidate_id }}
          </p>

          <p class="text-lg font-medium">
            Department: {{ candidateDetails.candidate_department }}
          </p>

        </div>
      </div>

      <div class="shadowed w-full flex flex-col gap-3 rounded-3.5 bg-white p-8">

        <h1 class="text-xl font-semibold">
          Score
        </h1>
        <p class="text-lg text-brand-green font-medium">
          {{ candidateDetails.score }}%
        </p>

      </div>

      <div class="shadowed w-full flex flex-col gap-3 rounded-3.5 bg-white p-8">

        <h1 class="text-xl font-semibold">
          Number of Questions
        </h1>
        <p class="text-lg text-brand-green font-medium">
          {{ candidateDetails.assessments.questions.questions.length }}
        </p>

      </div>

      <div class="shadowed w-full flex flex-col gap-3 rounded-3.5 bg-white p-8">

        <h1 class="text-xl font-semibold">
          Correct
        </h1>
        <p class="text-lg text-brand-green font-medium">
          {{
            candidateDetails.answers.filter(
              (answer, index) => answer === candidateDetails?.assessments.correct_answers.correct_answers[index],
            ).length
          }}
        </p>

      </div>

      <div class="shadowed w-full flex flex-col gap-3 rounded-3.5 bg-white p-8">

        <h1 class="text-xl font-semibold">
          Incorrect
        </h1>
        <p class="text-lg text-red-500 font-medium">
          {{
            candidateDetails.answers.filter(
              (answer, index) => answer !== candidateDetails?.assessments.correct_answers.correct_answers[index],
            ).length
          }}
        </p>

      </div>

      <div class="shadowed w-full flex flex-col gap-3 rounded-3.5 bg-white p-8">

        <h1 class="text-xl font-semibold">
          Remark
        </h1>
        <p
          class="text-lg font-medium capitalize"
          :class="{
            'text-red-500': candidateDetails.remark === 'fail',
            'text-brand-green': candidateDetails.remark === 'pass',
          }"
        >
          {{ candidateDetails.remark }}
        </p>

      </div>

    </section>

    <section class="shadowed mb-8 w-full flex flex-col gap-3 rounded-3.5 bg-white p-8">
      
      <div class="w-full flex items-center justify-between gap-4">

        <p class="text-xl font-semibold">
          Answers
        </p>

        <p class="text-xl font-semibold">
          Time Spent: {{ candidateDetails.time_spent_mins }} mins
        </p>

      </div>

      <template v-if="candidateDetails.answers.length > 0 ">

        <div class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,30rem),1fr))] w-full gap-8">
          <div
            v-for="question in candidateDetails.assessments.questions.questions.slice(splitter.start, splitter.end)"
            :key="question.id"
            class="shadowed relative w-full flex flex-col gap-3 rounded-3.5 bg-white p-8"
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
                  'text-brand-green': PropertyKey.toString().toUpperCase() === candidateDetails.answers[question.id - 1]
                    || PropertyKey.toString().toUpperCase() === candidateDetails.assessments.correct_answers.correct_answers[question.id - 1],
                  'text-red-500': PropertyKey.toString().toUpperCase() === candidateDetails.answers[question.id - 1]
                    && PropertyKey.toString().toUpperCase() !== candidateDetails.assessments.correct_answers.correct_answers[question.id - 1],
                }"
              >
                <span>
                  {{ option }}
                </span>
              </li>
            </ol>

            <span
              :class="[
                'size-5 absolute top-3 right-3',
                {
                  'i-hugeicons:checkmark-circle-02 text-brand-green': candidateDetails.answers[question.id -1] === candidateDetails.assessments.correct_answers.correct_answers[question.id -1],
                  'i-hugeicons:cancel-circle text-red-500': candidateDetails.answers[question.id -1] !== candidateDetails.assessments.correct_answers.correct_answers[question.id -1],
                },
              ]"
            />

          </div>

        </div>

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
            {{ splitter.start + 1 }} to {{ Math.min(splitter.end, candidateDetails.assessments.questions.questions.length) }} of {{ candidateDetails.assessments.questions.questions.length }} Questions
          </p>

          <button
            type="button"
            class="w-max flex items-center rounded-2 bg-brand-green px-3 py-2 text-white duration-500 ease property-background-color hover:bg-brand-green/70 disabled:opacity-50"
            :disabled="splitter.end >= candidateDetails.assessments.questions.questions.length"
            @click="paginateQuestions('next')"
          >
            <span class="i-hugeicons:arrow-right-02 size-4" />
          </button>
        </div>

      </template>

      <template v-else>

        <div class="mt-12 min-w-full flex flex-col items-center justify-center gap-2 op-50">
          <span class="i-hugeicons:database size-8" />
          <p class="text-sm font-semibold">
            No Answer Found
          </p>
        </div>
      </template>

    </section>

  </template>

  <template v-else-if="!candidateDetails?.assessments.correct_answers && status === 'success'">

    <div class="m-a flex flex-col items-center gap-2 op-50">

      <span class="i-hugeicons:clock-01 size-6" />

      <p class="text-center text-lg font-medium">
        Assessment is ongoing.
        <br>
        Check back soon for results.
      </p>

    </div>

  </template>
  
  <slot name="error" />

  <slot name="loading" />

  <template v-if="!candidateDetails?.candidate_id && status==='success'">

    <div class="m-a flex flex-col items-center gap-2 op-50">

      <span class="i-hugeicons:database size-6" />

      <p class="text-lg font-medium">
        Candidate not Found
      </p>

    </div>
  </template>

</template>

<script setup lang="ts">
const props = defineProps<{
  candidateDetails: CandidateDetails | null
  status: 'success' | 'pending' | 'error' | 'idle'
}>()

const splitter = reactive({
  start: 0,
  end: 6,
})

function paginateQuestions(direction: 'next' | 'prev') {
  const totalQuestions = props.candidateDetails?.assessments.questions.questions.length ?? 0
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
