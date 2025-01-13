const createUpdateState = reactive<CreateUpdateState>({
  assessment: false,
  question: false,
})

export default function () {
  return createUpdateState
}
