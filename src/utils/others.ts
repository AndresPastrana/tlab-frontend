import {
  presentationDocumentExtensions,
  textDocumentExtensions,
} from "../const";

export const getServerUrl = () => {
  const hostname = window.location.origin;
  return hostname;
};

export function isTextDocumentExtension(extension: string) {
  return textDocumentExtensions.includes(extension);
}

export function isPresentationDocumentExtension(extension: string) {
  return presentationDocumentExtensions.includes(extension);
}
