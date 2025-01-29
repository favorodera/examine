import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const serverClient = await serverSupabaseClient(event)
  const instructor = await serverSupabaseUser(event)
  const { assessmentId }: { assessmentId: string } = await getQuery(event)

  if (!instructor) {
    return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized' }))
  }

  try {
    const { error } = await serverClient
      .from('assessments')
      .delete()
      .match({ assessment_id: assessmentId, instructor_id: instructor.id })

    if (error) {
      return sendError(event, createError({
        statusCode: Number(error.code),
        cause: error.cause,
        statusMessage: error.message,
        message: error.message,
        stack: error.stack,
      }))
    }

    return 'Assessment Deleted Successfully'
  }
  catch (error) {
    return sendError(event, error as Error)
  }
})
