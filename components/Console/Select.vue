<template>

  <div
    class="outline-none relative w-full max-w-40"
    tabindex="0"
    @keydown="onKeyDown"
    @blur="isOpen = false"
  >

    <div
      class="selected-value bg-elevate text-sm font-normal p-2 b b-gray rounded-md cursor-pointer flex items-center justify-between"
      @click="toggleDropdown"
    >
      <span class="truncate font-semibold">{{ modelValue }}</span>

      <i
        class="i-hugeicons-arrow-down-01 size-5 property-transform duration-200 ease"
        :class="{ 'transform rotate-180': isOpen }"
      />

    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >

      <div
        v-if="isOpen"
        class="p-2 absolute w-full mt-1 flex flex-col gap-2 bg-elevate b b-gray rounded-md shadow-lg z-50"
      >

        <div
          v-for="option in options"
          :key="option"
          class="p-1.5 flex items-center justify-between gap-2 cursor-pointer hover:bg-gray/10 transition-colors  rounded-md"
          :class="{ 'bg-gray/20': option === modelValue }"
          @click="selectOption(option)"
        >
          <p class="truncate text-sm font-semibold">
            {{ option }}
          </p>

          <i
            v-if="option === modelValue"
            class="i-hugeicons-tick-02 size-5"
          />
        </div>

      </div>

    </transition>

  </div>

</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  options: string[]
}>()

const emit = defineEmits<{
  (action: 'update:modelValue', value: string): void
}>()

const isOpen = ref(false)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option: string) => {
  emit('update:modelValue', option)
  isOpen.value = false
}

const onKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    toggleDropdown()
  }
  else if (event.key === 'Escape') {
    isOpen.value = false
  }
  else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault()
    if (!isOpen.value) {
      isOpen.value = true
      return
    }

    const currentIndex = props.options.indexOf(props.modelValue)
    let newIndex = currentIndex

    if (event.key === 'ArrowDown') {
      newIndex = currentIndex < props.options.length - 1 ? currentIndex + 1 : 0
    }
    else {
      newIndex = currentIndex > 0 ? currentIndex - 1 : props.options.length - 1
    }

    emit('update:modelValue', props.options[newIndex])
  }
}
</script>
