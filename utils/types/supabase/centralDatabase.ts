type Assessment = {
  name: string
  date_time: string
  id: string
  duration_mins: number
  marks_obtainable: number
  remarks_meter: {
    pass: number
    fail: number
  }
  status: 'upcoming' | 'ongoing' | 'completed'
  access_code: string
  questions: {
    question: string
    answer_mode: string
    options: {
      [key: string]: string
    }
  }[]
  candidates: {
    name: string
    email: string
    score: number
    time_spent_mins: number
    remark: 'pass' | 'fail'
  }[]
}

type CentralDatabase = {
  name: string
  email: string
  user_id: string
  assessments: Assessment[]
}

export type { Assessment, CentralDatabase }
