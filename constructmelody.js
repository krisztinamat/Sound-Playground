window.onload = function(){
    sessionStorage.removeItem("timeSig2");
    sessionStorage.removeItem("checked");
    sessionStorage.removeItem("lvlmath");
    sessionStorage.removeItem("lvlriddim");
    sessionStorage.removeItem("lvl");
    sessionStorage.removeItem("intval");
    sessionStorage.removeItem("intval3a");
    sessionStorage.removeItem("lvlmelody");
    sessionStorage.removeItem("lvlharmony");
    sessionStorage.removeItem("selection");
    
    if(sessionStorage.getItem("lvlpitch") != null && sessionStorage.getItem("lvlrhythm")!=null){
        this.generateQuestion(Number(sessionStorage.getItem("lvlpitch")), Number(sessionStorage.getItem("lvlrhythm")));
    }
    else{
        window.scrollTo({ top: 0});
    }
}

function highlight(div){
    
    var a = document.getElementById("A");
    var b = document.getElementById("B");
    var c = document.getElementById("C");
    var d = document.getElementById("D");

    a.style.backgroundColor = "white";
    b.style.backgroundColor = "white";
    c.style.backgroundColor = "white";
    d.style.backgroundColor = "white";

    if(div === 'A'){
        a.style.backgroundColor = "rgb(222, 221, 250)";
         
    }
    if(div === 'B'){
        b.style.backgroundColor = "rgb(222, 221, 250)";  
    }
    if(div === 'C'){
        c.style.backgroundColor = "rgb(222, 221, 250)";  
    }
    if(div === 'D'){
        d.style.backgroundColor = "rgb(222, 221, 250)";  
    }
    sessionStorage.setItem("selection", div);
    
}

function generateQuestion(lvlpitch, lvlrhythm){
    //alert(lvl);
    var btn = document.getElementById("exercise");
    btn.disabled = true;

    var question = document.getElementById("question");
    question.style.visibility = "visible";

    if(lvlpitch == null && lvlrhythm == null){
    
    var level = document.getElementById("levelPitch");
    level.disabled = "disabled";
    var selectedLevelPitch = level.options[level.selectedIndex].value;
    var level2 = document.getElementById("levelRhythm");
    level2.disabled = "disabled";
    var selectedLevelRhythm = level2.options[level2.selectedIndex].value;

    buildQuestion(selectedLevelPitch, selectedLevelRhythm);
    }

    else{
        var level = document.getElementById("levelPitch");
        level.value = lvlpitch;
        level.disabled = "disabled";
        var level2 = document.getElementById("levelRhythm");
        level2.value = lvlrhythm;
        level2.disabled = "disabled";
   
        buildQuestion(lvlpitch, lvlrhythm);
    }
   

}

function buildQuestion(selectedLevelPitch, selectedLevelRhythm){

var commonBeams = new Map();
commonBeams.set("sixteenth group", ["single sixteenth note", "single sixteenth note", "single sixteenth note", "single sixteenth note"]);
commonBeams.set("eighth note sixteenth pair", ["single eighth note", "single sixteenth note", "single sixteenth note"]);
commonBeams.set("sixteenth pair eighth note", ["single sixteenth note", "single sixteenth note", "single eighth note"]);
commonBeams.set("eighth pair", ["single eighth note", "single eighth note"]);
commonBeams.set("dotted eighth note sixteenth note", ["dotted eighth note", "single sixteenth note"]);
commonBeams.set("sixteenth note dotted eighth note", ["single sixteenth note", "dotted eighth note"]);
commonBeams.set("sixteenth pair", ["single sixteenth note", "single sixteenth note"]);
commonBeams.set("sixteenth eighth sixteenth", ["single sixteenth note","single eighth note", "single sixteenth note"]);


var rhythmBank = new Map(); //1 boolean for common beams map, 2 boolean for dots, 3 boolean for rest!
rhythmBank.set("sixteenth pair", ["16", 0.5, true, false, false]);
rhythmBank.set("sixteenth group", ["16", 1, true, false, false]);
rhythmBank.set("sixteenth pair eighth note", ["16", 1, true, false, false]);
rhythmBank.set("eighth note sixteenth pair", ["16", 1, true, false, false]);
rhythmBank.set("sixteenth eighth sixteenth", ["16", 1, true, false, false]);
rhythmBank.set("single sixteenth note", ["16", 0.25, false, false, false]);
rhythmBank.set("eighth pair", ["8", 1, true, false, false] );
rhythmBank.set("single eighth note",["8", 0.5, false, false, false, false] );
rhythmBank.set("dotted eighth note", ["8", 0.75, false, true, false]);
rhythmBank.set("dotted eighth note sixteenth note",["8", 1, true, false, false]);
rhythmBank.set("sixteenth note dotted eighth note", ["8", 1, true, false, false]);
rhythmBank.set("quarter note", ["q", 1, false, false, false]);
rhythmBank.set("dotted quarter note", ["q", 1.5, false, true, false]);
rhythmBank.set("half note", ["h", 2, false, false, false]);
rhythmBank.set("whole note", ["w", 4, false, false, false]);
rhythmBank.set("dotted half note", ["h", 3, false, true, false]);

//rhythmBank.set("half rest", ["hr", 2, false, false, true]);
rhythmBank.set("quarter rest", ["qr", 1, false, false, true]);
rhythmBank.set("single eighth rest",["8r", 0.5, false, false, false, true] );


var equivalents = new Map();
equivalents.set("whole note", "1m");
equivalents.set("dotted half note", "2n.");
equivalents.set("half note", "2n");
equivalents.set("half rest", "2n");
equivalents.set("dotted quarter note", "4n.");
equivalents.set("quarter note", "4n");
equivalents.set("quarter rest", "4n");
equivalents.set("single eighth note", "8n");
equivalents.set("single eighth rest", "8n");
equivalents.set("dotted eighth note", "8n.");
equivalents.set("single sixteenth note", "16n");

equivalents.set("quarter rest", "4n");
equivalents.set("single eighth rest", "8n");

var audioMap = new Map();
audioMap.set("1m", [4, false]);
audioMap.set("2n.", [3, false]);
audioMap.set("2n", [2, false]);
audioMap.set("4n", [1, false]);
audioMap.set("4n.", [1.5, false]);
audioMap.set("8n", [0.5, false]);
audioMap.set("8n.", [0.75, false]);
audioMap.set("16n", [0.25, false]);

var rhythmArr = [];

    //var arrayPossible = [];

    if(selectedLevelRhythm == 1){
        rhythmArr = ["dotted half note","half note", "half note","quarter note", "quarter note", "quarter note"];
    }
    if(selectedLevelRhythm == 2){
        rhythmArr = ["quarter note", "eighth pair", "eighth pair", "half note", "eighth pair", "eighth pair", "half note"]; 
    }
    if(selectedLevelRhythm == 3){
        rhythmArr = ["dotted quarter note","quarter note", "single eighth note", "eighth pair"];
    }
    if(selectedLevelRhythm == 4){
        rhythmArr = ["quarter note", "sixteenth group","sixteenth pair eighth note", "eighth note sixteenth pair", "eighth pair"];
    }
    if(selectedLevelRhythm == 5){
        rhythmArr = ["dotted quarter note", "single eighth note", "sixteenth eighth sixteenth", "sixteenth pair", "eighth note sixteenth pair", "sixteenth note dotted eighth note", "dotted eighth note sixteenth note"];
    }
    
    //these refer to rhythmic component of answer
    var ansArray = [];
    var incorrect1 = [];
    var incorrect2 = [];

    //var firstRhythm = rhythmArr[Math.floor(Math.random() * rhythmArr.length)];
    var beatsLeft = 4;
    

    ansArray = fillMeasure(ansArray, beatsLeft, rhythmBank, rhythmArr, selectedLevelRhythm, null, null, null);
    incorrect1 = fillMeasure(incorrect1, beatsLeft, rhythmBank, rhythmArr, selectedLevelRhythm, ansArray, incorrect1, null);
    
    incorrect2= incorrect1.slice();
    incorrect3 = ansArray.slice()

    var ansSize = getArraySize(ansArray, rhythmBank, commonBeams);
    var incorrectSize = getArraySize(incorrect1, rhythmBank, commonBeams);    

    var pitches = getPitches(selectedLevelPitch, ansSize, incorrectSize);
    
    

    var completeAnsArray = [ansArray, pitches[0]];
    var completeincorrect1 = [incorrect1, pitches[1]];
    var completeincorrect2 = [incorrect2, pitches[2]];
    var completeincorrect3 = [incorrect3, pitches[3]]; 
    

    var mc = ["A", "B", "C", "D"];
    shuffle(mc);
    var ans = mc[0]
    var incorrect1ans = mc[1]
    var incorrect2ans = mc[2];
    var incorrect3ans = mc[3];

    populateDivs(completeAnsArray, ans, completeincorrect1, incorrect1ans, completeincorrect2, incorrect2ans, completeincorrect3, incorrect3ans, rhythmBank, commonBeams);
    
    var decoded = decodeAnswer(completeAnsArray, rhythmBank, commonBeams, equivalents, audioMap);

    practice2(decoded, ans, selectedLevelPitch, selectedLevelRhythm);

}

function getArraySize(ansArr, rhythmBank, commonBeams){
    var trueArr = []
    for(var i = 0; i< ansArr.length; i++){
        
        var element = rhythmBank.get(ansArr[i]);
        if(element[2] == true){
            var arr2 = commonBeams.get(ansArr[i]);
            for(j = 0; j < arr2.length; j++){
                trueArr.push(arr2[j]);
            }

        }
        else{
            trueArr.push(ansArr[i])
        }

    }
    return trueArr.length;

}
function decodeAnswer(ansArr, rhythmBank, commonBeams, equivalents, audioMap){

    var trueArr = []
    for(var i = 0; i< ansArr[0].length; i++){
       
        var element = rhythmBank.get(ansArr[0][i]);
        if(element[2] == true){
            var arr2 = commonBeams.get(ansArr[0][i]);
            for(j = 0; j < arr2.length; j++){
                trueArr.push(arr2[j]);
            }

        }
        else{
            trueArr.push(ansArr[0][i])
        }

    }
   

    var audio = [];
    for(var i = 0; i<trueArr.length; i++){
        var value = equivalents.get(trueArr[i]);
       
        var time = 0;
        for(j = 0; j < i; j++){
            time += audioMap.get(equivalents.get(trueArr[j]))[0]; 
        }
        if(rhythmBank.get(trueArr[i])[4] == true){
            audio.push([value, time, true]);
        }
        else{
            var pitch = ansArr[1][i];
            audio.push([value, time, false, pitch]);
        }
        
    }



    return audio;
}

function getPitches(selectedLevel, correctsize, incorrectSize){
    var arrayPossible = ["A3", "B3",
    "C4", "D4",  "E4", "F4",  "G4",  "A4",  "B4",
    "C5", "D5", "E5", "F5"];

    
    var notesArray = [];
    var incorrect1 = [];
    var incorrect2 = [];
    var incorrect3 = [];

    var index1 = Math.floor(Math.random() * arrayPossible.length);
    var note1 = arrayPossible[index1];
    notesArray.push(note1);
    incorrect1.push(note1);
    incorrect2.push(note1);
    incorrect3.push(note1);

    var direction = [-1, 1];

    var intervalArray = [0, 1];
    

    if(selectedLevel == 2){
        intervalArray = [0, 1, 2];
    }

    else if(selectedLevel == 3){
        intervalArray = [0, 1, 2, 3, 4]; 
    }
    else if(selectedLevel == 4){
        intervalArray = [0, 1, 2, 3, 4, 5, 6, 7]; 
    }
    
    var current = index1;
    var current1 = index1;
    var current2 = index1;
    var current3 = index1;
   
    
    while(notesArray.length < correctsize){
        var position = current;
        var nextNote = intervalArray[Math.floor(Math.random() * intervalArray.length)];
        var nextdirection = direction[Math.floor(Math.random() * direction.length)];

        if(((nextNote * nextdirection)+ position > arrayPossible.length-1) || ((nextNote * nextdirection)+ position < 0)){
            nextdirection = nextdirection * -1;
        } 
        var nextindex = (nextNote * nextdirection)+ position;
        nextNote = arrayPossible[nextindex];

        if(nextNote == null){
            continue;
        }

        notesArray.push(nextNote);
        current = nextindex;
    }
    var j = 1
    while(j < incorrectSize){
        var position1 = current1;
        var nextNote1 = intervalArray[Math.floor(Math.random() * intervalArray.length)]; //incorrect1
        var nextdirection1 = direction[Math.floor(Math.random() * direction.length)];

        if(((nextNote1 * nextdirection1)+ position1 > arrayPossible.length-1) || ((nextNote1 * nextdirection1)+ position1 < 0)){
            nextdirection1 = nextdirection1 * -1;
        }
        var nextindex1 = (nextNote1 * nextdirection1)+ position1;
        nextNote1 = arrayPossible[nextindex1];

        if(nextNote1 == null){
            continue;
        }

        if(j == 1){
           if(notesArray[1] === nextNote1){
               continue;
           }
           else{
            incorrect1.push(nextNote1);
            current1 = nextindex1;
            j++;
            continue;
            } 
        }
        else{
        incorrect1.push(nextNote1);
        current1 = nextindex1;
        j++;
        }

    }
    j=1;
    while(j < incorrectSize){    
        var position2 = current2;
        var nextNote2 = intervalArray[Math.floor(Math.random() * intervalArray.length)]; //incorrect1
        var nextdirection2 = direction[Math.floor(Math.random() * direction.length)];

        if(((nextNote2 * nextdirection2)+ position2 > arrayPossible.length-1) || ((nextNote2 * nextdirection2)+ position2 < 0)){
            nextdirection2 = nextdirection2 * -1;
        } 
        var nextindex2 = (nextNote2 * nextdirection2)+ position2;  
        nextNote2 = arrayPossible[nextindex2];

        if(nextNote2 == null){
            continue;
        }

        if(j == 1){
           if(incorrect1[1] === nextNote2){
               continue;
           } 
           else{
            incorrect2.push(nextNote2);
            current2 = nextindex2;
            j++;
            }
        }
        else{
        incorrect2.push(nextNote2);
        current2 = nextindex2;
        j++;
        }

    }

    j=1;
    while(j < correctsize){    
        var position3 = current3;
        var nextNote3 = intervalArray[Math.floor(Math.random() * intervalArray.length)]; //incorrect1
        var nextdirection3 = direction[Math.floor(Math.random() * direction.length)];

        if(((nextNote3 * nextdirection3)+ position3 > arrayPossible.length-1) || ((nextNote3 * nextdirection3)+ position3 < 0)){
            nextdirection2 = nextdirection2 * -1;
        } 
        var nextindex3 = (nextNote3 * nextdirection3)+ position3;  
        nextNote3 = arrayPossible[nextindex3];

        if(nextNote3 == null){
            continue;
        }
        else if(j== 1){
            if(notesArray[1] === nextNote3){
                continue;
            } 
            else{
                incorrect3.push(nextNote3);
                current3 = nextindex3;
                j++;
                }   
        }
        else{
        incorrect3.push(nextNote3);
        current3 = nextindex3;
        j++;
        }

    }
    var pitches = [notesArray, incorrect1, incorrect2, incorrect3];
    return pitches;    
}

function fillMeasure(array, currentBeats, rhythmBank, rhythmArr, level, ansArray, incorrect1, incorrect2){

    while(currentBeats > 0 ){
         var beatsLeft = currentBeats;

          var randomElement = rhythmArr[Math.floor(Math.random() * rhythmArr.length)];
       
          if(beatsLeft == 4 && rhythmBank.get(randomElement)[4] == true){
              continue;
          }
        
          if(beatsLeft == 4 && array === incorrect1 && randomElement === ansArray[0]){
              continue;
          }

          if(beatsLeft == 4 && array === incorrect2 &&(randomElement === ansArray[0] || randomElement === incorrect1[0])){
            continue;
          }

          var currentArr = rhythmBank.get(randomElement);
       
          var beatValue = currentArr[1];
      
      
          if(beatValue > beatsLeft){ 
          continue; 
          console.log("rats!");
          }

          else{

              currentBeats = beatsLeft - beatValue;

              if(randomElement === "sixteenth pair"){
                  array.push("sixteenth pair eighth note");
                  currentBeats = currentBeats - 0.5;
                  continue;
                  
              }
            
              if(randomElement === "dotted quarter note" ){
                
                if(currentBeats - Math.floor(currentBeats) !== 0){

                    if(level == 4){
                        var possibilities = [1, 2];
                        var rando = possibilities[Math.floor(Math.random() * possibilities.length)];
                        if (rando == 1){
                            array.push("dotted quarter note");
                            array.push("single eighth note");
                            currentBeats = currentBeats - 0.5;
                            continue;  
                        }
                        else{
                            array.push("dotted quarter note");
                            array.push("sixteenth pair");
                            currentBeats = currentBeats - 0.5;
                            continue; 
                        }

                    }
                    else{
                    array.push("dotted quarter note");
                    array.push("single eighth note");
                    currentBeats = currentBeats - 0.5;
                    continue;

                    }
 
                }
               
              } //end else for dotted quarter
      
      
              else if(randomElement === "single eighth note" || randomElement === "single eighth rest"){
      
                if(currentBeats == 0.5){
                    if(level > 2 && randomElement === "single eighth rest"){

                        array.push("single eighth rest");
                        array.push("single eighth note");
                        currentBeats = currentBeats - 0.5;
                        continue;  
                    }
                    
                    array.push("eighth pair");
                    currentBeats = currentBeats - 0.5;
                    continue;
                }

                if(level <=2){
                    array.push("eighth pair");
                    currentBeats = currentBeats - 0.5;
                    continue; 
                }

                else if(level > 2){
    
                if((currentBeats - Math.floor(currentBeats)) !== 0){

                    if(level == 4){
    
                        var randomOutcome = [1, 2];
                        var random2 = randomOutcome[Math.floor(Math.random() * randomOutcome.length)];
                        if(random2 == 1){
                         array.push("single eighth note");
                         array.push("quarter note");
                         array.push("sixteenth pair");
                         currentBeats = currentBeats - 1.5
                         continue;
                        }
                        else{
                            array.push("single eighth note");
                            array.push("quarter note");
                            array.push("single eighth note");
                            currentBeats = currentBeats - 1.5
                            continue;
                        }
    
                    }
                    else{
                        if(randomElement === "single eighth rest"){
                            array.push("single eighth rest");
                            array.push("quarter note");
                            array.push("single eighth note");
                            currentBeats = currentBeats - 1.5
                            continue;

                        }
                        else{
                            array.push("single eighth note");
                            array.push("quarter note");
                            array.push("single eighth note");
                            currentBeats = currentBeats - 1.5
                            continue;
                        }
                            

                    }
                    
                    }

                }

                
              } //end else for eighth note
            
            else{
                array.push(randomElement);
              }
              
          } //end else for if the beat is valid
          
      } //end while

      return array;

}




