import React from 'react';
import '../../Styles.css';

const DocDisplayComponent = ({ content }) => {
    return (
        <div className="doc-display">
            <div className="doc-content" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
};

export default DocDisplayComponent;