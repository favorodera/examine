<template>
  <Teleport to="body">
  
    <template v-if="useModalsState().updateAssessment">
      <div
        class="fixed inset-0 z-2 bg-black/50 backdrop-blur-sm"
      />
    </template>
      
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform opacity-0"
      enter-to-class="transform opacity-100"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="transform opacity-100"
      leave-to-class="transform opacity-0"
    >
      <div
        v-if="useModalsState().updateAssessment"
        class="fixed inset-0 z-3 overflow-y-auto"
      >
        <div class="h-screen flex items-center justify-center p-4">
          <form
            method="dialog"
            class="max-w-md w-full flex flex-col gap-6 rounded-4 bg-white px-4 py-8"
            @submit.prevent="submitForm()"
          >
            <h1 class="text-center text-xl font-semibold">
              Update Assessment
            </h1>
          
            <label
              for="name"
            >
              Title
              <div class="w-full flex items-center rounded-1.5 bg-brand-gray/20 pl-4">
                <span class="i-hugeicons:edit-01 size-5 shrink-0" />
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  spellcheck="true"
                  name="name"
                  placeholder="History Exam 1st Semester"
                  class="w-full flex-1 truncate bg-transparent px-4 py-3 outline-none placeholder-brand-dark/50"
                  required
                >
              </div>
            </label>
          
            <label
              for="date-time"
            >
              Date & Time ( UTC )
              <div class="w-full flex items-center rounded-1.5 bg-brand-gray/20 pl-4">
                <span class="i-hugeicons:calendar-01 size-5 shrink-0" />
                <input
                  id="date-time"
                  v-model="form.dateTime"
                  type="datetime-local"
                  name="date-time"
                  class="w-full flex-1 truncate bg-transparent px-4 py-3 outline-none placeholder-brand-dark/50"
                  required
                  @input="validateDateTime(form.dateTime!)"
                  @blur="validateDateTime(form.dateTime!)"
                >
              </div>
              <p class="text-sm text-red-500">{{ dateTimeValidationMessage }}</p>
            </label>
          
            <label
              for="duration"
            >
              Duration ( Minutes )
              <div class="w-full flex items-center rounded-1.5 bg-brand-gray/20 pl-4">
                <span class="i-hugeicons:hourglass size-5 shrink-0" />
                <input
                  id="duration"
                  v-model="form.durationMins"
                  type="number"
                  name="duration"
                  placeholder="60"
                  min="1"
                  class="w-full flex-1 truncate bg-transparent px-4 py-3 outline-none placeholder-brand-dark/50"
                  required
                >
              </div>
            </label>
          
            <label
              for="marks-obtainable"
            >
              Marks Obtainable
              <div class="w-full flex items-center rounded-1.5 bg-brand-gray/20 pl-4">
                <span class="i-hugeicons:chart-maximum size-5 shrink-0" />
                <input
                  id="marks-obtainable"
                  v-model="form.marksObtainable"
                  type="number"
                  name="marks-obtainable"
                  placeholder="100"
                  min="1"
                  class="w-full flex-1 truncate bg-transparent px-4 py-3 outline-none placeholder-brand-dark/50"
                  required
                >
              </div>
            </label>
          
            <label
              for="pass-mark"
            >
              Pass Mark
              <div class="w-full flex items-center rounded-1.5 bg-brand-gray/20 pl-4">
                <span class="i-hugeicons:chart-minimum size-5 shrink-0" />
                <input
                  id="pass-mark"
                  v-model="form.passMark"
                  type="number"
                  name="pass-mark"
                  placeholder="45"
                  min="1"
                  class="w-full flex-1 truncate bg-transparent px-4 py-3 outline-none placeholder-brand-dark/50"
                  required
                >
              </div>
            </label>
          
            <div class="flex justify-between gap-4">
              <button
                type="button"
                class="w-max rounded-2 bg-red-500 px-4 py-2 text-white font-normal duration-500 ease property-background-color hover:bg-red-600"
                @click="useModals('updateAssessment', 'close')"
              >
                Cancel
              </button>
      
              <button
                type="submit"
                :disabled="status === 'pending' || dateTimeValidationMessage !== undefined "
                class="w-max flex flex-col items-center gap-2 rounded-2 bg-brand-green px-4 py-2 text-white font-normal duration-500 ease property-background-color disabled:cursor-not-allowed hover:bg-brand-green/70"
              >
                <div class="flex items-center gap-2">
                  {{ status === 'pending' ? 'Updating' : status === 'error' ? 'Retry': 'Submit' }}
          
                  <span
                    :class="{
                      'animate-spin i-hugeicons:reload size-5': status === 'pending',
                    }"
                  />
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
    
<script setup lang="ts">
import { useModals, useModalsState } from '~/composables/useModals'

const props = defineProps<{
  assessmentDetails: {
    name: string
    dateTime: string
    durationMins: number
    marksObtainable: number
    passMark: number
    id: string
  }
}>()
  
const dateTimeValidationMessage = ref<string>()
      
const form = reactive({
  name: props.assessmentDetails.name,
  dateTime: props.assessmentDetails.dateTime.split('+')[0].split('T')[0] + 'T' + props.assessmentDetails.dateTime.split('+')[0].split('T')[1].split(':')[0] + ':' + props.assessmentDetails.dateTime.split('+')[0].split('T')[1].split(':')[1],
  durationMins: props.assessmentDetails.durationMins,
  marksObtainable: props.assessmentDetails.marksObtainable,
  passMark: props.assessmentDetails.passMark,
})
        
const { status, execute } = await useAsyncData(
  'create-new-assessment',
  () => $fetch('/api/update-assessment', {
    method: 'PUT',
    body: {
      assessmentId: props.assessmentDetails.id,
      name: form.name,
      dateTime: form.dateTime,
      durationMins: form.durationMins,
      marksObtainable: form.marksObtainable,
      passMark: form.passMark,
    },
    timeout: 30000,
  }),
  {
    immediate: false,
    
  },
)
  
function submitForm() {
  
  validateDateTime(form.dateTime!)
  
  if (!dateTimeValidationMessage.value) {
    execute()
  }
  
}
        
watch(status, async (newStatus) => {
  if (newStatus === 'success') {
    useModals('updateAssessment', 'close')
  
    createNotification(
      'Assessment Updated Successfully',
      'i-hugeicons:checkmark-circle-02',
      5000,
      'success',
    )
  }
  else if (newStatus === 'error') {
    createNotification(
      'Error  Updating Assessment',
      'i-hugeicons:cross-circle-02',
      5000,
      'error',
    )
  }
})
  
function validateDateTime(dateTime: string) {
  const now = new Date()
  const [date, time] = dateTime.split('T')
  const [year, month, day] = date.split('-')
  const [hours, minutes] = time.split(':')
    
  const result = new Date(Date.UTC(+year, +month - 1, +day, +hours, +minutes)) > now
    
  return dateTimeValidationMessage.value = result ? undefined : 'Date and Time must be in the future'
}
</script>
