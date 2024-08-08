import React, { useEffect, useState } from 'react';

const API_KEY = 'AIzaSyAS_CrC2-YPEABCxi2Ax5RgitXa2v5PCRs'; // Replace with your API key
const FOLDER_ID = '13GWjEaqHUzAK130jn9fD2Q6ngO2mfECH'; // Replace with your folder ID
//const ImageUrl = 'https://drive.google.com/file/d/'
const ImageUrl = 'https://drive.google.com/uc?export=view&id='
//const EndUrl = '/view'

const GoogleDrive = ({ setImages }) => {
    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await fetch(`https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}' in parents and mimeType contains 'image/'&key=${API_KEY}`);
                if (!response.ok) {
                    throw new Error(`Error fetching files: ${response.statusText}`);
                }
                const data = await response.json();
                console.log('API Response:', data); // Log the response for debugging
                const files = data.files;
                const imageUrls = files.map(file => `${ImageUrl}${file.id}`);
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