const Power = document.getElementById('myChart3');
let myChart3;


async function fetchPowerData() {
    try {
        const response = await fetch('http://localhost:7000/api/v1/data/all');
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        const data = await response.json();
        console.log('Fetched power data:', data); 

        
        const powerData = data.map(entry => entry.power); 
        const timeData = data.map(entry => new Date(entry.createdAt).toLocaleTimeString()); 

        
        const limitedPowerData = powerData.slice(-10);
        const limitedTimeData = timeData.slice(-10);

        
        createChart3(limitedTimeData, limitedPowerData);
    } catch (error) {
        console.error('Error fetching power data:', error);
    }
}


function createChart3(timeData, powerData) {
    if (myChart3) {
        myChart3.destroy(); 
    }

    myChart3 = new Chart(Power, {
        type: 'line',
        data: {
            labels: timeData, 
            datasets: [{
                label: 'Power Data', 
                data: powerData, 
                borderWidth: 1,
                borderColor: 'rgba(75, 192, 192, 1)',
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
                        text: 'Power (W)' 
                    }
                }
            }
        }
    });
}


fetchPowerData();


window.addEventListener('resize', () => {
    if (myChart3) {
        myChart3.destroy(); 
        fetchPowerData(); 
    }
});
