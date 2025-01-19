export default async function (email: string) {
 
  await useSupabaseClient().auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: 'http://localhost:3000/confirm',
    },
  })
}
