import React from 'react'
import {Line} from 'react-chartjs-2'
import { options } from '../Option'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler 
  } from "chart.js";

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

function LineChart({chartData}, {chartOption}) {

    return (
        <div>
            {chartData.map((data, index) => (
                <div key={index}>
                    <Line data={data} options={options}/>
                    <br/>
                </div>
            ))}
        </div>
    )
}

export default LineChart