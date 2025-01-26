<template>

  <Layout>

    <template
      v-if="assessment && status === 'success'"
      #nav
    >

      <div class="w-full flex items-center justify-between gap-4">

        <h1 class="text-2xl font-semibold">

          Assessment
        </h1>

        <button
          v-if="assessment.status === 'ongoing' && data?.submitted === false"
          type="button"
          class="rounded-md bg-brand-green px-4 py-1 text-white font-medium transition-background-color duration-500 hover:bg-brand-green/70"
          @click="useModals('submitAssessment', 'open')"
        >

          Submit
        </button>

      </div>

      <div class="w-full flex items-center justify-between gap-4">

        <div class="flex flex-col gap-1">

          <p class="line-clamp-1 text-sm font-medium">

            Examination: {{ assessment.assessment_name }}
          </p>

          <p class="text-sm text-brand-gray font-medium">

            Duration: {{ assessment.duration_mins }} minutes
          </p>

        </div>

        <div class="w-max flex flex-col gap-1">

          <p class="w-max text-sm font-medium capitalize">

            Status: {{ assessment.status }}
          </p>

          <p class="w-max text-sm text-brand-gray font-medium">

            Date: {{ `${formatDateTime(assessment.date_time).formattedDate}
                ${formatDateTime(assessment.date_time).formattedTime}` }} UTC
          </p>

        </div>

      </div>

    </template>

    <template #body>

      <template v-if="!data && status === 'success' && assessment?.status === 'ongoing'">

        <form
          class="shadowed m-a max-w-md w-full flex flex-col gap-6 b-2 b-white rounded-4 px-4 py-8"
          @submit.prevent="logInCandidate()"
        >
          <h1 class="text-center text-xl font-semibold">
            Assessment Login
          </h1>
            
          <label
            for="id"
          >
            ID
            <div class="w-full flex items-center rounded-1.5 bg-brand-gray/20 pl-4">
              <span class="i-hugeicons:id size-5 shrink-0" />
              <input
                id="id"
                v-model="assessmentLoginForm.id"
                type="text"
                spellcheck="true"
                name="id"
                placeholder="StudentID. If None, EMAIL"
                class="w-full flex-1 truncate bg-transparent px-4 py-3 outline-none placeholder-brand-dark/50"
                required
              >
            </div>
          </label>
  
          <label
            for="passcode"
          >
            Passcode
            <div class="w-full flex items-center rounded-1.5 bg-brand-gray/20 pl-4">
              <span class="i-hugeicons:access size-5 shrink-0" />
              <input
                id="passcode"
                v-model="assessmentLoginForm.passCode"
                type="text"
                spellcheck="true"
                name="passcode"
                placeholder="Passcode"
                class="w-full flex-1 truncate bg-transparent px-4 py-3 outline-none placeholder-brand-dark/50"
                required
              >
            </div>
          </label>
             
          <button
            type="submit"
            :disabled="loginStatus === 'pending'"
            class="w-max flex items-center self-center gap-2 rounded-2 bg-brand-green px-4 py-2 text-white font-normal duration-500 ease property-background-color disabled:cursor-not-allowed hover:bg-brand-green/70"
          >
            <div class="flex items-center gap-2">
              {{ loginStatus === 'pending' ? 'Logging In ...' : 'Submit' }}
            
              <span
                :class="{
                  'animate-spin i-hugeicons:reload size-5': loginStatus=== 'pending',
                }"
              />
            </div>
          </button>
        </form>

      </template>

      <template v-if="data && assessment && assessment.status === 'ongoing'">

        <div
          class="shadowed w-full flex flex-col-reverse items-center justify-between gap-4 rounded-3.5 bg-white p-8 sm:flex-row"
        >

          <div class="flex flex-col self-start gap-3">

            <p class="text-xl font-semibold">

              Candidate Bio
            </p>

            <div class="mb-4 flex flex-col gap-2 text-lg font-semibold">

              <p class="line-clamp-1">

                Name: {{ data.name }}
              </p>

              <p class="line-clamp-1">

                ID: {{ data.candidate_id }}
              </p>

              <p class="line-clamp-1">

                Department: {{ data.candidate_department }}
              </p>

              <p>
                Email: {{ data.candidate_email }}
              </p>

            </div>

            <p
              v-if="data.submitted === true"
              class="w-max rounded-1 bg-brand-green px-2 py-1 text-xs text-white font-medium tracking-wide"
            >
              SUBMITTED
            </p>

          </div>

          <div
            v-if="data.submitted === false"
            class="relative aspect-square size-40 flex items-center justify-center rounded-full p-2"
          >
            <div class="absolute inset-0 size-40 animate-pulse rounded-full bg-brand-green" />

            <div class="z-0 size-full flex flex-col items-center justify-center gap-1 rounded-full bg-white p-4">

              <div class="flex items-center gap-2">
                <p class="text-2xl font-bold">
                  {{ timer.hour < 10 ? `0${timer.hour}` : timer.hour }}
                </p>
                
                <p class="text-2xl font-bold">
                  :
                </p>
              
                <p class="text-2xl font-bold">
                  {{ timer.minute < 10 ? `0${timer.minute}` : timer.minute }}
                </p>
                
              </div>

              <div class="w-1/2 flex justify-between gap-2">
                <p class="text-center text-lg font-semibold">
                  H
                </p>
                <p class="text-center text-lg font-semibold">
                  M
                </p>
              </div>
            </div>
          </div>

        </div>

      </template>

      <template v-if="assessment && status === 'success' && assessment.status === 'ongoing' && data && data?.submitted === false">

        <div class="shadowed w-full flex flex-col gap-3 rounded-3.5 bg-white p-8">

          <template v-if="assessment.questions.questions[currentQuestionIndex]">

            <p class="text-xl font-semibold">

              Question {{ currentQuestionIndex + 1 }}
            </p>

            <h1 class="p-2 text-lg font-medium">

              {{ assessment.questions.questions[currentQuestionIndex].question }}
            </h1>

            <div
              v-for="(option, PropertyKey) in assessment.questions.questions[currentQuestionIndex]?.options"
              :key="PropertyKey"
              class="w-full flex items-start"
            >

              <input
                :id="`option-${PropertyKey.toString().toLowerCase()}`"
                v-model="selectedOptions[currentQuestionIndex]"
                type="radio"
                :name="`question-${currentQuestionIndex}`"
                class="peer hidden"
                :value="PropertyKey.toString().toUpperCase()"
              >

              <label
                :for="`option-${PropertyKey.toString().toLowerCase()}`"
                class="flex cursor-pointer items-start gap-2 rounded-md p-2 font-medium transition-colors duration-200 hover:bg-brand-green/20 peer-checked:bg-brand-green peer-checked:text-white"
              >

                <span class="shrink-0 font-semibold">
                  {{ PropertyKey.toString().toUpperCase() }}.
                </span>
                <span>{{ option }}</span>
              </label>

            </div>

          </template>

          <template v-else>

            <div class="mt-12 min-w-full flex flex-col items-center justify-center gap-2 op-50">

              <span class="i-hugeicons:database size-8" />

              <p class="text-sm font-semibold">

                Question not found
              </p>

            </div>

          </template>

        </div>

        <template v-if="assessment.questions.questions.length > 0">

          <div
            class="shadowed grid grid-cols-[repeat(auto-fill,minmax(min(100%,2rem),1fr))] mb-8 w-full gap-3 rounded-3.5 bg-white p-8"
          >

            <button
              v-for="(_question, index) in assessment.questions.questions"
              :key="index"
              type="button"
              :class="[
                'size-7.5 rounded-md cursor-pointer b b-brand-gray hover:bg-brand-gray  transition-all duration-500 ease',
                {
                  'bg-brand-gray': currentQuestionIndex === index,
                  'bg-brand-green text-white': selectedOptions[index],
                },
              ]"
              @click="goToQuestion(index)"
            >

              {{ index + 1 }}
            </button>

          </div>

        </template>

      </template>

      <template v-else-if="status === 'pending'">

        <div class="m-a flex flex-col items-center gap-2 text-orange">

          <span class="i-hugeicons:reload size-6 animate-spin" />

          <p class="text-lg font-medium">

            Fetching Assessment...
          </p>

        </div>

      </template>

      <template v-if="status === 'error'">

        <div class="m-a flex flex-col items-center gap-2 text-red">

          <span class="i-hugeicons:alert-02 size-6" />

          <p class="text-lg font-medium">

            Error Fetching Assessment
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

      <template v-if="!assessment && status === 'success'">

        <div class="m-a flex flex-col items-center gap-4">

          <span class="i-hugeicons:database size-6 op-40" />

          <p class="text-lg font-medium op-40">

            Assessment not Found
          </p>

        </div>

      </template>

      <template v-if="assessment?.status === 'ended'">

        <div class="m-a flex flex-col items-center gap-2 text-brand-green">

          <span class="i-hugeicons:hourglass-off size-6" />

          <p class="text-lg font-medium">

            Assessment Ended
          </p>

          <input
            id="assessment-id"
            v-model="candidateId"
            type="text"
            name="assessment-id"
            placeholder="Enter Candidate ID"
            class="min-w-30 b border-brand-gray rounded-md p-2 text-base text-brand-dark font-medium outline-none"
          >

          <button
            type="button"
            :disabled="!candidateId"
            class="rounded-md bg-brand-green px-3 py-1 text-base text-white font-medium transition-background-color duration-500 hover:bg-brand-green/70"
            @click="navigateTo(`${assessment.assessment_id}/${encodeURIComponent(candidateId!)}`)"
          >

            Get Results
          </button>

        </div>

      </template>

      <template v-if="data?.submitted === true && assessment?.status === 'ongoing'">

        <button
          type="button"
          class="mt-12 rounded-md bg-brand-green px-3 py-1 text-base text-white font-medium transition-background-color duration-500 hover:bg-brand-green/70"
          @click="navigateTo(`${assessment?.assessment_id}/${encodeURIComponent(data.candidate_id!)}`)"
        >

          Get Results
        </button>

      </template>

      <template v-if="assessment?.status === 'upcoming' && status === 'success'">

        <CandidateRegistrationForm
          :assessment-id="assessment.assessment_id"
          :instructor-id="assessment.instructor_id"
        />

      </template>

      <ModalsSubmitConfirmation
        :assessment-id="assessment?.assessment_id"
        :instructor-id="assessment?.instructor_id"
        :candidate-bio="{
          id: data?.candidate_id,
          email: data?.candidate_email,
          passCode: data?.pass_code,
  
        }"
        :selected-options="selectedOptions"
      />

    </template>

  </Layout>

</template>

<script setup lang="ts">
import type { RealtimeChannel } from '@supabase/realtime-js'

const candidateId = ref<string>()
const client = useSupabaseClient()
const instructor = useSupabaseUser()
const assessmentChannel = ref<RealtimeChannel>()
const { assessmentId } = useRoute().params
const { accessCode } = useRoute().query
const currentQuestionIndex = ref(0)
const selectedOptions = ref<string[]>([])
const timerInterval = ref<NodeJS.Timeout>()
const selectedOptionsStorageKey = `${assessmentId}-selectedOptions`
const timer = reactive({
  hour: 0,
  minute: 0,
})
const assessmentLoginForm = reactive({
  id: undefined,
  passCode: undefined,
})

const { execute: logInCandidate, status: loginStatus, data } = await useAsyncData(
  'login-candidate',
  () => $fetch(`/api/assessment-login?id=${assessmentLoginForm.id}&passCode=${assessmentLoginForm.passCode}&assessmentId=${assessmentId}`, {
    method: 'GET',
    timeout: 30000,
  }),
  { immediate: false },
)

const { data: assessment, status, refresh } = await useAsyncData(
  'assessment',
  () =>
    $fetch(`/api/assessment?assessmentId=${assessmentId}&accessCode=${accessCode}`, { method: 'get', timeout: 30000 }),
)

const { execute, status: submissionStatus, error } = await useAsyncData(
  'force-submit-assessment',
  () => $fetch('/api/submit-assessment', {
    body: {
      assessmentId: assessment.value?.assessment_id,
      id: data.value?.candidate_id,
      email: data.value?.candidate_email,
      passCode: data.value?.pass_code,
      selectedOptions: selectedOptions.value,
    },
    method: 'PUT',
    timeout: 30000,
  }),
  { immediate: false },
)

const startTimer = () => {
  const remainingTimeMins = calcRemTime(
    formatDateTime(assessment.value?.date_time as string).formattedTime,
    assessment.value?.duration_mins as number,
  )

  if (remainingTimeMins > 0) {
    timer.hour = Math.floor(remainingTimeMins / 60)
    timer.minute = remainingTimeMins % 60
  }
  else {
    return clearInterval(timerInterval.value)
  }

  timerInterval.value = setInterval(() => {

    if (timer.minute === 0 && timer.hour > 0) {
      timer.minute = 59
      timer.hour--
    }
    else if (timer.hour === 0 && timer.minute === 0) {
      return clearInterval(timerInterval.value)
    }

    timer.minute--

  }, 60000)
}

function goToQuestion(index: number) {
  currentQuestionIndex.value = index
}

function submitAssessment() {

  if (instructor.value) {
    createNotification(
      'Instructors cannot take assessments',
      'i-hugeicons-cancel-circle',
      5000,
      'error',
    )
    return
  }
  else {
    execute()
  }

}

onMounted(() => {

  const storedSelectedOptions = localStorage.getItem(selectedOptionsStorageKey)

  if (storedSelectedOptions) {
    selectedOptions.value = JSON.parse(storedSelectedOptions)
  }

  if (assessment.value?.status === 'ongoing') return startTimer()

  assessmentChannel.value = client.channel('ongoing-assessment')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'assessments', filter: `assessment_id=eq.${assessmentId}` },
      () => refresh(),
    )
    .subscribe()

})

onUnmounted(() => {
  client.removeChannel(assessmentChannel.value!)
})

watch(assessment, (newValue) => {

  if (newValue?.status === 'ended' && !data.value?.submitted) {
    createNotification(
      'Assessment Ended',
      'i-hugeicons:checkmark-circle-02',
      5000,
      'success',
    )
    submitAssessment()
  }
})

watch(loginStatus, (newValue) => {
  if (newValue === 'success') {
    createNotification(
      'Log In Successful',
      'i-hugeicons:checkmark-circle-02',
      5000,
      'success',
    )
  }
  else if (newValue === 'error') {
    createNotification(
      'Error Logging In',
      'i-hugeicons:cancel-circle',
      5000,
      'error',
    )
  }
})

watch(submissionStatus, (newStatus) => {
  if (newStatus === 'success') {

    createNotification(
      'Assessment Submitted Successfully',
      'i-hugeicons:checkmark-circle-02',
      4000,
      'success',
      () => {
        useModals('submitAssessment', 'close')
        localStorage.removeItem(`${assessmentId}-selectedOptions`)

        navigateTo(`/${assessmentId}/${encodeURIComponent(data.value?.candidate_id as string)}`)
      },
    )

  }
  else if (newStatus === 'error') {

    if (error.value?.statusMessage === 'Candidate already submitted.') {
      createNotification(
        error.value.statusMessage,
        'i-hugeicons-cancel-circle',
        4000,
        'error',
        () => {
          useModals('submitAssessment', 'close')
          localStorage.removeItem(`${assessmentId}-selectedOptions`)

          navigateTo(`/${assessmentId}/${encodeURIComponent(data.value?.candidate_id as string)}`)
        },
      )
    }
    else {
      createNotification(
        'Error Submitting Assessment',
        'i-hugeicons-cancel-circle',
        5000,
        'error',
      )
    }

  }
})

watch(selectedOptions, (newValue) => {
  localStorage.setItem(selectedOptionsStorageKey, JSON.stringify(newValue))
}, { deep: true })

</script>
