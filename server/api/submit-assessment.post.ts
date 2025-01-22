import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const serverClient = await serverSupabaseClient(event)

  const {
    name,
    id,
    department,
    email,
    selectedOptions,
    assessmentId,
    instructorId,
  }: {
    assessmentId: string
    name: string
    id: string
    department: string
    email: string
    selectedOptions: string[]
    instructorId: string
  } = await readBody(event)
    
  if (!name && !id && !department && !email && !selectedOptions && !assessmentId) {
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Bad Request', message: 'Invalid Request' }))
  }
    
  try {
      
    const { error } = await serverClient
      .from('candidates')
      .insert({
        candidate_id: id,
        instructor_id: instructorId,
        candidate_department: department,
        candidate_email: email,
        answers: selectedOptions,
        assessment_id: assessmentId,
        name: name,
      })
      
    if (error) {
      return sendError(event, createError({ statusCode: 500, statusMessage: error.message }))
    }
  }
  catch (error) {
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error', message: error as string }))
  }
  
})
