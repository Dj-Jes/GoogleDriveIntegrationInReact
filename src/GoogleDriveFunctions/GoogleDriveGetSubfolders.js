
import React, { useEffect } from 'react';

const API_KEY = 'AIzaSyAS_CrC2-YPEABCxi2Ax5RgitXa2v5PCRs'; // Replace with your API key
const FOLDER_ID = '12yz1oOKP4sqkJdL8_JPXjMfkM8p98VDu'; // Replace with your folder ID

const GoogleDriveGetSubfolders = ({ setSubfolders }) => {
    useEffect(() => {
        const fetchSubfolders = async () => {
            try {
                // Fetch subfolders from Google Drive
                const response = await fetch(
                    `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}' in parents and mimeType = 'application/vnd.google-apps.folder'&key=${API_KEY}`
                );
                if (!response.ok) {
                    throw new Error(`Error fetching subfolders: ${response.statusText}`);
                }
                const data = await response.json();

                // Log the response data
                console.log('API Response:', data);

                const subfolders = data.files;

                // Check if subfolders exist
                if (subfolders && subfolders.length > 0) {
                    const subfolderData = subfolders.map((folder) => ({
                        id: folder.id,
                        name: folder.name,
                    }));
                    console.log(subfolders.id)
                    setSubfolders(subfolderData);
                } else {
                    console.log('No subfolders found.');
                }
            } catch (error) {
                console.error('Error fetching subfolders:', error);
            }
        };

        fetchSubfolders();
    }, [setSubfolders]);

    return null;
};

export default GoogleDriveGetSubfolders;