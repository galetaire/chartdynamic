//makeChart, calling the data and variables from the .csv file
function makeChart(housedollar) {
  var rangeStart = 87-2
  var rangeEnd = new Date().getFullYear() - 1899
  var rangeLabels = housedollar.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  var rangeOne = housedollar.map(function(d) {return d.EUR_house}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;
  var chart = new Chart('housedollar', {
    options: {
      scales: {
        x: {
          ticks: {
            maxRotation: 90,
            minRotation: 90,
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.dataset.label || '';
              const value = Math.round(context.parsed.y); // Round Y value
              return `${label}: ${value}`;
            }
          }
        }
      }
    },
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: "Preu d'un habitatge en euros",
          type: 'line',
          data: rangeOne,
          backgroundColor: 'rgba(68, 114, 196, 0.5)',
          borderColor: 'rgba(68, 114, 196, 1)',
          borderWidth: 1,
          pointStyle: 'circle',
          pointRadius: 5,
          fill: false,
          tension: 0.4
        }
      ]
    }
  })
}

// Request data from .csv file using D3js library
d3.csv('https://raw.githubusercontent.com/galetaire/spahousing/main/public/docs/spain_stats_csv.csv')
  .then(makeChart);
