var config = {
  apiKey: "AIzaSyAehSLazwmVquQ0QKDrzrv5YLY6ykGXt2s",
  authDomain: "kasantosh38.firebaseapp.com",
  databaseURL: "https://kasantosh38.firebaseio.com",
  projectId: "kasantosh38",
  storageBucket: "kasantosh38.appspot.com",
  messagingSenderId: "495098660774"
};
firebase.initializeApp(config);
var database = firebase.database();
var trainName;
var destination;
var trainTime;
var frequency;
$(document).ready(function() {
  $("#submit").on("click", function(e) {
    e.preventDefault();
    getinfo();
    writetoDatabase();
  }); //---------------------submit click
}); //-------------document ready

function getinfo() {
  trainName = $("#trainname")
    .val()
    .trim();
  destination = $("#destination")
    .val()
    .trim();
  trainTime = $("#traintime").val();
  frequency = $("#frequency")
    .val()
    .trim();
  //getting moment time format

  //----------------------------
  console.log(trainName, destination, trainTime, frequency);
}

function writetoDatabase() {
  database.ref().push({
    trainName: trainName,
    destination: destination,
    traintime: trainTime,
    frequency: frequency
  });
}

database.ref().on("child_added", function(snapshot) {
  var sv = snapshot.val();
  var trainName = sv.trainName;
  var destination = sv.destination;
  var trainTime = sv.traintime;
  var frequency = sv.frequency;
  var row = $("<tr>");
  var rdtrainname = $("<td>").append(trainName);
  var rddestination = $("<td>").append(destination);
  var rdfrequency = $("<td>").append(frequency);
  var rdnextarrival = $("<td>").append(trainTime);
  var rdminutesaway = $("<td>").append("mins away");
  row
    .append(rdtrainname)
    .append(rddestination)
    .append(rdfrequency)
    .append(rdnextarrival)
    .append(rdminutesaway);
  $("#scheduletable").append(row);
});
