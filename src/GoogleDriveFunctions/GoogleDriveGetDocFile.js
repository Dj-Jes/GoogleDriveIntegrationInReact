import React, { useEffect, useState } from 'react';
import { API_KEY } from "../SharedRecources";

const GoogleDriveGetDocFile = ({ docFileId }) => {
    const [htmlContent, setHtmlContent] = useState('');
    const [error, setError] = useState(null);

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
                setHtmlContent(content);
            } catch (error) {
                console.error('Error fetching document:', error);
                setError('Failed to load document content.');
            }
        };

        fetchDocContent();
    }, [docFileId]);

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="doc-content">
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
    );
};

export default GoogleDriveGetDocFile;
