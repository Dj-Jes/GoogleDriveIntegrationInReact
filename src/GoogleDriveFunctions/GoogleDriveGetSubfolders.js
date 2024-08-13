import {FOLDER_ID_TO_SUB_FOLDERS, API_KEY} from "../SharedRecources";


const fetchSubfolders = async (setSubfolders) => {
    try {
        const response = await fetch(
            `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID_TO_SUB_FOLDERS}' in parents and mimeType = 'application/vnd.google-apps.folder'&key=${API_KEY}`
        );
        if (!response.ok) {
            throw new Error(`Error fetching subfolders: ${response.statusText}`);
        }
        const data = await response.json();
        const subfolders = data.files;

        if (subfolders && subfolders.length > 0) {
            const subfolderData = subfolders.map((folder) => ({
                id: folder.id,
                name: folder.name,
            }));
            setSubfolders(subfolderData);
        } else {
            console.log('No subfolders found.');
        }
    } catch (error) {
        console.error('Error fetching subfolders:', error);
    }
};

export default fetchSubfolders;
