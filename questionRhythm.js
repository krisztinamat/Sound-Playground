window.onload = function(){
    //load_();
    //localStorage.clear();
    //console.log(localStorage);
    if(localStorage.getItem("lvlriddim") != null){
        this.generateQuestion(Number(localStorage.getItem("lvlriddim")));
    }
}

function highlight(div){
    
    var a = document.getElementById("A");
    var b = document.getElementById("B");
    var c = document.getElementById("C");

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
    localStorage.setItem("selection", div);
    
}

function generateQuestion(lvl){
    //alert(lvl);
    var btn = document.getElementById("exercise");
    btn.disabled = true;

    var question = document.getElementById("question");
    question.style.visibility = "visible";

    if(lvl == null){
    
    var level = document.getElementById("level");
    level.disabled = "disabled";
    var selectedLevel = level.options[level.selectedIndex].value;

    buildQuestion(selectedLevel);
    }

    else{
        var level = document.getElementById("level");
        level.value = lvl;
        level.disabled = "disabled";
   
        buildQuestion(lvl);
    }
   

}

function buildQuestion(selectedLevel){

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
    
    
    var ansArray = [];
    var incorrect1 = [];
    var incorrect2 = [];

    //var firstRhythm = rhythmArr[Math.floor(Math.random() * rhythmArr.length)];
    var beatsLeft = 4;
    

    ansArray = fillMeasure(ansArray, beatsLeft, rhythmBank, rhythmArr, selectedLevel, null, null, null);

    incorrect1 = fillMeasure(incorrect1, beatsLeft, rhythmBank, rhythmArr, selectedLevel, ansArray, incorrect1, null);
    incorrect2= fillMeasure(incorrect2, beatsLeft, rhythmBank, rhythmArr, selectedLevel, ansArray, incorrect1, incorrect2);
    

    var mc = ["A", "B", "C"];
    shuffle(mc);
    var ans = mc[0]
    var incorrect1ans = mc[1]
    var incorrect2ans = mc[2];

    populateDivs(ansArray, ans, incorrect1, incorrect1ans, incorrect2, incorrect2ans, rhythmBank, commonBeams);
    
    var decoded = decodeAnswer(ansArray, rhythmBank, commonBeams, equivalents, audioMap);

    practice2(decoded, ans, selectedLevel);

}
function decodeAnswer(ansArr, rhythmBank, commonBeams, equivalents, audioMap){
    var trueArr = []
    for(var i = 0; i< ansArr.length; i++){
        //console.log(ansArr[i])
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
            audio.push([value, time, false]);
        }
        
    }

    return audio;
}

function fillMeasure(array, currentBeats, rhythmBank, rhythmArr, level, ansArray, incorrect1, incorrect2){

    while(currentBeats > 0 ){
         var beatsLeft = currentBeats;

          var randomElement = rhythmArr[Math.floor(Math.random() * rhythmArr.length)];
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

          var currentArr = rhythmBank.get(randomElement);
          //console.log(randomElement);
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




