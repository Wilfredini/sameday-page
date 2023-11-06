import supabase, { supabaseUrl } from "./supabase";

export async function getQuotes() {
  const { data, error } = await supabase.from("quotes").select("*");

  if (error) {
    console.error(error);
    throw new Error("Nacenění nelze načíst");
  }

  return data;
}

export async function deleteQuote(id) {
  const { data, error } = await supabase.from("quotes").delete().eq("id", id);

  if (error) {
    console.error(id);
    throw new Error("Nacenění nelze smazat");
  }

  return data;
}

export async function createQuote(newQuote) {
  const imageName = `${Math.random()}-${newQuote.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/customersBrand/${imageName}`;

  //https://wobjcazvecgdprslnehj.supabase.co/storage/v1/object/public/customersBrand/download-1.png

  // 1. Create Quote
  const { data, error } = await supabase
    .from("quotes")
    .insert([{ ...newQuote, image: imagePath }]);

  if (error) {
    console.error(error);
    throw new Error("Nacenění nelze vytvořit");
  }

  // 2. Upload Image
  const { error: storageError } = await supabase.storage
    .from("customersBrand")
    .upload(imageName, newQuote.image);

  // 3. Delete the quote if there was an error
  if (storageError) {
    await supabase.from("quotes").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("Logo nemohlo být uploadováno a nebylo vytvořeno");
  } else;

  return data;
}
