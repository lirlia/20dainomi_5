$(function() {
  firebase.initializeApp({databaseURL: "https://my-apps-9b366.firebaseio.com"});
  database = firebase.database();
  last_message = "dummy";

  my_firebase()

  // firebase
  function my_firebase() {

    ref = database.ref('transaction');

    //初期読み込み & pushイベント検知
    ref.on("value", function(snapshot) {

      var array = []
      snapshot.forEach(function(child) {

        //チーム名がdefaultの場合はスキップ
        if (child.key == 'default') { return false }

        //配列へ格納
        array.push([child.key,child.val().money_amount])

      });
      // ソートを実施
      //array = array.sort(function(a,b){return(b[1] - a[1]);});

      var labels = $.map(array, function(elem, i) { return 'チーム' + elem[0] })
      var data = $.map(array, function(elem, i) { return elem[1] })
      var sum = arraySum(data);

      Chart.defaults.global.defaultFontSize = 20
      barChartData = {
        labels : labels,
        datasets : [
            {
            label: "各チームの所持金",
            backgroundColor: "rgba(0,181,198,0.5)",
            data : data,
            }
        ],
      }

      Chart.pluginService.register({
          beforeRender: function (chart) {
              if (chart.config.options.showAllTooltips) {
                  // create an array of tooltips
                  // we can't use the chart tooltip because there is only one tooltip per chart
                  chart.pluginTooltips = [];
                  chart.config.data.datasets.forEach(function (dataset, i) {
                      chart.getDatasetMeta(i).data.forEach(function (sector, j) {
                          chart.pluginTooltips.push(new Chart.Tooltip({
                              _chart: chart.chart,
                              _chartInstance: chart,
                              _data:  chart.data,
                              _options: chart.options.tooltips,
                              _active: [sector]
                          }, chart));
                      });
                  });

                  // turn off normal tooltips
                  chart.options.tooltips.enabled = false;
              }
          },
          afterDraw: function (chart, easing) {
              if (chart.config.options.showAllTooltips) {
                  // we don't want the permanent tooltips to animate, so don't do anything till the animation runs atleast once
                  if (!chart.allTooltipsOnce) {
                      if (easing !== 1)
                          return;
                      chart.allTooltipsOnce = true;
                  }

                  // turn on tooltips
                  chart.options.tooltips.enabled = true;
                  Chart.helpers.each(chart.pluginTooltips, function (tooltip) {
                    tooltip.initialize();
                    tooltip.update();
                    // we don't actually need this since we are not animating tooltips
                    tooltip.pivot();
                    tooltip.transition(easing).draw();
                    chart.options.tooltips.enabled = true;
                  });
           }
         }
      })

      const config = {
          type: 'bar',
          data: barChartData,
          responsive : true,
          options: {
            animation: false,
            scales: {
              xAxes: [{
                gridLines : {
                  display : false
                }
              }],
              yAxes: [{
                gridLines : {
                  display : false
                },
                ticks: {
                    beginAtZero: true,
                    fontSize: 17
                }
              }]
            },
            // http://www.chartjs.org/docs/latest/configuration/tooltip.html#external-custom-tooltips
            tooltips: {
              bodyFontSize: 20,
              callbacks: {
                title: function(){ return ''},
                label: function(tooltipItems, data) {
                  return addComma(tooltipItems.yLabel) + 'G'
                }
              }
            },
            showAllTooltips: true
          }
        }

      const context = jQuery("#chart")
      const chart = new Chart(context,config)
    })
  };

  function arraySum(data){
    var sum = 0;

    for (var i = 0,len = data.length; i < len; ++i) {
      sum += data[i];
    };

    return sum;
  }

  function priceHistory(message){
    price = message.value.value

    if ( price > 0) {
      message_html = '<p class="post-text">所持金 <span class="font_blue">+' + addComma(price) + 'G</span></p>';
    } else {
      message_html = '<p class="post-text">所持金 <span class="font_red">' + addComma(price) + 'G</span></p>';
    }

    date_html = '';
    if(message.value.date) {
      date_html = '<p class="post-date">' + new Date(message.value.date).toLocaleString() +'</p>';
    }

    $('.' + last_message).before('<div class="' + message.id + ' post">' + message_html + date_html +'</div>');
    last_message = message.id;
  }
});
