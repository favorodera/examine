<template>

  <div class="w-full max-w-[30rem] flex flex-col items-start justify-center gap-4">
    <button
      type="button"
      class="group"
      @click="navigateTo('/')"
    >
      <span class="i-hugeicons:home-03 size-6 group-hover:text-blue-500 property-colors duration-300 ease" />
    </button>

    <form
      class="w-full rounded-4 bg-elevate px-4 py-8 flex flex-col items-center gap-8"
      @submit.prevent="callMagicLink()"
    >

      <span class="i-hugeicons:brain-02 size-7 text-blue-500" />

      <div class="flex flex-col gap-4 items-center">

        <p class="text-base">
          Continue with:
        </p>

        <div class="w-full flex flex-wrap gap-4 ">

          <button
            type="button"
            class="px-8 py-2 flex items-center justify-center gap-2 rounded-2 bg-background flex-1 hover:text-blue-500 property-colors duration-500 ease"
            @click="google()"
          >
            <span class="i-hugeicons:google size-5 text-blue-500" />
            Google
          </button>

        </div>

      </div>

      <div class="w-full flex items-center gap-2">
        <div class="flex-1 h-0.5 bg-white opacity-10" />
        <p>OR</p>
        <div class="flex-1 h-0.5 bg-white opacity-10" />
      </div>

      <label
        for="email"
        class="w-full flex flex-col gap-2"
      >
        Email
        <div class="w-full flex pl-4 items-center rounded-1.5 bg-background">
          <span class="i-hugeicons:mail-02 size-5 shrink-0" />
          <input
            id="email"
            v-model="email"
            type="email"
            name="email"
            placeholder="myEmail@example.com"
            class="py-3 bg-transparent flex-1 px-4 outline-none truncate w-full"
            required
          >
        </div>
      </label>

      <button
        type="submit"
        :disabled="magicLinkStatus === 'sending' || magicLinkStatus === 'sent'"
        class="flex flex-col items-center gap-2 bg-blue-500 disabled:cursor-not-allowed hover:bg-blue-600 px-6 py-3 font-semibold rounded-lg transition-background-color duration-500"
      >
        <div class="flex items-center gap-2">
          {{ magicLinkStatus === 'sent' ? `Magic Link Sent` : magicLinkStatus === 'sending' ? 'Sending...' : 'Send Magic Link' }}

          <span
            :class="{
              'animate-spin i-hugeicons:reload size-5': magicLinkStatus === 'sending',
              'i-hugeicons:checkmark-circle-02 size-5': magicLinkStatus === 'sent',

            }"
          />
        </div>

        <p v-if="magicLinkStatus === 'sent'">
          Get another in {{ countdownTime }} secs.
        </p>
      </button>

    </form>
  </div>
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
    .catch(() => {
      magicLinkStatus.value = 'error'
    })
}
</script>
