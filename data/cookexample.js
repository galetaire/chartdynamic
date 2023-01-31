function makeChart(players) {
  var rangeStart = 2003 - 1964
  var rangeEnd = new Date().getFullYear() - 1964 + 13
  var rangeLabels = players.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  var rangeSales = players.map(function(d) {return +d.Home_sales}).slice(rangeStart, rangeEnd);
  var rangeInheritances = players.map(function(d) {return +d.Inheritances}).slice(rangeStart, 59);
  var rangeUpper = players.map(function(d) {return +d.Upper_limit}).slice(rangeStart, rangeEnd);
  var rangeLower = players.map(function(d) {return +d.Lower_limit}).slice(rangeStart, rangeEnd);
  var rangeOptimal = players.map(function(d) {return +d.Optimal}).slice(rangeStart, rangeEnd);

// The following expression is give different colors to bars or points
//  var rangeColors = players.map(function(d) {return d.Gender === 'Female' ? '#F15F36' : '#19A0AA';}).slice(rangeStart, rangeEnd);

  var chart = new Chart('players', {
    type: 'bar',
    options: {
        scales: {
            xAxes: [{
                stacked: true,
                ticks: {
                  autoSkip: false,
                  maxRotation: 90,
                  minRotation: 90,
                  beginAtZero: true
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    },
    data: {
      labels: rangeLabels,
      datasets: [
        {
          label: 'Upper limit',
          type: 'line',
          data: rangeUpper,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'rgba(0, 0, 0, 1)',
          borderWidth: 1,
          borderDash: [0,1],
          pointStyle: 'circle',
          pointRadius: 4,
          fill: false
        },
        {
          label: 'Optimal',
          type: 'line',
          data: rangeOptimal,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'rgba(0, 0, 0, 1)',
          borderWidth: 1,
          borderDash: [3,2],
          pointStyle: 'dash',
          pointRadius: 0,
          fill: false
        },
        {
          label: 'Lower limit',
          type: 'line',
          data: rangeLower,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'rgba(0, 0, 0, 1)',
          borderWidth: 1,
          borderDash: [0,1],
          pointStyle: 'circle',
          pointRadius: 4,
          fill: false
        },
        {
          data: rangeInheritances,
          label: 'Inheritances',
          backgroundColor: 'rgba(178, 10, 104, 0.8)',
          borderColor: 'rgba(178, 10, 104, 1)',
          borderWidth: 1
        },
        {
          data: rangeSales,
          label: 'Home sales',
          backgroundColor: 'rgba(91, 155, 213, 0.8)',
          borderColor: 'rgba(31, 78, 121, 1)',
          borderWidth: 1,
          barThickness: 3
        }
      ]
    }
  })
}

// Request data using D3
// Hosted in dropbox, use 'raw=1' at the end to generate the valid url link.
d3.csv('https://raw.githubusercontent.com/galetaire/spahousing/main/public/docs/spain_stats_csv.csv')
  .then(makeChart);
