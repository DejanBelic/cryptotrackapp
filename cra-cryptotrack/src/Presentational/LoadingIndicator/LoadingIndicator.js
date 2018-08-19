import React from 'react';
import './LoadingIndicator.css';

const LoadingIndicator = () => (
    <div id="wrapper">
        <div className="spinner">
            <div className="loading-container">
                <div className="ball"></div>
                <div className="ball-inner"></div>
            </div>
        </div>
    </div>
);

export default LoadingIndicator;
