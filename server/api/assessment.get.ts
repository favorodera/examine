import { serverSupabaseClient } from '#supabase/server'
import type { Assessment } from '~/utils/types/supabase/customTypes'

export default defineEventHandler(async (event) => {
  const serverClient = await serverSupabaseClient(event)
  const { assessmentId }: { assessmentId: string } = await getQuery(event)

  try {
    const { data, error } = await serverClient
      .from('central_database')
      .select('assessments')
      .single()

    if (error) {
      return sendError(event, createError({ statusCode: 500, statusMessage: error.message }))
    }

    const assessments = data.assessments as Assessment[]

    if (!assessmentId) {
      return sendError(event, createError({ statusCode: 500, statusMessage: 'Assessment Not Found' }))
    }

    const assessment = assessments.find(assessment => assessment.id === assessmentId)
    const questions = assessment?.questions.map(question => ({
      id: question.id,
      question: question.question,
      options: question.options,
    }))

    return {
      assessment: assessment,
      questions: questions,
    }
  }
  catch (error) {
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error', message: error as string }))
  }
})
