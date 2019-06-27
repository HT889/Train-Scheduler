var firebaseConfig = {
    apiKey: "AIzaSyDhqJNDFHrS5PRXjG42XqCmp9CNbFP6uZk",
    authDomain: "train-time-3cdb0.firebaseapp.com",
    databaseURL: "https://train-time-3cdb0.firebaseio.com",
    projectId: "train-time-3cdb0",
    storageBucket: "train-time-3cdb0.appspot.com",
    messagingSenderId: "242982667279",
    appId: "1:242982667279:web:9c169fd68623a268"
  };
  // initialize firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  $(document).ready(function() {
    //starting values:
    var trainName = "";
    var destination = "";
    var firstTrainTime = "";
    var frequency = "";
    // console.log('moment',moment.js);

    $("#submit").on("click", function() {
      trainName = $("#train-name").val().trim();
      destination = $("#destination").val().trim();
      firstTrainTime = $("#first-train-time").val().trim();
      frequency = $("#frequency").val().trim();
      //new stuff ========================
      var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
      var currentTime = moment();
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      var tRemainder = diffTime % frequency;
      var tMinutesTillTrain = frequency - tRemainder;
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      parseInt(tMinutesTillTrain);
      //================================================

      database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        tMinutesTillTrain: tMinutesTillTrain  //new stuff
      })

      $("#train-name").val("");
      $("#destination").val("");
      $("#first-train-time").val("");
      $("#frequency").val("");

      // console.log(trainName, destination, firstTrainTime, frequency)

    })
    database.ref().on("child_added", function(snapshot){
      var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
      var currentTime = moment();
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      var tRemainder = diffTime % snapshot.val().frequency;
      var tMinutesTillTrain = snapshot.val().frequency - tRemainder;
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      





      console.log(snapshot.val())
      $("#main-table").append($("<tr>").append($("<td>").text(snapshot.val().trainName), $("<td>").text(snapshot.val().destination), $("<td>").text(snapshot.val().frequency), $("<td>").text(nextTrain), $("<td>").text(snapshot.val().tMinutesTillTrain)))
    })
    // console.log(tMinutesTillTrain)

  })