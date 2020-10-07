import Toast from "react-bootstrap/Toast";
import React from "react";

export const errorToast = ((text: string = 'Sorry, we couldn\'t get info!', headerText: string = 'Error') => {
    return (
        <Toast className="toast-position">
            <Toast.Header>
                <strong className="mr-auto">{headerText}</strong>
            </Toast.Header>
            <Toast.Body>{text}</Toast.Body>
        </Toast>
    );
});
