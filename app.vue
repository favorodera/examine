<template>

  <NuxtLoadingIndicator color="green" />

  <main>

    <NuxtPage />

    <UtilsNotification />

  </main>

</template>

<script setup lang="ts">
useSupabaseClient().auth.onAuthStateChange(
  (event) => {
    if (event === 'SIGNED_OUT') {
      createNotification(
        'Signed Out Successfully',
        'i-hugeicons:checkmark-circle-02',
        2000,
        'success',
        () => navigateTo('/auth'),
      )
    }
  })

watch(useModalsState(), (newState) => {
  if (newState.newQuestion || newState.newAssessment) {
    document.body.style.overflow = 'hidden'
  }
  else {
    document.body.style.overflow = 'auto'
  }
})
</script>
