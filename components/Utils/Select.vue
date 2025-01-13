<template>

  <div
    class="relative max-w-40 w-full outline-none"
    tabindex="0"
    @keydown="onKeyDown"
    @blur="isOpen = false"
  >
  
    <div
      class="selected-value flex cursor-pointer items-center justify-between b b-brand-gray rounded-md bg-white p-2 text-sm font-normal"
      @click="toggleDropdown"
    >
      <span class="truncate font-semibold">{{ modelValue }}</span>
  
      <i
        class="i-hugeicons-arrow-down-01 size-5 text-brand-gray duration-200 ease property-transform"
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
        class="absolute z-1 mt-1 w-full flex flex-col gap-2 b b-brand-gray rounded-md bg-white p-2"
      >
  
        <div
          v-for="option in options"
          :key="option"
          class="flex cursor-pointer items-center justify-between gap-2 rounded-md p-1.5 transition-colors hover:bg-brand-gray/50"
          :class="{ 'bg-brand-gray/70': option === modelValue }"
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
