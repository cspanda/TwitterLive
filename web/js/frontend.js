window.onload = function() {


	var startAnalysis = document.getElementById("enter-button");

	var total = 0;
	var runtime;

	function run(){
	    var url = "https://dl.dropboxusercontent.com/u/53597397/test.html";
	    
	    $.getJSON(url, function(data) {    
	        var obj = JSON.parse(data);
	        total = total + obj.TimePoint[0].Total;
	   });
	}

	function totalSoFar(){
		run();
		setInterval(run(), delay);
		document.getElementById("resultTNT").innerHTML = total;
	}

	$(window).load( function lineGraph(){
			$time = document.getElementById('time');
	       
	        show();
	    
	        var dps = []; // dataPoints
	        var obj = run();
	        
			var chart = new CanvasJS.Chart("chartContainer",{
				title :{
					text: "Time and Frequency"
				},			
				data: [{
					type: "line",
					dataPoints: dps 
				}]
			});

			var xVal = obj.TimePoint[0].Time;
			var yVal = obj.TimePoint[0].Count;	
			var updateInterval = delay;
			var dataLength = 500; // number of dataPoints visible at any point

			var updateChart = function (count) {
				count = count || 1;
				// count is number of times loop runs to generate random dataPoints.
				
					dps.push({
						x: xVal,
						y: yVal
					});
					xVal++;
	            //}
	        
				if (dps.length > dataLength)
				{
					dps.shift();				
				}
				
				chart.render();		

			};

			// generates first set of dataPoints
			updateChart(dataLength); 

			// update chart after specified time. 
			setIntserval(function(){updateChart();}, updateInterval); 

	});


	//clock
	var	clsStopwatch = function() {
			// Private vars
			var	startAt	= 0;	// Time of last start / resume. (0 if not running)
			var	lapTime	= 0;	// Time on the clock when last stopped in milliseconds
	 
			var	now	= function() {
					return (new Date()).getTime(); 
				}; 
	 
			// Public methods
			// Start or resume
			this.start = function() {
					startAt	= startAt ? startAt : now();
				};
	 
			// Stop or pause
			this.stop = function() {
					// If running, update elapsed time otherwise keep it
					lapTime	= startAt ? lapTime + now() - startAt : lapTime;
					startAt	= 0; // Paused
				};
	 
			// Reset
			this.reset = function() {
					lapTime = startAt = 0;
				};
	 
			// Duration
			this.time = function() {
					return lapTime + (startAt ? now() - startAt : 0); 
				};
		};
	 
	var x = new clsStopwatch();
	var $time;
	var clocktimer;
	 
	function pad(num, size) {
		var s = "0000" + num;
		return s.substr(s.length - size);
	}
	 
	function formatTime(time) {
		var h = m = s = ms = 0;
		var newTime = '';
	 
		h = Math.floor( time / (60 * 60 * 1000) );
		time = time % (60 * 60 * 1000);
		m = Math.floor( time / (60 * 1000) );
		time = time % (60 * 1000);
		s = Math.floor( time / 1000 );
		ms = time % 1000;
	 
		newTime = pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2) + ':' + pad(ms, 3);
		return newTime;
	}
	 
	function show() {
		$time = document.getElementById('time');
		update();
	}
	 
	function update() {
		$time.innerHTML = formatTime(x.time());
	}
	 
	function start() {
		clocktimer = setInterval("update()", 1);
		x.start();
	}
	 
	function stop() {
		x.stop();
		clearInterval(clocktimer);
	}
	 
	function reset() {
		var delay = document.getElementById("text-for-time").value;
		stop();
		x.reset();
		update();
	}

	function averageNumofTweets(){
	    var totalAmount = totalSoFar();
	    document.getElementById("resultAVT").innerHTML = totalAmount/runtime;
	}

};
