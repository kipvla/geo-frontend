function convertBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

export default async function formatImages(arrayOfImages) {
  const formattedArrayOfImages = [];
  for (let i = 0; i < arrayOfImages.length; i++) {
    const currentImageFile = arrayOfImages[i];
    const base64 = await convertBase64(currentImageFile);
    formattedArrayOfImages.push({
      data: base64,
      mime: currentImageFile.type,
    });
  }
  return formattedArrayOfImages;
}
