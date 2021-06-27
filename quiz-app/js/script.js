let attempt = 0;
var score = 0;
let wrong = 0;
let index = 0;
let warning = 0;

rightsound = new Audio('sounds/rightsound.mpeg');
wrongsound = new Audio('sounds/wrongans.mpeg');


let questions = quiz.sort(function(){   // to make random array
    return 0.5 - Math.random()
});

let totalQuestion = questions.length;

$(function () {    // equals to.ready call itself
//  timer code
    let totalTime = 180    // 200 sec timer
    let min = 0;
    let sec = 0
    let counter = 0;

    let timer = setInterval(function() {
      counter++;
      min = Math.floor((totalTime - counter) / 60);
      sec = totalTime - min * 60 - counter;

    //   console.log(min);
    //   console.log(sec);
    $(".timebox span").text(min + ":" + sec)

    if(counter == totalTime){
        alert(("Time's up.  press ok to show result"));
        result();
        clearInterval(timer);
    }

    },1000) // 1 sec interval

    printQuestion(index);   
});

// qsns on UI
function printQuestion(idx){
    // console.log(questions[3]);
    $(".questionbox").text(questions[idx].question);   // qsn loding
    for(let i = 0; i < 4; i++){
        $(".optionbox span").eq(i).text(questions[idx].option[i]);   // options loading.... eq is used to travel on options spans to put options
    }
  
}

// function to check correct ans

function checkAnswer(option){
    attempt++;

    let optionClicked = $(option).data("opt");
    // console.log(optionClicked);
    //  console.log( questions[index].answer);
   if(optionClicked == questions[index].answer){
    //   
       $(option).addClass("right-ans");
       rightsound.play();

       score++;
    //    console.log(score)
   }else{
    wrongsound.play();
     $(option).addClass("wrong-ans");
     wrong++;
   }

   $(".scorebox span").text(score);    // updating in UI;
  
   $(".optionbox span").attr("onclick","");      // prevent from multiple choosing options by removing checkAnswer(this)
   
}

// function to show next qsn

function showNext(){
    //  console.log(questions.length - 1);
    if(index >= questions.length - 1){  
        console.log(1);
        showResult(0);
        return;
    }
    index++;
    $(".optionbox span").attr("onclick","checkAnswer(this)"); // earlier we removed this
    $(".optionbox span").removeClass();    // clearing prev selected option
    printQuestion(index);  

}
    
// function to show result

function showResult(k) {  // k result btn was clicked or not
 
   if(
        k == 1 &&
        index < questions.length - 1 &&
        confirm("Quiz has not finished yet. press ok to skip quiz and get your final result")
   ){
   }else{
    result();
       return;
   }

    result();
    
}

function result(){
    warning = 0;
    $("#questionscreen").hide();
    $("#showresult").show();
    $("#totalQuestion").text(totalQuestion);
    $("#correctQuestion").text(score);
    $("#wrongAnswers").text(wrong);
    $("#attemptQuestion").text(attempt);
}


 // window navigation checking
setInterval( checkFocus, 5000);

function checkFocus(){
  if(document.hasFocus()==false){
    warning++;
    if(warning > 2){
        alert("Caught cheating!!!!");
        showResult();  
    }   
    else
        alert("warning"+warning+"/3");
  }
}