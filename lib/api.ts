import axios from "axios";

type PostPdfProps = {
  file_key: string;
  file_name: string;
};
export async function postPdf({ file_key, file_name }: PostPdfProps) {
  const response = await axios.post("/api/create-chat", {
    file_key,
    file_name,
  });
  return response.data;
}
