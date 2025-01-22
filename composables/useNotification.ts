const notification = reactive<Notifications>({
  message: undefined,
  icon: undefined,
  timeoutMs: undefined,
  state: 'closed',
  type: undefined,
})

export function useNotification() {
  return notification
}

export function createNotification(message: string, icon: string, timeoutMs: number, type: 'warning' | 'error' | 'success') {
  
  notification.message = message
  notification.icon = icon
  notification.timeoutMs = timeoutMs
  notification.type = type
  notification.state = 'open'
  
}
