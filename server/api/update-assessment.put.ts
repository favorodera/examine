import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {

  const {
    name,
    marksObtainable,
    durationMins,
    passMark,
    dateTime,
    assessmentId,
  }:
  { name: string
    dateTime: string
    durationMins: number
    marksObtainable: number
    passMark: number
    assessmentId: string
    
  }
  = await readBody(event)

  const instructor = await serverSupabaseUser(event)
  const serverClient = await serverSupabaseClient(event)

  if (!instructor) {
    return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized' }))
  }

  try {
    const { error } = await serverClient
      .from('assessments')
      .update(
        {
          assessment_name: name,
          date_time: dateTime.split('T')[0] + ' ' + dateTime.split('T')[1] + ':00' + '+00',
          duration_mins: durationMins,
          marks_obtainable: marksObtainable,
          pass_mark: passMark,
          status: 'upcoming',
        },
      )
      .match({
        instructor_id: instructor?.id as string,
        assessment_id: assessmentId,
      })

    if (error) {
      return sendError(event, createError({ statusCode: 500, statusMessage: error.message }))
    }
      
    return 'Assessment Updated Successfully'

  }
  catch (error) {
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error', message: error as string }))
  }

})
