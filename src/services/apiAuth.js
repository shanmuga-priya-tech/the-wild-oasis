import supabase, { supabaseUrl } from "./supabase";

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

export async function updateCurrentUser({ password, fullName, avatar }) {
  //1)update the pwd or fullName
  let updateData;

  if (password) updateData = { password };

  if (fullName)
    updateData = {
      data: {
        fullName,
      },
    };

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;

  //2)upload user img
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);
  //3)update the userdata with the new user img
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });
  if (error2) throw new Error(error2.message);
  return updatedUser;
}
