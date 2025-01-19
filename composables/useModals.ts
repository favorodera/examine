const modalsState = reactive<ModalsState>({
  newAssessment: false,
  newQuestion: false,
  assessmentRegistration: false,
})

export function useModalsState() {
  return modalsState
}

export function useModals(modal: keyof ModalsState, action: 'open' | 'close') {
  if (action === 'open') {
    modalsState[modal] = true
  }
  else {
    modalsState[modal] = false
  }
}
