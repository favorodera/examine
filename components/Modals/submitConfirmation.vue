<template>
  <Teleport to="body">
  
    <template v-if="useModalsState().submitAssessment">
      <div
        class="fixed inset-0 z-3 bg-black/50 backdrop-blur-sm"
      />
    </template>
      
    <Transition
      enter-active-class="transition duration-500 ease-out"
      enter-from-class="transform opacity-0"
      enter-to-class="transform opacity-100"
      leave-active-class="transition duration-500 ease-in"
      leave-from-class="transform opacity-100"
      leave-to-class="transform opacity-0"
    >
      <div
        v-if="useModalsState().submitAssessment"
        class="fixed inset-0 z-4 overflow-y-auto"
      >
        <div class="h-screen flex items-center justify-center p-4">

          <div class="max-w-md min-h-50 w-full flex flex-col items-center justify-between gap-6 rounded-4 bg-white px-4 py-8">

            <span class="i-hugeicons:checkmark-circle-02 size-12 text-brand-green" />

            <p class="text-center text-lg font-semibold">
              Are you sure you want to submit this assessment?
            </p>

            <div
              class="w-full flex gap-4"
            >
              <button
                type="button"
                class="w-full rounded-2 bg-red-600 px-4 py-2 text-white font-semibold duration-500 ease property-background-color hover:bg-red-500"
                @click="useModals('submitAssessment', 'close')"
              >
                Cancel
              </button>
              <button
                type="button"
                :disabled="status === 'pending'"
                class="w-full rounded-2 bg-brand-green px-4 py-2 text-white font-semibold duration-500 ease property-background-color hover:bg-brand-green/70"
                @click="submitAssessment()"
              >
                {{ status !== 'pending' ? 'Submit' : '' }}

                <span
                  v-if="status === 'pending'"
                  class="i-hugeicons-reload size-6 animate-spin"
                />
              </button>
            </div>

          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>
    
<script setup lang="ts">
import { useModals, useModalsState } from '~/composables/useModals'

const instructor = useSupabaseUser()

const props = defineProps<{
  assessmentId: string | undefined
  instructorId: string | undefined
  selectedOptions: string[]
  candidateBio: {
    id: string | undefined
    email: string | undefined
    passCode: string | undefined
  } | undefined
  
}>()

const { execute, status, error } = await useAsyncData(
  'submit-assessment',
  () => $fetch('/api/submit-assessment', {
    body: {
      assessmentId: props.assessmentId,
      id: props.candidateBio?.id,
      email: props.candidateBio?.email,
      selectedOptions: props.selectedOptions,
      passCode: props.candidateBio?.passCode,
    },
    method: 'PUT',
    timeout: 30000,
  }),
  { immediate: false },
)

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

watch(status, (newStatus) => {
  if (newStatus === 'success') {

    createNotification(
      'Assessment Submitted Successfully',
      'i-hugeicons:checkmark-circle-02',
      4000,
      'success',
      () => {
        useModals('submitAssessment', 'close')
        localStorage.removeItem(`${props.assessmentId}-selectedOptions`)

        navigateTo(`/${props.assessmentId}/${encodeURIComponent(props.candidateBio?.id as string)}`)
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

          localStorage.removeItem(`${props.assessmentId}-selectedOptions`)

          navigateTo(`/${props.assessmentId}/${encodeURIComponent(props.candidateBio?.id as string)}`)
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
</script>
