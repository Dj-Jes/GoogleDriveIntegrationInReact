import {API_KEY} from "../SharedRecources";

const fetchImagesFromSubfolder = async (folderId, setImages) => {
    try {
        const response = await fetch(
            `https://www.googleapis.com/drive/v3/files?q='${folderId}' in parents and mimeType contains 'image/'&key=${API_KEY}`
        );
        if (!response.ok) {
            throw new Error(`Error fetching files: ${response.statusText}`);
        }
        const data = await response.json();
        const files = data.files;

        const imagePromises = files.map(async (file) => {
            const downloadUrl = `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media&key=${API_KEY}`;
            const fileResponse = await fetch(downloadUrl);
            if (!fileResponse.ok) {
                throw new Error(`Failed to download image: ${file.id}`);
            }
            const blob = await fileResponse.blob();
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        });

        const imageUrls = await Promise.all(imagePromises);
        setImages(imageUrls);
    } catch (error) {
        console.error('Error fetching files:', error);
    }
};

export default fetchImagesFromSubfolder;
