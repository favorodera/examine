<template>

  <section
    id="how-it-works"
    class="mt-12 w-full flex flex-col items-center justify-center gap-12 p-4"
  >

    <h1 class="text-center text-2xl text-brand-green font-semibold">

      How It Works

    </h1>

    <div class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,25rem),1fr))] max-w-[70rem] w-full gap-6">

      <UtilsHomeCard
        title="Step 1: Register"
        description="Create an account to access the console."
        icon="i-hugeicons:user-add-01"
      />

      <UtilsHomeCard
        title="Step 2: Schedule Exams"
        description="Setup your exams with ease."
        icon="i-hugeicons:calendar-03"
      />

      <UtilsHomeCard
        title="Step 3: Publish Exam"
        description="Publish your exams for candidates to take."
        icon="i-hugeicons:rocket-02"
      />

      <UtilsHomeCard
        title="Step 4: Review and Analyze"
        description="Review and analyze your exam results."
        icon="i-hugeicons:chart-average"
      />

    </div>
  
  </section>
  
</template>
