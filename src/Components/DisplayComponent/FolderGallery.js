import React from 'react';
import '../../Styles.css';

const FolderGallery = ({ folders }) => {
    return (
        <div className="folder-gallery">
            {folders.length === 0 ? (
                <p>No folders available</p>
            ) : (
                folders.map((folder) => (
                    <div className="folder" key={folder.id}>
                        <p>{folder.name}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default FolderGallery;