import React, { useEffect, useState } from 'react';
import { API_KEY } from "../SharedRecources";
import GoogleDriveFetchImagesByIds from "./GoogleDriveFetchImagesByIds";

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

                // Extract all image IDs from the content
                const imageMatches = [...content.matchAll(/\[\*?IMAGE (?:right|left|center)?: ([a-zA-Z0-9-_]+)(?::[\d%]+)?\*\]/g)];
                const imageIds = imageMatches.map(match => match[1]);

                // Fetch all image URLs
                const imageUrls = await GoogleDriveFetchImagesByIds(imageIds);

                // Replace image placeholders with actual image URLs
                const contentWithImages = content.replace(
                    /\[\*?IMAGE (right|left|center)?: ([a-zA-Z0-9-_]+)(?::([\d%]+))?\*\]/g,
                    (_, alignment, imageId, size) => {
                        const imageIndex = imageIds.indexOf(imageId);
                        const imageUrl = imageUrls[imageIndex];
                        const imageStyle = size ? `style="width: ${size}"` : '';
                        return `<img src="${imageUrl}" alt="Image" align="${alignment}" ${imageStyle} />`;
                    }
                );

                // Split the content into sections based on custom markers
                const sectionMatches = contentWithImages.split(/\[\[([A-Å]+)\]\]/);
                const sectionsArray = [];

                for (let i = 1; i < sectionMatches.length; i += 2) {
                    const type = sectionMatches[i].trim();
                    const sectionContent = sectionMatches[i + 1].trim();
                    sectionsArray.push({ type, content: sectionContent });
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
                    <div
                        dangerouslySetInnerHTML={{ __html: section.content }}
                    ></div>
                </section>
            ))}
        </div>
    );
};

export default GoogleDriveGetDocFile;
