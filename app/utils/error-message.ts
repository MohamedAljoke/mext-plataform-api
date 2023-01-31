export const defaultServerError = (): string => {
  return `Internal server error, Please try again later`;
};
export const missingFileError = (fileName: string): string => {
  return `Missing file: ${fileName}`;
};
