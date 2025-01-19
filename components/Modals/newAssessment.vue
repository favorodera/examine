<template>
  <Teleport to="body">

    <template v-if="useModalsState().newAssessment">
      <div
        class="fixed inset-0 z-2 bg-black/50 backdrop-blur-sm"
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
        v-if="useModalsState().newAssessment"
        class="fixed inset-0 z-3 overflow-y-auto"
        @click="useModals('newAssessment', 'close')"
      >
        <div class="h-screen flex items-center justify-center p-4">
          <form
            method="dialog"
            class="max-w-md w-full flex flex-col gap-6 rounded-4 bg-white px-4 py-8"
            @submit.prevent="execute()"
            @click.stop
          >
            <h1 class="text-center text-xl font-semibold">
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
                class="w-max flex items-center gap-2 rounded-2 bg-red-500 px-4 py-2 text-white font-normal duration-500 ease property-background-color hover:bg-red-600"
                @click="useModals('newAssessment', 'close')"
              >
                Cancel
              </button>
    
              <button
                type="submit"
                :disabled="status === 'pending'"
                class="w-max flex flex-col items-center gap-2 rounded-2 bg-brand-green px-4 py-2 text-white font-normal duration-500 ease property-background-color disabled:cursor-not-allowed hover:bg-brand-green/70"
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
  </Teleport>
</template>
  
<script setup lang="ts">
import { useModals, useModalsState } from '~/composables/useModals'
    
const form = reactive({
  name: undefined,
  dateTime: undefined,
  durationMins: undefined,
  marksObtainable: undefined,
  passMark: undefined,
})
      
const { status, execute } = await useAsyncData(
  'create-new-assessment',
  () => $fetch('/api/new-assessment', {
    method: 'POST',
    body: {
      name: form.name,
      dateTime: form.dateTime,
      durationMins: form.durationMins,
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
    useModals('newAssessment', 'close')
  }
})
  
watch(useModalsState(), (newState) => {
  if (newState.newAssessment) {
    form.name = undefined
    form.dateTime = undefined
    form.durationMins = undefined
    form.marksObtainable = undefined
    form.passMark = undefined
  }
})
</script>
