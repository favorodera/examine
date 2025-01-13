<template>
  <template v-if="useModalsState().newAssessment">
    <div
      class="pointer-events-auto fixed inset-0 z-2 bg-black/50"
      @click="useModals('newAssessment', 'close')"
    />
  </template>
    
  <Transition
    enter-active-class="transition duration-500 ease-out"
    enter-from-class="transform scale-75 opacity-0"
    enter-to-class="transform scale-100 opacity-100"
    leave-active-class="transition duration-500 ease-in"
    leave-from-class="transform scale-100 opacity-100"
    leave-to-class="transform scale-75 opacity-0"
  >
    <div
      v-if="useModalsState().newAssessment"
      class="modal fixed inset-0 z-3 overflow-y-auto"
    >
      <div class="min-h-full flex items-center justify-center p-4">
        <form
          method="dialog"
          class="max-w-md w-full flex flex-col gap-6 rounded-4 bg-white px-4 py-8"
          @submit.prevent="execute()"
        >
          <h1 class="text-center text-xl font-bold">
            New Assessment
          </h1>
        
          <label
            for="name"
          >
            Name
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
            for="access-code"
          >
            Access Code
            <div class="w-full flex items-center rounded-1.5 bg-brand-gray/20 pl-4">
              <span class="i-hugeicons:access size-5 shrink-0" />
              <input
                id="access-code"
                v-model="form.accessCode"
                type="text"
                spellcheck="true"
                name="access-code"
                placeholder="history1st"
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
              >
            </div>
          </label>
        
          <label
            for="duration"
          >
            Duration ( Minutes )
            <div class="w-full flex items-center rounded-1.5 bg-brand-gray/20 pl-4">
              <span class="i-hugeicons:hourglass size-5 shrink-0" />
              <input
                id="duration"
                v-model="form.duration"
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
              class="w-max flex items-center gap-2 rounded-2 bg-red-500 px-4 py-2 text-white font-medium duration-500 ease property-background-color hover:bg-red-600"
              @click="useModals('newAssessment', 'close')"
            >
              Cancel
            </button>
    
            <button
              type="submit"
              :disabled="status === 'pending'"
              class="w-max flex flex-col items-center gap-2 rounded-2 bg-brand-green px-4 py-2 text-white font-medium duration-500 ease property-background-color disabled:cursor-not-allowed hover:bg-brand-green/70"
            >
              <div class="flex items-center gap-2">
                {{ status === 'success' ? 'Created' : status === 'pending' ? 'Running' : 'Submit' }}
        
                <span
                  :class="{
                    'animate-spin i-hugeicons:reload size-5': status === 'pending',
                    'i-hugeicons:checkmark-circle-02 size-5': status === 'success',
                  }"
                />
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  </Transition>
</template>
  
<script setup lang="ts">
import { useModals, useModalsState } from '~/composables/useModals'
  
const createUpdate = useCreateUpdate()
    
const form = reactive({
  name: undefined,
  accessCode: undefined,
  dateTime: undefined,
  duration: undefined,
  marksObtainable: undefined,
  passMark: undefined,
})
      
const { status, execute } = await useAsyncData(
  'create-new-assessment',
  () => $fetch('/api/newAssessment', {
    method: 'POST',
    body: {
      name: form.name,
      accessCode: form.accessCode,
      dateTime: form.dateTime,
      duration: form.duration,
      marksObtainable: form.marksObtainable,
      passMark: form.passMark,
    },
  }),
  {
    immediate: false,
  },
)
      
watch(status, async (newStatus) => {
  if (newStatus === 'success') {
    createUpdate.assessment = true
    useModals('newAssessment', 'close')
      
    setTimeout(() => {
      createUpdate.assessment = false
    }, 3000)
  }
})
  
watch(useModalsState(), (newState) => {
  if (newState.newAssessment) {
    document.body.style.overflow = 'hidden'
  }
  else {
    document.body.style.overflow = ''
    form.name = undefined
    form.accessCode = undefined
    form.dateTime = undefined
    form.duration = undefined
    form.marksObtainable = undefined
    form.passMark = undefined
  }
})
  
onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>
