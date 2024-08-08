import React, { useState } from 'react';
import PhotoGallery from './PhotoGallery';
import GoogleDrive from './GoogleDrive';

function App() {
    const [images, setImages] = useState([]);

    return (
        <div className="App">
            <h1>Photo Gallery</h1>
            <GoogleDrive setImages={setImages} />
            <PhotoGallery images={images} />
        </div>
    );
}

export default App;
