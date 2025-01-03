<template>

  <section
    id="how-it-works"
    class="w-full flex flex-col items-center justify-center gap-12 mt-12 p-4"
  >

    <h1 class="text-center text-2xl font-bold text-brand-green">

      How It Works

    </h1>

    <div class="w-full max-w-[70rem] grid grid-cols-[repeat(auto-fit,minmax(min(100%,25rem),1fr))] gap-6">

      <HomeHowItWorksCard
        title="Step 1: Register"
        description="Create an account to access the console."
        icon="i-hugeicons:user-add-01"
      />

      <HomeHowItWorksCard
        title="Step 2: Schedule Exams"
        description="Setup your exams with ease."
        icon="i-hugeicons:calendar-03"
      />

      <HomeHowItWorksCard
        title="Step 3: Publish Exam"
        description="Publish your exams for candidates to take."
        icon="i-hugeicons:rocket-02"
      />

      <HomeHowItWorksCard
        title="Step 4: Review and Analyze"
        description="Review and analyze your exam results."
        icon="i-hugeicons:chart-average"
      />

    </div>
  
  </section>
  
</template>
  
  <style scoped lang="css">
  .hero {
      box-shadow: rgba(3, 3, 3, 0.1) 0px 0px 9px;
  }
  </style>
