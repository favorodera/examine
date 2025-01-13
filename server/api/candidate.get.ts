import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Assessment } from '~/utils/types/supabase/customTypes'

export default defineEventHandler(async (event) => {
  const serverClient = await serverSupabaseClient(event)
  const user = await serverSupabaseUser(event)
  const { assessmentId, candidateId }: { assessmentId: string, candidateId: string } = await getQuery(event)

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

    const assessments = data.assessments as Assessment[]
    const assessment = assessments.find(assessment => assessment?.id === assessmentId)

    return {
      assessment: {
        id: assessment?.id,
        name: assessment?.name,
        date_time: assessment?.date_time,
        duration_mins: assessment?.duration_mins,
        marks_obtainable: assessment?.marks_obtainable,
        pass_mark: assessment?.pass_mark,
        status: assessment?.status,
        questions: assessment?.questions,
      },
      candidate: assessment?.candidates.find(candidate => candidate.id === candidateId),
    }
  }
  catch (error) {
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error', message: error as string }))
  }
})
