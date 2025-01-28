<template>

  <Layout>

    <template #homeNav>

      <HomeNav />

    </template>

    <template #body>

      <HomeHero />
      <HomeBenefits />
      <HomeHowItWorks />

    </template>

    <template #footer>

      <HomeFooter />

    </template>

  </Layout>

</template>

<script setup>
useSeoMeta({
  title: 'Home',
  description: 'Simplify your assessments management experience with examine',
  ogTitle: 'Examine | Home',
  ogDescription: 'Simplify your assessments management experience with examine',
  ogUrl: 'https://examine-app.vercel.app/',
  ogSiteName: 'Examine',
  twitterTitle: 'Examine | Home',
  twitterDescription: 'Simplify your assessments management experience with examine',
})

useHead({
  link: [
    {
      rel: 'preload',
      as: 'image',
      href: '/images/hero-image.png',
    },
  ],
})
</script>
