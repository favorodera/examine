import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { AssessmentDetails } from '~/utils/types/supabase/customTypes'

export default defineEventHandler(async (event) => {
  const serverClient = await serverSupabaseClient(event)
  const instructor = await serverSupabaseUser(event)
  const { assessmentId }: { assessmentId: string } = await getQuery(event)

  if (!instructor) {
    return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized' }))
  }

  try {
    const { data: assessmentDetails, error } = await serverClient
      .from('assessments')
      .select(
        `access_code, assessment_id, assessment_name, marks_obtainable, pass_mark, date_time, duration_mins, status,
        candidates(candidate_id, name, score, remark, time_spent_mins, candidate_email, candidate_department),
        questions(questions),
        correct_answers(correct_answers)
        `,
      )
      .eq('instructor_id', instructor?.id as string)
      .eq('assessment_id', assessmentId)
      .single()

    if (error) {
      return sendError(event, createError({ statusCode: 500, statusMessage: error.message }))
    }

    return assessmentDetails as AssessmentDetails
  }
  catch (error) {
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error', message: error as string }))
  }
})
