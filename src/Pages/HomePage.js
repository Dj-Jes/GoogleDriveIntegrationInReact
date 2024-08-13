import React, { useState } from 'react';
import GoogleDriveGetDocFile from '../GoogleDriveFunctions/GoogleDriveGetDocFile';

import {docFileId} from "../SharedRecources";

const HomePage = () => {
    const [sections, setSections] = useState([]);

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
