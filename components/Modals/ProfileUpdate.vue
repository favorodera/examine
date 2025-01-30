<template>
  <Teleport to="body">
  
    <template v-if="useModalsState().ProfileUpdate">
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
        v-if="useModalsState().ProfileUpdate"
        class="fixed inset-0 z-3 overflow-y-auto"
      >
        <div class="h-screen flex items-center justify-center p-4">
          <form
            method="dialog"
            class="max-w-md w-full flex flex-col gap-6 rounded-4 bg-white px-4 py-8"
            @submit.prevent="submitForm()"
          >
            <h1 class="text-center text-xl font-semibold">
              Profile Update
            </h1>
          
            <label
              for="first-name"
            >
              First Name
              <div class="w-full flex items-center rounded-1.5 bg-brand-gray/20 pl-4">
                <span class="i-hugeicons:user-account size-5 shrink-0" />
                <input
                  id="first-name"
                  v-model="form.firstName"
                  type="text"
                  spellcheck="true"
                  name="first-name"
                  placeholder="Willis"
                  class="w-full flex-1 truncate bg-transparent px-4 py-3 outline-none placeholder-brand-dark/50"
                  required
                >
              </div>
            </label>
          
            <label
              for="last-name"
            >
              Last Name
              <div class="w-full flex items-center rounded-1.5 bg-brand-gray/20 pl-4">
                <span class="i-hugeicons:user-account size-5 shrink-0" />
                <input
                  id="last-name"
                  v-model="form.lastName"
                  type="text"
                  name="last-name"
                  placeholder="Cooper"
                  class="w-full flex-1 truncate bg-transparent px-4 py-3 outline-none placeholder-brand-dark/50"
                  required
                >
              </div>
            </label>
      
            <button
              type="submit"
              class="w-max flex flex-col items-center self-center gap-2 rounded-2 bg-brand-green px-4 py-2 text-white font-normal duration-500 ease property-background-color disabled:cursor-not-allowed hover:bg-brand-green/70"
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
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
    
<script setup lang="ts">
import { useModals, useModalsState } from '~/composables/useModals'
      
const form = reactive({
  firstName: undefined,
  lastName: undefined,
})

const client = useSupabaseClient()
        
const { status, execute } = await useAsyncData(
  'profile-update',
  () => $fetch('/api/create-instructor', {
    method: 'POST',
  }),
  {
    immediate: false,
  },
)

const submitForm = async () => {
  await client.auth.updateUser({
    data: {
      name: `${form.firstName} ${form.lastName}`,
      full_name: `${form.firstName} ${form.lastName}`,
    },
  }).then(() => {
    execute()
  })
}
        
watch(status, async (newStatus) => {
  if (newStatus === 'success') {
    useModals('ProfileUpdate', 'close')
  
    createNotification(
      'Profile Updated Successfully',
      'i-hugeicons:checkmark-circle-02',
      5000,
      'success',
      async () => {
        await client.auth.updateUser({
          data: {
            is_on_base: true,
          },
        },
        )
      },
    )
  }
  else if (newStatus === 'error') {
    createNotification(
      'Error Updating Profile',
      'i-hugeicons:cross-circle-02',
      5000,
      'error',
    )
  }
})
    
watch(useModalsState(), (newState) => {
  if (newState.ProfileUpdate) {
    form.firstName = undefined
    form.lastName = undefined
  }
})

</script>
