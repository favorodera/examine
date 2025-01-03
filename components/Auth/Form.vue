<template>

  <div class="w-full max-w-[30rem] flex flex-col items-start justify-center gap-4">
    <button
      type="button"
      class="group"
      @click="navigateTo('/')"
    >
      <span class="i-hugeicons:home-03 size-6 text-brand-dark group-hover:text-brand-green property-colors duration-300 ease" />
    </button>

    <form
      class="w-full rounded-4 bg-white px-4 py-8 flex flex-col items-center gap-8"
      @submit.prevent="callMagicLink()"
    >

      <div
        class="flex items-center gap-1"
      >
        <span class="i-hugeicons:school-report-card size-8 text-brand-green" />
        <p class="text-lg font-bold text-brand-dark">
          Examine
        </p>

      </div>

      <div class="flex flex-col gap-4 items-center">

        <p class="text-base text-brand-dark">
          Continue with:
        </p>

        <div class="w-full flex flex-wrap gap-4 ">

          <button
            type="button"
            class="w-max flex gap-2 items-center px-4 py-2 bg-brand-green hover:bg-brand-green/80 property-background-color duration-500 ease text-brand-dark font-medium rounded-2"
            @click="google()"
          >
            <span class="i-hugeicons:google size-5" />
            Google
          </button>

        </div>

      </div>

      <div class="w-full flex items-center gap-2">

        <div class="flex-1 h-0.5 bg-brand-dark opacity-20" />
        <p class="text-base text-brand-dark">
          OR
        </p>
        <div class="flex-1 h-0.5 bg-brand-dark opacity-20" />

      </div>

      <label
        for="email"
        class="w-full flex flex-col gap-2"
      >
        Email
        <div class="w-full flex pl-4 items-center rounded-1.5 bg-brand-gray/20">
          <span class="i-hugeicons:mail-02 size-5 shrink-0 text-brand-dark" />
          <input
            id="email"
            v-model="email"
            type="email"
            name="email"
            placeholder="myEmail@example.com"
            class="py-3 bg-transparent flex-1 px-4 outline-none truncate w-full text-brand-dark placeholder-brand-dark/50"
            required
            autocomplete="email"
          >
        </div>
      </label>

      <button
        type="submit"
        :disabled="magicLinkStatus === 'sending' || magicLinkStatus === 'sent'"
        class="w-max flex flex-col gap-2 items-center px-4 py-2 bg-brand-green hover:bg-brand-green/80 property-background-color duration-500 ease text-brand-dark font-medium rounded-2 disabled:cursor-not-allowed"
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

<style scoped lang="css">
form {
  box-shadow: rgba(3, 3, 3, 0.1) 0px 0px 9px;
}
</style>
