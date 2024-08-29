import { setupWorker } from "msw/browser";
import {
  authHandlers,
  fileHandlers,
  postHandlers,
  userHandlers,
} from "./domain";

export const worker = setupWorker(
  ...fileHandlers,
  ...authHandlers,
  ...userHandlers,
  ...postHandlers
);
