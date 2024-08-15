import {API_KEY} from "../SharedRecources";

const googleDriveFetchImagesByIds = async (imageIds) => {
    try {
        const imagePromises = imageIds.map(async (id) => {
            const downloadUrl = `https://www.googleapis.com/drive/v3/files/${id}?alt=media&key=${API_KEY}`;
            const fileResponse = await fetch(downloadUrl);
            if (!fileResponse.ok) {
                throw new Error(`Failed to download image: ${id}`);
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
        return imageUrls;
    } catch (error) {
        console.error('Error fetching images:', error);
        return [];
    }
};

export default googleDriveFetchImagesByIds;
