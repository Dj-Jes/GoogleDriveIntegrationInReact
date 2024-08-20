// useImageCache.js
import { useState, useEffect, useRef } from 'react';
import ImageContainer from '../DataContainers/ImageContainer';
import fetchImagesByIds from '../GoogleDriveFunctions/GoogleDriveFetchImagesByIds';

const useImageCache = (imageIds, imagesPerPage, currentPage) => {
    const imageContainer = useRef(new ImageContainer()); // Instantiate ImageContainer only once
    const [displayedImages, setDisplayedImages] = useState([]);

    useEffect(() => {
        const loadImages = async () => {
            if (imageIds.length > 0) {
                const startIndex = currentPage * imagesPerPage;
                const imagesToShowIds = imageIds.slice(startIndex, startIndex + imagesPerPage);

                // Check if images are already stored in the container
                const cachedImages = imagesToShowIds
                    .map(id => imageContainer.current.getImage(id))
                    .filter(Boolean); // Filter out any undefined values

                // Determine which images need to be fetched
                const idsToFetch = imagesToShowIds.filter(id => !imageContainer.current.hasImage(id));

                if (idsToFetch.length > 0) {
                    const fetchedImages = await fetchImagesByIds(idsToFetch);

                    // Store fetched images in the container
                    idsToFetch.forEach((id, index) => {
                        imageContainer.current.addImage(id, fetchedImages[index]);
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

    return displayedImages;
};

export default useImageCache;
