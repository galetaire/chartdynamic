//getGradient
let width, height, gradient;
function getGradient(ctx, chartArea, scales){
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (gradient === null || width !== chartWidth || height !== chartHeight){
    const pointzero = scales.y.getPixelForValue(0);
    const pointzeroheight = pointzero - chartArea.top;
    const pointzeroPercentage = pointzeroheight / chartHeight;
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartHeight + chartArea.top);
    gradient.addColorStop(pointzeroPercentage, 'rgba(0, 176, 80, 0.8)');
    gradient.addColorStop(pointzeroPercentage, 'rgba(225, 83, 83, 0.8)');
  }
  return gradient;
};

//Take data from css
function makeChart(multivariate) {
  var rangeStart = 1986 - 1964
  var rangeEnd = new Date().getFullYear() - 1964 + 13
  var rangeLabels = multivariate.map(function(d) {return d.Year}).slice(rangeStart, rangeEnd);
  var rangeEuribor = multivariate.map(function(d) {return d.IR_yoy_per}).slice(rangeStart, rangeEnd);
  var rangeInflation = multivariate.map(function(d) {return +d.Inflation_CPI}).slice(rangeStart, rangeEnd);
  var rangeUnemployment = multivariate.map(function(d) {return +d.Unemployment_yoy_per}).slice(rangeStart, 59);
  var rangeSales = multivariate.map(function(d) {return +d.Sales_yoy_per}).slice(rangeStart, rangeEnd);
  var rangeMortgages = multivariate.map(function(d) {return +d.Credit_yoy_per}).slice(rangeStart, rangeEnd);
  var rangeNominal = multivariate.map(function(d) {return +d.Nominal_price_yoy_per}).slice(rangeStart, rangeEnd);
  var rangeReal = multivariate.map(function(d) {return +d.Real_price_yoy_per}).slice(rangeStart, rangeEnd);

  var ctx = document.getElementById('multivariate').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    options: {
        scales: {
            x: {
                stacked: true,
                ticks: {
                  autoSkip: false,
                  maxRotation: 90,
                  minRotation: 90,
                },
              },
            y: {
                stacked: false,
            }
        }
    },
    data: {
        labels: rangeLabels,
        datasets: [
          {
            label: 'Euribor',
            type: 'line',
            data: rangeEuribor,
            backgroundColor: 'rgba(0, 176, 80, 0.7)',
            borderColor: function(context){
              const chart = context.chart;
              const {ctx, chartArea, scales} = chart;
                if(!chartArea) {
                return null;
              }
              return getGradient(ctx, chartArea, scales);
              },
            borderWidth: 2,
            showLine: true,
            pointRadius: 0,
            tension: 0.4,
            pointStyle: false,
            fill: false
          },
          {
            label: 'Inflation',
            type: 'line',
            data: rangeInflation,
            backgroundColor: 'rgba(250, 0, 0, 0.7)',
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 0.5,
            showLine: false,
            pointStyle: 'circle',
            pointRadius: 4,
            fill: false
          },
          {
            label: 'Unemployment',
            type: 'line',
            data: rangeUnemployment,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 1,
            borderDash: [1,3],
            pointStyle: 'crossRot',
            pointRadius: 8,
            fill: false
          },
          {
            label: 'Sales',
            type: 'line',
            data: rangeSales,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            borderDash: [3,3],
            pointStyle: 'rect',
            pointRadius: 8,
            fill: false
          },
          {
            label: 'Mortgages',
            type: 'line',
            data: rangeMortgages,
            backgroundColor: 'rgba(255, 20, 147, 0.2)',
            borderColor: 'rgba(255, 20, 147, 1)',
            borderWidth: 1,
            borderDash: [3,3],
            pointStyle: 'circle',
            pointRadius: 8,
            fill: false
          },
          {
            label: 'Nominal price',
            backgroundColor: 'rgb(89, 89, 89, 0.9)',
            borderColor: 'rgba(89, 89, 89, 1)',
            borderWidth: 1,
            data: rangeNominal,
            categoryPercentage: 0.5,
        },
        {
            label: 'Real price',
            backgroundColor: 'rgb(255, 95, 21, 0.4)',
            borderColor: 'rgba(255, 95, 21, 1)',
            borderWidth: 1,
            data: rangeReal,
            categoryPercentage: 0.8,
          }
        ]
      }
    })
  }

// Request data using D3
// Hosted in github, spainhousing repository.
d3.csv('https://raw.githubusercontent.com/galetaire/spahousing/main/public/docs/spain_stats_csv.csv')
  .then(makeChart);
