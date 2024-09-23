"use client";
import { UploadDropzone } from "@/lib/uploadthing";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { ImSpinner3 } from "react-icons/im";

interface FileUploadTypes {
  setFile: (url: string) => void;
}

const FileUpload = ({ setFile }: FileUploadTypes) => {
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
            console.log("File: ", res);
            setFile(res[0].url);
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
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
