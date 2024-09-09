import React, { useEffect, useState } from 'react';
import { API_KEY } from "../SharedRecources";
import googleDriveFetchImagesByIds from "./GoogleDriveFetchImagesByIds";

const GoogleDriveGetDocWithMixedContent = ({ docFileId }) => {
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

                // Split content into sections and look for markers like IMAGE
                const sectionMatches = content.split(/\[\[(.*?)\]\]/);
                const sectionsArray = [];
                const imageIds = [];

                // Loop through the matches and process them
                for (let i = 0; i < sectionMatches.length; i++) {
                    const marker = sectionMatches[i]?.trim();

                    // Check if it's an image marker
                    const imageMatch = marker.match(/^IMAGE (right|left|center|under): (.+)$/);
                    if (imageMatch) {
                        const position = imageMatch[1];
                        const imageId = imageMatch[2];
                        imageIds.push(imageId);  // Collect image IDs to fetch them later
                        sectionsArray.push({ type: 'image', position, imageId });
                    } else if (marker) {
                        // Otherwise, treat it as a text section
                        sectionsArray.push({ type: 'text', content: marker });
                    }
                }

                // Fetch the images by IDs
                const imageUrls = await googleDriveFetchImagesByIds(imageIds);

                // Attach image URLs to corresponding sections
                const updatedSections = sectionsArray.map(section => {
                    if (section.type === 'image') {
                        const imageUrl = imageUrls.shift();  // Pop the first image URL
                        return { ...section, imageUrl };
                    }
                    return section;
                });

                setSections(updatedSections);
            } catch (error) {
                console.error('Error fetching document:', error);
            }
        };

        fetchDocContent();
    }, [docFileId]);

    const renderSection = (section, index) => {
        if (section.type === 'image') {
            return (
                <div key={index} className={`image-container ${section.position}`}>
                    <img src={section.imageUrl} alt={`Image ${section.imageId}`} className="doc-image" />
                </div>
            );
        } else if (section.type === 'text') {
            return (
                <section key={index} className="text-section">
                    <p>{section.content}</p>
                </section>
            );
        }
        return null;
    };

    return (
        <div className="doc-content">
            {sections.map((section, index) => renderSection(section, index))}
        </div>
    );
};

export default GoogleDriveGetDocWithMixedContent;
