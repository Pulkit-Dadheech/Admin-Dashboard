import React, { useState } from 'react';

export default function EditableLabel({ initialValue, onSave }) {
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
            // Optionally, you can handle empty values here
            alert('Widget name cannot be empty');
        }
    }

    return (
        <div className="editable-label">
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
        </div>
    );
}
