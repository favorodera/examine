import { serverSupabaseClient } from '#supabase/server'

type assessmentLogin = {
  name: string
  candidate_id: string
  candidate_email: string
  candidate_department: string
  submitted: boolean
  pass_code: string
}

export default defineEventHandler(async (event) => {
  const serverClient = await serverSupabaseClient(event)

  const {
    id,
    passCode,
    assessmentId,
  }: {
    assessmentId: string
    id: string
    passCode: string
  } = await getQuery(event)
    
  if (!id && !passCode && !assessmentId) {
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Bad Request', message: 'Invalid Request' }))
  }
    
  try {
    
    const { error, data } = await serverClient
      .from('candidates')
      .select('name, candidate_id, candidate_email, candidate_department, submitted, pass_code')
      .match({ candidate_id: id, pass_code: passCode, assessment_id: assessmentId })
      .single()
      
    if (error) {
      return sendError(event, createError({ statusCode: 500, statusMessage: error.message }))
    }

    return data as assessmentLogin
  }
  catch (error) {
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error', message: error as string }))
  }
  
})
