import React from 'react';
import { Button } from "react-bootstrap";

function Home() {
    return (
        <div className="container">
            <div className="d-flex justify-content-center mt-5">
                <a href="/page/1" className="mx-4">
                    <Button variant="primary">full access</Button>
                </a>
                <a href="/page/2" className="mx-4">
                    <Button>restricted access</Button>
                </a>
            </div>
        </div>
    );
}

export default Home;
