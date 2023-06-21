import FileSaver from "file-saver";
import { surpriseMePrompts } from "../constants";

export function getRandomPrompt(prompt: string): string {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}

// Save Image as JPG
export async function downloadImage(_id: string | undefined, photo: string) {
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
}
// blob to dataURL
export function blobToBase64(blob: any) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}
