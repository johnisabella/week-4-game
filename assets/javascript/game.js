//Define game variables:
var playerScore = 0;
var targetScore = "";
var wins = 0;
var losses = 0;
var puppyValues = [];
var puppies = ["assets/images/Puppy1.jpg", "assets/images/Puppy2.jpg", "assets/images/Puppy3.jpg", "assets/images/Puppy4.jpg"]

//Set up HTML elements (one large function that spans the entire length of the code)
$(document).ready(function(){

//Determine game weights for puppies
randomPuppyValue (1,12);
//Determine target score
generateTargetScore (19,120);
//Assigns a weight to each game image and puts in on the game screen.
assignPuppyWeights ();

// ------------ functions ----------------
//reset function
function reset () {
  puppyValues.length = 0;
  puppyValues = [];
  randomPuppyValue (1,12);
  generateTargetScore (19,120);
  $('#player_score').text("0 pounds.");
  $('.game_image').remove();
  assignPuppyWeights ();
}

//function that generates four random values between 1-4 and uses them to create an array.
function randomPuppyValue (min,max) {
    for (var i = 0; i < puppies.length; i++) {
    var x = Math.floor(Math.random()*(max-min+1)+min);
    puppyValues.push(x);
  }
console.log("These are the weights of the puppies: ",puppyValues);
  }

//function that generates a random target score between 19 and 120.
  function generateTargetScore (min,max) {
      targetScore = Math.floor(Math.random()*(max-min+1)+min);
        $('#target_score').text(targetScore + " pounds.");
      console.log (targetScore);
    }

//Display puppy images in the DOM, assigning each one a weight from the puppyValues array:
//Everything from this point down resets when the game resets, including local variables.
  function assignPuppyWeights () {
    for (var j = 0; j < puppies.length; j++) {
      var puppyImage = $("<img />");
      puppyImage.addClass("game_image");
      puppyImage.attr("src", puppies[j]);
      puppyImage.attr("data-weight", puppyValues[j]);
      puppyImage.attr("style", "width:150px; height:150px");
      $("#puppy_images").append(puppyImage);
    }

// function that, on clicking a puppy image, takes a value from the puppyValues array and adds it to playerScore:
$(".game_image").on("click", function() {
    var puppyWeight = ($(this).attr("data-weight"));
    puppyWeight = parseInt(puppyWeight);
    playerScore += puppyWeight;
  //Display the playerScore on screen:
    $('#player_score').text(playerScore + " pounds.");

//function that determines whether game is won or lost (or still in progress), and triggers game reset actions if the game has been won or lost:
  if (playerScore === targetScore) {
    alert("Your truck made it back to the shelter safely. You win!");
    reset();
    wins ++;
    playerScore = 0;
    $('#player_wins').text(wins);
    $('#player_losses').text(losses);
  }
  else if (playerScore > targetScore) {
    alert("Your truck has too much weight and can't make it back to the shelter. You lose.");
    reset();
    losses ++;
    playerScore = 0;
    $('#player_wins').text(wins);
    $('#player_losses').text(losses);
    }
})
};

// close document.ready function:
});
