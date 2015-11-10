$(document).ready(function()
{
	var project_id = 720;
	var total_errorcount;
	var baseurl = 'https://honeyqa.io:8080';

	$.ajax({
		url:'/api/project/'+project_id+'/weekly/error',
		async: false,
		success:function(data){
			total_errorcount = data.data;
			console.log(total_errorcount);
		}
	});

	// daily error count area graph
	$.ajax({
		url:'https://honeyqa.io:8080/project/'+project_id+'/weekly_appruncount2',
		success:function(data){
			var chart_data =[];
			
			for(var i = 0; i < data.data.length; i++){
				var datetime = new Date(data.data[i][0]);
				var mm = (datetime.getMonth()+1).toString();
				var dd = datetime.getDate().toString();

				var elapsed = (mm[1] ? mm : '0' + mm[0])+'/'+(dd[1] ? dd : '0' + dd[0]);
				var value = data.data[i][1];

				var element = new Object();

				element.elapsed =  elapsed;
				element.value = value;
				chart_data.push(element);
			}

			Morris.Area({
				element: 'crash-rate',
				data: chart_data,
				xkey: 'elapsed',
				ykeys: ['value'],
				labels: ['value'],
				lineColors:['#79D1CF'],
				parseTime: false
			});
		} // error 처리
	});

	// error rank rate donut graph
	$.ajax({
		url:'/api/project/' + project_id + '/weekly/rank',
		success:function(data){
			var chart_data =[];
			for(var i = 0; i < data.length; i++){
				var element = new Object();
				element.value =  data[i].count;
				element.label = data[i].rank;
				element.formatted = ((data[i].count/total_errorcount) * 100).toFixed(1) + '%';
				chart_data.push(element);
			}

			Morris.Donut({
				element: 'graph-donut-rank',
				data: chart_data,
				backgroundColor: '#fff',
				labelColor: '#1fb5ac',
				colors: [
					'#E67A77','#D9DD81','#79D1CF','#95D7BB'
				],
				formatter: function (x, data) { return data.formatted; }
			});

		} // error 처리
	});

	// error osversion rate donut graph
	$.ajax({
		url: baseurl + '/statistics/' + project_id + '/osversion',
		success:function(data){

			var chart_data =[];
			for(var i = 0; i < data.length; i++){
				var element = new Object();
				element.value =  data[i].count;
				element.label = data[i].osversion;
				element.formatted = ((data[i].count/total_errorcount) * 100).toFixed(1) + '%';
				chart_data.push(element);
			}

			Morris.Donut({
				element: 'graph-donut-sdk',
				data: chart_data,
				backgroundColor: '#fff',
				labelColor: '#1fb5ac',
				colors: [
					'#E67A77','#D9DD81','#79D1CF','#95D7BB'
				],
				formatter: function (x, data) { return data.formatted; }
			});
		} // error 처리
	});

	// error country rate donut graph
	$.ajax({
		url: baseurl + '/statistics/' + project_id + '/country',
		success:function(data){

			var chart_data =[];
			for(var i = 0; i < data.length; i++){
				var element = new Object();
				element.value =  data[i].count;
				element.label = data[i].country;
				element.formatted = ((data[i].count/total_errorcount) * 100).toFixed(1) + '%';
				chart_data.push(element);
			}

			Morris.Donut({
				element: 'graph-donut-country',
				data: chart_data,
				backgroundColor: '#fff',
				labelColor: '#1fb5ac',
				colors: [
					'#E67A77','#D9DD81','#79D1CF','#95D7BB'
				],
				formatter: function (x, data) { return data.formatted; }
			});
		} // error 처리
	});

	// error device line graph
	$.ajax({
		url: baseurl + '/statistics/' + project_id + '/device',
		success:function(data){
			var labels = [];
			var chart_data = [];

			for(var i = 0; i < data.length; i++){
				labels.push(data[i].device);
				chart_data.push(data[i].count);
			}

			(function(){
				var t;
				function size(animate){
					if (animate == undefined){
						animate = false;
					}
					clearTimeout(t);
					t = setTimeout(function(){
						$("canvas").each(function(i,el){
							$(el).attr({
								"width":$(el).parent().width(),
								"height":$(el).parent().outerHeight()
							});
						});
						redraw(animate);
						var m = 0;
						$(".chartJS").height("");
						$(".chartJS").each(function(i,el){ m = Math.max(m,$(el).height()); });
						$(".chartJS").height(m);
					}, 30);
				}
				$(window).on('resize', function(){ size(false); });

				function redraw(animation){
					var options = {};
					if (!animation){
						options.animation = false;
					} else {
						options.animation = true;
					}

					(function(){
						var barChartData = {
							labels: labels,
							datasets: [
								{
									fillColor: "#79d1cf",
									strokeColor: "#79d1cf",
									data: chart_data
								}
							]
						}

						var myLine = new Chart(document.getElementById("device-errorrate").getContext("2d")).Bar(barChartData);
					})();
				}
				size(true);
			}());
		} // error 처리
	});

	// class error line graph
	$.ajax({
		url: baseurl + '/statistics/' + project_id + '/country',
		success:function(data){

			var chart_data =[];
			for(var i = 0; i < data.length; i++){
				var element = new Object();
				element.value =  data[i].count;
				element.label = data[i].country;
				element.formatted = ((data[i].count/total_errorcount) * 100).toFixed(1) + '%';
				chart_data.push(element);
			}

			Morris.Donut({
				element: 'graph-donut-country',
				data: chart_data,
				backgroundColor: '#fff',
				labelColor: '#1fb5ac',
				colors: [
					'#E67A77','#D9DD81','#79D1CF','#95D7BB'
				],
				formatter: function (x, data) { return data.formatted; }
			});
		} // error 처리
	});

	// error activity line graph
	$.ajax({
		url: baseurl + '/statistics/' + project_id + '/country',
		success:function(data){

			var chart_data =[];
			for(var i = 0; i < data.length; i++){
				var element = new Object();
				element.value =  data[i].count;
				element.label = data[i].country;
				element.formatted = ((data[i].count/total_errorcount) * 100).toFixed(1) + '%';
				chart_data.push(element);
			}

			Morris.Donut({
				element: 'graph-donut-country',
				data: chart_data,
				backgroundColor: '#fff',
				labelColor: '#1fb5ac',
				colors: [
					'#E67A77','#D9DD81','#79D1CF','#95D7BB'
				],
				formatter: function (x, data) { return data.formatted; }
			});
		} // error 처리
	});

	// version error rate multi line graph
	$.ajax({
		url: baseurl + '/statistics/' + project_id + '/country',
		success:function(data){

			var chart_data =[];
			for(var i = 0; i < data.length; i++){
			}

			(function(){
				var chart = c3.generate({
					bindto: '#version-chart',
					data: {
						columns: [
							['data1', 30, 20, 50, 40, 60, 50],
							['data2', 200, 130, 90, 240, 130, 220],
							['data3', 300, 200, 160, 400, 250, 250],
							['data4', 200, 130, 90, 240, 130, 220],
							['data5', 130, 120, 150, 140, 160, 150]
						],
						types: {
							data1: 'bar',
							data2: 'bar',
							data3: 'bar',
							data4: 'bar',
							data5: 'bar'
						},
						groups: [
							['data1','data2', 'data3', 'data4', 'data5']
						]
					},color: {
						pattern: ['#1fb5ac','#E67A77','#D9DD81','#f0ad4e','#95D7BB']
					},
					axis: {
						rotated: true,
						x: {
							type: 'categorized'
						},
						y: {
							type: 'categorized',
							categories: ['cat1', 'cat2', 'cat3', 'cat4', 'cat5', 'cat6', 'cat7', 'cat8', 'cat9']
						}
					}
				});
			})();
		} // error 처리
	});
});


