export default async function (email: string) {
 
  await useSupabaseClient().auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: 'https://examine-app.vercel.app/confirm',
    },
  })
}
