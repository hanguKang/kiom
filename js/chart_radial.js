Highcharts.chart('person_type', {

  chart: {
      polar: true,
      //margin:[0, 10, 90, 5], //상우하좌      
      height:120+'%',      
      style: {//차트 전체 스타일 지정
				color: '#444',
			  fontFamily: 'notoSans',
				fontWeight:'400'
			},
  },

  accessibility: {
      description: '웹 차트는 할당된 9가지 목표치를 비교합니다. ' +
          '차트는 9가지 면을 의미합니다. 각 9가지는 그 기능의 수치를 각각 의미합니다.  ' +
          '각 의미는 다음과 같습니다. : 운동, 수분, ' +
          '수면, 수화기능, 수분대사, 열대사, 건강습관, 정신건강, 여성건강을 의미합니다. ' +
          '각차타의 포인트에 마우스 오버나 키보드로 연결되면, ' +
          '각 수치를 말풍선으로 표기해줍니다.' 
  },

  title: {
      text: '',
      x: -80
  },
  pane: {
      size: '80%'
  },
  credits: {
    enabled: false
  },
  xAxis: {
      categories: [
          '운동', '수분', '수면', '소화기능', '수분대사', '열대사', '건강습관', '정신건강', '여성건강'
      ],
      tickmarkPlacement: 'on',
      lineWidth: 0,      
      labels:{
        allowOverlap: true,
        enabled:true,
        distance:'110%',
        y:10, 
        style:{
          color:'$444',
          fontSize:'12px'
        },
        useHTML: true,
        formatter(){
             return '<span class="hc-label">' + this.value + '</span>'
        },
      }
  },

  yAxis: {
      gridLineInterpolation: 'polygon',
      lineWidth: 0,
      min: 0
  },
  tooltip: {
      shared: true,
      pointFormat: '<span style="color:{series.color}">{series.name}: <b>' +
          '{point.y:,.0f}점</b><br/>'
  },

  legend: {
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical'
  },
  plotOptions: {
    series:{
      dataLabels:{
        //allowOverlap: true, //#1 데이터가 겹쳐서 이상하게 보여도 보일 수 있도록 한다. 
        //enabled:true, //#2 데이터가 겹쳐서 이상하게 보여도 보일 수 있도록 한다. 
      }
    }
  },

  series: [{
      type: 'area',
      name: '목표 수치', //Allocated budget    
      data: [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0 ],
      //pointPlacement: 'on'
      fillOpacity:0.5,
  }, {
      type: 'area',
      name: '실제 수치', //Actual Spending
      data: [4.0, 3.9, 4.2, 3.1, 2.6, 1.4, 3.0, 2.3, 4.2],
      //pointPlacement: 'on'
      fillOpacity:0.5, 
  }],

  responsive: {
      rules: [{
          condition: {
              maxWidth: 500
          },
          chartOptions: {
              legend: {
                  align: 'center',
                  verticalAlign: 'bottom',
                  layout: 'horizontal'
              },
              pane: {
                  size: '70%'
              }
          }
      }]
  },
  navigation:{
    buttonOptions:{
      enabled:false,
    }
  }

});