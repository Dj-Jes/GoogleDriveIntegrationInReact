import { API_KEY } from "../SharedRecources";

const googleDriveFetchImageIdsFromSubfolder = async (folderId) => {
    try {
        const response = await fetch(
            `https://www.googleapis.com/drive/v3/files?q='${folderId}' in parents and mimeType contains 'image/'&fields=files(id)&key=${API_KEY}`
        );
        if (!response.ok) {
            throw new Error(`Error fetching file IDs: ${response.statusText}`);
        }
        const data = await response.json();
        const imageIds = data.files.map((file) => file.id);
        return imageIds;
    } catch (error) {
        console.error('Error fetching file IDs:', error);
        return [];
    }
};

export default googleDriveFetchImageIdsFromSubfolder;
