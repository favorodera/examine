import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const serverClient = await serverSupabaseClient(event)

  const {
    name,
    id,
    department,
    email,
    assessmentId,
    instructorId,
  }: {
    assessmentId: string
    name: string
    id: string
    department: string
    email: string
    instructorId: string
  } = await readBody(event)
    
  if (!name && !id && !department && !email && !instructorId && !assessmentId) {
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Bad Request', message: 'Invalid Request' }))
  }
    
  try {
    
    const { error, data } = await serverClient
      .from('candidates')
      .insert({
        candidate_id: id,
        instructor_id: instructorId,
        candidate_department: department,
        candidate_email: email,
        answers: [],
        score: 0,
        assessment_id: assessmentId,
        name: name,
      })
      .select('name, candidate_id, candidate_email, candidate_department, pass_code')
      .single()
      
    if (error) {
      return sendError(event, createError({ statusCode: 500, statusMessage: error.message }))
    }

    return data
  }
  catch (error) {
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error', message: error as string }))
  }
  
})
