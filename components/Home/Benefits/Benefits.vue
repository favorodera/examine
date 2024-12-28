<template>

  <section
    id="benefits"
    class="w-full max-w-[90rem] flex flex-col items-center justify-center gap-12 p-4 sm:p-12"
  >

    <div class="flex flex-col items-center gap-6">

      <p class="px-4 py-2 text-center text-sm font-semibold text-blue-500 rounded-4 bg-[#171717] w-max">
        Why Choose Examine?
      </p>

      <h1 class="text-center text-2xl font-bold sm:text-4xl">

        Key Benefits <span class="text-gray">of Using</span> Examine

      </h1>

      <p class="text-center text-sm lg:text-xl font-semibold opacity-80 max-w-[45rem]">
        Examine streamlines the assessment process, enabling educators and organizations to easily design and manage
        examinations for a smooth experience.
      </p>

    </div>

    <div class="w-full max-w-[60rem] grid grid-cols-[repeat(auto-fit,minmax(min(100%,20rem),1fr))] gap-6">
      <HomeBenefitsBenefitCard
        icon="i-hugeicons-chart-line-data-01"
        title="Automatic Grading"
        description="Experience seamless automatic grading that saves you time and ensures consistent evaluation of candidate performance."
      />
  
      <HomeBenefitsBenefitCard
        icon="i-hugeicons:arrange-by-letters-a-z"
        title="Easy to Use"
        description="Examine provides a user-friendly interface that streamlines the assessment process, making it accessible to both educators and candidates."
      />
    </div>

  </section>

</template>
