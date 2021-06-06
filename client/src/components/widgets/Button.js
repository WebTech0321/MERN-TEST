import React from 'react';
import { Button as BSButton} from "react-bootstrap";

function Button(props) {
    return (
        <BSButton {...props} >
            {props.children}
        </BSButton>
    );
}

export default Button;
