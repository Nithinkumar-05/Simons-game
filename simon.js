var buttoncolor=["red", "blue", "green", "yellow"]
var gamepattern=[]
var userClickedPattern=[]
var level=0;
var started=false;
function nextsequence()
{
  userClickedPattern=[]
  level++;
  var n=Math.random();
  n=n*3;
  $("#level-title").text("Level "+level);
  var randomchosencolor=buttoncolor[Math.round(n)]
  gamepattern.push(randomchosencolor)
  $("#"+randomchosencolor).fadeIn(100).fadeOut(100).fadeIn(100);
 playSound(randomchosencolor)

}

$(".btn").on("click",function()
{
  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor)
  checkAnswer(userClickedPattern.length-1) 
  //console.log(userClickedPattern)
})
function playSound(name)
{
  var audio = new Audio("./sounds/"+name+".mp3");
  audio.play();
}
//animation
function animatePress(currentColor)
{
  var activeButton=document.querySelector("."+currentColor);
   activeButton.classList.add("pressed");
   setTimeout(function()
   {
    activeButton.classList.remove("pressed")
   },100)
}
document.addEventListener("keypress",function(){ 
  if (!started) {
    $("#level-title").text("Level " + level);
    nextsequence();
    started = true;
  }
  })

function checkAnswer(currentLevel)
{
    
     //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
     if (gamepattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamepattern.length){

       
        setTimeout(function () {
          nextsequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      playSound("wrong")
      $("body").addClass("game-over")
      setTimeout(function()
      {
        $("body").removeClass("game-over")
      },200)
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver()
    }
  
}
function startOver()
{
  level=0
  gamepattern=[]
  userClickedPattern=[]
  started=false
}