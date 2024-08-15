import React, { useState, useEffect, useRef } from 'react';
import fetchSubfolders from '../GoogleDriveFunctions/GoogleDriveGetSubfolders';
import fetchImageIdsFromSubfolder from '../GoogleDriveFunctions/GoogleDriveFetchImageIdsFromSubfolder';
import fetchImagesByIds from '../GoogleDriveFunctions/GoogleDriveFetchImagesByIds';
import PhotoGallery from '../Components/DisplayComponent/PhotoGallery';
import FolderGallery from "../Components/DisplayComponent/FolderGallery";
import ImageContainer from '../DataContainers/ImageContainer';

const imageContainer = new ImageContainer(); // Instantiate the ImageContainer

const FolderPageTest = () => {
    const [subFolders, setSubFolders] = useState([]);
    const [selectedFolderId, setSelectedFolderId] = useState(null);
    const [imageIds, setImageIds] = useState([]);
    const [displayedImages, setDisplayedImages] = useState([]);
    const [imagesPerPage] = useState(2); // Define how many images should be displayed per page
    const [currentPage, setCurrentPage] = useState(0); // Track the current page

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

    useEffect(() => {
        const loadImages = async () => {
            if (imageIds.length > 0) {
                const startIndex = currentPage * imagesPerPage;
                const imagesToShowIds = imageIds.slice(startIndex, startIndex + imagesPerPage);

                // Check if images are already stored in the container
                const cachedImages = imagesToShowIds
                    .map(id => imageContainer.getImage(id))
                    .filter(Boolean); // Filter out any undefined values

                // Determine which images need to be fetched
                const idsToFetch = imagesToShowIds.filter(id => !imageContainer.hasImage(id));

                if (idsToFetch.length > 0) {
                    const fetchedImages = await fetchImagesByIds(idsToFetch);

                    // Store fetched images in the container
                    idsToFetch.forEach((id, index) => {
                        imageContainer.addImage(id, fetchedImages[index]);
                    });

                    // Combine cached and fetched images
                    setDisplayedImages([...cachedImages, ...fetchedImages]);
                } else {
                    // If all images are cached, just set the displayed images
                    setDisplayedImages(cachedImages);
                }
            }
        };

        loadImages();
    }, [imageIds, currentPage, imagesPerPage]);

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

            {/* Display Image IDs */}
            {imageIds.length > 0 && (
                <div>
                    <h3>Image IDs:</h3>
                    <ul>
                        {imageIds.map((id, index) => (
                            <li key={index}>{id}</li>
                        ))}
                    </ul>
                </div>
            )}

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

export default FolderPageTest;
