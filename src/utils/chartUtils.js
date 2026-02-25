export const createEmptyChartData = (color, label) => {
    return {
        labels: [],
        datasets: [
            {
                label: label,
                data: [],
                borderColor: color,
                backgroundColor: color,
                borderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 8,
                tension: 0.3,
                fill: false,
            },
        ],
    };
};

export const sortObjectEntries = (obj) => {
    return Object.entries(obj).sort((a, b) => new Date(a[0]) - new Date(b[0]));
};

export const updateChartData = (chartData, sortedData) => {
    if (!sortedData || sortedData.length === 0) {
        return chartData;
    }

    return {
        ...chartData,
        labels: sortedData.map(entry => entry[0]),
        datasets: [{
            ...chartData.datasets[0],
            data: sortedData.map(entry => entry[1])
        }]
    };
};

export const calculateChangeFromLastTwo = (dataArray) => {
    if (!Array.isArray(dataArray)) return 0;

    // Filtramos solo los valores > 0
    const filtered = dataArray.filter(([, value]) => value > 0);

    if (filtered.length < 2) return 0;

    const lastMonth = filtered[filtered.length - 1][1];
    const prevMonth = filtered[filtered.length - 2][1];

    return calculateChange(lastMonth, prevMonth);
};

export const calculateChange = (current, previous) => {
    if (previous === 0) return current === 0 ? 0 : 100;

    const change = ((current - previous) / Math.abs(previous)) * 100;
    return parseFloat(change.toFixed(1));
};
