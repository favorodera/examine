<template>

  <main class="w-full min-h-screen flex flex-col items-center justify-center p-4 sm:p-12 ">
    
    <!-- TODO: Work on confirmation page -->
    <p>Confirming ...</p>
    
  </main>
    
</template>

<script setup lang="ts">
const user = useSupabaseUser()

watch(user, () => {
  if (user.value) {
    return navigateTo('/console')
  }
}, { immediate: true })
</script>
