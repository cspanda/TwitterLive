var obj, yVal;
var startAnalysis = $("#enter-button");

var total = 0;
var runtime;

function run(){
    var delay = document.getElementById("text-for-time").value;
    var keyWord = document.getElementById("text-for-hashtag").value;
    var timeStamp = Date.now();
    var url = "http://tomcatbilalo89.azurewebsites.net/TomcatTest/jsonServlet?keyword="+ keyWord +"&sdate="+ timeStamp +"&edate=0&tinterval=" + delay;
    //alert(url);
    $.getJSON(url, function(data) {    
        obj = JSON.parse(data);
        yVal = obj.Count;
        total = total + obj.count;
        console.log(obj)
        updateChart(yVal);
    });
}

/*function totalSoFar(){
    run();
    setInterval(run(), delay);
    document.getElementById("resultTNT").innerHTML = total;
}*/

/*function averageNumofTweets(){
    var totalAmount = totalSoFar();
    document.getElementById("resultAVT").innerHTML = totalAmount/runtime;
}*/

/*startAnalysis.onclick = function(){ 
    totalSoFar();
};*/

window.onload = function(){
    
    /*startAnalysis.on('click', function(){
        totalSoFar();
    });*/

    document.getElementById("enter-button").addEventListener("click",run);

    var delay = $("#text-for-time").val();
    console.log(delay); 
       
    clock();
    
    var dps = []; // dataPoints
    
    
    var chart = new CanvasJS.Chart("chartContainer",{
        title :{
            text: "Time and Frequency"
        },          
        data: [{
            type: "line",
            dataPoints: dps 
        }]
    });

    var xVal = 0;
    var updateInterval = delay;
    var dataLength = 500; // number of dataPoints visible at any point

    var updateChart = function (yVal) {
    // var updateChart = function (count,yVal) {
        if( 0 < yVal ) console.log('charting run '+yVal);
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
    updateChart(); 
    // updateChart(dataLength); 

    // update chart after specified time. 
    setInterval(function(){updateChart(yVal)}, updateInterval);  

};

//second clock
var clock = function () {

    var seconds = 00;
    var tens = 00;
    var minutes = 00;
    var hours = 00;
    var appendMinutes = document.getElementById("minutes")
    var appendHours = document.getElementById("hours")
    var appendTens = document.getElementById("tens")
    var appendSeconds = document.getElementById("seconds")
    var buttonStart = document.getElementById('enter-button');
    var buttonStop = document.getElementById('button-stop');
    var buttonReset = document.getElementById('button-reset');
    var Interval ;

    buttonStart.onclick = function() {

        clearInterval(Interval);
        Interval = setInterval(startTimer, 10);
    }

    buttonStop.onclick = function() {
        clearInterval(Interval);
    }

    buttonReset.onclick = function() {
         clearInterval(Interval);
  
        tens = "00";
        seconds = "00";
        minutes = "00";
        hours = "00";
        appendTens.innerHTML = tens;
        appendSeconds.innerHTML = seconds;
        appendMinutes.innerHTML = minutes;
        appendHours.innerHTML = hours;
    }

    function startTimer () {
        tens++; 

        if(tens < 9){
          appendTens.innerHTML = "0" + tens;
        }

        if (tens > 9){
          appendTens.innerHTML = tens;
          
        } 

        if (tens > 99) {
          console.log("seconds");
          seconds++;
          appendSeconds.innerHTML = "0" + seconds;
          tens = 0;
          appendTens.innerHTML = "0" + 0;
        }

        if (seconds > 9){
          appendSeconds.innerHTML = seconds;
        }

        if (seconds > 59){
            minutes++;
            appendMinutes.innerHTML = "0" + minutes;
            seconds = 0;
            appendSeconds.innerHTML = "0" + 0;
        }

        if (minutes > 9){
            appendMinutes.innerHTML = minutes;
        }

        if (minutes > 59) {
            hours++;
            appendHours.innerHTML = "0" + hours;
            minutes = 0;
            appendMinutes.innerHTML = "0" + 0;
        }

        if (hours > 9) {
            appendHours.innerHTML = hours;
        }
    }
}