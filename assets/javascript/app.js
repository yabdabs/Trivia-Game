$(".restart").hide();
$(document).ready(function(){

	//holds the postion of the question array
	var currentQuestion=0;
	//holds our setInterval
	var intervalId;
	//used to display the countdown
	var time;
	var countdown;
	//number of correct guesses
	var correctCount=0;
	//number of incorrect guesses
	var incorrectCount=0;
	//number of timed out questions
	var timedOutCount=0;

	//used to display message for correct/incorect/time out
	var correct
	//flag for checking if the user clicked an answer.
	//if false, the time ran up all the way
	var clickedAnswer=false;
	//used to hold data value of answer chosen
	var guess;
	var ansa;

	var questions=[
		question1={
			question: "A baby has about how many taste buds?",
			answer: ["1,000", "10,000", "730", "1,467"],
			correct: "10,000",
			gif: "<img src= 'https://media.giphy.com/media/AGGz7y0rCYxdS/giphy.gif' alt='gif'/>"
		},
		question2={
			question: "A newborn baby's head accounts for about how much of his/her entire weight?",
			answer: ["100%", "5%", "25%", "50%"],
			correct: "25%",
			gif: "<img src= 'https://media.giphy.com/media/xT8qBvH1pAhtfSx52U/giphy.gif' alt='gif'/>"
		},
		question3={
			question: "A babies brain will do what in size in the first year",
			answer: ["double", "shrink", "triple", "nothing"],
			correct: "double",
			gif: "<img src= 'https://media.giphy.com/media/3o72F6M8ALSDfzyXJK/giphy.gif' alt='gif'/>"
		},
		question4={
			question: "Newborns sleep for _ hours per day",
			answer: ["24", "10-12", "8", "16-17"],
			correct: "16-17",
			gif: "<img src= 'https://media.giphy.com/media/3o7abxtmPxanzaESGY/giphy.gif' alt='gif'/>"
		},
		question5={
			question: "A newborn's grip can",
			answer: ["support it's entire body weight", "support 1/2 of it's body weight", "crush a soda can", "do nothing"],
			correct: "support it's entire body weight",
			gif: "<img src= 'https://media.giphy.com/media/LFiOdYoOlEKac/giphy.gif' alt='gif'/>"
		}
	]

function displayQuestion(){
	$("#answerPage").hide();
	$("#questionPage").show();

	//format html in this
	$(".title").html("<h1>Trivia</h1>");
	$("#question").html(questions[currentQuestion].question);
	console.log(questions[currentQuestion].question)

	$(".answer1").html(questions[currentQuestion].answer[0]);
	$(".answer1").attr('data-value', questions[currentQuestion].answer[0])

	$(".answer2").html(questions[currentQuestion].answer[1]);
	$(".answer2").attr('data-value', questions[currentQuestion].answer[1])

	$(".answer3").html(questions[currentQuestion].answer[2]);
	$(".answer3").attr('data-value', questions[currentQuestion].answer[2])

	$(".answer4").html(questions[currentQuestion].answer[3]);
	$(".answer4").attr('data-value', questions[currentQuestion].answer[3])

	timer();
}

function timer(){
	time=25;
	$("#time").html("Time Remaining: " +time);
	intervalId= setInterval(function(){
		
		if(time==1){	
			clearInterval(intervalId);
			clickedAnswer=false;
			showAnswer();
		}
		time--;
		$("#time").html("Time Remaining: " + time);

	}, 1000)
}

function showAnswer(){
	$("#questionPage").hide();
	$("#answerPage").show();
	ansa=setTimeout(displayQuestion, 4500);

	if(clickedAnswer==false){
		timedOutCount++;
		$("#response").html("You ran out of time!")
		$("#answer").html("The correct answer is " + questions[currentQuestion].correct)
		$("#gif").html(questions[currentQuestion].gif);
	}

	if(clickedAnswer==true && correct==true){
		correctCount++;
		$("#response").html("That's Correct!")
		$("#answer").html("Answer: " + questions[currentQuestion].correct)
		$("#gif").html(questions[currentQuestion].gif);
	}

	if(clickedAnswer==true && correct==false){
		incorrectCount++;
		$("#response").html("Wrong Answer!")
		$("#answer").html("Answer: " + questions[currentQuestion].correct)
		$("#gif").html(questions[currentQuestion].gif);
	}

	currentQuestion++;

	if(currentQuestion==5){
		clearTimeout(ansa);
		ansa= setTimeout(function(){
			$("#answerPage").hide();
			displayStats();
		}, 5000)
	}

}

function displayStats(){
	// $("#statsPage").show();
	$("#statsPage").append("<h1> Statistics</h1>");
	$("#statsPage").append("<p>Timed Out: " + timedOutCount + "</p>");
	$("#statsPage").append("<p>Correct: " + correctCount + "</p>");
	$("#statsPage").append("<p>Incorrect: " + incorrectCount + "</p>");
	$("#statsPage").append("<button class='restart' value='restart' >restart</button>")
}

function reset(){
	currentQuestion=0;
	//number of correct guesses
	correctCount=0;
	//number of incorrect guesses
	incorrectCount=0;
	//number of timed out questions
	timedOutCount=0;
	$("#statsPage").empty();
}

$("button").on("click", function(){
		$("#startPage").remove();
		displayQuestion();
});

$(document).on("click", ".restart", function(){
	if(currentQuestion==5){
			reset();
		}
		displayQuestion();
})

$(".answer").on("click", function(){
	clickedAnswer=true;
	clearInterval(intervalId);

	guess= $(this).attr("data-value");
	if(guess==questions[currentQuestion].correct){
		correct=true;
	}
	else{
		correct=false;
	}
	showAnswer();

});

});
