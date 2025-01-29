<template>

  <NuxtLoadingIndicator color="green" />

  <main>

    <NuxtPage />

    <UtilsNotification />

  </main>

</template>

<script setup lang="ts">
useSeoMeta({
  titleTemplate: title => `Examine | ${title ?? ''}`,
  ogType: 'website',
  ogImage: {
    url: 'https://examine-app.vercel.app/images/hero-image.png',
    type: 'image/png',
    height: '630',
    width: '1200',
    alt: 'image',
  },
  twitterImage: {
    url: 'https://examine-app.vercel.app/images/hero-image.png',
    type: 'image/png',
    height: '630',
    width: '1200',
    alt: 'image',
  },
  twitterCard: 'summary_large_image',
  twitterSite: '@favorodera',
  twitterCreator: '@favorodera',
  robots: 'index, follow',
  author: 'Favour Emeka',
  keywords: 'exam,assessment,exam management,assessment management, examine, cbt',
  themeColor: '#ffffff',
  applicationName: 'Examine',
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
        'logo': 'https://examine-app.vercel.app/images/logo.png',
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
})

useSupabaseClient().auth.onAuthStateChange(
  async (event) => {
    if (event === 'SIGNED_OUT') {
      createNotification(
        'Signed Out Successfully',
        'i-hugeicons:checkmark-circle-02',
        2000,
        'success',
        () => navigateTo('/auth'),
      )
    }
    else if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {

      await useAsyncData(
        'create-instructor',
        () => $fetch('/api/create-instructor', {
          method: 'POST',
          timeout: 30000,
        }),
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
