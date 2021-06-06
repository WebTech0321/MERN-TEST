import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {generateComponents} from '../helper/rule'

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
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        axios.get(`/security/${props.match.params.id}`)
        .then(async ({data}) => {
            setLoading(false);

            setContentData(data);

            let newTableData = []
            for(let i = 0; i < fakeData.length; i++ ){
                newTableData.push({
                    ...fakeData[i],
                    column2: await getContentData(fakeData[i].column2)
                })
            }

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
