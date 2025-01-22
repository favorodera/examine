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

            <template v-if="status === 'success'">

              <span
                class="i-hugeicons:checkmark-circle-02 size-25 text-brand-green"
              />

              <p class="text-center text-2xl font-semibold">
                Assessment Submitted
              </p>

            </template>

            <template v-else>

              <p class="text-center text-lg font-bold">
                Are you sure you want to submit this assessment?
              </p>

              <div
                class="w-full flex gap-4"
              >
                <button
                  type="button"
                  class="w-full flex items-center justify-center rounded-2 bg-red-600 px-4 py-2 text-white font-semibold duration-500 ease property-background-color hover:bg-red-500"
                  @click="useModals('submitAssessment', 'close')"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  class="w-full flex items-center justify-center rounded-2 bg-brand-green px-4 py-2 text-white font-semibold duration-500 ease property-background-color hover:bg-brand-green/70"
                  @click="execute()"
                >
                  Submit
                </button>
              </div>

            </template>

          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>
    
<script setup lang="ts">
import { useModals, useModalsState } from '~/composables/useModals'

const props = defineProps<{
  assessmentId: string | undefined
  instructorId: string | undefined
}>()

const bio = ref<{
  name: string
  id: string
  email: string
  department: string
}>()

const selectedOptions = ref<string[]>()

onNuxtReady(() => {
  const storedBio = localStorage.getItem(`${props.assessmentId}-bio`)
  const storedSelectedOptions = localStorage.getItem(`${props.assessmentId}-selectedOptions`)

  if (storedBio && storedSelectedOptions) {
    bio.value = JSON.parse(storedBio)
    selectedOptions.value = JSON.parse(storedSelectedOptions)
  }
  
})

const { execute, status } = await useAsyncData(
  'submit-assessment',
  () => $fetch('/api/submit-assessment', {
    body: {
      assessmentId: props.assessmentId,
      name: bio.value?.name,
      id: bio.value?.id,
      department: bio.value?.department,
      email: bio.value?.email,
      selectedOptions: selectedOptions.value,
      instructorId: props.instructorId,
    },
    method: 'POST',
    timeout: 30000,
  }),
  { immediate: false },
)

watch(status, (newStatus) => {
  if (newStatus === 'success') {
    setTimeout(() => {
      useModals('submitAssessment', 'close')
      localStorage.removeItem(`${props.assessmentId}-bio`)
      localStorage.removeItem(`${props.assessmentId}-selectedOptions`)
    }, 3000)
  }
})
</script>
