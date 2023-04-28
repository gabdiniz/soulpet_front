import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./config";

export async function uploadFotoPet(imagem) {
  const filename = imagem.name;
  const imageRef = ref(storage, `pets/${filename}`);
  const result = await uploadBytes(imageRef, imagem);
  return await getDownloadURL(result.ref);
}