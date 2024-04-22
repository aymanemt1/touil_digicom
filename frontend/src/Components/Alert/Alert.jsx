import React, { useState, useEffect } from 'react';
import './Alert.css';

export const Alert = (props) => {
    const [show, setShow] = useState(true);
    const [progressWidth, setProgressWidth] = useState(0);

    useEffect(() => {
        let progressInterval;
        if (show) {
            progressInterval = setInterval(() => {
                setProgressWidth(prevWidth => {
                    if (prevWidth >= 100) {
                        clearInterval(progressInterval);
                        hideAlert();
                        return 0;
                    } else {
                        return prevWidth + 1;
                    }
                });
            }, 50);
        } else {
            clearInterval(progressInterval);
        }

        return () => clearInterval(progressInterval);
    }, [show]);


    const hideAlert = () => {
        setShow(false);
        setProgressWidth(0);
    };

    return (
        <div>
            {show && (
                <div id="myAlert" className="show">
                    <div className="myAlert-text-icon">
                        <div className="myAlert-message">
                            <p> {props.msg}
                            <i className='bx bx-check-circle'></i></p>
                        </div>
                    </div>
                    <div id="myAlertProgress">
                        <div id="myAlertBar" style={{ width: `${progressWidth}%` }}></div>
                    </div>
                </div>
            )}
        </div>
    );
};
