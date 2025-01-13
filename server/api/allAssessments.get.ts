import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Assessment } from '~/utils/types/supabase/customTypes'

export default defineEventHandler(async (event) => {
  const serverClient = await serverSupabaseClient(event)
  const user = await serverSupabaseUser(event)

  if (!user) {
    return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized' }))
  }

  try {
    const { data, error } = await serverClient
      .from('central_database')
      .select('assessments')
      .eq('user_id', user?.id as string)
      .single()

    if (error) {
      return sendError(event, createError({ statusCode: 500, statusMessage: error.message }))
    }

    const assessments = data.assessments?.reverse() as Assessment[]

    return assessments.map(assessment => ({
      id: assessment.id,
      name: assessment.name,
      date_time: assessment.date_time,
      duration_mins: assessment.duration_mins,
      status: assessment.status,
      number_of_candidates: assessment.candidates.length,
    }))
  }
  catch (error) {
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error', message: error as string }))
  }
})
