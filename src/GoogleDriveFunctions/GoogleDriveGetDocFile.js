import React, { useEffect, useState } from 'react';

const API_KEY = 'AIzaSyAS_CrC2-YPEABCxi2Ax5RgitXa2v5PCRs'; // Replace with your API key

const GoogleDriveGetDocFile = ({ docFileId }) => {
    const [sections, setSections] = useState([]);

    useEffect(() => {
        const fetchDocContent = async () => {
            try {
                const response = await fetch(
                    `https://www.googleapis.com/drive/v3/files/${docFileId}/export?mimeType=text/plain&key=${API_KEY}`
                );
                if (!response.ok) {
                    throw new Error(`Error fetching document: ${response.statusText}`);
                }
                const content = await response.text();

                // Split the content into sections based on custom markers
                const sectionMatches = content.split(/\[\[([A-Å]+)\]\]/);
                const sectionsArray = [];

                for (let i = 1; i < sectionMatches.length; i += 2) {
                    const type = sectionMatches[i].trim();
                    const content = sectionMatches[i + 1].trim();
                    sectionsArray.push({ type, content });
                }

                setSections(sectionsArray);
            } catch (error) {
                console.error('Error fetching document:', error);
            }
        };

        fetchDocContent();
    }, [docFileId]);

    return (
        <div className="doc-content">
            {sections.map((section, index) => (
                <section key={index}>
                    <h2>{section.type}</h2>
                    <p>{section.content}</p>
                </section>
            ))}
        </div>
    );
};

export default GoogleDriveGetDocFile;