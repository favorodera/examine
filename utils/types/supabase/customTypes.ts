type Candidate = {
  name: string
  id: string
  score: number
  time_spent_mins: number
  remark: 'pass' | 'fail'
  answers: Answer[]
}

type Question = {
  id: number
  question: string
  options: {
    [key: string]: string
  }
  correct_option: string
  marks_obtainable: number
}

type Answer = {
  question_id: number
  option_selected: string
  status: 'correct' | 'incorrect'
}

type Assessment = {
  name: string
  date_time: string
  id: string
  duration_mins: number
  marks_obtainable: number
  pass_mark: number
  status: 'upcoming' | 'ongoing' | 'completed'
  access_code: string
  questions: Question[]
  candidates: Candidate[]
}

type CentralDatabase = {
  name: string
  email: string
  user_id: string
  assessments: Assessment[]
}

export type { Assessment, CentralDatabase, Candidate, Question, Answer }
