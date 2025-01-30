export default async function () {

  await useSupabaseClient().auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'https://examine-app.vercel.app/confirm',
        
    },
  })

}
