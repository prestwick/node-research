$(document).ready(function() {
    $("#numericInput").jqxNumberInput({ width: '250px', height: '25px',  spinButtons: true});
    var socket = io.connect('http://localhost:1337');
    socket.on('news', function (data) {
        //console.log(data);
        $('#header').text(data.dataCount);
        $('#numericInput').val(data.dataCount);
        //socket.emit('my other event', {my: 'data'})
    });
});

