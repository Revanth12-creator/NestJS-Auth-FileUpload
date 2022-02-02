import { DocsSize } from "./utils/filesize";
import { imageSize } from "./utils/filesize";
import { DocsFileFilter, imageFileFilter } from "./utils/filter";
import { DocsStorage } from "./utils/storage";
import { imageStorage } from "./utils/storage";
import { FileInterceptor } from "@nestjs/platform-express";

export const UploadImageInLocalInterceptor = FileInterceptor("imagefile", {
  limits: imageSize,
  storage: imageStorage,
  fileFilter: imageFileFilter,
});



export const UploadDocInLocalInterceptor = FileInterceptor("docfile", {
  limits: DocsSize,
  storage: DocsStorage,
  fileFilter: DocsFileFilter,
});
