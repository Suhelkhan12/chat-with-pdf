import axios from "axios";

export async function downloadPdf(url: string): Promise<Buffer> {
  const response = await axios.get(url, { responseType: "arraybuffer" });
  return response.data;
}
