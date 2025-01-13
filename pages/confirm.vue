<template>

  <Layout>

    <template #body>

      <main class="shadowed m-a max-w-[30rem] w-full flex flex-col items-center gap-4 rounded-xl px-8 py-12">

        <span
          class="size-25"
          :class="{
            'i-hugeicons:security-check text-brand-green': user,
            'i-hugeicons:reload animate-spin text-amber text-brand-red': !user,
          }"
        />

        <p class="text-center text-2xl font-bold">
          {{ user ? 'Authentication Successful' : 'Confirming Authentication' }}
        </p>

      </main>

    </template>

  </Layout>

</template>

<script setup lang="ts">
const user = useSupabaseUser()

watch(user, () => {
  if (user.value) {
    navigateTo('/console')
  }
}, { deep: true, immediate: true })
</script>
