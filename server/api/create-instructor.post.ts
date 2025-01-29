import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const serverClient = await serverSupabaseClient(event)
  const instructor = await serverSupabaseUser(event)

  if (!instructor) {
    return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized' }))
  }

  try {
    const { error } = await serverClient
      .from('instructors')
      .upsert({ user_id: instructor.id, name: instructor.user_metadata.name ?? '', email: instructor.user_metadata.email }, { onConflict: 'user_id' })

    if (error) {
      return sendError(event, createError({ statusCode: 500, statusMessage: error.message }))
    }

    return 'Instructor Created Successfully'
  }
  catch (error) {
    if (error instanceof Error) {
      return sendError(event, createError({ statusCode: 500, statusMessage: error.message }))
    }
  }
})
