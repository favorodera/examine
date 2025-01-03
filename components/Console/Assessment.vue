<template>

  <div class="w-full flex flex-col gap-12">

    <div class="flex flex-col gap-2">
      <h1 class="text-xl font-semibold line-clamp-2">
        {{ name }}
      </h1>
      
      <div class="flex items-center gap-2">

        <p class="text-gray text-xs line-clamp-1 font-semibold tracking-wider">
          ACCESS CODE: {{ accessCode }}
        </p>

        <button
          type="button"
          class="hover:scale-110"
          @click="copyToClipboard(accessCode)"
        >
          <span class="i-hugeicons:copy-02 size-4" />
        </button>
      </div>

    </div>

    <div class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,25rem),1fr))] gap-4">

      <div class="w-full flex flex-col gap-2 text-gray text-sm line-clamp-1 font-semibold">
        <p class="text-base text-white">
          BEST CANDIDATE
        </p>

        <p>NAME: {{ bestCandidateName }}</p>
            
        <div class="flex items-center gap-2">
          <p>EMAIL: {{ bestCandidateEmail }}</p>
          <button
            type="button"
            class="hover:scale-110"
            @click="copyToClipboard(bestCandidateEmail)"
          >
            <span class="i-hugeicons:copy-02 size-4" />
          </button>
        </div>

        <p>SCORE: {{ bestCandidateScore }}</p>

        <p>TIME SPENT: {{ bestCandidateTimeSpent }} mins.</p>

      </div>

      <div class="w-full flex flex-col gap-2 text-gray text-sm line-clamp-1 font-semibold">
        <p class="text-base text-white">
          WORST CANDIDATE
        </p>

        <p>NAME: {{ worstCandidateName }}</p>
            
        <div class="flex items-center gap-2">
          <p>EMAIL: {{ worstCandidateEmail }}</p>
          <button
            type="button"
            class="hover:scale-110"
            @click="copyToClipboard(worstCandidateEmail)"
          >
            <span class="i-hugeicons:copy-02 size-4" />
          </button>
        </div>

        <p>SCORE: {{ worstCandidateScore }}</p>

        <p>TIME SPENT: {{ worstCandidateTimeSpent }} mins.</p>

      </div>

      <div class="w-full flex flex-col gap-2 text-gray text-sm line-clamp-1 font-semibold">
        <p class="text-base text-white">
          PERFORMANCE STATS.
        </p>

        <p>NO OF CANDIDATES: {{ worstCandidateName }}</p>
            
        <div class="flex items-center gap-2">
          <p>PASSED: {{ worstCandidateEmail }}</p>
          <button
            type="button"
            class="hover:scale-110"
            @click="copyToClipboard(worstCandidateEmail)"
          >
            <span class="i-hugeicons:copy-02 size-4" />
          </button>
        </div>

        <p>FAILED: {{ worstCandidateScore }}</p>

        <p>AVERAGE SCORE: {{ worstCandidateTimeSpent }} mins.</p>

      </div>

    </div>

  </div>

</template>

<script setup lang="ts">
defineProps<{
  name: string
  accessCode: string
  bestCandidateName: string
  bestCandidateEmail: string
  bestCandidateScore: number
  bestCandidateTimeSpent: number
  worstCandidateName: string
  worstCandidateEmail: string
  worstCandidateScore: number
  worstCandidateTimeSpent: number
}>()

const copyToClipboard = (item: string) => {
  window.navigator.clipboard.writeText(item)
}
</script>
