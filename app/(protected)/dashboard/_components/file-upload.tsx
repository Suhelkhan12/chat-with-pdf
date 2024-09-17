"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload, X } from "lucide-react";
import React, { useEffect, useState } from "react";

// Input Component
const FileInput = ({
  file,
  handleOnChange,
}: {
  file: File | null;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <Input
    type="file"
    accept=".pdf"
    onChange={handleOnChange}
    className={`flex-grow cursor-pointer ${file ? "" : " text-red-500"}`}
  />
);

// File Preview Component
const FilePreview = ({
  file,
  preview,
  handleRemoveFile,
}: {
  file: File | null;
  preview: string | null;
  handleRemoveFile: () => void;
}) => (
  <>
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-600 truncate flex-grow mr-2">
          {file?.name}
        </p>
        <Button
          variant="ghost"
          size="sm"
          aria-label="Remove file"
          onClick={handleRemoveFile}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      {preview && (
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border border-gray-200">
          <iframe
            src={preview}
            className="absolute inset-0 h-full w-full"
            title="PDF preview"
          />
        </div>
      )}
    </div>
  </>
);

// File Upload Logic Component
const FileUploadActions = ({
  file,
  handleUpload,
}: {
  file: File | null;
  handleUpload: () => void;
}) => (
  <Button onClick={handleUpload} disabled={!file}>
    <Upload className="mr-2 h-4 w-4" /> Upload
  </Button>
);

// Main FileUpload Component
const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      // implement file uploading logic to AWS S3
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
  };

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
      console.log(file);
    } else {
      setPreview(null);
    }
  }, [file]);

  return (
    <Card className="flex-grow h-full">
      <CardHeader>
        <CardTitle>Upload a New PDF</CardTitle>
        <CardDescription>
          Start a new conversation with a PDF document
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <FileInput file={file} handleOnChange={handleOnChange} />
          <FileUploadActions file={file} handleUpload={handleUpload} />
        </div>
        {file && (
          <FilePreview
            file={file}
            preview={preview}
            handleRemoveFile={handleRemoveFile}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default FileUpload;
