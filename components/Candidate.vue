<template>

  <template v-if="candidate && questions && status==='success'">

    <section class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,27rem),1fr))] w-full gap-8">

      <div class="shadowed w-full flex flex-col gap-3 rounded-3.5 bg-white p-8">

        <h1 class="text-xl font-bold">
          Bio
        </h1>

        <div class="flex flex-col gap-2">

          <p class="line-clamp-1 text-lg font-semibold">
            Name: {{ candidate.name }}
          </p>

          <p class="text-lg font-semibold">
            ID: {{ candidate.id }}
          </p>

        </div>
      </div>

      <div class="shadowed w-full flex flex-col gap-3 rounded-3.5 bg-white p-8">

        <h1 class="text-xl font-bold">
          Score
        </h1>
        <p class="text-lg text-brand-green font-semibold">
          {{ candidate.score }}%
        </p>

      </div>

      <div class="shadowed w-full flex flex-col gap-3 rounded-3.5 bg-white p-8">

        <h1 class="text-xl font-bold">
          Number of Questions
        </h1>
        <p class="text-lg text-brand-green font-semibold">
          {{ questions.length }}
        </p>

      </div>

      <div class="shadowed w-full flex flex-col gap-3 rounded-3.5 bg-white p-8">

        <h1 class="text-xl font-bold">
          Correct
        </h1>
        <p class="text-lg text-brand-green font-semibold">
          {{ candidate.answers.filter(answer => answer.status === 'correct').length }}
        </p>

      </div>

      <div class="shadowed w-full flex flex-col gap-3 rounded-3.5 bg-white p-8">

        <h1 class="text-xl font-bold">
          Incorrect
        </h1>
        <p class="text-lg text-red-500 font-semibold">
          {{ candidate.answers.filter(answer => answer.status === 'incorrect').length }}
        </p>

      </div>

      <div class="shadowed w-full flex flex-col gap-3 rounded-3.5 bg-white p-8">

        <h1 class="text-xl font-bold">
          Remark
        </h1>
        <p
          class="text-lg font-semibold capitalize"
          :class="{
            'text-red-500': candidate?.remark === 'fail',
            'text-brand-green': candidate?.remark === 'pass',
          }"
        >
          {{ candidate.remark }}
        </p>

      </div>

    </section>

    <section class="shadowed mb-8 w-full flex flex-col gap-3 rounded-3.5 bg-white p-8">
      
      <div class="w-full flex items-center justify-between gap-4">

        <p class="text-xl font-bold">
          Answers
        </p>

        <p class="text-xl font-bold">
          Time Spent: {{ candidate.time_spent_mins }} mins
        </p>

      </div>

      <template v-if="candidate.answers.length > 0 ">

        <div class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,30rem),1fr))] w-full gap-8">
          <div
            v-for="answer in candidate.answers.slice(splitter.start, splitter.end)"
            :key="answer.question_id"
            class="shadowed relative w-full flex flex-col gap-3 rounded-3.5 bg-white p-8"
          >
            <h1 class="text-5 font-medium">
              {{ answer.question_id }}. {{ questions[answer.question_id].question }} ({{ questions[answer.question_id].marks_obtainable }} marks)
            </h1>
        
            <ol class="list-upper-alpha">
              <li
                v-for="(option, PropertyKey) in questions[answer.question_id].options"
                :key="PropertyKey"
                class="ml-4 font-bold"
                :class="{
                  'text-brand-green': PropertyKey.toString().toUpperCase() === questions[answer.question_id].correct_option,
                  'text-red-500': PropertyKey.toString().toUpperCase() === answer.option_selected && answer.status === 'incorrect',
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
                  'i-hugeicons:checkmark-circle-02 text-brand-green': answer.status === 'correct',
                  'i-hugeicons:cancel-circle text-red-500': answer.status === 'incorrect',
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
            {{ splitter.start + 1 }} to {{ Math.min(splitter.end, candidate.answers.length) }} of {{ candidate.answers.length }} Answers
          </p>

          <button
            type="button"
            class="w-max flex items-center rounded-2 bg-brand-green px-3 py-2 text-white duration-500 ease property-background-color hover:bg-brand-green/70 disabled:opacity-50"
            :disabled="splitter.end >= candidate.answers.length"
            @click="paginateQuestions('next')"
          >
            <span class="i-hugeicons:arrow-right-02 size-4" />
          </button>
        </div>

      </template>

      <template v-else>

        <div class="mt-12 min-w-full flex flex-col items-center justify-center gap-2 op-50">
          <span class="i-hugeicons:database size-8" />
          <p class="text-sm font-bold">
            No Answer Found
          </p>
        </div>
      </template>

    </section>

  </template>
  
  <slot name="error" />

  <slot name="loading" />

  <template v-if="!candidate && !questions && status==='success'">

    <div class="m-a flex flex-col items-center gap-4">

      <span class="i-hugeicons:database size-8 op-40" />

      <p class="text-xl font-bold op-40">
        Candidate not Found
      </p>

    </div>
  </template>

</template>

<script setup lang="ts">
const props = defineProps<{
  candidate: Candidate | undefined
  status: 'success' | 'pending' | 'error' | 'idle'
  questions: Question[] | undefined
}>()

const splitter = reactive({
  start: 0,
  end: 6,
})

function paginateQuestions(direction: 'next' | 'prev') {
  const totalAnswers = props.candidate?.answers.length ?? 0
  if (direction === 'next') {
    if (splitter.end < totalAnswers) {
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
