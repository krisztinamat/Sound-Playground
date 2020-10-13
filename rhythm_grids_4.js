//as of 8/16/20, changed var to const/let where appropriate

var VF = Vex.Flow;
var div = document.getElementById("generatedExercise");
var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

renderer.resize(600, 150);
var context = renderer.getContext();

var stave = new VF.Stave(10, 40, 500);
stave.addClef("treble").addTimeSignature("4/4").addKeySignature("C");
stave.setContext(context).draw();


const rhythmBank = new Map(); //key is a rhythm, value is beat total

let answerBank = new Map();
answerBank.set(1, ["","","",""]);
answerBank.set(2, ["","","",""]);
answerBank.set(3, ["","","",""]);
answerBank.set(4, ["","","",""]);

rhythmBank.set("quarter note", ["q", 1]);
rhythmBank.set("half note", ["h", 2]);
rhythmBank.set("dotted half note", ["h", 3]);
rhythmBank.set("whole note", ["w", 4]);

const rhythmArr = ["quarter note", "half note", "whole note", "dotted half note"];

let currentMeasure = [1, 4]; //first item is measure number, and second is remaining beats;

let notes = [];

let beams = [];

const colorMap = new Map();
colorMap.set(1, "blue");
colorMap.set(2, "green");
colorMap.set(3, "orange");
colorMap.set(4, "purple");

while(currentMeasure[1] > 0 && currentMeasure[0] < 5){
  let meas = currentMeasure[0];
  let beatBox = (currentMeasure[1])-1;

  const color = colorMap.get(currentMeasure[0]);

    let beatsLeft = currentMeasure[1];
    let randomElement = rhythmArr[Math.floor(Math.random() * rhythmArr.length)];
    //console.log(randomElement);

    let currentArr = rhythmBank.get(randomElement);
    let beatValue = currentArr[1];


    if(beatValue > beatsLeft){ 
    continue; 
    }


    else{
      let arr = answerBank.get(meas);
      arr[beatBox]=randomElement;
      answerBank.set(meas, arr);

        currentMeasure[1] = beatsLeft - beatValue;

        //console.log("beats left " + currentMeasure[1]);
        
        let duration = currentArr[0];

        if(randomElement === "dotted half note"){
            var n = new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }).addDot(0);     
        }
       
        else{ 
            var n = new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration });
        }

        n.setStyle({fillStyle: color, strokeStyle: color});
        notes.push(n);    
    }

    if(currentMeasure[1] == 0 && currentMeasure[0] < 4){
        notes.push(new VF.BarNote());
        currentMeasure[0]++;
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
answerBank.get(3).reverse();
answerBank.get(4).reverse();
//console.log(answerBank);

let ans = [];
let meas1 = answerBank.get(1);
let meas2 = answerBank.get(2);
let meas3 = answerBank.get(3);
let meas4 = answerBank.get(4);

for(let i = 0; i < meas1.length; i++){
   if(meas1[i] == ""){
    ans.push("\u2192");
  }
  else{
    ans.push(meas1[i]);
  }
}
for(let i = 0; i < meas2.length; i++){
   if(meas2[i] == ""){
    ans.push("\u2192");
  }
  else{
    ans.push(meas2[i]);
  }
}
for(let i = 0; i < meas3.length; i++){
  if(meas3[i] == ""){
   ans.push("\u2192");
 }
 else{
   ans.push(meas3[i]);
 }
}
for(let i = 0; i < meas4.length; i++){
  if(meas4[i] == ""){
   ans.push("\u2192");
 }
 else{
   ans.push(meas4[i]);
 }
}

let submit = document.getElementById("submit");
submit.addEventListener("click", function(){evaluate(ans, submit, 1)} );
