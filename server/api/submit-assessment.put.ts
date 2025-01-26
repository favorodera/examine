import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const serverClient = await serverSupabaseClient(event)

  const {
    id,
    email,
    selectedOptions,
    assessmentId,
    passCode,
  }: {
    assessmentId: string
    id: string
    email: string
    selectedOptions: string[]
    passCode: string
  } = await readBody(event)
    
  if (!id && !email && !selectedOptions && !assessmentId && !passCode) {
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Bad Request', message: 'Invalid Request' }))
  }
    
  try {
    const { data, error: fetchError } = await serverClient
      .from('candidates')
      .select('answers,submitted')
      .match({ candidate_id: id, candidate_email: email, assessment_id: assessmentId, pass_code: passCode })
      .single()
    
    if (fetchError) {
      return sendError(event, createError({ statusCode: 500, statusMessage: fetchError.message }))
    }
    
    const answers = data?.answers

    answers.push(...selectedOptions)

    const { error } = await serverClient
      .from('candidates')
      .update({ answers: answers, submitted: true })
      .match({ candidate_id: id, candidate_email: email, assessment_id: assessmentId, pass_code: passCode })
    
    if (error) {
      return sendError(event, createError({ statusCode: 500, statusMessage: error.message }))
    }

    return 'Assessment submitted successfully'
  }
  catch (error) {
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error', message: error as string }))
  }
  
})
