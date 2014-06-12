/*global $, jQuery, document, io*/

$(document).ready(function () {
    "use strict";
    var socket = io.connect('http://localhost:1337'),
        numericInput = $('#numericInput'),
        rateSlider = $('#rateSlider'),
        rateValue = $('#rateValue'),
        gaugeContainer = $('#gaugeContainer'),
        header = $('#header');
    
//setup jqxWidgets
    numericInput.jqxNumberInput({ width: '250px', height: '25px',  spinButtons: true});
    rateSlider.jqxSlider({ min: 0, max: 1000, ticksFrequency: 100, value: 1000, step: 5});
    gaugeContainer.jqxGauge({
        ranges: [{ startValue: 0, endValue: 55, style: { fill: '#4bb648', stroke: '#4bb648' }, endWidth: 5, startWidth: 1 },
                         { startValue: 55, endValue: 110, style: { fill: '#fbd109', stroke: '#fbd109' }, endWidth: 10, startWidth: 5 },
                         { startValue: 110, endValue: 165, style: { fill: '#ff8000', stroke: '#ff8000' }, endWidth: 13, startWidth: 10 },
                         { startValue: 165, endValue: 220, style: { fill: '#e02629', stroke: '#e02629' }, endWidth: 16, startWidth: 13 }],
        ticksMinor: { interval: 5, size: '5%' },
        ticksMajor: { interval: 10, size: '9%' },
        value: 0,
        colorScheme: 'scheme05',
        animationDuration: 100
    });
    
//event handlers
    rateSlider.on('change', function (event) {
        var value = rateSlider.val();
        rateValue.text(value);
    });
    rateSlider.on('slideEnd', function (event) {
        var value = event.args.value;
        socket.emit('my other event', {rate: value});
    });
    
//websocket implementation
    socket.on('news', function (data) {
        header.text(data.dataCount);
        numericInput.val(data.dataCount);
        gaugeContainer.val(data.dataCount);
    });
});

