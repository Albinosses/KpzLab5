import React from "react";

const DeleteForm = ({ onDelete, onCancel }) => {
    const handleDelete = () => {
        onDelete();
    };

    return (
        <div>
            <p>Are you sure you want to delete selected item?</p>
            <button type="button" onClick={handleDelete}>Delete</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default DeleteForm;
