<template>

  <Layout>

    <template #body>

      <main class="shadowed m-a max-w-[30rem] w-full flex flex-col items-center gap-4 rounded-xl px-8 py-12">

        <span
          class="size-25"
          :class="{
            'i-hugeicons:security-check text-brand-green': instructor,
            'i-hugeicons:reload animate-spin text-amber text-brand-red': !instructor,
          }"
        />

        <p class="text-center text-2xl font-semibold">
          {{ instructor ? 'Authentication Successful' : 'Confirming Authentication' }}
        </p>

      </main>

    </template>

  </Layout>

</template>

<script setup lang="ts">
const instructor = useSupabaseUser()
const cookieName = useRuntimeConfig().public.supabase.cookieName
const redirectPath = useCookie(`${cookieName}-redirect-path`).value
const { token_hash, type } = useRoute().query as { token_hash: string, type: 'magiclink' | 'signup' }
const client = useSupabaseClient()

useSeoMeta({
  title: 'Confirm',
})

if (token_hash && type) {
  await client.auth.verifyOtp(

    { token_hash, type },
  
  )

}

watch(instructor, async () => {
  if (instructor.value) {

    useCookie(`${cookieName}-redirect-path`).value = null

    navigateTo(redirectPath || '/console')
  }

}, { deep: true, immediate: true })
</script>
