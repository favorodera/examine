type AllAssessments = {
  assessment_id: string
  assessment_name: string
  date_time: string
  duration_mins: number
  status: string | null
  candidates: {
    count: number
  }[]
}

type AssessmentDetails = {
  access_code: string
  assessment_id: string
  assessment_name: string
  marks_obtainable: number
  pass_mark: number
  date_time: string
  duration_mins: number
  status: string | null
  candidates: {
    candidate_id: string
    name: string
    score: number
    remark: string | null
    time_spent_mins: number
    candidate_email: string
    candidate_department: string
  }[]
  questions: {
    questions: {
      id: number
      question: string
      options: {
        [key: string]: string
      }
      marks_obtainable: number
    }[]
  }
  correct_answers: {
    correct_answers: string[]
  }
}

type CandidateDetails = {
  candidate_id: string
  name: string
  score: number
  time_spent_mins: number
  remark: string
  candidate_email: string
  candidate_department: string
  answers: string[]
  assessments: {
    status: string
    date_time: string
    duration_mins: number
    assessment_name: string
    marks_obtainable: number
    questions: {
      questions: {
        id: number
        options: {
          [key: string]: string
        }
        question: string
        marks_obtainable: number

      }[]
    }
    correct_answers: {
      correct_answers: string[]
    }
    
  }
}

type Assessment = {
  access_code: string
  assessment_id: string
  assessment_name: string
  date_time: string
  duration_mins: number
  marks_obtainable: number
  status: string
  questions: {
    questions: {
      id: number
      question: string
      options: {
        [key: string]: string
      }
      marks_obtainable: number
    }[]
  }
}

export type { AllAssessments, AssessmentDetails, CandidateDetails, Assessment }
