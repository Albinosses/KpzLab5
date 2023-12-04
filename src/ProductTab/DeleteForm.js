import React from "react";

const DeleteForm = ({ onDelete }) => {
    const handleDelete = () => {
        onDelete();
    };

    return (
        <div>
            <p>Press here to delete selected item</p>
            <button type="button" onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default DeleteForm;
