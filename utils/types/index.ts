type ModalsState = {
  newAssessment: boolean
  newQuestion: boolean
  submitAssessment: boolean
  assessmentDelete: boolean
}

type Notifications = {
  message: string | undefined
  icon: string | undefined
  timeoutMs: number | undefined
  type: 'error' | 'success' | undefined
  state: 'open' | 'closed'
  action?: () => void
}

export type { ModalsState, Notifications }
