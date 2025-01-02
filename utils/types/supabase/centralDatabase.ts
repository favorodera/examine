type Assessment = {
  name: string
  date: string
  period_mins: number
  marks_obtainable: number
  remarks_meter: {
    pass_fail: {
      pass: number
      fail: number
    }
    lettering: {
      'a+': number
      'a': number
      'b': number
      'c': number
      'd': number
      'f': number
    }
  }
  status: 'upcoming' | 'ongoing' | 'ended'
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
    remark: string
  }[]
}

type CentralDatabase = {
  name: string
  email: string
  user_id: string
  assessments: Assessment[]
}

export type { Assessment, CentralDatabase }
