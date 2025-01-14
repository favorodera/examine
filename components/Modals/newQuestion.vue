<template>
  <Teleport to="body">

    <template v-if="useModalsState().newQuestion">
      <div
        class="fixed inset-0 z-2 bg-black/50 backdrop-blur-sm"
      />
    </template>
    
    <Transition
      enter-active-class="transition duration-500 ease-out"
      enter-from-class="transform opacity-0"
      enter-to-class="transform opacity-100"
      leave-active-class="transition duration-500 ease-in"
      leave-from-class="transform opacity-100"
      leave-to-class="transform opacity-0"
    >
      <div
        v-if="useModalsState().newQuestion"
        class="fixed inset-0 z-3 overflow-y-auto"
        @click="useModals('newQuestion', 'close')"
      >
        <div class="h-screen flex items-center justify-center p-4">
          <form
            method="dialog"
            class="max-w-md w-full flex flex-col gap-6 rounded-4 bg-white px-4 py-8"
            @submit.prevent="execute()"
            @click.stop
          >
        
            <h1 class="text-center text-xl font-semibold">
              New Question
            </h1>
      
            <label
              for="question"
            >
              Question
              <div class="w-full flex items-start rounded-1.5 bg-brand-gray/20 pl-4">
                <span class="i-hugeicons:edit-01 mt-4 size-5 shrink-0" />
                <textarea
                  id="question"
                  v-model="form.question"
                  spellcheck="true"
                  name="question"
                  placeholder="What is the capital of France?"
                  class="w-full resize-none bg-transparent p-4 outline-none placeholder-brand-dark/50"
                  required
                  rows="2"
                  @input="resizeTextarea('question')"
                />
              </div>
            </label>
            
            <div
              v-for="(_option, PropertyKey) in form.options"
              :key="PropertyKey"
              class="w-full flex items-start rounded-1.5 bg-brand-gray/20 pl-4"
            >
              <span class="mt-4 shrink-0 font-semibold">{{ PropertyKey.toUpperCase() }}</span>
              <textarea
                :id="'option-' + PropertyKey"
                v-model="form.options[PropertyKey]"
                type="text"
                spellcheck="true"
                :name="'option-' + PropertyKey"
                :placeholder="'Option ' + PropertyKey.toUpperCase()"
                rows="1"
                class="w-full resize-none bg-transparent p-4 outline-none placeholder-brand-dark/50"
                required
                @input="resizeTextarea('option-' + PropertyKey)"
              />
            </div>
      
            <label
              for="correct-option"
            >
              Correct Option
              <div class="w-full flex items-center rounded-1.5 bg-brand-gray/20 pl-4">
                <span class="i-hugeicons:checkmark-circle-02 size-5 shrink-0" />
                <input
                  id="correct-option"
                  v-model="form.correctOption"
                  name="correct-option"
                  class="w-full flex-1 truncate bg-transparent px-4 py-3 outline-none"
                  required
                  type="text"
                  placeholder="B"
                  maxlength="1"
                >
                
              </div>
            </label>

            <label
              for="marks-obtainable"
            >
              Marks Obtainable
              <div class="w-full flex items-center rounded-1.5 bg-brand-gray/20 pl-4">
                <span class="i-hugeicons:chart-maximum size-5 shrink-0" />
                <input
                  id="marks-obtainable"
                  v-model="form.marksObtainable"
                  type="number"
                  name="marks-obtainable"
                  placeholder="100"
                  min="1"
                  class="w-full flex-1 truncate bg-transparent px-4 py-3 outline-none placeholder-brand-dark/50"
                  required
                >
              </div>
            </label>
      
            <div class="flex justify-between gap-4">
              <button
                type="button"
                class="w-max flex items-center gap-2 rounded-2 bg-red-500 px-4 py-2 text-white font-normal duration-500 ease property-background-color hover:bg-red-600"
                @click="useModals('newQuestion', 'close')"
              >
                Cancel
              </button>
  
              <button
                type="submit"
                :disabled="status === 'pending'"
                class="w-max flex flex-col items-center gap-2 rounded-2 bg-brand-green px-4 py-2 text-white font-normal duration-500 ease property-background-color disabled:cursor-not-allowed hover:bg-brand-green/70"
              >
                <div class="flex items-center gap-2">
                  {{ status === 'success' ? 'Created' : status === 'pending' ? 'Running' : 'Submit' }}
      
                  <span
                    :class="{
                      'animate-spin i-hugeicons:reload size-5': status === 'pending',
                      'i-hugeicons:checkmark-circle-02 size-5': status === 'success',
                    }"
                  />
                </div>
              </button>
            </div>

          </form>
        </div>
      </div>
    </Transition>

  </Teleport>
</template>
  
<script setup lang="ts">
import { useModals, useModalsState } from '~/composables/useModals'
  
const createUpdate = useCreateUpdate()
    
const form = reactive({
  question: '',
  options: {
    a: '',
    b: '',
    c: '',
    d: '',
  },
  correctOption: '',
  marksObtainable: undefined,
})
      
const { status, execute } = await useAsyncData(
  'create-new-question',
  () => $fetch('/api/newQuestion', {
    method: 'PUT',
    body: {
      assessmentId: useRoute().params.assessmentId,
      question: form.question,
      options: form.options,
      correctOption: form.correctOption.toUpperCase(),
      marksObtainable: form.marksObtainable,
    },
  }),
  {
    immediate: false,
  },
)

function resizeTextarea(textareaId: string) {
  const textarea = document.getElementById(textareaId) as HTMLTextAreaElement

  if (textarea) {
    textarea.style.height = 'auto'
    textarea.style.height = textarea.scrollHeight + 'px'

    if (!textarea.value) {
      textarea.style.height = 'auto'
    }
  }
}
      
watch(status, async (newStatus) => {
  if (newStatus === 'success') {
    createUpdate.question = true
    useModals('newQuestion', 'close')
      
    setTimeout(() => {
      createUpdate.question = false
    }, 3000)
  }
})
  
watch(useModalsState(), (newState) => {
  if (newState.newQuestion) {
    form.question = ''
    form.options = {
      a: '',
      b: '',
      c: '',
      d: '',
    }
    form.correctOption = ''
    form.marksObtainable = undefined
  
  }
})
  
</script>
