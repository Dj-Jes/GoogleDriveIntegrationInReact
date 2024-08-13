const API_KEY = 'AIzaSyAS_CrC2-YPEABCxi2Ax5RgitXa2v5PCRs';
const FOLDER_ID = '12yz1oOKP4sqkJdL8_JPXjMfkM8p98VDu';

const fetchSubfolders = async (setSubfolders) => {
    try {
        const response = await fetch(
            `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}' in parents and mimeType = 'application/vnd.google-apps.folder'&key=${API_KEY}`
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
