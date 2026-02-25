import React from "react";
import { Line } from "react-chartjs-2";

const ChartCard = ({ data, xTitle, yTitle, noShadow = false }) => {
    const options = {
        responsive: true,
        //maintainAspectRatio: false,  
        scales: {
            x: {
                title: {
                    display: true,
                    text: xTitle || "Mes",
                },
            },
            y: {
                title: {
                    display: true,
                    text: yTitle,
                },
            },
        },
    };

    return (
        <div className={`p-4 bg-white rounded-lg ${noShadow ? "" : "shadow-md"}`}>
            <Line data={data} options={options} />
        </div>
    );
};

export default ChartCard;
