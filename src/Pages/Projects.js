import React, { useState, useEffect } from 'react';
import fetchSubfolders from '../GoogleDriveFunctions/GoogleDriveGetSubfolders';
import fetchImageIdsFromSubfolder from '../GoogleDriveFunctions/GoogleDriveFetchImageIdsFromSubfolder';
import PhotoGallery from '../Components/DisplayComponent/PhotoGallery';
import FolderGallery from "../Components/DisplayComponent/FolderGallery";
import useImageCache from '../Cache/useImageCache';

const Projects = () => {
    const [subFolders, setSubFolders] = useState([]);
    const [selectedFolderId, setSelectedFolderId] = useState(null);
    const [imageIds, setImageIds] = useState([]);
    const [imagesPerPage] = useState(2); // Define how many images should be displayed per page
    const [currentPage, setCurrentPage] = useState(0); // Track the current page

    // Get the displayed images from the custom hook
    const displayedImages = useImageCache(imageIds, imagesPerPage, currentPage);

    useEffect(() => {
        fetchSubfolders(setSubFolders);
    }, []);

    useEffect(() => {
        const loadImageIds = async () => {
            if (selectedFolderId) {
                const ids = await fetchImageIdsFromSubfolder(selectedFolderId);
                setImageIds(ids);
                setCurrentPage(0); // Reset to the first page when a new folder is selected
            }
        };
        loadImageIds();
    }, [selectedFolderId]);

    const handleFolderClick = (folderId) => {
        setSelectedFolderId(folderId);
    };

    const handleNextPage = () => {
        if ((currentPage + 1) * imagesPerPage < imageIds.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
            <h2>Folders</h2>
            <FolderGallery folders={subFolders} onFolderClick={handleFolderClick} />

            {/* Display Image Gallery */}
            {displayedImages.length > 0 && <PhotoGallery images={displayedImages} />}

            {/* Pagination Controls */}
            <div>
                <button onClick={handlePreviousPage} disabled={currentPage === 0}>
                    Previous
                </button>
                <button
                    onClick={handleNextPage}
                    disabled={(currentPage + 1) * imagesPerPage >= imageIds.length}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Projects;
