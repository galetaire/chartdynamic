//makeChart, calling the data and variables from the .csv file
function makeChart(credityearly) {
  var rangeStart = 97-2
  var rangeEnd = new Date().getFullYear() - 1899
  var rangeLabels = credityearly.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  var rangeOne = credityearly.map(function(d) {return d.Upper_limit}).slice(rangeStart, rangeEnd);
  var rangeTwo = credityearly.map(function(d) {return d.Lower_limit}).slice(rangeStart, rangeEnd);
  var rangeTres = credityearly.map(function(d) {return d.Optimal}).slice(rangeStart, rangeEnd);
  var rangeThree = credityearly.map(function(d) {return d.Approved}).slice(rangeStart, rangeEnd);
  var rangeFour = credityearly.map(function(d) {return d.Releases}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;
  var chart = new Chart('credityearly', {
    options: {
      responsive: true,
      scales: {
        x: {
          stacked: true,
          ticks: {
            autoSkip: false,
            maxRotation: 90,
            minRotation: 90,
            beginAtZero: true
          }
        },
        y: {
          ticks: {
            beginAtZero: true
          }
        }
      }
    },
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: 'Upper limit',
          type: 'line',
          data: rangeOne,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'rgba(0, 0, 0, 1)',
          borderWidth: 1,
          pointStyle: false,
          borderDash:[5, 5],
          fill: false
        },
        {
          label: 'Lower limit',
          type: 'line',
          data: rangeTwo,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'rgba(0, 0, 0, 1)',
          borderWidth: 1,
          pointStyle: false,
          borderDash:[5, 5],
          fill: false
        },
        {
          label: 'Optimal',
          type: 'line',
          data: rangeTres,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'rgba(0, 0, 0, 1)',
          borderWidth: 1,
          pointStyle: false,
          borderDash:[1, 2],
          fill: false
        },
        {
            label: 'Releases',
            type: 'bar',
            data: rangeFour,
            backgroundColor: 'rgba(255, 153, 0, 1)',
            borderColor: 'rgba(38, 38, 38, 0.6)',
            //borderRadius: Number.MAX_VALUE,
            borderWidth: 1,
            categoryPercentage: 0.5,
        },
        {
            label: 'Approvals',
            type: 'bar',
            data: rangeThree,
            backgroundColor: 'rgba(91, 155, 213, 0.8)',
            borderColor: 'rgba(38, 38, 38, 1)',
            borderWidth: 1,
            categoryPercentage: 1,
        },
      ]
    }
  })
}

// Request data from .csv file using D3js library
d3.csv('https://raw.githubusercontent.com/galetaire/spahousing/main/public/docs/spain_stats_csv.csv')
  .then(makeChart);
