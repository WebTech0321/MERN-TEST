import { Button, DataGrid, SearchBox } from "../components/widgets";

// return components or function for rendering
// 
export const generateComponents = (rule) => {
    let search = null;
    let dataGrid = () => {}
    let addButton = null;
    let tableAction = () => {}

    if( rule?.view ) {
        if( rule.view.indexOf('SEARCH') >= 0 ) {
            search = <SearchBox />
        }
        if( rule.view.indexOf('GRID') >= 0 ) {
            dataGrid = (children) => (
                <DataGrid className="my-3">
                    {children}
                </DataGrid>
            )
        }        
        if( rule.view.indexOf('ADD') >= 0 ) {
            addButton = <Button>ADD</Button>
        }
    }
    
    if( rule?.access ) {
        let bEdit, bDelete, bView, bAdd;
        bEdit = bDelete = bView = bAdd = false;

        if( rule.access.indexOf('EDIT') >= 0 ) {
            bEdit = true;
        }
        if( rule.access.indexOf('DELETE') >= 0 ) {
            bDelete = true;
        }
        if( rule.access.indexOf('VIEW') >= 0 ) {
            bView = true;
        }
        if( rule.access.indexOf('ADD') >= 0 ) {
            bAdd = true;
        }

        tableAction = () => (
            <>         
                {bEdit &&       
                    <Button className="ms-2">Edit</Button>
                }
                {bDelete &&
                    <Button className="ms-2" variant="danger">Delete</Button>
                }
                {bView &&
                    <Button className="ms-2">View</Button>
                }
                <Button className="ms-2" disabled={!bAdd}>Add</Button>
            </>
        )
    }

    return {
        search,
        dataGrid,
        addButton,
        tableAction
    }
}