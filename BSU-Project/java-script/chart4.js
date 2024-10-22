const Energy = document.getElementById('myChart4');
let myChart4;


async function fetchEnergyData() {
    try {
        const response = await fetch('http://localhost:7000/api/v1/data/all');
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        const data = await response.json();
        console.log('Fetched energy data:', data); 

        
        const energyData = data.map(entry => entry.energy); 
        const timeData = data.map(entry => new Date(entry.createdAt).toLocaleTimeString()); 

        
        const limitedEnergyData = energyData.slice(-10);
        const limitedTimeData = timeData.slice(-10);

        
        createChart4(limitedTimeData, limitedEnergyData);
    } catch (error) {
        console.error('Error fetching energy data:', error);
    }
}


function createChart4(timeData, energyData) {
    if (myChart4) {
        myChart4.destroy(); 
    }

    myChart4 = new Chart(Energy, {
        type: 'line',
        data: {
            labels: timeData, 
            datasets: [{
                label: 'Energy Data', 
                data: energyData, 
                borderWidth: 1,
                borderColor: 'rgba(54, 162, 235, 1)',
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
                        text: 'Energy (Wh)' 
                    }
                }
            }
        }
    });
}


fetchEnergyData();


window.addEventListener('resize', () => {
    if (myChart4) {
        myChart4.destroy(); 
        fetchEnergyData(); 
    }
});
