import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createCabin(newcabin) {
  const imageName = `${Math.random()}-${newcabin.image.name}`.replaceAll(
    "/",
    ""
  ); //becoz if there is a / in the filrname it will create a new folder for it to avoid that we replace all / with emtptystr

  //supabaseurl+storagebucket+imageName
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1)create cabin
  //apidocs->insert Row
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newcabin, image: imagePath }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }
  //2)upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newcabin.image);

  //3.delete the cabin if there was an error uploading corresponding image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  //code from APIdocs->delete row
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }
  return data;
}
