<template>

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

</template>

<script lang="ts" setup>
const notification = useNotification()

watch(notification, () => {
  if (notification.state === 'open') {
    const notificationTimeout = setTimeout(() => {
      notification.state = 'closed'

      clearTimeout(notificationTimeout)
    }, notification.timeoutMs)
  }
})

</script>
