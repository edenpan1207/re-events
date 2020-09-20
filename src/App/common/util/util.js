export const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const getFileExtension = (fileName) => {
  return fileName.slice((fileName.lastIndexOf('.') - 1 >>> 0) + 2);
}