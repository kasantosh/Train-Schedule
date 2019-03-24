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
    $("#errormessage").empty();
    e.preventDefault();
    getinfo();
    if (hour > 23 || mins > 59) {
      errorcheck();
    } else if (trainName === "" || destination === "" || frequency === "") {
      checkfield();
    } else {
      writetoDatabase();
    }
  }); //---------------------submit click
}); //-------------document ready

function getinfo() {
  trainName = $("#trainname")
    .val()
    .trim();
  destination = $("#destination")
    .val()
    .trim();
  hour = $("#hour").val();
  mins = $("#mins").val();

  frequency = $("#frequency")
    .val()
    .trim();

  console.log(trainName, destination, hour, mins, frequency);
}
function errorcheck() {
  $("#errormessage").text("Please enter valid hours and minutes");
  reset();
}
function checkfield() {
  $("#fieldcheck").text("Please enter all fields");
  reset();
}
function reset() {
  $("#trainname").val("");
  $("#destination").val("");
  $("#hour").val("");
  $("#mins").val("");
  $("#frequency").val("");
}

function errorreset() {
  $("#errormessage").empty();
  $("#fieldcheck").empty();
}

function writetoDatabase() {
  errorreset();
  database.ref().push({
    trainName: trainName,
    destination: destination,
    frequency: frequency,
    hour: hour,
    mins: mins
  });
}

database.ref().on("child_added", function(snapshot) {
  var sv = snapshot.val();
  trainName = sv.trainName;
  destination = sv.destination;
  frequency = sv.frequency;
  hour = sv.hour;
  mins = sv.mins;
  // //time calculation
  //console.log(trainTime);
  errorcheck();

  //console.log(trainTime);
  hour = parseInt(hour);
  mins = parseInt(mins);
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
