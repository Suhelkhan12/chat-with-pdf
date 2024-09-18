import { createRouteHandler } from "uploadthing/next";
import { pdfUploadRouter } from "./core";

export const { GET, POST } = createRouteHandler({
  router: pdfUploadRouter,
});
