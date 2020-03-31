var VF = Vex.Flow;
var div = document.getElementById("generatedExercise");
var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

renderer.resize(600, 150);
var context = renderer.getContext();

var stave = new VF.Stave(10, 40, 500);
stave.addClef("treble").addTimeSignature("4/4").addKeySignature("C");
stave.setContext(context).draw();


var rhythmBank = new Map(); //key is a rhythm, value is beat total

var answerBank = new Map();
answerBank.set(1, ["","","","","","","",""]);
answerBank.set(2, ["","","","","","","",""]);


rhythmBank.set("eighth pair", ["8", 1] );
rhythmBank.set("single eighth note",["8", 0.5] );
rhythmBank.set("dotted quarter note", ["q", 1.5]);
rhythmBank.set("quarter note", ["q", 1]);
rhythmBank.set("half note", ["h", 2]);
rhythmBank.set("dotted half note", ["h", 3]);
rhythmBank.set("whole note", ["w", 4]);

var rhythmArr = ["quarter note", "half note", "whole note", "dotted half note", "eighth pair", "dotted quarter note", "single eighth note"];

var currentMeasure = [1, 4]; //first item is measure number, and second is remaining beats;

var notes = [];

var beams = [];

while(currentMeasure[1] > 0 ){
  var meas = currentMeasure[0];
  var beatBox = (currentMeasure[1]*2)-1;


    var beatsLeft = currentMeasure[1];
    var randomElement = rhythmArr[Math.floor(Math.random() * rhythmArr.length)];
    console.log(randomElement);

    var currentArr = rhythmBank.get(randomElement);
    var beatValue = currentArr[1];


    if(beatValue > beatsLeft){ 
    continue; 
    }


    else{
      var arr = answerBank.get(meas);
      arr[beatBox]=randomElement;
      answerBank.set(meas, arr);

        currentMeasure[1] = beatsLeft - beatValue;

        console.log("beats left " + currentMeasure[1]);
        
        var duration = currentArr[0];

        if(randomElement === "dotted half note"){
            notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }).addDot(0));
        }

        else if(randomElement === "dotted quarter note" ){
          
          if((currentMeasure[1] - Math.floor(currentMeasure[1])) !== 0){
            
            notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }).addDot(0));
            notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: "8" }) );
            currentMeasure[1] = currentMeasure[1] - 0.5;
            arr[beatBox-3]="single eighth note";
            answerBank.set(meas, arr);
          }
          else{
            notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }).addDot(0));
          }
        }


        else if(randomElement === "single eighth note"){

          if(currentMeasure[1] == 0.5){
          notes2 = [];
          notes2.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
          notes2.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
          beams.push(new VF.Beam(notes2));
          notes = notes.concat(notes2);
          currentMeasure[1] = 0;
            arr[beatBox-1]="single eighth note";
            answerBank.set(meas, arr);

            if(currentMeasure[1] == 0 && currentMeasure[0] < 2){
              notes.push(new VF.BarNote());
              currentMeasure[0] = 2;
              currentMeasure[1] = 4;
              continue;
              }
           

          }
          if((currentMeasure[1] - Math.floor(currentMeasure[1])) !== 0){

            var randomOutcome = [1, 2];
            var random2 = randomOutcome[Math.floor(Math.random() * randomOutcome.length)];
            if(random2 == 1){
              notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
              notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: "q" }).addDot(0));
              currentMeasure[1] = currentMeasure[1] - 1.5;
              arr[beatBox-1]="dotted quarter note";
              answerBank.set(meas, arr);
            }
            else{
              notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
              notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: "q" }));
              notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
              currentMeasure[1] = currentMeasure[1] - 1.5;
              arr[beatBox-1]="quarter note";
              arr[beatBox-3] = "single eighth note";
              answerBank.set(meas, arr);
            }
          }
          
        }
        
        else if(randomElement === "eighth pair"){
          
          notes2 = [];
          notes2.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
          notes2.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
          beams.push(new VF.Beam(notes2));
          notes = notes.concat(notes2);
       
        }
        else
        {
          notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
        }
        
    }

    if(currentMeasure[1] == 0 && currentMeasure[0] < 2){
        notes.push(new VF.BarNote());
        currentMeasure[0] = 2;
        currentMeasure[1] = 4;
        continue;
    }
    
} 

var voice = new VF.Voice({num_beats: 4,  beat_value: 4});
voice.setStrict(false);
voice.addTickables(notes);

VF.Formatter.FormatAndDraw(context, stave, notes);
beams.forEach(function(b) {b.setContext(context).draw()});

answerBank.get(1).reverse();
answerBank.get(2).reverse();
console.log(answerBank);

var ans = [];
var meas1 = answerBank.get(1);
var meas2 = answerBank.get(2);

for(var i = 0; i < meas1.length; i++){
  if(meas1[i] === "eighth pair"){
    ans.push("single eighth note");
    ans.push("single eighth note");
    i++;
  }
  else if(meas1[i] == ""){
    ans.push(" ");
  }
  else{
    ans.push(meas1[i]);
  }
}
for(var i = 0; i < meas2.length; i++){
  if(meas2[i] === "eighth pair"){
    ans.push("single eighth note");
    ans.push("single eighth note");
    i++;
  }
  else if(meas2[i] == ""){
    ans.push(" ");
  }
  else{
    ans.push(meas2[i]);
  }
}

var submit = document.getElementById("submit");
submit.addEventListener("click", function(){evaluate(ans, submit)} );


function evaluate (ans, submit){
  submit.disabled = "disabled";

  compareBank = [];
  var m = document.getElementById("1choicesBeat1");
  m.disabled = "disabled";
  var value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("1choicesBeat1+");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("1choicesBeat2");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("1choicesBeat2+");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("1choicesBeat3");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("1choicesBeat3+");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("1choicesBeat4");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("1choicesBeat4+");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("2choicesBeat1");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("2choicesBeat1+");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("2choicesBeat2");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("2choicesBeat2+");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("2choicesBeat3");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("2choicesBeat3+");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("2choicesBeat4");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("2choicesBeat4+");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  totalCorrect = 16;

  for(var i = 0; i < ans.length; i++){
    if(compareBank[i] === "blank"){
      compareBank[i] = " ";
    }
    if(ans[i] === compareBank[i]){
      continue;
    }
    else{
      totalCorrect--;
    }

  }
  var symbols = new Map(); //1D15D
  symbols.set(" ", " ");
  symbols.set("whole note", "\uD834\uDD5D"); 
  symbols.set("dotted half note", "\uD834\uDD5E \uD834\uDD6D");
  symbols.set("half note", "\uD834\uDD5E");
  symbols.set("dotted quarter note", "\uD834\uDD5F \uD834\uDD6D");
  symbols.set("quarter note", "\uD834\uDD5F");
  symbols.set("single eighth note", "\uD834\uDD60");


  var res = document.getElementById("result");
    var generateNew = document.getElementById("new");
    res.style.visibility = "visible";

    if(totalCorrect === 16){
        res.innerHTML = "Correct! Nice job!";
    }

    else{
        res.innerHTML = "Looks like you missed something. Check the answer in the grid below."}

    var body = document.getElementById("answer");
    answer.style.visibility = "visible";
    tbl  = document.createElement('table');
    tbl.style.fontSize = '16px';
    tbl.style.width  = '100%';
   // tbl.style.border = '1px solid black';

    for(var i = 0; i < 1; i++){
        var tr = tbl.insertRow();
        for(var j = 0; j < 16; j++){
           
                var td = tr.insertCell();
                td.style.width = "20px"
                var boxInfo = symbols.get(ans[j]);
                td.appendChild(document.createTextNode(boxInfo));
                td.style.border = '1px solid black';
          
        }
    }
    answer.appendChild(tbl);
    
    generateNew.style.visibility = "visible";  
    generateNew.addEventListener("click", function(){window.location.reload()}); 
  

}




  