window.onload = function(){
    //localStorage.clear();
    //console.log(localStorage);
    if(localStorage.getItem("lvlmath") != null){
        this.generateQuestion(Number(localStorage.getItem("lvlmath")));
    }
}

function generateQuestion(lvlmath){
    var btn = document.getElementById("exercise");
    btn.disabled = true;

    var chk = document.getElementById("bonus");
    if(localStorage.getItem("checked") != null){
        chk.checked = true;
    }
    chk.disabled = true;

    var boolean = false;

    
    if(chk.checked){
        boolean = true;
    }

    var question = document.getElementById("question");
    question.style.visibility = "visible";
        var value = "";
        if(lvlmath == null){
        var m = document.getElementById("level");
        m.disabled = "disabled";
        value = m.options[m.selectedIndex].value;
        }
        else{
        var level = document.getElementById("level");
        value = lvlmath;
        level.value = lvlmath;
        level.disabled = "disabled";

        }
        
        if(value ==1){
            lvl1(boolean);
        }
        if(value == 2){
            lvl2(boolean)
        }
        if(value == 3){
            lvl3(boolean)
        }
        if(value == 4){
            lvl4(boolean);
        }
    
}
function lvl1(boolean){
    
    var mode = "4/4";
    var rhythmMap = ["whole note", "quarter note", "dotted half note", "half note" ];
    var symbols = new Map();
    symbols.set("whole note", [4, "\u07CB"]);
    symbols.set("dotted half note", [3, "\u147B"]);
    symbols.set("half note", [2, "\u146F"]);
    symbols.set("quarter note", [1, "\u2669"]);
    symbols.set("quarter rest", [1, "\u0AE9"]);

    var ops = new Map();
    ops.set("addition", "+");
    ops.set("subtraction", "-");
    ops.set("multiplication", "\u00D7");
    ops.set("division", "\u00F7");

    var operators = ["addition", "subtraction", "multiplication", "division"];
    var op0 = operators[Math.floor(Math.random() * operators.length)]

    var op0b = operators[Math.floor(Math.random() * operators.length)];

    var op = ops.get(op0);
    var opB = ops.get(op0b);

    var ans = 0;
    var wholeNum = false;
    var op1arr = "";
    var op1 = "";
    var op2arr = "";
    var op2 = ""

    var op3arr = "";
    var op3 = "";
   

    if(!boolean){
        while((ans< 1 || ans>4) || !wholeNum){
    
            op1arr = symbols.get(rhythmMap[Math.floor(Math.random() * rhythmMap.length)]);
            op1 = op1arr[1];
            var val1 = op1arr[0];
            op2arr = symbols.get(rhythmMap[Math.floor(Math.random() * rhythmMap.length)]);
            op2 = op2arr[1];
            var val2 = op2arr[0];
            
            if(op0 === "addition"){
                ans = val1 + val2;
            }
        
            else if(op0 === "subtraction"){
                ans = val1 - val2;
            }
            else if(op0 === "multiplication"){
                ans = val1 * val2;
            }
            else if(op0 === "division"){
                ans = val1/val2;
            }
        
            if((ans - Math.floor(ans)) == 0){
                wholeNum = true;
            }
        
            console.log(ans);
            console.log(wholeNum);
        
            }

    }

    else{
        var possibleAnswers = [1, 2, 3, 4];
        while(!possibleAnswers.includes(ans)){
    
            op1arr = symbols.get(rhythmMap[Math.floor(Math.random() * rhythmMap.length)]);
            op1 = op1arr[1];
            var val1 = op1arr[0];
            op2arr = symbols.get(rhythmMap[Math.floor(Math.random() * rhythmMap.length)]);
            op2 = op2arr[1];
            var val2 = op2arr[0];

            op3arr = symbols.get(rhythmMap[Math.floor(Math.random() * rhythmMap.length)]);
            op3 = op3arr[1];
            var val3 = op3arr[0];
           
            if((op0b === "multiplication" || op0b === "division") && (op0 === "addition" || op0 === "subtraction")){
                if(op0b === "multiplication"){
                    val2 = val2 * val3;
                }
                if(op0b === "division"){
                    val2 = val2/val3;
                }
                console.log(val2);
                //now add to the beginning part
                if(op0 === "addition"){
                    ans = val1 + val2;
                }
            
                else if(op0 === "subtraction"){
                    ans = val1 - val2;
                }
                else if(op0 === "multiplication"){
                    ans = val1 * val2;
                }
                else if(op0 === "division"){
                    ans = val1/val2;
                }
                
            }
            else{
                if(op0 === "addition"){
                    val2 = val1 + val2;
                }
            
                else if(op0 === "subtraction"){
                    val2 = val1 - val2;
                }
                else if(op0 === "multiplication"){
                    val2 = val1 * val2;
                }
                else{
                    val2 = val1/val2;
                }

                if(op0b === "addition"){
                    ans = val2 + val3;
                }
            
                else if(op0b === "subtraction"){
                    ans = val2 - val3;
                }

                else if(op0b === "multiplication"){
                    ans = val2 * val3;
                }
               else{
                    ans = val2/val3;
                }

            }

            console.log(ans); 
        
            }
    }
    

    var exercise = document.getElementById("generatedExercise");
    exercise.style.fontSize = '60px';
    if(!boolean){
        exercise.innerHTML = op1 + '&nbsp;&nbsp;' +op+ '&nbsp;&nbsp;' + op2 + '&nbsp;&nbsp;'+ "=" ;
    }
    else{
        exercise.innerHTML = op1 + '&nbsp;&nbsp;' +op+ '&nbsp;&nbsp;' + op2 + '&nbsp;&nbsp;'+ opB + '&nbsp;&nbsp;' + op3 + '&nbsp;&nbsp;' + "=" ;
    }
    
    exercise.style.paddingRight = '20px';

    var box = document.getElementById("select_join");
    box.style.visibility = "visible";

var submit = document.getElementById("submit");
submit.addEventListener("click", function(){evaluate1(ans, submit, symbols, 1, boolean)} );


}

function lvl2(boolean){
    
    var mode = "4/4";
    var rhythmMap = ["whole note", "quarter note", "dotted half note", "half note" ];
    var symbols = new Map();
    symbols.set("whole note", [4, "\u07CB"]);
    symbols.set("dotted half note", [3, "\u147B"]);
    symbols.set("half note", [2, "\u146F"]);
    symbols.set("quarter note", [1, "\u2669"]);

    var ops = new Map();
    ops.set("addition", "+");
    ops.set("subtraction", "-");
    ops.set("multiplication", "\u00D7");
    ops.set("division", "\u00F7");

    var operators = ["addition", "subtraction", "multiplication", "division", "multiplication", "addition"];
    var op0 = operators[Math.floor(Math.random() * operators.length)];
    var op0b = operators[Math.floor(Math.random() * operators.length)];


    var op = ops.get(op0);
    var opB = ops.get(op0b);

    var ans = 0;
    var wholeNum = false;
    var op1arr = "";
    var op1 = "";
    var op2arr = "";
    var op2 = ""

    var op3arr = "";
    var op3 = "";

    if(boolean){
        possibleAnswers = []
        for(var i = 1; i < 65; i++){
            possibleAnswers.push(i);
        }
        
        while(!possibleAnswers.includes(ans)){
    
            op1arr = symbols.get(rhythmMap[Math.floor(Math.random() * rhythmMap.length)]);
            op1 = op1arr[1];
            var val1 = op1arr[0];
            op2arr = symbols.get(rhythmMap[Math.floor(Math.random() * rhythmMap.length)]);
            op2 = op2arr[1];
            var val2 = op2arr[0];

            op3arr = symbols.get(rhythmMap[Math.floor(Math.random() * rhythmMap.length)]);
            op3 = op3arr[1];
            var val3 = op3arr[0];
           
            if((op0b === "multiplication" || op0b === "division") && (op0 === "addition" || op0 === "subtraction")){
                if(op0b === "multiplication"){
                    val2 = val2 * val3;
                }
                if(op0b === "division"){
                    val2 = val2/val3;
                }
                console.log(val2);
                //now add to the beginning part
                if(op0 === "addition"){
                    ans = val1 + val2;
                }
            
                else if(op0 === "subtraction"){
                    ans = val1 - val2;
                }
                else if(op0 === "multiplication"){
                    ans = val1 * val2;
                }
                else if(op0 === "division"){
                    ans = val1/val2;
                }
                
            }
            else{
                if(op0 === "addition"){
                    val2 = val1 + val2;
                }
            
                else if(op0 === "subtraction"){
                    val2 = val1 - val2;
                }
                else if(op0 === "multiplication"){
                    val2 = val1 * val2;
                }
                else{
                    val2 = val1/val2;
                }

                if(op0b === "addition"){
                    ans = val2 + val3;
                }
            
                else if(op0b === "subtraction"){
                    ans = val2 - val3;
                }

                else if(op0b === "multiplication"){
                    ans = val2 * val3;
                }
               else{
                    ans = val2/val3;
                }

            }

            if((ans - Math.floor(ans)) == 0){
                wholeNum = true;
            }

            console.log(ans); 
        
            }

    }
    else{

        while((ans< 1) || !wholeNum){
    
            op1arr = symbols.get(rhythmMap[Math.floor(Math.random() * rhythmMap.length)]);
            op1 = op1arr[1];
            var val1 = op1arr[0];
            op2arr = symbols.get(rhythmMap[Math.floor(Math.random() * rhythmMap.length)]);
            op2 = op2arr[1];
            var val2 = op2arr[0];
            
            if(op0 === "addition"){
                ans = val1 + val2;
            }
        
            else if(op0 === "subtraction"){
                ans = val1 - val2;
            }
            else if(op0 === "multiplication"){
                ans = val1 * val2;
            }
            else if(op0 === "division"){
                ans = val1/val2;
            }
        
            if((ans - Math.floor(ans)) == 0){
                wholeNum = true;
            }
        
            console.log(ans);
            console.log(wholeNum);
        
            }

    }
    

    var exercise = document.getElementById("generatedExercise");
    exercise.style.fontSize = '60px';
    if(!boolean){
        exercise.innerHTML = op1 + '&nbsp;&nbsp;' +op+ '&nbsp;&nbsp;' + op2 + '&nbsp;&nbsp;'+ "=" ;
    }
    else{
        exercise.innerHTML = op1 + '&nbsp;&nbsp;' +op+ '&nbsp;&nbsp;' + op2 + '&nbsp;&nbsp;'+ opB + '&nbsp;&nbsp;' + op3 + '&nbsp;&nbsp;' + "=" ;
    }
    exercise.style.paddingRight = '20px';

    var box = document.getElementById("solution");
    box.style.visibility = "visible";

var submit = document.getElementById("submit");
submit.addEventListener("click", function(){evaluate2(ans, submit, box, 2, boolean)} );


}

function lvl3(boolean){
    
    var mode = "4/4";
    var rhythmMap = ["whole note", "quarter note", "dotted half note", "half note", "dotted quarter note",
         "dotted eighth note", "eighth note", "sixteenth note"];
    var symbols = new Map();
    symbols.set("whole note", [4, "\u07CB"]);
    symbols.set("dotted half note", [3, "\u147B"]);
    symbols.set("half note", [2, "\u146F"]);
    symbols.set("quarter note", [1, "\u2669"]);
    symbols.set("dotted quarter note", [3/2, "\u2669."]);
    symbols.set("dotted eighth note", [3/4, "\u266A."]);
    symbols.set("eighth note", [1/2, "\u266A"]);
    symbols.set("sixteenth note", [1/4, "\u16AB"]);

    var ops = new Map();
    ops.set("addition", "+");
    ops.set("subtraction", "-");
    ops.set("multiplication", "\u00D7");
    ops.set("division", "\u00F7");

    var operators = ["addition", "subtraction", "multiplication", "division"];
    var possibleAnswers = [0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4];
    var op0 = operators[Math.floor(Math.random() * operators.length)]
    var op0b = operators[Math.floor(Math.random() * operators.length)];

    var op = ops.get(op0);
    var opB = ops.get(op0b);

    var ans = 0;
    var op1arr = "";
    var op1 = "";
    var op2arr = "";
    var op2 = ""

    var op3arr = "";
    var op3 = "";

    if(boolean){
        while(!possibleAnswers.includes(ans)){
    
            op1arr = symbols.get(rhythmMap[Math.floor(Math.random() * rhythmMap.length)]);
            op1 = op1arr[1];
            var val1 = op1arr[0];
            op2arr = symbols.get(rhythmMap[Math.floor(Math.random() * rhythmMap.length)]);
            op2 = op2arr[1];
            var val2 = op2arr[0];

            op3arr = symbols.get(rhythmMap[Math.floor(Math.random() * rhythmMap.length)]);
            op3 = op3arr[1];
            var val3 = op3arr[0];
           
            if((op0b === "multiplication" || op0b === "division") && (op0 === "addition" || op0 === "subtraction")){
                if(op0b === "multiplication"){
                    val2 = val2 * val3;
                }
                if(op0b === "division"){
                    val2 = val2/val3;
                }
                console.log(val2);
                //now add to the beginning part
                if(op0 === "addition"){
                    ans = val1 + val2;
                }
            
                else if(op0 === "subtraction"){
                    ans = val1 - val2;
                }
                else if(op0 === "multiplication"){
                    ans = val1 * val2;
                }
                else if(op0 === "division"){
                    ans = val1/val2;
                }
                
            }
            else{
                if(op0 === "addition"){
                    val2 = val1 + val2;
                }
            
                else if(op0 === "subtraction"){
                    val2 = val1 - val2;
                }
                else if(op0 === "multiplication"){
                    val2 = val1 * val2;
                }
                else{
                    val2 = val1/val2;
                }

                if(op0b === "addition"){
                    ans = val2 + val3;
                }
            
                else if(op0b === "subtraction"){
                    ans = val2 - val3;
                }

                else if(op0b === "multiplication"){
                    ans = val2 * val3;
                }
               else{
                    ans = val2/val3;
                }

            }

            if((ans - Math.floor(ans)) == 0){
                wholeNum = true;
            }

            console.log(ans); 
        
            }

    }
    else{
    while(!possibleAnswers.includes(ans)){
    
    op1arr = symbols.get(rhythmMap[Math.floor(Math.random() * rhythmMap.length)]);
    op1 = op1arr[1];
    var val1 = op1arr[0];
    op2arr = symbols.get(rhythmMap[Math.floor(Math.random() * rhythmMap.length)]);
    op2 = op2arr[1];
    var val2 = op2arr[0];
    
    if(op0 === "addition"){
        ans = val1 + val2;
    }

    else if(op0 === "subtraction"){
        ans = val1 - val2;
    }
    else if(op0 === "multiplication"){
        ans = val1 * val2;
    }
    else if(op0 === "division"){
        ans = val1/val2;
    }

    console.log(ans);
    

    }
}

    var exercise = document.getElementById("generatedExercise");
    exercise.style.fontSize = '60px';
     if(!boolean){
        exercise.innerHTML = op1 + '&nbsp;&nbsp;' +op+ '&nbsp;&nbsp;' + op2 + '&nbsp;&nbsp;'+ "=" ;
    }
    else{
        exercise.innerHTML = op1 + '&nbsp;&nbsp;' +op+ '&nbsp;&nbsp;' + op2 + '&nbsp;&nbsp;'+ opB + '&nbsp;&nbsp;' + op3 + '&nbsp;&nbsp;' + "=" ;
    }

    var box = document.getElementById("select_join");
    box.style.visibility = "visible";

    var answerChoices = document.getElementById("answerChoices");
    answerChoices.options[3].style.visibility = "visible";
    answerChoices.options[4].style.visibility = "visible"; 
    answerChoices.options[5].style.visibility = "visible";
    answerChoices.options[6].style.visibility = "visible"; 
    answerChoices.options[7].style.visibility = "visible";

var submit = document.getElementById("submit");
submit.addEventListener("click", function(){evaluate1(ans, submit, symbols, 3, boolean)} );


}

function lvl4(boolean){
    
    var mode = "4/4";
    var rhythmMap = ["whole note", "quarter note", "dotted half note", "half note", "dotted quarter note",
    "dotted eighth note", "eighth note", "sixteenth note"];
    var symbols = new Map();
    symbols.set("whole note", [4, "\u07CB"]);
    symbols.set("dotted half note", [3, "\u147B"]);
    symbols.set("half note", [2, "\u146F"]);
    symbols.set("quarter note", [1, "\u2669"]);
    symbols.set("dotted quarter note", [3/2, "\u2669."]);
    symbols.set("dotted eighth note", [3/4, "\u266A."]);
    symbols.set("eighth note", [1/2, "\u266A"]);
    symbols.set("sixteenth note", [1/4, "\u16AB"]);

    var ops = new Map();
    ops.set("addition", "+");
    ops.set("subtraction", "-");
    ops.set("multiplication", "\u00D7");
    ops.set("division", "\u00F7");

    var operators = ["addition", "subtraction", "multiplication", "division"];
    var op0 = operators[Math.floor(Math.random() * operators.length)];
    var op0b = operators[Math.floor(Math.random() * operators.length)];

    var op = ops.get(op0);
    var opB = ops.get(op0b);

    var ans = 0;
    

    var op1arr = "";
    var op1 = "";
    var op2arr = "";
    var op2 = ""
    var op3arr = "";
    var op3 = "";

    if(!boolean){
    while((ans<=0) ){
    
    op1arr = symbols.get(rhythmMap[Math.floor(Math.random() * rhythmMap.length)]);
    op1 = op1arr[1];
    var val1 = op1arr[0];
    op2arr = symbols.get(rhythmMap[Math.floor(Math.random() * rhythmMap.length)]);
    op2 = op2arr[1];
    var val2 = op2arr[0];
    
    if(op0 === "addition"){
        ans = val1 + val2;
    }

    else if(op0 === "subtraction"){
        ans = val1 - val2;
    }
    else if(op0 === "multiplication"){
        ans = val1 * val2;
    }
    else if(op0 === "division"){
        ans = val1/val2;
    }


    console.log(ans);

    }
}
else{
    while(ans<= 0){
        op1arr = symbols.get(rhythmMap[Math.floor(Math.random() * rhythmMap.length)]);
            op1 = op1arr[1];
            var val1 = op1arr[0];
            op2arr = symbols.get(rhythmMap[Math.floor(Math.random() * rhythmMap.length)]);
            op2 = op2arr[1];
            var val2 = op2arr[0];

            op3arr = symbols.get(rhythmMap[Math.floor(Math.random() * rhythmMap.length)]);
            op3 = op3arr[1];
            var val3 = op3arr[0];
           
            if((op0b === "multiplication" || op0b === "division") && (op0 === "addition" || op0 === "subtraction")){
                if(op0b === "multiplication"){
                    val2 = val2 * val3;
                }
                if(op0b === "division"){
                    val2 = val2/val3;
                }
                console.log(val2);
                //now add to the beginning part
                if(op0 === "addition"){
                    ans = val1 + val2;
                }
            
                else if(op0 === "subtraction"){
                    ans = val1 - val2;
                }
                else if(op0 === "multiplication"){
                    ans = val1 * val2;
                }
                else if(op0 === "division"){
                    ans = val1/val2;
                }
                
            }
            else{
                if(op0 === "addition"){
                    val2 = val1 + val2;
                }
            
                else if(op0 === "subtraction"){
                    val2 = val1 - val2;
                }
                else if(op0 === "multiplication"){
                    val2 = val1 * val2;
                }
                else{
                    val2 = val1/val2;
                }

                if(op0b === "addition"){
                    ans = val2 + val3;
                }
            
                else if(op0b === "subtraction"){
                    ans = val2 - val3;
                }

                else if(op0b === "multiplication"){
                    ans = val2 * val3;
                }
               else{
                    ans = val2/val3;
                }

            }

            if((ans - Math.floor(ans)) == 0){
                wholeNum = true;
            }

            console.log(ans); 
        
            }
    

}

    var exercise = document.getElementById("generatedExercise");
    exercise.style.fontSize = '60px';
    if(!boolean){
        exercise.innerHTML = op1 + '&nbsp;&nbsp;' +op+ '&nbsp;&nbsp;' + op2 + '&nbsp;&nbsp;'+ "=" ;
    }
    else{
        exercise.innerHTML = op1 + '&nbsp;&nbsp;' +op+ '&nbsp;&nbsp;' + op2 + '&nbsp;&nbsp;'+ opB + '&nbsp;&nbsp;' + op3 + '&nbsp;&nbsp;' + "=" ;
    }
    exercise.style.paddingRight = '20px';

    var box = document.getElementById("solution");
    box.style.visibility = "visible";

var submit = document.getElementById("submit");
submit.addEventListener("click", function(){evaluate2(ans, submit, box, 4, boolean)} );


}

function evaluate2(ans, submit, box, level, boolean){
submit.disabled = "disabled";
box.disabled = "disabled";

var input = box.value;

if(input.includes('/')){
    var index = input.indexOf('/');
    var numerator = Number(input.substring(0, index));
    var denominator = Number(input.substring(index+1, input.length));
    input = numerator/denominator;   
}

var res = document.getElementById("result");
var generateNew = document.getElementById("new");
res.style.visibility = "visible";

if(input == ans){
    res.innerHTML = "Correct! \u266B";
    
}

else{
    res.innerHTML = "Not quite. The correct answer is " +  ans +" beat(s).";
}

generateNew.style.visibility = "visible";  
    var samemode = document.getElementById("samemode");
    samemode.style.visibility = "visible"; 
    samemode.addEventListener("click", function(){
    if(boolean){
        localStorage.setItem("checked", "yes");
    }
    localStorage.setItem("lvlmath", level+"");
    //alert(localStorage);
    window.location.reload()});
    generateNew.addEventListener("click", function(){localStorage.removeItem("lvlmath");
    localStorage.removeItem("checked");
        window.location.reload()});



}
   

    function evaluate1 (ans, submit, symbols, level, boolean){
        submit.disabled = "disabled";

        answerBank = new Map();
        answerBank.set(1, "quarter note");
        answerBank.set(2, "half note");
        answerBank.set(3, "dotted half note");
        answerBank.set(4, "whole note");
        answerBank.set(0.5, "eighth note");
        answerBank.set(0.75, "dotted eighth note");
        answerBank.set(1.5, "dotted quarter note");
        answerBank.set(0.25, "sixteenth note");

        ans = answerBank.get(ans);
      
        var m = document.getElementById("answerChoices");
        m.disabled = "disabled";
        var value = m.options[m.selectedIndex].value;
        
        var res = document.getElementById("result");
        var generateNew = document.getElementById("new");
        res.style.visibility = "visible";

    if(ans === value){
        res.innerHTML = "Correct! \u266B";
    }

    else{
        res.innerHTML = "Not quite. The correct answer is " + symbols.get(ans)[0] +" beat(s), so you need to select " + symbols.get(ans)[1];}

        generateNew.style.visibility = "visible";  
        var samemode = document.getElementById("samemode");
        samemode.style.visibility = "visible"; 
        samemode.addEventListener("click", function(){
            if(boolean){
                localStorage.setItem("checked", "yes");
            }
        localStorage.setItem("lvlmath", level+"");
        //alert(localStorage);
        window.location.reload()});
        generateNew.addEventListener("click", function(){localStorage.removeItem("lvlmath");
        localStorage.removeItem("checked");
            window.location.reload()});

    }