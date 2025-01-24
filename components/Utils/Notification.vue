<template>

  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform opacity-0 scale-95"
    enter-to-class="transform opacity-100 scale-100"
    leave-active-class="transition duration-300 ease-in"
    leave-from-class="transform opacity-100 scale-100"
    leave-to-class="transform opacity-0 scale-95"
  >
    <div
      v-if="notification.state === 'open'"
      class="shadowed fixed inset-x-4 top-4 z-100 ml-auto max-w-100 min-h-14 min-w-74 flex items-start gap-2 rounded-lg bg-white p-4"
      :class="{
        'text-red-500': notification.type === 'error',
        'text-brand-green': notification.type === 'success',
      }"
    >
      <span
        :class=" notification.icon"
        class="size-6 shrink-0"
      />
    
      <p
        class="text-wrap text-base font-medium"
      >
        {{ notification.message }}
      </p>

    </div>
  </Transition>

</template>

<script lang="ts" setup>
const notification = useNotification()

watch(notification, () => {
  if (notification.state === 'open') {
    const notificationTimeout = setTimeout(() => {
      notification.state = 'closed'

      if (notification.action) {
        notification.action()
      }

      clearTimeout(notificationTimeout)
    }, notification.timeoutMs)
  }
})

</script>
