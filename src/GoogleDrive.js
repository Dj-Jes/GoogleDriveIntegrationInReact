import React, { useEffect } from 'react';

const API_KEY = 'AIzaSyAS_CrC2-YPEABCxi2Ax5RgitXa2v5PCRs'; // Replace with your API key
const FOLDER_ID = '1P9cxR-aq2yVkdnJfqQnRlyHkzW4wx8QH'; // Replace with your folder ID

const GoogleDrive = ({ setImages }) => {
    useEffect(() => {
        const fetchFiles = async () => {
            try {
                // Fetch files from Google Drive folder
                const response = await fetch(
                    `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}' in parents and mimeType contains 'image/'&key=${API_KEY}`
                );
                if (!response.ok) {
                    throw new Error(`Error fetching files: ${response.statusText}`);
                }
                const data = await response.json();
                const files = data.files;

                // Convert each file to base64 URL
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

        fetchFiles();
    }, [setImages]);

    return null;
};

export default GoogleDrive;
