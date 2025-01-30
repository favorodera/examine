export default async function () {

  await useSupabaseClient().auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000/confirm',
        
    },
  })

}
