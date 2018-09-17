$(document).ready(function() {

    // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCtPEiBVDgrsOUxRlgF15o7-xg9BmAW4_Q",
    authDomain: "train-scheduler-9f1e4.firebaseapp.com",
    databaseURL: "https://train-scheduler-9f1e4.firebaseio.com",
    projectId: "train-scheduler-9f1e4",
    storageBucket: "",
    messagingSenderId: "442487246"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTime = $("#first-time-input").val().trim();
    var frequency = parseInt($("#frequency-input").val().trim());

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency
    }

    database.ref().push(newTrain);

    alert("Train Added!");

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-time-input").val("");
    $("#frequency-input").val("");

  });

  database.ref().on("child_added", function(childSnapshot) {


    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTime = childSnapshot.val().firstTime;
    var frequency = parseInt(childSnapshot.val().frequency);


    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    var remainder = diffTime % frequency;

    var minutesTill = frequency - remainder;

    var nextTrain = moment().add(minutesTill, "minutes");

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(moment(nextTrain).format('LT')),
        $("<td>").text(minutesTill)
    );

    $("#train-table > tbody").append(newRow);


  });

});