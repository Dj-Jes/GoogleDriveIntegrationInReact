class ImageContainer {
    constructor() {
        this.imageMap = {}; // Object to store images with their IDs as keys
    }

    // Add an image to the container
    addImage(id, base64Image) {
        this.imageMap[id] = base64Image;
    }

    // Retrieve an image by ID
    getImage(id) {
        return this.imageMap[id];
    }

    // Check if an image is already stored in the container
    hasImage(id) {
        return this.imageMap.hasOwnProperty(id);
    }
}

export default ImageContainer;
