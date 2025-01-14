<template>

  <section
    id="benefits"
    class="mt-12 w-full flex flex-col items-center justify-center gap-12 p-4"
  >

    <h1 class="text-center text-2xl text-brand-green font-semibold">

      Key Benefits

    </h1>

    <div class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,25rem),1fr))] max-w-[70rem] w-full gap-6">

      <UtilsHomeCard
        icon="i-hugeicons:arrange-by-letters-a-z"
        title="Easy to Use"
        description="User-friendly interface for quick and efficient exam management."
      />
      
      <UtilsHomeCard
        icon="i-hugeicons:user-status"
        title="Time Management"
        description="Track time spent on each examination with precision."
      />

      <UtilsHomeCard
        icon="i-hugeicons-chart-line-data-01"
        title="Performance Analysis"
        description="Analyze candidates performance with detailed reports."
      />
  
      <UtilsHomeCard
        icon="i-hugeicons:security-check"
        title="Secure Exams"
        description="Ensure exam integrity with robust security measures."
      />
      
    </div>

  </section>

</template>
