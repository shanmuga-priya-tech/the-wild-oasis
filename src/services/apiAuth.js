import supabase from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  //code from authentication->usermanagement->login
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  }); //as soon as the user logged in supabase will automatically store the token and user info in the local storage along ith the role:"authenticated" we then use this for further operations.

  if (error) throw new Error(error.message);

  return data;
}

//whenever the user reloads the page we need to refetch the data again inorder to  check still the user exists and authenticated
export async function getCurrentUser() {
  //checking whether the user is logged in
  const { data: session } = await supabase.auth.getSession(); //this will get the data stored in local storage

  if (!session.session) return null;

  //refetching the user data from supabase
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
