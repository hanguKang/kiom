    //차트 보기 버튼
    let chart_open_btns = document.querySelectorAll('.chart_tit');
    console.log(chart_open_btns);
    chart_open_btns.forEach((btn)=>{
      btn.addEventListener('click',function(e){
        e.preventDefault(); 
        let nextElm = this.nextElementSibling;
        //console.log(chartBox);
        if( window.getComputedStyle(nextElm).display === "none")  {
          nextElm.style.display = 'block';
        }else{
          nextElm.style.display = 'none';
        }
      });
    });
    
    //탭 버튼
    let chart_tab_btns = document.querySelectorAll('.btn_tab_nav');
    let chart_items = document.querySelectorAll('.health_report_tab_item');
    let xAxis_data =  ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let getWeek = (date)=>{
      const currentDate = date.getDate();
      const firstDay = new Date(date.setDate(1)).getDay();
      return Math.ceil((currentDate + firstDay) / 7);
    }
    chart_tab_btns.forEach((btn)=>{
      btn.addEventListener('click',function(){
        let idx = Array.prototype.indexOf.call(chart_items, this.parentElement )
        chart_items.forEach( (li_elmnt)=>{
          li_elmnt.classList.remove('active');
        })
        chart_items[idx].classList.add('active');
        if(idx === 0){
          const week = getWeek(new Date()); //진료받은 주부터 시작인가         
          xAxis_data = []
        }else if(idx === 1){
          xAxis_data = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        }else{
          const year = new Date().getFullYear(); // 데이터가 언제까지 있을지 모른다.
          xAxis_data = [];
        }
      });
    });

    //차트 공통
    const colors = Highcharts.getOptions().colors;
    Highcharts.setOptions({
      chart: {
        type:'line',
        zooming: { type: 'x' },
        panning: true, 
        pandKey : 'shift'
        //margin:[0,0,50,0],
      },
      credits: {
        enabled: false
      },
      title: {
        useHTML: true,
      },
      subtitle:{
        useHTML: true,
      },
      legend: {
        enabled: false
      },
      xAxis: {
        categories : xAxis_data,
        labels:{ 
            // formatter() {
            //     //return new Date(this.value).toLocaleString('default', { month: 'short' })
            //     return Highcharts.dateFormat('%b', this.value);
            // }      
            useHTML: true,
            formatter(){
                return '<span class="hc-label">' + this.value + '</span>'
            },
            rotations : 0,            
            //padding:0, 
        },                
      },
      yAxis: {
        title: {
            text: '',
            visible:false,
        }, 
        tickInterval:1, 
        min:0, 
        max:10       
    },
    plotOptions:{
        series:{          
          marker:{
            radius:4,
            height:16, 
            width:16,
            lineWidth:4,            
            lineColor:'#ffffff',
            enabled:true,
            symbol: 'circle' //여러개를 사용할 때 모양이 자동으로 삼각형, 사각형 조정되는 것을 막는다. 
          },          
          lineWidth:2,
          
        }
    },
    legend: {
        //floating:true,
        //layout: 'vertical',
        //align: 'right', //left, right, top, bottom
        //verticalAlign: 'middle'
    },
    tooltip: {
        pointFormat: '{series.name} 성취가 <b>{point.y:,.0f}</b><br/>' +
            ' / {point.x} 이러합니다.'
    }
    });

    //차트 데이터
    let chart_list = {
      //운동
      sports : {
        renderElemnt:'chart_sports',
        title: '운동',
        type:'line',
        description:'능력발휘',
        subtext:null,
        color: 'rgba(23,190,207,1)',
        opacity:'rgba(23,190,207,0.5)',
        enabled:true,
        series: [ {name:'운동', data: [ 1.2, 4, 2, 3, 5, 6, 10, 2.5, 6.3, 4.2, 1.8, 2 ]} ]
      },
      //수분
      water : {
        renderElemnt:'chart_water',
        title: '수분',
        type:'line',
        description:'수분섭취',
        subtext:'',
        color: 'rgba(31,119,180,1)',
        opacity: 'rgba(31,119,180,0.5)',
        enabled:true,
        series: [ {name:'수분', data: [ 6.2, 5.8, 7.2, 6.5, 5.8, 6.8, 8.2, 7.5, 4.3, 8, 9, 6.4 ]} ]
      },
      //수면
      sleep : {
        renderElemnt:'chart_sleep',
        title: '수면',
        type:'line',
        description:'수면질',
        subtext:null,
        color: 'rgba(148,103,189,1)',
        opacity:'rgba(148,103,189,0.5)',
        enabled:true,
        series: [ {name:'수면', data: [0.5, 3.4, 1.8, 2.4, 1.6, 4.2, 6.8, 5.9, 4.9, 7.2, 8.1, 4.5 ]} ]
      },
      //기타
      etc : {
        renderElemnt:'chart_etc',
        title: '기타',
        type:'line',
        description:'기타',
        subtext:null,
        color: 'rgba(100,255,247,1)',
        opacity:'rgba(100,255,247,0.5)',
        enabled:true,
        series: [ {name:'기타', data:  [6.4, 7.2, 8.3, 4.5, 3.5, 3.6, 8.0, 6.4, 4.6, 2.5, 3.6, 4.3 ], zonesAxais:'x'} ]
      },
      //두통
      headache : {
        renderElemnt:'chart_headache',
        title: '두통',
        type:'line',
        description:'두통의 정도',
        subtext:null,
        color: 'rgba(194,202,0,1)',
        opacity:'rgba(194,202,0,0.5)',
        enabled:true,
        series: [ {name:'두통', data: [ 2.4, 3.1, 4.5, 5.2, 6.3, 2.8, 3.8, 4, 1, 3, 6, 7 ], zonesAxais:'x'} ]
      },
      //감기
      cold : {
        renderElemnt:'chart_cold',
        title: '감기',
        type:'line',
        description:'감기의 정도',
        subtext:null,
        color: 'rgba(28,89,69,1)',
        opacity:'rgba(28,89,69,0.5)',
        enabled:true,
        series: [ {name:'감기', data: [8.5, 7.4, 6.5, 4.3, 2, 1, 0, 4.5, 3.5, 6.8, 6, 5 ], zonesAxais:'x'} ]
      },
      //기능성소화장애
      indigestion : {
        renderElemnt:'chart_indigestion',
        title: '기능성 소화장애',
        type:'line',
        description:'기능성 소화장애의 정도',
        subtext:null,
        color: 'rgba(138,114,70,1)',
        opacity:'rgba(138,114,70, 0.5)',
        enabled:true,
        series: [ {name:'기능성 소화장애', data:  [ 4, 6, 4.3, 3.2, 6, 7, 6.5, 7, 3, 2.8, 4, 5 ], zonesAxais:'x'} ]
      },
      //수분대사
      waterdigest : {
        renderElemnt:'chart_waterdigest',
        title: '수분대사',
        subtext:'<span class="ico_hi_dot"><span> 수분 섭취가 너무 부족합니다. <br/>하루에 최소한 2리터의 물을 섭취하세요.',
        type:'line',
        description:'수분함량',
        color: 'rgba(23,190,207,1)',
        opacity:'rgba(23,190,207,0.5)',
        enabled:true,
        series: [ {name:'수분대사', data: [ 1.2, 4, 7, 3, 5, 8, 10, 2.5, 6.3, 4.2, 1.8, 2 ], zonesAxais:'x'} ]
      },
      //소화기능
      digest : {
        renderElemnt:'chart_digest',
        title: '소화기능',
        subtext:'<span class="ico_hi_dot"><span> 소화기능이 약합니다. . <br/>천천히 씹어 드세요.',
        type:'line',
        description:'소화기능섭취',        
        color: 'rgba(31,119,180,1)',
        opacity: 'rgba(31,119,180,0.5)',
        enabled:true,
        series: [{name:'소화기능', data: [ 6.2, 5.8, 7.2, 6.5, 5.8, 6.8, 8.2, 7.5, 4.3, 8, 9, 6.4 ], zonesAxais:'x'}] 
      },
      //열대사
      fever : {
        renderElemnt:'chart_fever',
        title: '열대사',
        subtext:'<span class="ico_hi_dot"><span> 현재 좋은 대사 상태입니다. . <br/>생활습관을 유지하세요.',
        type:'line',
        description:'열대사 정도',
        color: 'rgba(148,103,189,1)',
        opacity:'rgba(148,103,189,0.5)',
        enabled:true,
        series: [ {name:'열대사', data: [0.5, 3.4, 1.8, 2.4, 1.6, 4.2, 6.8, 5.9, 4.9, 7.2, 8.1, 4.5 ], zonesAxais:'x'} ]
      },
      //건강습관
      habit : {
        renderElemnt:'chart_habit',
        title: '건강습관',
        subtext:'<span class="ico_hi_dot"><span> 건강 상태가 매우 양호합니다.. . <br/>생활습관을 유지하세요.',
        type:'line',
        description:'건강습관',
        color: 'rgba(100,255,247,1)',
        opacity:'rgba(100,255,247,0.5)',
        enabled:true,
        series:  [ {name:'건강습관', data:  [6.4, 7.2, 8.3, 4.5, 3.5, 3.6, 8.0, 6.4, 4.6, 2.5, 3.6, 4.3 ], zonesAxais:'x'} ]
      },
      //정신건강
      mental : {
        renderElemnt:'chart_mental',
        title: '정신건강',
        subtext:'<span class="ico_hi_dot"><span> 정신 건강이 양호합니다.. . <br/> 생활습관을 유지하세요.',
        type:'line',
        description:'정신건강의 정도',
        color: 'rgba(194,202,0,1)',
        opacity:'rgba(194,202,0,0.5)',
        enabled:true,
        series:[ {name:'정신건강', data: [ 2.4, 3.1, 4.5, 5.2, 6.3, 2.8, 3.8, 4, 1, 3, 6, 7 ], zonesAxais:'x'} ]
      },
      //여성건강
      female : {
        renderElemnt:'chart_female',
        title: '여성건강',
        subtext:'<span class="ico_hi_dot"><span> 여성 건강이 양호합니다.. . <br/> 생활습관을 유지하세요.',
        type:'line',
        description:'여성건강의 정도',        
        color: 'rgba(28,89,69,1)',
        opacity:'rgba(28,89,69,0.5)',
        enabled:true,
        series:[ {name:'여성건강', data: [8.5, 7.4, 6.5, 4.3, 2, 1, 0, 4.5, 3.5, 6.8, 6, 5 ], zonesAxais:'x'} ],
      },    
      //차트정보 종합
      serieseObj : {
        renderElemnt:'chart_all',
        title: '개인 건강상태 정보 종합',
        subtext:null,
        type:'areaspline',
        description:'정도',
        subtext:null,
        enabled:false,
        series: []
      }  
    }

    function express_null_data(data_list){
      let zones = [];
      let data_list_arr = data_list; 
      data_list_arr.filter((point) => point === null).forEach((point, idx) => {
        zones.push({
            value:  xAxis_data[ idx - 1],
              dashStyle: 'Solid',
          }, {
            value: xAxis_data[ idx + 1],
              dashStyle: 'Dash',
          });
      })
    }

    let  seriesArr = Object.keys(chart_list).forEach( key => {

      //console.log(chart_list[key].series[0].data)
      if(chart_list[key].series && chart_list[key].subtext){
        
        chart_list.serieseObj.series.push( {
          name: chart_list[key].title,        
          fillColor: {
                  linearGradient: {
                      x1: 0,
                      y1: 0,
                      x2: 1,
                      y2: 0
                  },
                  stops: [
                      [0, chart_list[key].opacity],
                      [1, chart_list[key].opacity]
                  ]
          },
          data: chart_list[key].series[0].data,
          zonesAxais:'x',
          
        })//push End      

      }
    });
    //console.log(chart_list.serieseObj.series);

    
    Object.keys(chart_list).forEach( key => {      
      if( document.querySelector("#"+ chart_list[key].renderElemnt) ){
        drawChart(chart_list[key]);
      }
    });
    
    // drawChart(chart_list.sports);
    // drawChart(chart_list.water);
    // drawChart(chart_list.sleep);
    // drawChart(chart_list.etc);
    // drawChart(chart_list.headache);
    // drawChart(chart_list.cold);
    // drawChart(chart_list.indigestion);
    // drawChart(chart_list.waterdigest);
    // drawChart(chart_list.digest);
    // drawChart(chart_list.fever);
    // drawChart(chart_list.habit);
    // drawChart(chart_list.mental);
    // drawChart(chart_list.female);
    // drawChart(serieseObj);

   


    function drawChart(chartObj){

      //let series = (chartObj.enabled)? [chartObj.data] : chartObj.series;

      Highcharts.chart({
        chart: {
          type:chartObj.type,
          renderTo: chartObj.renderElemnt,
          marginTop:50
        },
        accessibility: {
            description: chartObj.title+' 그래프 x축(가로축은 시간) y축(세로축은 '+ chartObj.description +')를 의미합니다.'
        },
        
        title: {
            text: '', 
            align:'left',
            x:20
        },
        subtitle:{
          text:chartObj.subtext,
          align:'left',
          x:20, 
          
        },
        legend: {
            floating:false,
            layout: 'horizontal',
            backgroundColor:'rgba(255,255,255,0.5)',
            //itemDistance:100,
            align: 'left',
            x:30, 
            y:10, 
            width:300, 
            height:50,
            verticalAlign: 'bottom'
        },
        plotOptions:{
          series:{        
            color:chartObj.color,  
            marker:{
              enabled:chartObj.enabled,
            },          
            lineWidth:2,
          }
        },
        series: chartObj.series
      });

    }