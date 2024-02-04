import React, { useEffect, useState } from "react";
import axios from "axios"
import { DatasetController } from "chart.js";

const options = [
    {value: "UsersData", label: "DataSet1"},
    {value: "UsersDataL2", label: "DataSet2"}
];

function LocationPicker(props) {

    const [dataSet, setDataSet] = useState();

    const onChangeHandler = (e) => {
        setDataSet(e.target.value);
        props.updateDataSet(e.target.value);
    };

    return (
        <div style={{paddingBottom: "3px"}}>
            DataSets: &nbsp;&nbsp;
                    <select defaultValue={props.dataSet} style={{minHeight: "27px",minWidth: "150px"}} onChange={onChangeHandler}>
                        {options.map((option) => (
                            <option value={option.value} key={option.value}>{option.label}</option>
                        ))}
                    </select>
            <br/>
        </div>
    )
}

export default LocationPicker