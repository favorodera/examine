<template>
  <Teleport to="body">
    
    <template v-if="useModalsState().assessmentDelete">
      <div
        class="fixed inset-0 z-3 bg-black/50 backdrop-blur-sm"
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
        v-if="useModalsState().assessmentDelete"
        class="fixed inset-0 z-4 overflow-y-auto"
      >
        <div class="h-screen flex items-center justify-center p-4">
  
          <div class="max-w-md min-h-50 w-full flex flex-col items-center justify-between gap-6 rounded-4 bg-white px-4 py-8">
  
            <span class="i-hugeicons:checkmark-circle-02 size-12 text-brand-green" />
  
            <p class="text-center text-lg font-semibold">
              Are you sure you want to delete this assessment
            </p>
  
            <div
              class="w-full flex gap-4"
            >
              <button
                type="button"
                class="w-full rounded-2 bg-red-600 px-4 py-2 text-white font-semibold duration-500 ease property-background-color hover:bg-red-500"
                @click="useModals('assessmentDelete', 'close')"
              >
                Cancel
              </button>
              <button
                type="button"
                :disabled="status === 'pending'"
                class="w-full rounded-2 bg-brand-green px-4 py-2 text-white font-semibold duration-500 ease property-background-color hover:bg-brand-green/70"
                @click="execute()"
              >
                {{ status !== 'pending' ? 'Delete' : '' }}
  
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

const props = defineProps<{
  assessmentId: string | undefined
}>()
  
const { execute, status } = await useAsyncData(
  'delete-assessment',
  () => $fetch(`/api/delete-assessment?assessmentId=${props.assessmentId}`, {
    body: {
      assessmentId: props.assessmentId,
    },
    method: 'DELETE',
    timeout: 30000,
  }),
  { immediate: false },
)
  
watch(status, (newStatus) => {
  if (newStatus === 'success') {
  
    createNotification(
      'Assessment Deleted Successfully',
      'i-hugeicons:checkmark-circle-02',
      3000,
      'success',
      () => {
        useModals('assessmentDelete', 'close')
  
        navigateTo('/console')
      },
    )
      
  }
  else if (newStatus === 'error') {

    createNotification(
      'Error Deleting Assessment',
      'i-hugeicons-cancel-circle',
      5000,
      'error',
    )
     
  }
})
</script>
