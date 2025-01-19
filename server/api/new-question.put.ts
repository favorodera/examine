import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {

  const {
    assessmentId,
    question,
    options,
    correctAnswer,
    marksObtainable,
  }:
  {
    assessmentId: string
    question: string
    options: {
      [key: string]: string
    }
    correctAnswer: string
    marksObtainable: number
  }
  = await readBody(event)

  const instructor = await serverSupabaseUser(event)
  const serverClient = await serverSupabaseClient(event)

  if (!instructor) {
    return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized' }))
  }

  try {
    const { error: questionsFetchError, data: questions } = await serverClient
      .from('questions')
      .select('questions')
      .eq('assessment_id', assessmentId)
      .eq('instructor_id', instructor?.id)
      .single()

    const { error: correctAnswersFetchError, data: correctAnswers } = await serverClient
      .from('correct_answers')
      .select('correct_answers')
      .eq('assessment_id', assessmentId)
      .eq('instructor_id', instructor?.id)
      .single()

    if (questionsFetchError || correctAnswersFetchError) {
      return sendError(event, createError({
        statusCode: 500, statusMessage: questionsFetchError?.message || correctAnswersFetchError?.message,
      }))
    }

    const newQuestion = {
      id: questions.questions.length + 1,
      question,
      options,
      marks_obtainable: marksObtainable,
    }

    const newCorrectAnswer = correctAnswer

    const updatedQuestions = [...questions.questions, newQuestion]
    const updatedCorrectAnswers = [...correctAnswers.correct_answers, newCorrectAnswer]

    const { error: questionsUpdateError } = await serverClient
      .from('questions')
      .update({ questions: updatedQuestions })
      .eq('assessment_id', assessmentId)
      .eq('instructor_id', instructor?.id)

    const { error: correctAnswersUpdateError } = await serverClient
      .from('correct_answers')
      .update({ correct_answers: updatedCorrectAnswers })
      .eq('assessment_id', assessmentId)
      .eq('instructor_id', instructor?.id)
    
    if (questionsUpdateError || correctAnswersUpdateError) {
      return sendError(event, createError({
        statusCode: 500, statusMessage: questionsUpdateError?.message || correctAnswersUpdateError?.message,
      }))
    }
    else {
      return {
        message: 'Question Added Successfully',
      }
    }
  }
  catch (error) {
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error', message: error as string }))
  }

})
