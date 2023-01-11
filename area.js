var ctx = document.getElementById('area').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Value 1", "Value 2", "Value 3", "Value 4", "Value 5"],
        datasets: [{
            label: 'Data Set',
            data: [-1.38, 2.85, -2.76, 3.34, 0.30],
            backgroundColor: function( value ) { // Callback instead of static color
    if ( value < 30 ) {
      return 'red';
    }
    return 'green';
  },
            borderColor: 'black',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
