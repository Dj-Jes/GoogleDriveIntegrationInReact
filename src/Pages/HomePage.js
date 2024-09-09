import GoogleDriveGetDocFile from '../GoogleDriveFunctions/GoogleDriveGetDocFile';
import { docFileId } from "../SharedRecources";
import GoogleDriveGetDocAndImage from "../GoogleDriveFunctions/GoogleDriveGetDocAndImage";

const HomePage = () => {

    // return (
    //     <div className="homepage">
    //         <h2>Welcome to the Photo Gallery</h2>
    //
    //         {/* Display the document content */}
    //         <div className="doc-content">
    //             <GoogleDriveGetDocFile docFileId={docFileId} />
    //         </div>
    //
    //     </div>
    // );


    return (
        <div className="homepage">
            <h2>Welcome to the Photo Gallery</h2>

            {/* Display the document content */}
            <div className="doc-content">
                <GoogleDriveGetDocAndImage docFileId={docFileId} />
            </div>

        </div>
    );
};

export default HomePage;
