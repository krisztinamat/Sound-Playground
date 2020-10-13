window.onload = function(){
    sessionStorage.removeItem("lvlpitch");
    sessionStorage.removeItem("lvlrhythm");
    sessionStorage.removeItem("timeSig2");
    sessionStorage.removeItem("lvlriddim");
    sessionStorage.removeItem("lvl");
    sessionStorage.removeItem("intval");
    sessionStorage.removeItem("intval3a");
    sessionStorage.removeItem("lvlmelody");
    sessionStorage.removeItem("lvlharmony");
    sessionStorage.removeItem("selection");

    if(sessionStorage.getItem("lvlmath") != null){
        this.generateQuestion(Number(sessionStorage.getItem("lvlmath")));
    }
}

function generateQuestion(lvlmath){
    let btn = document.getElementById("exercise");
    btn.disabled = true;

    let chk = document.getElementById("bonus");
    if(sessionStorage.getItem("checked") != null){
        chk.checked = true;
    }
    chk.disabled = true;

    let boolean = false;

    
    if(chk.checked){
        boolean = true;
    }

    let question = document.getElementById("question");
    question.style.visibility = "visible";
        let value = "";
        if(lvlmath == null){
        let m = document.getElementById("level");
        m.disabled = "disabled";
        value = m.options[m.selectedIndex].value;
        }
        else{
        let level = document.getElementById("level");
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
    
    let mode = "4/4";
    const rhythmMap = ["whole note", "quarter note", "dotted half note", "half note" ];
    const symbols = new Map();
    symbols.set("whole note", [4, "\u0B66"]);
    symbols.set("dotted half note", [3, "\u147B"]);
    symbols.set("half note", [2, "\u146F"]);
    symbols.set("quarter note", [1, "\u2669"]);
    symbols.set("quarter rest", [1, "\u0AE9"]);

    const ops = new Map();
    ops.set("addition", "+");
    ops.set("subtraction", "-");
    ops.set("multiplication", "\u00D7");
    ops.set("division", "\u00F7");

    const operators = ["addition", "subtraction", "multiplication", "division"];
    let op0 = operators[Math.floor(Math.random() * operators.length)]

    let op0b = operators[Math.floor(Math.random() * operators.length)];

    let op = ops.get(op0);
    let opB = ops.get(op0b);

    let ans = 0;
    let wholeNum = false;
    let op1arr = "";
    let op1 = "";
    let op2arr = "";
    let op2 = ""

    let op3arr = "";
    let op3 = "";
   

    if(!boolean){
        while((ans< 1 || ans>4) || !wholeNum){
    
            op1arr = symbols.get(rhythmMap[Math.floor(Math.random() * rhythmMap.length)]);
            op1 = op1arr[1];
            let val1 = op1arr[0];
            op2arr = symbols.get(rhythmMap[Math.floor(Math.random() * rhythmMap.length)]);
            op2 = op2arr[1];
            let val2 = op2arr[0];
            
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
        let possibleAnswers = [1, 2, 3, 4];
        while(!possibleAnswers.includes(ans)){
    
            op1arr = symbols.get(rhythmMap[Math.floor(Math.random() * rhythmMap.length)]);
            op1 = op1arr[1];
            let val1 = op1arr[0];
            op2arr = symbols.get(rhythmMap[Math.floor(Math.random() * rhythmMap.length)]);
            op2 = op2arr[1];
            let val2 = op2arr[0];

            op3arr = symbols.get(rhythmMap[Math.floor(Math.random() * rhythmMap.length)]);
            op3 = op3arr[1];
            let val3 = op3arr[0];
           
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
    

    let exercise = document.getElementById("generatedExercise");
    exercise.style.fontSize = '60px';
    if(!boolean){
        exercise.innerHTML = op1 + '&nbsp;&nbsp;' +op+ '&nbsp;&nbsp;' + op2 + '&nbsp;&nbsp;'+ "=" ;
    }
    else{
        exercise.innerHTML = op1 + '&nbsp;&nbsp;' +op+ '&nbsp;&nbsp;' + op2 + '&nbsp;&nbsp;'+ opB + '&nbsp;&nbsp;' + op3 + '&nbsp;&nbsp;' + "=" ;
    }
    
    exercise.style.paddingRight = '20px';

    let box = document.getElementById("select_join");
    box.style.visibility = "visible";

let submit = document.getElementById("submit");
submit.addEventListener("click", function(){musicMathDropdown(ans, submit, symbols, 1, boolean)} );


}

function lvl2(boolean){
    
    let mode = "4/4";
    const rhythmMap = ["whole note", "quarter note", "dotted half note", "half note" ];
    const symbols = new Map();
    symbols.set("whole note", [4, "\u0B66"]);
    symbols.set("dotted half note", [3, "\u147B"]);
    symbols.set("half note", [2, "\u146F"]);
    symbols.set("quarter note", [1, "\u2669"]);

    const ops = new Map();
    ops.set("addition", "+");
    ops.set("subtraction", "-");
    ops.set("multiplication", "\u00D7");
    ops.set("division", "\u00F7");

    const operators = ["addition", "subtraction", "multiplication", "division", "multiplication", "addition"];
    let op0 = operators[Math.floor(Math.random() * operators.length)];
    let op0b = operators[Math.floor(Math.random() * operators.length)];


    let op = ops.get(op0);
    let opB = ops.get(op0b);

    let ans = 0;
    let wholeNum = false;
    let op1arr = "";
    let op1 = "";
    let op2arr = "";
    let op2 = ""

    let op3arr = "";
    let op3 = "";

    if(boolean){
        possibleAnswers = []
        for(let i = 1; i < 65; i++){
            possibleAnswers.push(i);
        }
        
        while(!possibleAnswers.includes(ans)){
    
            op1arr = symbols.get(rhythmMap[Math.floor(Math.random() * rhythmMap.length)]);
            op1 = op1arr[1];
            let val1 = op1arr[0];
            op2arr = symbols.get(rhythmMap[Math.floor(Math.random() * rhythmMap.length)]);
            op2 = op2arr[1];
            let val2 = op2arr[0];

            op3arr = symbols.get(rhythmMap[Math.floor(Math.random() * rhythmMap.length)]);
            op3 = op3arr[1];
            let val3 = op3arr[0];
           
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
            let val1 = op1arr[0];
            op2arr = symbols.get(rhythmMap[Math.floor(Math.random() * rhythmMap.length)]);
            op2 = op2arr[1];
            let val2 = op2arr[0];
            
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
    

    let exercise = document.getElementById("generatedExercise");
    exercise.style.fontSize = '60px';
    if(!boolean){
        exercise.innerHTML = op1 + '&nbsp;&nbsp;' +op+ '&nbsp;&nbsp;' + op2 + '&nbsp;&nbsp;'+ "=" ;
    }
    else{
        exercise.innerHTML = op1 + '&nbsp;&nbsp;' +op+ '&nbsp;&nbsp;' + op2 + '&nbsp;&nbsp;'+ opB + '&nbsp;&nbsp;' + op3 + '&nbsp;&nbsp;' + "=" ;
    }
    exercise.style.paddingRight = '20px';

    let box = document.getElementById("solution");
    box.style.visibility = "visible";

let submit = document.getElementById("submit");
submit.addEventListener("click", function(){musicMathTyped(ans, submit, box, 2, boolean)} );


}

function lvl3(boolean){
    
    let mode = "4/4";
    const rhythmMap = ["whole note", "quarter note", "dotted half note", "half note", "dotted quarter note",
         "dotted eighth note", "eighth note", "sixteenth note"];
    const symbols = new Map();
    symbols.set("whole note", [4, "\u0B66"]);
    symbols.set("dotted half note", [3, "\u147B"]);
    symbols.set("half note", [2, "\u146F"]);
    symbols.set("quarter note", [1, "\u2669"]);
    symbols.set("dotted quarter note", [3/2, "\u2669."]);
    symbols.set("dotted eighth note", [3/4, "\u266A."]);
    symbols.set("eighth note", [1/2, "\u266A"]);
    symbols.set("sixteenth note", [1/4, "\u16AB"]);

    const ops = new Map();
    ops.set("addition", "+");
    ops.set("subtraction", "-");
    ops.set("multiplication", "\u00D7");
    ops.set("division", "\u00F7");

    const operators = ["addition", "subtraction", "multiplication", "division"];
    let possibleAnswers = [0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4];
    let op0 = operators[Math.floor(Math.random() * operators.length)]
    let op0b = operators[Math.floor(Math.random() * operators.length)];

    let op = ops.get(op0);
    let opB = ops.get(op0b);

    let ans = 0;
    let op1arr = "";
    let op1 = "";
    let op2arr = "";
    let op2 = ""

    let op3arr = "";
    let op3 = "";

    if(boolean){
        while(!possibleAnswers.includes(ans)){
    
            op1arr = symbols.get(rhythmMap[Math.floor(Math.random() * rhythmMap.length)]);
            op1 = op1arr[1];
            let val1 = op1arr[0];
            op2arr = symbols.get(rhythmMap[Math.floor(Math.random() * rhythmMap.length)]);
            op2 = op2arr[1];
            let val2 = op2arr[0];

            op3arr = symbols.get(rhythmMap[Math.floor(Math.random() * rhythmMap.length)]);
            op3 = op3arr[1];
            let val3 = op3arr[0];
           
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
    let val1 = op1arr[0];
    op2arr = symbols.get(rhythmMap[Math.floor(Math.random() * rhythmMap.length)]);
    op2 = op2arr[1];
    let val2 = op2arr[0];
    
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

    let exercise = document.getElementById("generatedExercise");
    exercise.style.fontSize = '60px';
     if(!boolean){
        exercise.innerHTML = op1 + '&nbsp;&nbsp;' +op+ '&nbsp;&nbsp;' + op2 + '&nbsp;&nbsp;'+ "=" ;
    }
    else{
        exercise.innerHTML = op1 + '&nbsp;&nbsp;' +op+ '&nbsp;&nbsp;' + op2 + '&nbsp;&nbsp;'+ opB + '&nbsp;&nbsp;' + op3 + '&nbsp;&nbsp;' + "=" ;
    }

    let box = document.getElementById("select_join");
    box.style.visibility = "visible";

    let answerChoices = document.getElementById("answerChoices");
    answerChoices.options[3].style.visibility = "visible";
    answerChoices.options[4].style.visibility = "visible"; 
    answerChoices.options[5].style.visibility = "visible";
    answerChoices.options[6].style.visibility = "visible"; 
    answerChoices.options[7].style.visibility = "visible";

let submit = document.getElementById("submit");
submit.addEventListener("click", function(){musicMathDropdown(ans, submit, symbols, 3, boolean)} );


}

function lvl4(boolean){
    
    let mode = "4/4";
    const rhythmMap = ["whole note", "quarter note", "dotted half note", "half note", "dotted quarter note",
    "dotted eighth note", "eighth note", "sixteenth note"];
    const symbols = new Map();
    symbols.set("whole note", [4, "\u0B66"]);
    symbols.set("dotted half note", [3, "\u147B"]);
    symbols.set("half note", [2, "\u146F"]);
    symbols.set("quarter note", [1, "\u2669"]);
    symbols.set("dotted quarter note", [3/2, "\u2669."]);
    symbols.set("dotted eighth note", [3/4, "\u266A."]);
    symbols.set("eighth note", [1/2, "\u266A"]);
    symbols.set("sixteenth note", [1/4, "\u16AB"]);

    const ops = new Map();
    ops.set("addition", "+");
    ops.set("subtraction", "-");
    ops.set("multiplication", "\u00D7");
    ops.set("division", "\u00F7");

    const operators = ["addition", "subtraction", "multiplication", "division"];
    let op0 = operators[Math.floor(Math.random() * operators.length)];
    let op0b = operators[Math.floor(Math.random() * operators.length)];

    let op = ops.get(op0);
    let opB = ops.get(op0b);

    let ans = 0;
    

    let op1arr = "";
    let op1 = "";
    let op2arr = "";
    let op2 = ""
    let op3arr = "";
    let op3 = "";

    if(!boolean){
    while((ans<=0) ){
    
    op1arr = symbols.get(rhythmMap[Math.floor(Math.random() * rhythmMap.length)]);
    op1 = op1arr[1];
    let val1 = op1arr[0];
    op2arr = symbols.get(rhythmMap[Math.floor(Math.random() * rhythmMap.length)]);
    op2 = op2arr[1];
    let val2 = op2arr[0];
    
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
            let val1 = op1arr[0];
            op2arr = symbols.get(rhythmMap[Math.floor(Math.random() * rhythmMap.length)]);
            op2 = op2arr[1];
            let val2 = op2arr[0];

            op3arr = symbols.get(rhythmMap[Math.floor(Math.random() * rhythmMap.length)]);
            op3 = op3arr[1];
            let val3 = op3arr[0];
           
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

    let exercise = document.getElementById("generatedExercise");
    exercise.style.fontSize = '60px';
    if(!boolean){
        exercise.innerHTML = op1 + '&nbsp;&nbsp;' +op+ '&nbsp;&nbsp;' + op2 + '&nbsp;&nbsp;'+ "=" ;
    }
    else{
        exercise.innerHTML = op1 + '&nbsp;&nbsp;' +op+ '&nbsp;&nbsp;' + op2 + '&nbsp;&nbsp;'+ opB + '&nbsp;&nbsp;' + op3 + '&nbsp;&nbsp;' + "=" ;
    }
    exercise.style.paddingRight = '20px';

    let box = document.getElementById("solution");
    box.style.visibility = "visible";

let submit = document.getElementById("submit");
submit.addEventListener("click", function(){musicMathTyped(ans, submit, box, 4, boolean)} );


}
   