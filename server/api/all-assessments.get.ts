import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { AllAssessments } from '~/utils/types/supabase/customTypes'

export default defineEventHandler(async (event) => {
  const serverClient = await serverSupabaseClient(event)
  const instructor = await serverSupabaseUser(event)

  if (!instructor) {
    return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized' }))
  }

  try {
    const { data: assessments, error } = await serverClient
      .from('assessments')
      .select(
        `assessment_id, assessment_name, date_time, duration_mins, status, candidates(count)`,
      )
      .eq('instructor_id', instructor?.id as string)

    if (error) {
      return sendError(event, createError({ statusCode: 500, statusMessage: error.message }))
    }

    return assessments as AllAssessments[]
  }
  catch (error) {
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error', message: error as string }))
  }
})
