import supabase from "./supabase";

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
  const { data, error } = await supabase.from("quotes").insert([newQuote]);

  if (error) {
    console.error(error);
    throw new Error("Nacenění nelze vytvořit");
  }

  return data;
}
