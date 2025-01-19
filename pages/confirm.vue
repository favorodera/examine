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

watch(instructor, () => {
  if (instructor.value) {

    useCookie(`${cookieName}-redirect-path`).value = null

    return navigateTo(redirectPath || '/console')
  }
}, { deep: true, immediate: true })
</script>
