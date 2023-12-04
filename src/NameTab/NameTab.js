import React, {useState, useEffect} from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios';
import CreateForm from './CreateForm';
import UpdateForm from './UpdateForm';
import DeleteForm from './DeleteForm';

const NameTab = () => {
    const [rowData, setRowData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [createFormVisible, setCreateFormVisible] = useState(false);
    const [updateFormVisible, setUpdateFormVisible] = useState(false);
    const [deleteFormVisible, setDeleteFormVisible] = useState(false);

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:5179/api/Name/GetAll',
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
        {headerName: 'ID', field: 'id'},
        {headerName: 'Name', field: 'user_name'},
        {headerName: 'Surname', field: 'user_surname'},
        {headerName: 'Age', field: 'user_age'}
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
            url: 'http://localhost:5179/api/Name/AddName',
            data: {
                user_name : newItem.user_name,
                user_surname : newItem.user_surname,
                user_age : newItem.user_age
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
            url: 'http://localhost:5179/api/Name/UpdateName',
            data: {
                id : updatedItem.id,
                user_name : updatedItem.user_name,
                user_surname : updatedItem.user_surname,
                user_age : updatedItem.user_age
            },
            responseType: 'json'
        }).then(response => {
            if (response.data.success) {
                const updatedData = rowData.map((item) =>
                    item.id === updatedItem.id ? response.data.data : item
                );
                setRowData(updatedData);
                setUpdateFormVisible(false);
                setSelectedItem(null);
            } else {
                console.error('API request failed:', response.data.message);
            }
        })
    };

    const handleDeleteSubmit = () => {
        axios({
            method: 'delete',
            url: `http://localhost:5179/api/Name/${selectedItem.id}`,
            responseType: 'json'
        }).then(response => {
            if (response.data.success) {
                setRowData(response.data.data);
            } else {
                console.error('API request failed:', response.data.message);
            }
        })
    };

    const handleCancel = () => {
        setCreateFormVisible(false);
        setUpdateFormVisible(false);
        setDeleteFormVisible(false);
        setSelectedItem(null);
    };

    return (
        <div>
            <div className="ag-theme-alpine" style={{ height: 400, width: '55%', margin: 'auto' }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    gridOptions={gridOptions}
                />
            </div>
            <CreateForm onCreate={handleCreate} />
            { selectedItem ? (
                <UpdateForm onUpdate={handleUpdateSubmit} onCancel={handleCancel} selectedItem={selectedItem} />
            ) : null}

            <DeleteForm onDelete={handleDeleteSubmit} onCancel={handleCancel} />
        </div>

    );
};

export default NameTab;