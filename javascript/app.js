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
var hour;
var mins;
var minsAway;
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

  //console.log(trainName, destination, trainTime, frequency);
}

function writetoDatabase() {
  database.ref().push({
    trainName: trainName,
    destination: destination,
    traintime: trainTime,
    frequency: frequency,
    hour: hour,
    mins: mins,
    minutesaway: minsAway
  });
}

database.ref().on("child_added", function(snapshot) {
  var sv = snapshot.val();
  var trainName = sv.trainName;
  var destination = sv.destination;
  var trainTime = sv.traintime;
  var frequency = sv.frequency;
  //time calculation
  //console.log(trainTime);
  trainTime = trainTime.split(":");
  //console.log(trainTime);
  hour = parseInt(trainTime[0]);
  mins = parseInt(trainTime[1]);
  frequency = parseInt(frequency);
  var totalmins = hour * 60 + mins;
  minsAway = frequency % 60;
  //console.log(totalmins);
  totalmins = totalmins + frequency;
  //console.log(totalmins);
  mins = totalmins % 60;
  //console.log(mins);
  totalmins = totalmins - mins;
  hour = totalmins / 60;
  //hour = hour / 60;
  hour = hour % 24;
  //console.log(hour);
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (mins < 10) {
    mins = "0" + mins;
  }
  //----------------------------
  var row = $("<tr>");
  var rdtrainname = $("<td>").append(trainName);
  var rddestination = $("<td>").append(destination);
  var rdfrequency = $("<td>").append(frequency);
  var rdnextarrival = $("<td>").append(hour + ":" + mins);
  var rdminutesaway = $("<td>").append(minsAway);
  row
    .append(rdtrainname)
    .append(rddestination)
    .append(rdfrequency)
    .append(rdnextarrival)
    .append(rdminutesaway);
  $("#scheduletable").append(row);
});
