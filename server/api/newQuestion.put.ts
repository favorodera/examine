import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Assessment } from '~/utils/types/supabase/customTypes'

export default defineEventHandler(async (event) => {

  const {
    assessmentId,
    question,
    options,
    correctOption,
    marksObtainable,
  }:
  {
    assessmentId: string
    question: string
    options: {
      [key: string]: string
    }
    correctOption: string
    marksObtainable: number
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

    const assessment = assessments.find(assessment => assessment?.id === assessmentId)

    if (!assessment) {
      return sendError(event, createError({ statusCode: 404, statusMessage: 'Assessment not found' }))
    }

    const newQuestion: Assessment['questions'][0] = {
      id: assessment.questions.length + 1,
      question,
      options,
      correct_option: correctOption,
      marks_obtainable: marksObtainable,
    }

    assessment.questions.push(newQuestion)

    const { error: updateError } = await serverClient
      .from('central_database')
      .update({ assessments })
      .eq('user_id', user?.id as string)
      .single()

    // Handle errors from Supabase
    if (updateError) {
      return sendError(event, createError({ statusCode: 500, statusMessage: updateError.message }))
    }
    else {
      return {
        message: 'Question added successfully',
      }
    }
  }
  catch (error) {
    // Handle unexpected errors
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error', message: error as string }))
  }

})
