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
answerBank.set(1, ["","","","","","","","", "","","","","","","",""]);

rhythmBank.set("sixteenth group", ["16", 1]);
rhythmBank.set("sixteenth pair", ["16", 0.5]);
rhythmBank.set("single sixteenth note", ["16", 0.25]);
rhythmBank.set("eighth pair", ["8", 1] );
rhythmBank.set("single eighth note",["8", 0.5] );
rhythmBank.set("dotted eighth note", ["8", 0.75]);
rhythmBank.set("quarter note", ["q", 1]);
rhythmBank.set("dotted quarter note", ["q", 1.5]);

var rhythmArr = ["sixteenth group", "sixteenth pair", "single sixteenth note", "dotted eighth note","quarter note",  "eighth pair", "dotted quarter note", "single eighth note"];

var currentMeasure = [1, 4]; //first item is measure number, and second is remaining beats;

var notes = [];

var beams = [];

while(currentMeasure[1] > 0 ){
  var meas = currentMeasure[0];
  var beatBox = (currentMeasure[1]*4)-1;


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

        if(randomElement === "dotted eighth note"){
          notes2 = [];
            notes2.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }).addDot(0));
            notes2.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: "16" }) );
            beams.push(new VF.Beam(notes2));
            notes = notes.concat(notes2);
            currentMeasure[1] = currentMeasure[1] - 0.25;
            arr[beatBox-3]="single sixteenth note";
            answerBank.set(meas, arr);
        }

        else if(randomElement === "sixteenth group"){
          notes2 = [];
          notes2.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
          notes2.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
          notes2.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
          notes2.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
          beams.push(new VF.Beam(notes2));
          notes = notes.concat(notes2);

          arr[beatBox]="single sixteenth note";
          arr[beatBox-1]="single sixteenth note";
          arr[beatBox-2]="single sixteenth note";
          arr[beatBox-3]="single sixteenth note";
              answerBank.set(meas, arr);

        }

        else if(randomElement === "single sixteenth note"){
            var options = [1, 2]; //1 = dotted eighth, 2 = eighth, single 16
            notes2 = [];
            var num = options[Math.floor(Math.random() * options.length)];
            if(num == 1){
            notes2.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
            notes2.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: "8" }).addDot(0) );
            arr[beatBox-1]="dotted eighth note";
              answerBank.set(meas, arr);
            }
            else{
              notes2.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
              notes2.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: "8" }));
              notes2.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
              arr[beatBox-1]="single eighth note";
              arr[beatBox-3] = "single sixteenth note";
              answerBank.set(meas, arr);
            }
            
            beams.push(new VF.Beam(notes2));
            notes = notes.concat(notes2);
            currentMeasure[1] = currentMeasure[1] - 0.75;
        }

        else if(randomElement === "sixteenth pair"){
          var options = [1, 2, 3] //1 = dotted quarter, 2 = quarter to eighth, 3 = quarter to two sixteenths, 4 = beam with 
          notes2 = [];
          arr[beatBox] = "single sixteenth note";
          arr[beatBox-1] = "single sixteenth note";
          answerBank.set(meas, arr);

          if(currentMeasure[1]> 1){
          var num = options[Math.floor(Math.random() * options.length)];
          if(num == 1){
            notes2.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
            notes2.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
            notes2.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: "q" }).addDot(0));
            beams.push(new VF.Beam(notes2));
            notes = notes.concat(notes2);
            currentMeasure[1] = currentMeasure[1] - 1.5;
            arr[beatBox-2]="dotted quarter note";
              answerBank.set(meas, arr);
          }
          if(num == 2){
            notes2.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
            notes2.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
            notes2.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: "q" }));
            notes2.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
            notes2.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
            beams.push(new VF.Beam(notes2));
            notes = notes.concat(notes2);
            currentMeasure[1] = currentMeasure[1] - 1.5;
            arr[beatBox-2]="quarter note";
            arr[beatBox-6]="single sixteenth note";
            arr[beatBox-7]="single sixteenth note";
            answerBank.set(meas, arr);
          }
          if(num == 3){
            notes2.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
            notes2.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
            notes2.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: "q" }));
            beams.push(new VF.Beam(notes2));
            notes = notes.concat(notes2);
            notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: "8" }));
            currentMeasure[1] = currentMeasure[1] - 1.5;
            arr[beatBox-2] = "quarter note";
            arr[beatBox-6] = "single eighth note";
            answerBank.set(meas, arr);

          }

        }
        else{
          notes2.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
          notes2.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
          notes2.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: "8"}));
          beams.push(new VF.Beam(notes2));
            notes = notes.concat(notes2);
            currentMeasure[1] = currentMeasure[1] - 0.5;
            arr[beatBox] = "single sixteenth note";
            arr[beatBox-1] = "single sixteenth note";
            arr[beatBox-2]="single eighth note";
            answerBank.set(meas, arr);
        }
        
        }

        else if(randomElement === "dotted quarter note" ){
          
          if((currentMeasure[1] - Math.floor(currentMeasure[1])) !== 0){
            
            notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }).addDot(0));
            notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: "8" }) );
            currentMeasure[1] = currentMeasure[1] - 0.5;
            arr[beatBox-6]="single eighth note";
            answerBank.set(meas, arr);
          }
          else{
            notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }).addDot(0));
          }
        }


        else if(randomElement === "single eighth note"){

          if(currentMeasure[1] == 0.5){
            var options = [1, 2];
          notes2 = [];
          var num = options[Math.floor(Math.random() * options.length)];
          if(num == 1){
          notes2.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
          notes2.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
          beams.push(new VF.Beam(notes2));
          notes = notes.concat(notes2);
          currentMeasure[1] = 0;
            arr[beatBox-2]="single eighth note";
            answerBank.set(meas, arr);
          }

          else{
            notes2.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
          notes2.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: "16" }));
          notes2.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: "16" }));
          beams.push(new VF.Beam(notes2));
          notes = notes.concat(notes2);
          currentMeasure[1] = 0;
          arr[beatBox-2]="single sixteenth note";
          arr[beatBox-3]="single sixteenth note";
          answerBank.set(meas, arr);
          }

            if(currentMeasure[1] == 0 && currentMeasure[0] < 1){
              notes.push(new VF.BarNote());
              break;
              }
           

          }
          if((currentMeasure[1] - Math.floor(currentMeasure[1])) !== 0){

            var randomOutcome = [1, 2];
            var random2 = randomOutcome[Math.floor(Math.random() * randomOutcome.length)];
            if(random2 == 1){
              notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
              notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: "q" }).addDot(0));
              currentMeasure[1] = currentMeasure[1] - 1.5;
              arr[beatBox-2]="dotted quarter note";
              answerBank.set(meas, arr);
            }
            else{
              notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
              notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: "q" }));
              notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
              currentMeasure[1] = currentMeasure[1] - 1.5;
              arr[beatBox-2]="quarter note";
              arr[beatBox-6] = "single eighth note";
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
          arr[beatBox]="single eighth note";
              arr[beatBox-2] = "single eighth note";
              answerBank.set(meas, arr);

       
        }
        else
        {
          notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
        }
        
    }

    if(currentMeasure[1] == 0 && currentMeasure[0] < 1){
        notes.push(new VF.BarNote());
        break;
    }
    
} 

var voice = new VF.Voice({num_beats: 4,  beat_value: 4});
voice.setStrict(false);
voice.addTickables(notes);

VF.Formatter.FormatAndDraw(context, stave, notes);
beams.forEach(function(b) {b.setContext(context).draw()});

answerBank.get(1).reverse();
//answerBank.get(2).reverse();
//console.log(answerBank);

var ans = [];
var meas1 = answerBank.get(1);
console.log(meas1);

for(var i = 0; i < meas1.length; i++){
 
  if(meas1[i] == ""){
    ans.push(" ");
  }
  else{
    ans.push(meas1[i]);
  }
}

console.log(ans);


var submit = document.getElementById("submit");
submit.addEventListener("click", function(){evaluate(ans, submit)} );


function evaluate (ans, submit){
  submit.disabled = "disabled";

  compareBank = [];
  var m = document.getElementById("1choicesBeat1");
  m.disabled = "disabled";
  var value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("1choicesBeat1e");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("1choicesBeat1+");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("1choicesBeat1a");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("1choicesBeat2");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("1choicesBeat2e");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("1choicesBeat2+");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("1choicesBeat2a");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("1choicesBeat3");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("1choicesBeat3e");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("1choicesBeat3+");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("1choicesBeat3a");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("1choicesBeat4");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("1choicesBeat4e");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("1choicesBeat4+");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("1choicesBeat4a");
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
  symbols.set("dotted quarter note", "\u2669.");
  symbols.set("quarter note", "\u2669");
  symbols.set("single eighth note", "\u266A");
  symbols.set("dotted eighth note", "\u266A");
  symbols.set("single sixteenth note", "\u16AB");


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




  