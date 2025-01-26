<template>

  <template v-if="data">

    <div
      class="shadowed m-a max-w-md w-full flex flex-col gap-6 b-2 b-white rounded-4 px-4 py-8"
    >
      <h1 class="text-center text-xl font-semibold">
        Registration Details
      </h1>
          
      <div>

        <p>Name</p>

        <div class="w-full flex items-center rounded-1.5 bg-brand-gray/20 pl-4">

          <span class="i-hugeicons:edit-01 size-5 shrink-0" />
          <p class="w-full flex-1 truncate bg-transparent px-4 py-3 outline-none placeholder-brand-dark/50">
            {{ data.name }}
          </p>

        </div>

      </div>

      <div>

        <div class="flex items-end justify-between gap-2">
          <p>ID</p>

          <button
            type="button"
            class="text-sm outline-none"
            :class="{
              'text-brand-green': copyStatus.id === 'copied',
            }"
            @click="copyToClipboard(data.candidate_id, 'id')"
          >
            {{ copyStatus.id === 'idle' ? 'COPY' : 'COPIED' }}
          </button>
        </div>

        <div class="w-full flex items-center rounded-1.5 bg-brand-gray/20 pl-4">
    
          <span class="i-hugeicons:id size-5 shrink-0" />
          <p class="w-full flex-1 truncate bg-transparent px-4 py-3 outline-none placeholder-brand-dark/50">
            {{ data.candidate_id }}
          </p>

        </div>

      </div>

      <div>

        <p>Department</p>

        <div class="w-full flex items-center rounded-1.5 bg-brand-gray/20 pl-4">

          <span class="i-hugeicons:departement size-5 shrink-0" />
          <p class="w-full flex-1 truncate bg-transparent px-4 py-3 outline-none placeholder-brand-dark/50">
            {{ data.candidate_department }}
          </p>

        </div>

      </div>

      <div>

        <p>Email</p>

        <div class="w-full flex items-center rounded-1.5 bg-brand-gray/20 pl-4">

          <span class="i-hugeicons:mail-01 size-5 shrink-0" />
          <p class="w-full flex-1 truncate bg-transparent px-4 py-3 outline-none placeholder-brand-dark/50">
            {{ data.candidate_email }}
          </p>

        </div>

      </div>

      <div>

        <div class="flex items-end justify-between gap-2">
          <p>Passcode</p>

          <button
            type="button"
            class="text-sm outline-none"
            :class="{
              'text-brand-green': copyStatus.passCode === 'copied',
            }"
            @click="copyToClipboard(data.pass_code, 'passcode')"
          >
            {{ copyStatus.passCode === 'idle' ? 'COPY' : 'COPIED' }}
          </button>
        </div>

        <div class="w-full flex items-center rounded-1.5 bg-brand-gray/20 pl-4">

          <span class="i-hugeicons:access size-5 shrink-0" />
          <p class="w-full flex-1 truncate bg-transparent px-4 py-3 outline-none placeholder-brand-dark/50">
            {{ data.pass_code }}
          </p>

        </div>

      </div>

      <p class="text-center text-xs text-red-500">
        * Your ID and Passcode are not retrievable if lost. Keep Safe.
      </p>

    </div>

  </template>

  <template v-else>
    <form
      class="shadowed m-a max-w-md w-full flex flex-col gap-6 b-2 b-white rounded-4 px-4 py-8"
      @submit.prevent="execute()"
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
          <span class="i-hugeicons:id size-5 shrink-0" />
          <input
            id="id"
            v-model="form.id"
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
        for="department"
      >
        Department
        <div class="w-full flex items-center rounded-1.5 bg-brand-gray/20 pl-4">
          <span class="i-hugeicons:departement size-5 shrink-0" />
          <input
            id="department"
            v-model="form.department"
            type="text"
            spellcheck="true"
            name="department"
            placeholder="Department or Class"
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
          <span class="i-hugeicons:mail-01 size-5 shrink-0" />
          <input
            id="email"
            v-model="form.email"
            type="email"
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
          {{ status === 'pending' ? 'Registering ...' : 'Submit' }}
          
          <span
            :class="{
              'animate-spin i-hugeicons:reload size-5': status === 'pending',
            }"
          />
        </div>
      </button>
    </form>

  </template>

</template>

<script setup lang="ts">
const props = defineProps<{
  assessmentId: string | undefined
  instructorId: string | undefined
}>()

const form = reactive({
  name: undefined,
  id: undefined,
  department: undefined,
  email: undefined,
})

const copyStatus = reactive({
  id: 'idle' as 'copied' | 'idle',
  passCode: 'idle' as 'copied' | 'idle',
})

const { execute, status, error, data } = await useAsyncData(
  'register-candidate',
  () => $fetch('/api/register-candidate', {
    body: {
      assessmentId: props.assessmentId,
      name: form.name,
      id: form.id,
      department: form.department,
      email: form.email,
      instructorId: props.instructorId,
    },
    method: 'POST',
    timeout: 30000,
  }),
  { immediate: false },
)

function copyToClipboard(item: string, type: string) {

  window.navigator.clipboard.writeText(item)

  switch (type) {
    case 'id':
      copyStatus.id = 'copied'
      break
    
    default:
      copyStatus.passCode = 'copied'
      break
  }

  const copyStatusTimeout = setTimeout(() => {
    copyStatus.id = 'idle'
    copyStatus.passCode = 'idle'

    return clearTimeout(copyStatusTimeout)

  }, 3000)

}

watch(status, (newValue) => {
  if (newValue === 'success') {
    createNotification(
      'Registration Successful',
      'i-hugeicons:checkmark-circle-02',
      5000,
      'success',
    )
  }
  else if (newValue === 'error') {
    if (error.value?.statusMessage === 'Candidate already registered') {
      createNotification(
        'Candidate Already Registered',
        'i-hugeicons:cancel-circle',
        5000,
        'error',
      )
    }
    else {
      createNotification(
        'Error Registering Candidate',
        'i-hugeicons:cancel-circle',
        5000,
        'error',
      )
    }
  }
})
</script>
