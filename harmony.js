window.onload = function(){
    //sessionStorage.clear();
    //console.log(sessionStorage);
    sessionStorage.removeItem("lvlpitch");
    sessionStorage.removeItem("lvlrhythm");
    sessionStorage.removeItem("timeSig2");
    sessionStorage.removeItem("checked");
    sessionStorage.removeItem("lvlmath");
    sessionStorage.removeItem("lvlriddim");
    sessionStorage.removeItem("lvl");
    sessionStorage.removeItem("intval");
    sessionStorage.removeItem("lvlmelody");
    sessionStorage.removeItem("lvlharmony");
    sessionStorage.removeItem("selection");

    if(sessionStorage.getItem("intval3a") != null){
        this.generateQuestion(Number(sessionStorage.getItem("intval3a")));
    }
}


function generateQuestion(intval){
    let btn = document.getElementById("exercise");
    btn.disabled = true;

    let question = document.getElementById("question");
    question.style.visibility = "visible";

    let selectedLevel = "";

    if(intval != null){
    
        let level = document.getElementById("level");
        level.value = intval;
        level.disabled = "disabled";
        selectedLevel = intval;
    
    }

    else{
            //get the level selected
    let level = document.getElementById("level");
    level.disabled = "disabled";
    selectedLevel = level.options[level.selectedIndex].value;
    }

    let answerChoice = document.getElementById("answerChoice");

    if(selectedLevel == 1){
    answerChoice.options[0].style.visibility = "visible";
    answerChoice.options[1].style.visibility = "visible"; 
    answerChoice.options[2].style.visibility = "visible"; 

    }

    if(selectedLevel == 2){
    answerChoice.options[0].style.visibility = "visible";
    answerChoice.options[1].style.visibility = "visible";
    answerChoice.options[2].style.visibility = "visible"; 
    answerChoice.options[3].style.visibility = "visible";   
    }

    if(selectedLevel == 3){
    answerChoice.options[0].style.visibility = "visible";
    answerChoice.options[1].style.visibility = "visible";
    answerChoice.options[2].style.visibility = "visible"; 
    answerChoice.options[3].style.visibility = "visible"; 
    answerChoice.options[4].style.visibility = "visible";   
    }

    if(selectedLevel == 4){
    answerChoice.options[0].style.visibility = "visible";
    answerChoice.options[1].style.visibility = "visible";
    answerChoice.options[2].style.visibility = "visible"; 
    answerChoice.options[3].style.visibility = "visible"; 
    answerChoice.options[4].style.visibility = "visible"; 
    answerChoice.options[5].style.visibility = "visible";   
    }
    if(selectedLevel == 5){
        answerChoice.options[0].style.visibility = "visible";
        answerChoice.options[1].style.visibility = "visible";
        answerChoice.options[2].style.visibility = "visible"; 
        answerChoice.options[3].style.visibility = "visible"; 
        answerChoice.options[4].style.visibility = "visible"; 
        answerChoice.options[5].style.visibility = "visible";
        answerChoice.options[6].style.visibility = "visible";      
        }
 

    buildQuestion(selectedLevel);

        

}

function buildQuestion(selectedLevel){

    const arrayPossible = ["C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3",
    "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4",
    "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5"]
    
    let notesArray = [];
    index1 = Math.floor(Math.random() * arrayPossible.length);
    let index2 = null;
    let interval = null;
    let ans = "";
    const direction = [-1, 1];


    let intervalArray = null;

    if(selectedLevel == 1){
        intervalArray = [0, 2, 4];
    }

    if(selectedLevel == 2){
        intervalArray = [0, 2, 4, 5]; 
    }

    if(selectedLevel == 3){
        intervalArray = [0, 2, 4, 5, 7];
    }

    if(selectedLevel == 4){
        intervalArray = [0, 2, 4, 5, 7, 9];
    }
    if(selectedLevel == 5){
        intervalArray = [0, 2, 4, 5, 7, 9, 11, 12];
    }

        //fill out rest of the steps once here
        //console.log(intervalArray);
        var randomInterval = intervalArray[Math.floor(Math.random() * intervalArray.length)];
        //console.log(randomInterval);
        var randomDirection = direction[Math.floor(Math.random() * direction.length)];
        interval = randomInterval; // should be converted to written answer;
        randomInterval = randomInterval*randomDirection;
        if((index1 + randomInterval > (arrayPossible.length-1)) || (index1 +randomInterval < (0)) ){
            index2 = index1 - randomInterval;
        }
        else{
            index2 = index1 + randomInterval;
        }
        console.log(index1 + ", "+ index2);

        if(interval == 0){
            ans = "Same note";
        }
        if(interval == 2){
            ans = "Second (do-re or re-do)";
        }
        if(interval == 4){
            ans = "Third (do-mi or mi-do)";
        }
        if(interval == 5){
            ans = "Fourth (do-fa or fa-do)";
        }
        if(interval == 7){
            ans = "Fifth (do-sol or sol-do)";
        }
        if(interval == 9){
            ans = "Sixth (do-la or la-do)";
        }
        if(interval == 11){
            ans = "Seventh (do-ti or ti-do)";
        }
        if(interval == 12){
            ans = "Octave (do-do)";
        }

        //console.log(ans);
        
    

    const note1 = arrayPossible[index1];
    const note2 = arrayPossible[index2];
    notesArray.push(note1);
    notesArray.push(note2);

    intervalHarmonyAudio(notesArray, ans, selectedLevel);

}
