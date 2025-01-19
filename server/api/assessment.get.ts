import { serverSupabaseClient } from '#supabase/server'
import type { Assessment } from '~/utils/types/supabase/customTypes'

export default defineEventHandler(async (event) => {
  const serverClient = await serverSupabaseClient(event)
  const { assessmentId, accessCode }: { assessmentId: string, accessCode: string } = await getQuery(event)

  if (!accessCode) {
    return sendError(event, createError({ statusCode: 401, statusMessage: 'Access Code not provided' }))
  }

  try {
    const { data: assessment, error } = await serverClient
      .from('assessments')
      .select(
        `
        access_code, assessment_id, assessment_name, date_time, duration_mins, marks_obtainable, status,
        questions(questions)
      `,
      )
      .eq('assessment_id', assessmentId)
      .eq('access_code', accessCode)
      .single()

    if (error) {
      return sendError(event, createError({ statusCode: 500, statusMessage: error.message }))
    }

    return assessment as Assessment

  }
  catch (error) {
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error', message: error as string }))
  }
})
