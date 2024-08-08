import React, { useEffect } from 'react';
import './Styles.css';

const PhotoGallery = ({ images }) => {
    useEffect(() => {
        console.log('Rendering images:', images); // Log the images array
    }, [images]);

    return (
        <div className="photo-gallery">
            {images.map((image, index) => (
                <div className="photo" key={index}>
                    <img
                        src={image}
                        alt={`Photo ${index + 1}`}
                        onLoad={() => console.log(`Image loaded: ${image}`)}
                        onError={() => console.error(`Failed to load image: ${image}`)}
                    />
                </div>
            ))}
        </div>
    );
};

export default PhotoGallery;
