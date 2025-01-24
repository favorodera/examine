import { serverSupabaseClient } from '#supabase/server'
import type { CandidateDetails } from '~/utils/types/supabase/customTypes'

export default defineEventHandler(async (event) => {
  const serverClient = await serverSupabaseClient(event)
  const { assessmentId, candidateId }: { assessmentId: string, candidateId: string } = await getQuery(event)

  try {
    const { data: candidateDetails, error } = await serverClient
      .from('candidates')
      .select(`
        candidate_id, name, score, time_spent_mins, remark, candidate_email, answers, candidate_department,
        assessments (
          duration_mins, marks_obtainable, assessment_name, status, date_time,
          correct_answers(correct_answers),
          questions (
            questions
          )
        )
      `)
      .match({ assessment_id: assessmentId, candidate_id: candidateId })
      .single()
      
    if (error) {
      return sendError(event, createError({ statusCode: 500, statusMessage: error.message }))
    }

    return candidateDetails as CandidateDetails
  }
  catch (error) {
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error', message: error as string }))
  }
})
