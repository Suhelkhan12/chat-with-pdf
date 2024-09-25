"use client";

import { useState } from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { postPdf } from "@/lib/api";
import { twMerge } from "tailwind-merge";
import { ImSpinner3 } from "react-icons/im";
import { toast } from "sonner";

interface FileUploadTypes {
  setFile: (url: string) => void;
}

const FileUpload = ({ setFile }: FileUploadTypes) => {
  const { mutate } = useMutation({
    mutationFn: postPdf,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (err) => {
      toast.error(`${err} 💥`);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload file</CardTitle>
        <CardDescription>Files should be less tha 4MB</CardDescription>
      </CardHeader>
      <CardContent>
        <UploadDropzone
          endpoint="pdfUploader"
          onClientUploadComplete={(res) => {
            if (res) {
              mutate({
                file_key: res[0].key,
                file_name: res[0].name,
              });
              console.log("uploaded file ", res);
              setFile(res[0].url);
            }
          }}
          onUploadError={() => {
            toast.error("File too large 💥");
          }}
          className=" ut-label:text-base ut-label:font-semibold ut-allowed-content:ut-uploading:text-red-300 ut-button:bg-neutral-900 ut-label:cursor-pointer ut-upload-icon:cursor-pointer ut-button:cursor-pointer"
          config={{ cn: twMerge }}
        />
      </CardContent>
    </Card>
  );
};

const FilePreview = ({ fileUrl }: { fileUrl: string }) => {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Uploaded file</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <ImSpinner3 className="siz-4 mx-auto animate-spin" />}
        <iframe
          src={fileUrl}
          width={"100%"}
          height={"600px"}
          className="rounded-lg"
          title="Pdf viewer"
          onLoad={() => setLoading(false)}
        />
      </CardContent>
    </Card>
  );
};

const FileUploader = () => {
  const [file, setFile] = useState<string | null>(null);
  return (
    <>
      {!file ? (
        <FileUpload setFile={setFile} />
      ) : (
        <FilePreview fileUrl={file} />
      )}
    </>
  );
};

export default FileUploader;
