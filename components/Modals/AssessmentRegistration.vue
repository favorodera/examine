<template>
  <Teleport to="body">
  
    <template v-if="useModalsState().assessmentRegistration">
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
        v-if="useModalsState().assessmentRegistration"
        class="fixed inset-0 z-3 overflow-y-auto"
      >
        <div class="h-screen flex items-center justify-center p-4">
          <form
            method="dialog"
            class="max-w-md w-full flex flex-col gap-6 rounded-4 bg-white px-4 py-8"
            @submit.prevent="registerCandidate()"
            @click.stop
          >
            <h1 class="text-center text-xl font-semibold">
              Candidate Registration
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
                  placeholder="Wilson Kate"
                  class="w-full flex-1 truncate bg-transparent px-4 py-3 outline-none placeholder-brand-dark/50"
                  required
                >
              </div>
            </label>
          
            <label
              for="id"
            >
              ID
              <div class="w-full flex items-center rounded-1.5 bg-brand-gray/20 pl-4">
                <span class="i-hugeicons:access size-5 shrink-0" />
                <input
                  id="id"
                  v-model="form.id"
                  type="text"
                  spellcheck="true"
                  name="id"
                  placeholder="StudentID"
                  class="w-full flex-1 truncate bg-transparent px-4 py-3 outline-none placeholder-brand-dark/50"
                  required
                >
              </div>
            </label>

            <label
              for="id"
            >
              Email
              <div class="w-full flex items-center rounded-1.5 bg-brand-gray/20 pl-4">
                <span class="i-hugeicons:access size-5 shrink-0" />
                <input
                  id="email"
                  v-model="form.email"
                  type="text"
                  spellcheck="true"
                  name="email"
                  placeholder="Email"
                  class="w-full flex-1 truncate bg-transparent px-4 py-3 outline-none placeholder-brand-dark/50"
                  required
                >
              </div>
            </label>
           
            <button
              type="submit"
              :disabled="status === 'pending'"
              class="w-max flex items-center self-center gap-2 rounded-2 bg-brand-green px-4 py-2 text-white font-normal duration-500 ease property-background-color disabled:cursor-not-allowed hover:bg-brand-green/70"
            >
              <div class="flex items-center gap-2">
                {{ status === 'success' ? 'Registered' : status === 'pending' ? 'Running' : 'Submit' }}
          
                <span
                  :class="{
                    'animate-spin i-hugeicons:reload size-5': status === 'pending',
                    'i-hugeicons:checkmark-circle-02 size-5': status === 'success',
                  }"
                />
              </div>
            </button>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
    
<script setup lang="ts">
import { useModalsState } from '~/composables/useModals'

const { assessmentId } = useRoute().params
const candidateBioStorageKey = `${assessmentId}-bio`
const status = ref('idle' as 'pending' | 'success' | 'error' | 'idle')

const form = reactive({
  name: undefined,
  id: undefined,
  email: undefined,
})

const registerCandidate = () => {
  status.value = 'pending'
  localStorage.setItem(candidateBioStorageKey, JSON.stringify(form))
  setTimeout(() => {
    status.value = 'success'
    window.location.reload()
  }, 2000)
}
    
watch(useModalsState(), (newState) => {
  if (newState.assessmentRegistration) {
    form.name = undefined
    form.id = undefined
    form.email = undefined
  }
})

</script>
