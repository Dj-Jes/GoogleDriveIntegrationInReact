import React, { useEffect, useState } from 'react';

const API_KEY = 'AIzaSyAS_CrC2-YPEABCxi2Ax5RgitXa2v5PCRs'; // Replace with your API key

const GoogleDriveGetDocFile = ({ docFileId }) => {
    const [docContent, setDocContent] = useState('');

    useEffect(() => {
        const fetchDocContent = async () => {
            try {
                const response = await fetch(
                    `https://www.googleapis.com/drive/v3/files/${docFileId}/export?mimeType=text/html&key=${API_KEY}`
                );
                if (!response.ok) {
                    throw new Error(`Error fetching document: ${response.statusText}`);
                }
                const content = await response.text();
                setDocContent(content);
            } catch (error) {
                console.error('Error fetching document:', error);
            }
        };

        fetchDocContent();
    }, [docFileId]);

    return (
        <div className="doc-content" dangerouslySetInnerHTML={{ __html: docContent }} />
    );
};

export default GoogleDriveGetDocFile;
