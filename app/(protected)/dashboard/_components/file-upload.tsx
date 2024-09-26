"use client";

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
import { toast } from "sonner";

const FileUpload = () => {
  const { mutate } = useMutation({
    mutationFn: postPdf,
    onSuccess: (data) => {
      console.log(data);
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
        <CardDescription>Files should be less than 4MB</CardDescription>
      </CardHeader>
      <CardContent>
        <UploadDropzone
          endpoint="pdfUploader"
          onClientUploadComplete={(res) => {
            toast.success("Pdf upload successfull 🎊");
            if (res) {
              mutate({
                file_key: res[0].key,
                file_name: res[0].name,
              });
            }
          }}
          onUploadError={() => {
            toast.error("File too large 💥");
          }}
          className="ut-label:text-base ut-label:font-semibold ut-allowed-content:ut-uploading:text-red-300 ut-button:bg-neutral-900 ut-label:cursor-pointer ut-upload-icon:cursor-pointer ut-button:cursor-pointer"
          config={{ cn: twMerge }}
        />
      </CardContent>
    </Card>
  );
};

const FileUploader = () => {
  return <FileUpload />;
};

export default FileUploader;
