window.onload = function(){
    sessionStorage.removeItem("lvlpitch");
    sessionStorage.removeItem("lvlrhythm");
    sessionStorage.removeItem("timeSig2");
    sessionStorage.removeItem("checked");
    sessionStorage.removeItem("lvlmath");
    sessionStorage.removeItem("lvl");
    sessionStorage.removeItem("intval");
    sessionStorage.removeItem("intval3a");
    sessionStorage.removeItem("lvlmelody");
    sessionStorage.removeItem("lvlharmony");
    sessionStorage.removeItem("selection");

    if(sessionStorage.getItem("lvlriddim") != null){
        this.generateQuestion(Number(sessionStorage.getItem("lvlriddim")));
    }
}

function highlight(div){
    
    let a = document.getElementById("A");
    let b = document.getElementById("B");
    let c = document.getElementById("C");

    a.style.backgroundColor = "white";
    b.style.backgroundColor = "white";
    c.style.backgroundColor = "white";

    if(div === 'A'){
        a.style.backgroundColor = "rgb(222, 221, 250)";
         
    }
    if(div === 'B'){
        b.style.backgroundColor = "rgb(222, 221, 250)";  
    }
    if(div === 'C'){
        c.style.backgroundColor = "rgb(222, 221, 250)";  
    }
    sessionStorage.setItem("selection", div);
    
}

function generateQuestion(lvl){
    //alert(lvl);
    let btn = document.getElementById("exercise");
    btn.disabled = true;

    let question = document.getElementById("question");
    question.style.visibility = "visible";

    if(lvl == null){
    
    let level = document.getElementById("level");
    level.disabled = "disabled";
    let selectedLevel = level.options[level.selectedIndex].value;

    buildQuestion(selectedLevel);
    }

    else{
        let level = document.getElementById("level");
        level.value = lvl;
        level.disabled = "disabled";
   
        buildQuestion(lvl);
    }
   

}

function buildQuestion(selectedLevel){

const commonBeams = new Map();
commonBeams.set("sixteenth group", ["single sixteenth note", "single sixteenth note", "single sixteenth note", "single sixteenth note"]);
commonBeams.set("eighth note sixteenth pair", ["single eighth note", "single sixteenth note", "single sixteenth note"]);
commonBeams.set("sixteenth pair eighth note", ["single sixteenth note", "single sixteenth note", "single eighth note"]);
commonBeams.set("eighth pair", ["single eighth note", "single eighth note"]);
commonBeams.set("dotted eighth note sixteenth note", ["dotted eighth note", "single sixteenth note"]);
commonBeams.set("sixteenth note dotted eighth note", ["single sixteenth note", "dotted eighth note"]);
commonBeams.set("sixteenth pair", ["single sixteenth note", "single sixteenth note"]);
commonBeams.set("sixteenth eighth sixteenth", ["single sixteenth note","single eighth note", "single sixteenth note"]);


const rhythmBank = new Map(); //1 boolean for common beams map, 2 boolean for dots, 3 boolean for rest!
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


const equivalents = new Map();
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

const audioMap = new Map();
audioMap.set("1m", [4, false]);
audioMap.set("2n.", [3, false]);
audioMap.set("2n", [2, false]);
audioMap.set("4n", [1, false]);
audioMap.set("4n.", [1.5, false]);
audioMap.set("8n", [0.5, false]);
audioMap.set("8n.", [0.75, false]);
audioMap.set("16n", [0.25, false]);

let rhythmArr = [];

    //let arrayPossible = [];

    if(selectedLevel == 1){
        rhythmArr = ["whole note", "dotted half note","half note", "half note","quarter note", "quarter note", "quarter note"];
    }
    if(selectedLevel == 2){
        rhythmArr = ["quarter note", "eighth pair", "eighth pair", "half note", "eighth pair", "eighth pair", "half note"]; 
    }
    if(selectedLevel == 3){
        rhythmArr = ["dotted quarter note","quarter note", "single eighth note", "eighth pair"];
    }
    if(selectedLevel == 4){
        rhythmArr = ["quarter note", "sixteenth group","sixteenth pair eighth note", "eighth note sixteenth pair", "eighth pair"];
    }
    if(selectedLevel == 5){
        rhythmArr = ["dotted quarter note", "single eighth note", "sixteenth eighth sixteenth", "sixteenth pair", "eighth note sixteenth pair", "sixteenth note dotted eighth note", "dotted eighth note sixteenth note"];
    }
    
    
    let ansArray = [];
    let incorrect1 = [];
    let incorrect2 = [];

    //let firstRhythm = rhythmArr[Math.floor(Math.random() * rhythmArr.length)];
    let beatsLeft = 4;
    

    ansArray = fillMeasure(ansArray, beatsLeft, rhythmBank, rhythmArr, selectedLevel, null, null, null);

    incorrect1 = fillMeasure(incorrect1, beatsLeft, rhythmBank, rhythmArr, selectedLevel, ansArray, incorrect1, null);
    incorrect2= fillMeasure(incorrect2, beatsLeft, rhythmBank, rhythmArr, selectedLevel, ansArray, incorrect1, incorrect2);
    

    let mc = ["A", "B", "C"];
    shuffle(mc);
    let ans = mc[0]
    let incorrect1ans = mc[1]
    let incorrect2ans = mc[2];

    populateDivs(ansArray, ans, incorrect1, incorrect1ans, incorrect2, incorrect2ans, rhythmBank, commonBeams);
    
    let decoded = decodeAnswer(ansArray, rhythmBank, commonBeams, equivalents, audioMap);

    rhythmDictationAudio(decoded, ans, selectedLevel);

}
function decodeAnswer(ansArr, rhythmBank, commonBeams, equivalents, audioMap){
    let trueArr = []
    for(let i = 0; i< ansArr.length; i++){
        //console.log(ansArr[i])
        let element = rhythmBank.get(ansArr[i]);
        if(element[2] == true){
            let arr2 = commonBeams.get(ansArr[i]);
            for(j = 0; j < arr2.length; j++){
                trueArr.push(arr2[j]);
            }

        }
        else{
            trueArr.push(ansArr[i])
        }

    }

    let audio = [];
    for(let i = 0; i<trueArr.length; i++){
        let value = equivalents.get(trueArr[i]);
        let time = 0;
        for(j = 0; j < i; j++){
            time += audioMap.get(equivalents.get(trueArr[j]))[0]; 
        }
        if(rhythmBank.get(trueArr[i])[4] == true){
            audio.push([value, time, true]);
        }
        else{
            audio.push([value, time, false]);
        }
        
    }

    return audio;
}

function fillMeasure(array, currentBeats, rhythmBank, rhythmArr, level, ansArray, incorrect1, incorrect2){

    while(currentBeats > 0 ){
         let beatsLeft = currentBeats;

          let randomElement = rhythmArr[Math.floor(Math.random() * rhythmArr.length)];
          //console.log(randomElement);
          if(beatsLeft == 4 && rhythmBank.get(randomElement)[4] == true){
              continue;
          }
        
          if(beatsLeft == 4 && array === incorrect1 && randomElement === ansArray[0]){
              continue;
          }

          if(beatsLeft == 4 && array === incorrect2 &&(randomElement === ansArray[0] || randomElement === incorrect1[0])){
            continue;
          }

          let currentArr = rhythmBank.get(randomElement);
          //console.log(randomElement);
          let beatValue = currentArr[1];
      
      
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
                        let possibilities = [1, 2];
                        let rando = possibilities[Math.floor(Math.random() * possibilities.length)];
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
    
                        let randomOutcome = [1, 2];
                        let random2 = randomOutcome[Math.floor(Math.random() * randomOutcome.length)];
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




