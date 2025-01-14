<template>
    
  <Layout>

    <template
      v-if="data?.assessment && data?.questions && status === 'success'"
      #nav
    >

      <nav class="shadowed sticky z-1 w-full flex justify-center bg-white p-4">

        <div class="max-w-360 w-full flex flex-col items-center justify-between gap-2">

          <div class="w-full flex items-center justify-between gap-4">

            <h1 class="text-2xl font-semibold">
              Assessment
            </h1>

            <button
              type="button"
              class="rounded-md bg-brand-green px-4 py-1 text-white font-medium transition-background-color duration-500 hover:bg-brand-green/70"
              @click="navigateTo('/console')"
            >
              Submit
            </button>

          </div>

          <div class="w-full flex items-center justify-between gap-4">

            <div class="flex flex-col gap-1">

              <p class="line-clamp-1 text-sm font-medium">
                Examination: {{ data.assessment.name }}
              </p>

              <p class="text-sm text-brand-gray font-medium">
                Duration: {{ data.assessment.duration_mins }} minutes
              </p>

            </div>

            <div class="w-max flex flex-col gap-1">

              <p class="w-max text-sm font-medium">
                Status: {{ data.assessment.status }}
              </p>

              <p class="w-max text-sm text-brand-gray font-medium">
                Date: {{ data.assessment.date_time.split('T')[0] }} {{ data.assessment.date_time.split('T')[1] }} UTC
              </p>

            </div>

          </div>

        </div>

      </nav>

    </template>

    <template #body>
      
      <template v-if="data?.assessment && data?.questions && status === 'success'">

        <div
          class="shadowed w-full flex flex-col gap-3 rounded-3.5 bg-white p-8"
        >

          <template v-if="data?.questions[currentQuestionIndex]">

            <p class="text-xl font-semibold">
              Question {{ currentQuestionIndex + 1 }}
            </p>
        
            <h1 class="p-2 text-lg font-medium">
              {{ data.questions[currentQuestionIndex].question }}
            </h1>
            <div
              v-for="(option, PropertyKey) in data.questions[currentQuestionIndex]?.options"
              :key="PropertyKey"
              class="w-max"
            >
              <input
                :id="`option-${PropertyKey.toString().toLowerCase()}`"
                v-model="selectedOption[currentQuestionIndex]"
                type="radio"
                :name="`question-${currentQuestionIndex}`"
                class="peer hidden"
                :value="PropertyKey.toString().toUpperCase()"
              >
              <label
                :for="`option-${PropertyKey.toString().toLowerCase()}`"
                class="option flex cursor-pointer items-center gap-2 rounded-md p-2 font-medium transition-colors duration-200 hover:bg-brand-green/20 peer-checked:bg-brand-green peer-checked:text-white"
              >
                <span class="font-semibold">{{ PropertyKey.toString().toUpperCase() }}.</span> {{ option }}
              </label>
            </div>

          </template>
        
          <template v-else>

            <div class="mt-12 min-w-full flex flex-col items-center justify-center gap-2 op-50">
              <span class="i-hugeicons:database size-8" />
              <p class="text-sm font-semibold">
                Question not found
              </p>
            </div>
          </template>
        </div>
        
        <div class="shadowed grid grid-cols-[repeat(auto-fill,minmax(min(100%,2rem),1fr))] w-full gap-3 rounded-3.5 bg-white p-8">

          <button
            v-for="(_question, index) in data?.questions"
            :key="index"
            type="button"
            :class="[
              'size-7.5 rounded-md cursor-pointer b b-brand-gray hover:bg-brand-gray  transition-all duration-500 ease',
              {
                'bg-brand-gray': currentQuestionIndex === index,
                'bg-brand-green text-white': selectedOption[index],
              },
            ]"
            @click="goToQuestion(index)"
          >
            {{ index + 1 }}
          </button>
          
        </div>

      </template>

      <template
        v-else-if="status === 'pending'"
      >

        <div class="m-a flex flex-col items-center gap-4 text-orange">

          <span class="i-hugeicons:reload size-8 animate-spin" />

          <p class="text-xl font-semibold">
            Fetching Assessment...
          </p>

        </div>

      </template>

      <template
        v-if="status === 'error'"
      >

        <div class="m-a flex flex-col items-center gap-4 text-red">

          <span class="i-hugeicons:alert-02 size-8" />

          <p class="text-xl font-semibold">
            Error Fetching Assessment
          </p>

          <button
            type="button"
            class="rounded-md bg-brand-green px-3 py-1 text-white font-medium transition-background-color duration-500 hover:bg-brand-green/70"
            @click="refresh()"
          >
            Retry
          </button>

        </div>

      </template>

      <template v-if="!data?.assessment && !data?.questions && status === 'success'">

        <div class="m-a flex flex-col items-center gap-4">

          <span class="i-hugeicons:database size-8 op-40" />

          <p class="text-xl font-semibold op-40">
            Assessment not Found
          </p>

        </div>
      </template>

    </template>

  </Layout>

</template>

<script setup lang="ts">
const { assessmentId } = useRoute().params
const selectedOption = ref<string[]>([])
const currentQuestionIndex = ref(0)

const { data, status, refresh } = await useAsyncData(
  'assessment',
  () => $fetch(`/api/assessment?assessmentId=${assessmentId}`),
  {
    server: false,
  },
)

const STORAGE_KEY = `${assessmentId}-selected-options`

onMounted(() => {
  const storedOptions = localStorage.getItem(STORAGE_KEY)
  if (storedOptions) {
    selectedOption.value = JSON.parse(storedOptions)
  }
})

watch(selectedOption, (newValue) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue))
}, { deep: true })

function goToQuestion(index: number) {
  currentQuestionIndex.value = index
}
</script>
