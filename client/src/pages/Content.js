import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {generateComponents} from '../helper/rule'
import DataGrid from '../components/widgets/DataGrid';

const fakeData = [{
    column1: "Michael",
    column2: "michael",
},
{
    column1: "Andy",
    column2: "andy",
}]

function Content(props) {
    const [loading, setLoading] = useState(true);
    const [contentData, setContentData] = useState(null);
    const [tableData, setTableData] = useState(fakeData);

    useEffect(() => {
        axios.get(`/security/${props.match.params.id}`)
        .then(({data}) => {
            setLoading(false);

            setContentData(data);

            let newTableData = [...fakeData]
            fakeData.map(async (item, idx) => {
                newTableData[idx].column2 = await getContentData(item.column2);
            });

            setTableData(newTableData);
        });
    }, [])

    
    const getContentData = async (param) => {
        const {data} = await axios.post(`/table-content`, {
            data: param
        })
        return data;
    };

    const {search, dataGrid, addButton, tableAction} = generateComponents(contentData);

    return (
        <div className="container">
            {loading && 
                <div>Loading...</div>
            }
            {!loading &&
                <div>
                    {search}
                    {dataGrid(
                        <tbody>                            
                            {tableData.map((row,idx) => (
                                <tr key={idx}>
                                    <td>
                                        {row.column1} 
                                    </td>
                                    <td>
                                        {row.column2}
                                    </td>
                                    <td>
                                        {tableAction()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                    {addButton}
                </div>
            }
        </div>
    );
}

export default Content;
