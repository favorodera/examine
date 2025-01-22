<template>

  <main class="m-a max-w-[30rem] w-full flex flex-col items-start justify-center gap-4">
    <button
      type="button"
      class="group"
      @click="navigateTo('/')"
    >
      <span class="i-hugeicons:home-03 size-6 duration-300 ease property-colors group-hover:text-brand-green" />
    </button>
  
    <form
      class="shadowed w-full flex flex-col items-center gap-8 rounded-4 bg-white px-4 py-8"
      @submit.prevent="callMagicLink()"
    >
  
      <div
        class="flex items-center gap-1"
      >
        <span class="i-hugeicons:school-report-card size-8 text-brand-green" />
        <p class="text-lg font-semibold">
          Examine
        </p>
  
      </div>
  
      <div class="flex flex-col items-center gap-4">
  
        <p class="text-base">
          Continue with:
        </p>
  
        <div class="w-full flex flex-wrap gap-4">
  
          <button
            type="button"
            class="w-max flex items-center gap-2 rounded-2 bg-brand-green px-4 py-2 font-normal duration-500 ease property-background-color hover:bg-brand-green/80"
            @click="google()"
          >
            <span class="i-hugeicons:google size-5" />
            Google
          </button>
  
        </div>
  
      </div>
  
      <div class="w-full flex items-center gap-2">
  
        <div class="h-0.5 flex-1 bg-brand-dark opacity-20" />
        <p class="text-base">
          OR
        </p>
        <div class="h-0.5 flex-1 bg-brand-dark opacity-20" />
  
      </div>
  
      <label
        for="email"
        class="w-full flex flex-col gap-2"
      >
        Email
        <div class="w-full flex items-center rounded-1.5 bg-brand-gray/20 pl-4">
          <span class="i-hugeicons:mail-02 size-5 shrink-0" />
          <input
            id="email"
            v-model="email"
            type="email"
            name="email"
            placeholder="myEmail@example.com"
            class="w-full flex-1 truncate bg-transparent px-4 py-3 outline-none placeholder-brand-dark/50"
            required
            autocomplete="email"
          >
        </div>
      </label>
  
      <button
        type="submit"
        :disabled="magicLinkStatus === 'sending' || magicLinkStatus === 'sent'"
        class="w-max flex items-center gap-2 rounded-2 bg-brand-green px-4 py-2 font-normal duration-500 ease property-background-color disabled:cursor-not-allowed hover:bg-brand-green/70"
      >
        {{ magicLinkStatus === 'sent' ? `Resend in ${countdownTime} seconds.` : magicLinkStatus === 'sending' ? 'Sending...' : 'Send Magic Link' }}
  
        <span
          :class="{
            'animate-spin i-hugeicons:reload size-5': magicLinkStatus === 'sending',
  
          }"
        />
  
      </button>
  
    </form>
  </main>
</template>
  
<script setup lang="ts">
const email = ref('')
const countdownTime = ref(0)
const magicLinkStatus = ref('idle' as 'idle' | 'sending' | 'sent' | 'error')
  
const callMagicLink = () => {
  magicLinkStatus.value = 'sending'
  countdownTime.value = 300
  
  magicLink(email.value)
    .then(() => {
      magicLinkStatus.value = 'sent'

      createNotification(
        'Magic Link Sent',
        'i-hugeicons:checkmark-circle-02',
        5000,
        'success',
      )
  
      const interval = setInterval(() => {
        if (countdownTime.value > 0) {
          countdownTime.value--
        }
        else {
          clearInterval(interval)
          magicLinkStatus.value = 'idle'
        }
      }, 1000)
    })
    .catch((error: Error) => {
      magicLinkStatus.value = 'error'
      createNotification(
        error.message,
        'i-hugeicons:cancel-circle',
        5000,
        'error',
      )
    })
}
</script>
