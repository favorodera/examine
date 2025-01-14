import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Assessment } from '~/utils/types/supabase/customTypes'

export default defineEventHandler(async (event) => {

  const {
    name,
    accessCode,
    dateTime,
    duration,
    marksObtainable,
    passMark,
  }:
  { name: string
    accessCode: string
    dateTime: string
    duration: number
    marksObtainable: number
    passMark: number
    
  }
  = await readBody(event)

  const user = await serverSupabaseUser(event)
  const serverClient = await serverSupabaseClient(event)

  if (!user) {
    return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized' }))
  }

  try {
    const { data, error: fetchError } = await serverClient
      .from('central_database')
      .select('assessments')
      .eq('user_id', user?.id as string)
      .single()

    if (fetchError) {
      return sendError(event, createError({ statusCode: 500, statusMessage: fetchError.message }))
    }

    const assessments = data.assessments as Assessment[]

    const newAssessment: Assessment = {
      name,
      id: name.replace(/\s+/g, '-').toLowerCase(),
      access_code: accessCode,
      date_time: `${dateTime.split('T')[0].split('-')[2]}-${dateTime.split('T')[0].split('-')[1]}-${dateTime.split('T')[0].split('-')[0]}T${dateTime.split('T')[1].split('.')[0]}`,
      duration_mins: duration,
      marks_obtainable: marksObtainable,
      pass_mark: passMark,
      status: 'upcoming',
      questions: [],
      candidates: [],
    }

    assessments.push(newAssessment)

    const { error: updateError } = await serverClient
      .from('central_database')
      .update({ assessments })
      .eq('user_id', user?.id as string)
      .single()

    // Handle errors from Supabase
    if (updateError) {
      return sendError(event, createError({ statusCode: 500, statusMessage: updateError.message }))
    }

    return {
      message: 'Assessment created successfully',
    }
  }
  catch (error) {
    // Handle unexpected errors
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error', message: error as string }))
  }

})
