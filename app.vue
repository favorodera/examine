<template>

  <NuxtLoadingIndicator color="green" />

  <main>

    <NuxtPage />

    <UtilsNotification />

  </main>

</template>

<script setup lang="ts">
watch(useModalsState(), (newState) => {
  if (newState.newQuestion || newState.newAssessment) {
    document.body.style.overflow = 'hidden'
  }
  else {
    document.body.style.overflow = 'auto'
  }
})
</script>
