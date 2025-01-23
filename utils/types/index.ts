type ModalsState = {
  newAssessment: boolean
  newQuestion: boolean
  assessmentRegistration: boolean
  submitAssessment: boolean
}

type Notifications = {
  message: string | undefined
  icon: string | undefined
  timeoutMs: number | undefined
  type: 'error' | 'success' | undefined
  state: 'open' | 'closed'
}

export type { ModalsState, Notifications }
