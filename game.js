var buttonColours=["red", "blue", "green", "yellow"];
var userClickedPattern=[];
var gamePattern=[];
var level=0;
function nextSequence()
{
    level++;
    userClickedPattern=[];
    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("."+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
$(".btn").on("click", function(){
    var userChosenColour= this.id;
    playSound(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function playSound(name)
{
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}
$(document).on("keypress",function(e){
    if(level==0)
    {
        nextSequence();
    }
})

function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel])
        console.log("success");
    else{
        console.log("wrong");
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        var score="\nYour Score: "+level;
        if(screen.width< 1000)
            $("#level-title").text("Game Over, Press Start to Restart"+score);
        else
            $("#level-title").text("Game Over, Press Any Key to Restart"+score);

        startOver();
    }   
    if(userClickedPattern.length==gamePattern.length)
    {
        setTimeout(nextSequence,1000);
    }
}
function startOver()
{
    level=0;
    gamePattern=[];
}

function is_touch_enabled() {
    return ( 'ontouchstart' in window ) ||
           ( navigator.maxTouchPoints > 0 ) ||
           ( navigator.msMaxTouchPoints > 0 );
}

if(screen.width< 1000)
{
    $(".container").after('<div class="cont"><div class="start">Start</div></div>');
    $("#level-title").text("Press Start button to play");

    $(".start").on("click", function(){
        if(level==0)
        {
            nextSequence();
        }
    })
}