import supabase from "./supabase";

export async function login({ email, password }) {
  //code from authentication->usermanagement->login
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);

  return data;
}
