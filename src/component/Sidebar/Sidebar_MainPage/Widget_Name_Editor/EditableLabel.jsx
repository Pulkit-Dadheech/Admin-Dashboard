import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa'; // Import the trash icon from FontAwesome

export default function EditableLabel({ initialValue, onSave, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(initialValue);

    function handleInputChange(event) {
        setInputValue(event.target.value);
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            handleSave();
        }
    }

    function handleSave() {
        if (inputValue.trim() !== '') {
            onSave(inputValue);
            setIsEditing(false);
        } else {
            alert('Widget name cannot be empty');
        }
    }

    return (
        <div className="editable-label" style={{ display: 'flex', alignItems: 'center' }}>
            {isEditing ? (
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    autoFocus
                    className="editable-input"
                />
            ) : (
                <span onClick={() => setIsEditing(true)} className="editable-text">
                    {inputValue}
                </span>
            )}
            {/* Delete button with a trash icon */}
            <button onClick={onDelete} className="delete-button" style={{ marginLeft: '10px', background: 'none', border: 'none', cursor: 'pointer' }}>
                <FaTrash size={16} color="#d9534f" />
            </button>
        </div>
    );
}
