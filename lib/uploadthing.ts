import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

import { pdfUploadRouter } from "../app/api/uploadthing/core";
export const UploadButton = generateUploadButton<pdfUploadRouter>();
export const UploadDropzone = generateUploadDropzone<pdfUploadRouter>();
