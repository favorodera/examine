<template>

  <NuxtLoadingIndicator color="green" />

  <main>

    <NuxtPage />

    <UtilsNotification />

  </main>

</template>

<script setup lang="ts">
useSeoMeta({
  titleTemplate: title => `Examine | ${title}`,
  ogType: 'website',
  ogImage: '/images/hero.png',
  twitterDescription: 'Simplify your assessments management experience with examine',
  twitterImage: '/images/hero.png',
  twitterCard: 'summary_large_image',
  twitterSite: '@favorodera',
  twitterCreator: '@favorodera',
  robots: 'index, follow',
  author: 'Favour Emeka',
  keywords: 'exam,assessment,exam management,assessment management, examine, cbt',
})

useHead({
  link: [
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Website',
        'name': 'Examine',
        'url': 'https://examine-app.vercel.app/',
        'logo': '/images/logo.png',
        'contactPoint': {
          '@type': 'ContactPoint',
          'telephone': '+234 802 438 3756',
          'email': 'favorodera@gmail.com',
          'contactType': 'customer service',
          'availableLanguage': 'en',
        },
      }),
    },
  ],
  meta: [
    { name: 'theme-color', content: '#ffffff' },
    { name: 'application-name', content: 'Examine' },
  ],
})

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
