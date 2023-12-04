import React, {useState, useEffect} from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios';
import CreateForm from "./CreateForm";
import UpdateForm from "./UpdateForm";
import DeleteForm from "./DeleteForm";
const ProductTab = () => {
    const [rowData, setRowData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:5179/api/Product/GetAllProducts',
            responseType: 'json'
        }).then(response => {
            if (response.data.success) {
                setRowData(response.data.data);
            } else {
                console.error('API request failed:', response.data.message);
            }
        })
    }, []);

    const columnDefs = [
        {headerName: 'Id', field: 'id'},
        {headerName: 'Name', field: 'name'},
        {headerName: 'Size', field: 'size'},
        {headerName: 'Color', field: 'color'}
    ];

    const gridOptions = {
        defaultColDef: {
            sortable: true,
            filter: true,
        },
        onRowClicked: (event) => handleRowClick(event.data),
    };

    const handleRowClick = (item) => {
        setSelectedItem(item);
    };

    const handleCreate = (newItem) => {
        axios({
            method: 'post',
            url: 'http://localhost:5179/api/Product/AddProduct',
            data: {
                name : newItem.name,
                size : newItem.size,
                color : newItem.color
            },
            responseType: 'json'
        }).then(response => {
            if (response.data.success) {
                setRowData(response.data.data);
            } else {
                console.error('API request failed:', response.data.message);
            }
        })
    };

    const handleUpdateSubmit = (updatedItem) => {
        axios({
            method: 'put',
            url: 'http://localhost:5179/api/Product/UpdateProduct',
            data: {
                id : updatedItem.id,
                name : updatedItem.name,
                size : updatedItem.size,
                color : updatedItem.color
            },
            responseType: 'json'
        }).then(response => {
            if (response.data.success) {
                const updatedData = rowData.map((item) =>
                    item.id === updatedItem.id ? response.data.data : item
                );
                setRowData(updatedData);
                setSelectedItem(null);
            } else {
                console.error('API request failed:', response.data.message);
            }
        })
    };

    const handleDeleteSubmit = () => {
        axios({
            method: 'delete',
            url: `http://localhost:5179/api/Product/${selectedItem.id}`,
            responseType: 'json'
        }).then(response => {
            if (response.data.success) {
                setRowData(response.data.data);
            } else {
                console.error('API request failed:', response.data.message);
            }
        })
    };

    return (
        <div>
            <div className="ag-theme-alpine" style={{ height: 400, width: '55%', margin: 'auto', marginTop: '20px' }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    gridOptions={gridOptions}
                />
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", margin: "20px"}}>
                <CreateForm onCreate={handleCreate} />
                { selectedItem ? (
                    <UpdateForm onUpdate={handleUpdateSubmit} selectedItem={selectedItem} />
                ) : null}

                <DeleteForm onDelete={handleDeleteSubmit} />
            </div>
        </div>
    );
};

export default ProductTab;