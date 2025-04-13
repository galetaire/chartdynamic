//makeChart, calling the data and variables from the .csv file
function makeChart(sales) {
  var rangeStart = 105-2
  var rangeEnd = new Date().getFullYear() - 1899
  var rangeLabels = sales.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  var rangeOne = sales.map(function(d) {return d.Upper_limit}).slice(rangeStart, rangeEnd);
  var rangeTwo = sales.map(function(d) {return d.Lower_limit}).slice(rangeStart, rangeEnd);
  var rangeThree = sales.map(function(d) {return d.Approved}).slice(rangeStart, rangeEnd);
  var rangeFour = sales.map(function(d) {return d.Home_sales}).slice(rangeStart, rangeEnd);

  Chart.defaults.font.size = 12;
  var chart = new Chart('sales', {
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
          label: 'Sostre bombolla',
          type: 'line',
          data: rangeOne,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderColor: 'rgba(0, 0, 0, 1)',
          borderWidth: 1.5,
          pointStyle: 'circle',
          pointRadius: 2,
          fill: false
        },
        /*{
          label: 'Límit inferior',
          type: 'line',
          data: rangeTwo,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'rgba(0, 0, 0, 1)',
          borderWidth: 1,
          pointStyle: 'line',
          fill: false
        },*/
        {
            label: 'Compravendes',
            type: 'bar',
            data: rangeFour,
            backgroundColor: 'rgba(91, 155, 213, 0)',
            borderColor: 'rgba(31, 78, 121, 1)',
            borderRadius: Number.MAX_VALUE,
            borderWidth: 3,
        },
        {
            label: 'Hipoteques',
            type: 'bar',
            data: rangeThree,
            backgroundColor: 'rgba(91, 155, 213, 0.6)',
            borderColor: 'rgba(178, 10, 104, 1)',
            borderWidth: 0,
        },
      ]
    }
  })
}

// Request data from .csv file using D3js library
d3.csv('https://raw.githubusercontent.com/galetaire/spahousing/main/public/docs/spain_stats_csv.csv')
  .then(makeChart);
