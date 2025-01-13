export default async function () {
  useSupabaseClient().auth.signOut()
}
