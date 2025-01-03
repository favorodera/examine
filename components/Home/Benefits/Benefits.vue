<template>

  <section
    id="benefits"
    class="w-full flex flex-col items-center justify-center gap-12 mt-12 p-4"
  >

    <h1 class="text-center text-2xl font-bold text-brand-green">

      Key Benefits

    </h1>

    <div class="w-full max-w-[70rem] grid grid-cols-[repeat(auto-fit,minmax(min(100%,25rem),1fr))] gap-6">

      <HomeBenefitsCard
        icon="i-hugeicons:arrange-by-letters-a-z"
        title="Easy to Use"
        description="User-friendly interface for quick and efficient exam management."
      />
      
      <HomeBenefitsCard
        icon="i-hugeicons:user-status"
        title="Time Management"
        description="Track time spent on each examination with precision."
      />

      <HomeBenefitsCard
        icon="i-hugeicons-chart-line-data-01"
        title="Performance Analysis"
        description="Analyze candidates performance with detailed reports."
      />
  
      <HomeBenefitsCard
        icon="i-hugeicons:security-check"
        title="Secure Exams"
        description="Ensure exam integrity with robust security measures."
      />
      
    </div>

  </section>

</template>
