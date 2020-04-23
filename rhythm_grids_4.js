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
answerBank.set(1, ["","","",""]);
answerBank.set(2, ["","","",""]);
answerBank.set(3, ["","","",""]);
answerBank.set(4, ["","","",""]);

rhythmBank.set("quarter note", ["q", 1]);
rhythmBank.set("half note", ["h", 2]);
rhythmBank.set("dotted half note", ["h", 3]);
rhythmBank.set("whole note", ["w", 4]);

var rhythmArr = ["quarter note", "half note", "whole note", "dotted half note"];

var currentMeasure = [1, 4]; //first item is measure number, and second is remaining beats;

var notes = [];

var beams = [];

while(currentMeasure[1] > 0 && currentMeasure[0] < 5){
  var meas = currentMeasure[0];
  var beatBox = (currentMeasure[1])-1;


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
       
        else
        {
          notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
        }
        
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
console.log(answerBank);

var ans = [];
var meas1 = answerBank.get(1);
var meas2 = answerBank.get(2);
var meas3 = answerBank.get(3);
var meas4 = answerBank.get(4);

for(var i = 0; i < meas1.length; i++){
   if(meas1[i] == ""){
    ans.push(" ");
  }
  else{
    ans.push(meas1[i]);
  }
}
for(var i = 0; i < meas2.length; i++){
   if(meas2[i] == ""){
    ans.push(" ");
  }
  else{
    ans.push(meas2[i]);
  }
}
for(var i = 0; i < meas3.length; i++){
  if(meas3[i] == ""){
   ans.push(" ");
 }
 else{
   ans.push(meas3[i]);
 }
}
for(var i = 0; i < meas4.length; i++){
  if(meas4[i] == ""){
   ans.push(" ");
 }
 else{
   ans.push(meas4[i]);
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

  m = document.getElementById("1choicesBeat2");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("1choicesBeat3");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("1choicesBeat4");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("2choicesBeat1");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("2choicesBeat2");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("2choicesBeat3");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("2choicesBeat4");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("3choicesBeat1");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("3choicesBeat2");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("3choicesBeat3");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("3choicesBeat4");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("4choicesBeat1");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("4choicesBeat2");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("4choicesBeat3");
  m.disabled = "disabled";
  value = m.options[m.selectedIndex].value;
  compareBank.push(value);

  m = document.getElementById("4choicesBeat4");
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
  symbols.set("whole note", "\u07CB"); 
  symbols.set("dotted half note", "\u147B");
  symbols.set("half note", "\u146F");
  symbols.set("quarter note", "\u2669");

  var res = document.getElementById("result");
    var generateNew = document.getElementById("new");
    res.style.visibility = "visible";

    if(totalCorrect === 16){
        res.innerHTML = "Correct! \u266B";
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




  