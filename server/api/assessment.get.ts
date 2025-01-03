import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { CentralDatabase } from '~/utils/types/supabase/centralDatabase'

export default defineEventHandler(async (event) => {
  const serverClient = await serverSupabaseClient(event)
  const user = await serverSupabaseUser(event)
  const { assessmentId }: { assessmentId: string } = await getQuery(event)

  // Check if the user is authenticated
  if (!user) {
    return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized' }))
  }

  try {
    const { data, error } = await serverClient
      .from('central_database')
      .select('assessments')
      .eq('user_id', user?.id as string)
      .single()

    // Handle errors from Supabase
    if (error) {
      return sendError(event, createError({ statusCode: 500, statusMessage: error.message }))
    }

    const assessments = data.assessments as CentralDatabase['assessments']

    // Return the assessment
    return assessments.find(assessment => assessment?.id === assessmentId)
  }
  catch (error) {
    // Handle unexpected errors
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error', message: error as string }))
  }
})
