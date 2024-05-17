import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

//reusing this function for both editing and creating a cabin
export async function createEditCabin(newcabin, id) {
  //we check if the image is edit or not by chceking its pathif it is there we use that one if not we createed a new imagepath
  //if there is already an image it should start with supabaseUrl
  const hasImagePath = newcabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newcabin.image.name}`.replaceAll(
    "/",
    ""
  ); //becoz if there is a "/" in the filename it will create a new folder for it to avoid that we replace all / with emtptystr

  const imagePath = hasImagePath
    ? newcabin.image
    : //supabaseurl+storagebucket+imageName
      `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1.create / edit cabin
  let query = supabase.from("cabins");
  //A)create cabin
  //apidocs->insert Row
  if (!id) query = query.insert([{ ...newcabin, image: imagePath }]);

  //B)edit cabin
  if (id) query = query.update({ ...newcabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single(); //usually the data wont be available as soon the cabin is created so we use .select().single()is used to get the data immediately inorder to return it

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }
  //2)upload image
  //if image is already exists we will never upload the same image again in the supabase
  if (hasImagePath) return data;

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
