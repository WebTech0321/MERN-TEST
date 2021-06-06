import React from 'react';
import { Table } from "react-bootstrap";

function DataGrid(props) {
    return (
        <Table striped bordered hover {...props}>
            {props.children}
        </Table>
    );
}

export default DataGrid;
