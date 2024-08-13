import React, { useState } from 'react';
import GoogleDriveGetDocFile from '../GoogleDriveFunctions/GoogleDriveGetDocFile';

const HomePage = () => {
    const [sections, setSections] = useState([]);

    const docFileId = "1Qb2zZy56xJImlaAyz9Y-tzJKVWnzvvcsxT-HC7UuMIo"; // Replace with your document ID

    return (
        <div>
            <h2>Welcome to the Photo Gallery</h2>
            <GoogleDriveGetDocFile docFileId={docFileId} setSections={setSections} />
            {sections.map((section, index) => (
                <div key={index}>
                    <h3>{section.type}</h3>
                    <p>{section.content}</p>
                </div>
            ))}
        </div>
    );
};

export default HomePage;
