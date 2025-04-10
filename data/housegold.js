//makeChart, calling the data and variables from the .csv file
function makeChart(housegold) {
  var rangeStart = 87-2
  var rangeEnd = new Date().getFullYear() - 1899
  var rangeLabels = housegold.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  var rangeOne = housegold.map(function(d) {return d.Gold_house}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;
  var chart = new Chart('housegold', {
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
          label: "Preu d'un habitatge en unces d'or",
          type: 'line',
          data: rangeOne,
          backgroundColor: 'rgba(232, 181, 10, 0.5)',
          borderColor: 'rgba(143, 124, 15, 1)',
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
