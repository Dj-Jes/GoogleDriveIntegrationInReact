import React from 'react';
import '../../Styles.css';

const FolderGallery = ({ folders, onFolderClick }) => {
    return (
        <div className="folder-gallery">
            {folders.map((folder) => (
                <div
                    className="folder"
                    key={folder.id}
                    onClick={() => onFolderClick(folder.id)}
                >
                    <p>{folder.name}</p>
                </div>
            ))}
        </div>
    );
};

export default FolderGallery;