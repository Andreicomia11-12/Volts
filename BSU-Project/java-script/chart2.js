const Current = document.getElementById('myChart2');
let myChart2;


async function fetchCurrentData() {
    try {
        const response = await fetch('http://localhost:7000/api/v1/data/all');
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        const data = await response.json();
        console.log('Fetched current data:', data); 

        
        const currentData = data.map(entry => entry.current); 
        const timeData = data.map(entry => new Date(entry.createdAt).toLocaleTimeString()); 

        
        const limitedCurrentData = currentData.slice(-10);
        const limitedTimeData = timeData.slice(-10);

        
        createChart2(limitedTimeData, limitedCurrentData);
    } catch (error) {
        console.error('Error fetching current data:', error);
    }
}


function createChart2(timeData, currentData) {
    if (myChart2) {
        myChart2.destroy(); 
    }

    myChart2 = new Chart(Current, {
        type: 'line',
        data: {
            labels: timeData, 
            datasets: [{
                label: 'Current Data', 
                data: currentData, 
                borderWidth: 1,
                borderColor: 'rgba(153, 102, 255, 1)',
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time' 
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Current (A)' 
                    }
                }
            }
        }
    });
}


fetchCurrentData();


window.addEventListener('resize', () => {
    if (myChart2) {
        myChart2.destroy(); 
        fetchCurrentData(); 
    }
});
