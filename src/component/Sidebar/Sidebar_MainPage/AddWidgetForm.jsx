
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addWidgetWithData } from '../../../features/widgets/dashboardSlice';
import './AddWidgetForm.css';

const COLORS = [
    { name: 'Red', value: '#FF0000' },
    { name: 'Green', value: '#00FF00' },
    { name: 'Blue', value: '#0000FF' },
    { name: 'Yellow', value: '#FFFF00' },
    { name: 'Cyan', value: '#00FFFF' },
    { name: 'Magenta', value: '#FF00FF' },
    { name: 'Gray', value: '#808080' },
];

const AddWidgetForm = ({ selectedDashboardId, onClose }) => {
    const dispatch = useDispatch();
    const [widgetName, setWidgetName] = useState("");
    const [widgetType, setWidgetType] = useState("Doughnut");
    const [rows, setRows] = useState([{ label: "", data: "", color: COLORS[0].value }]);
    const [addData, setAddData] = useState(false);

    const handleAddRow = () => {
        setRows([...rows, { label: "", data: "", color: COLORS[0].value }]);
    };

    const handleRowChange = (index, field, value) => {
        const updatedRows = rows.map((row, i) =>
            i === index ? { ...row, [field]: value } : row
        );
        setRows(updatedRows);
    };

    const handleRemoveRow = (index) => {
        const updatedRows = rows.filter((_, i) => i !== index);
        setRows(updatedRows);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (widgetName.trim() !== "") {
            let widgetData = [];
            if (addData) {
                if (rows.every(row => row.label.trim() && row.data.trim())) {
                    widgetData = [{
                        labels: rows.map(row => row.label.trim()),
                        datasets: [
                            {
                                data: rows.map(row => parseFloat(row.data.trim())),
                                backgroundColor: rows.map(row => row.color.trim()),
                            }
                        ]
                    }];
                } else {
                    alert('All fields must be filled out');
                    return;
                }
            } else {
                widgetData = [{}]; // Default empty data
            }

            dispatch(addWidgetWithData({
                dashboardId: selectedDashboardId,
                widgetName: widgetName,
                widgetType: widgetType,
                widgetData: widgetData,
            }));
            setWidgetName("");
            setWidgetType("Doughnut");
            setRows([{ label: "", data: "", color: COLORS[0].value }]);
            setAddData(false);
            onClose();
        } else {
            alert('Widget name cannot be empty');
        }
    };

    return (
        <form className="widget-form" onSubmit={handleFormSubmit}>
            <input
                type="text"
                className="widget-input"
                value={widgetName}
                onChange={(e) => setWidgetName(e.target.value)}
                placeholder="Widget Name"
            />
            <select
                className="widget-type-select"
                value={widgetType}
                onChange={(e) => setWidgetType(e.target.value)}
                disabled={addData} // Disable widget type selection when adding data
            >
                <option value="Doughnut">Doughnut</option>
                <option value="Bar">Horizontal Bar</option>
                <option value="PolarArea">Polar Area</option>
            </select>

            <button
                type="button"
                className="add-data-button"
                onClick={() => setAddData(!addData)}
            >
                {addData ? 'Disable Data Entry' : 'Add Data'}
            </button>

            {addData && (
                <div className="widget-data-fields">
                    {rows.length <= 8 && rows.map((row, index) => (
                        <div key={index} className="widget-data-row">
                            <input
                                type="text"
                                className="widget-data-input"
                                value={row.label}
                                onChange={(e) => handleRowChange(index, 'label', e.target.value)}
                                placeholder="Label"
                            />
                            <input
                                type="number"
                                className="widget-data-input"
                                value={row.data}
                                onChange={(e) => handleRowChange(index, 'data', e.target.value)}
                                placeholder="Data"
                            />
                            <select
                                className="widget-color-select"
                                value={row.color}
                                onChange={(e) => handleRowChange(index, 'color', e.target.value)}
                            >
                                {COLORS.map((color) => (
                                    <option key={color.value} value={color.value}>
                                        {color.name}
                                    </option>
                                ))}
                            </select>
                            {rows.length > 1 && (
                                <button type="button" className="remove-row-button" onClick={() => handleRemoveRow(index)}>
                                    -
                                </button>
                            )}
                        </div>
                    ))}
                    <button type="button" className="add-row-button" onClick={handleAddRow}>
                        +
                    </button>
                </div>
            )}

            <div className="form-buttons">
                <button type="submit" className="submit-button">Add Widget</button>
                <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
            </div>
        </form>
    );
};

export default AddWidgetForm;
