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
answerBank.set(1, ["","","","","","","",""]);
answerBank.set(2, ["","","","","","","",""]);


rhythmBank.set("eighth pair", ["8", 1] );
rhythmBank.set("single eighth note",["8", 0.5] );
rhythmBank.set("dotted quarter note", ["q", 1.5]);
rhythmBank.set("quarter note", ["q", 1]);
rhythmBank.set("half note", ["h", 2]);
rhythmBank.set("dotted half note", ["h", 3]);
rhythmBank.set("whole note", ["w", 4]);

const rhythmArr = ["quarter note", "half note", "whole note", "dotted half note", "eighth pair", "dotted quarter note", "single eighth note"];

let currentMeasure = [1, 4]; //first item is measure number, and second is remaining beats;

let notes = [];

let beams = [];

const colorMap = new Map();
colorMap.set(1, "blue");
colorMap.set(2, "orange");

while(currentMeasure[1] > 0 ){
  let meas = currentMeasure[0];
  let beatBox = (currentMeasure[1]*2)-1;

  const color = colorMap.get(meas);

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
        //n.setStyle({fillStyle: color, strokeStyle: color});
        //notes.push(n);
        
        let duration = currentArr[0];

        if(randomElement === "dotted half note"){
            let n = new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }).addDot(0);
            n.setStyle({fillStyle: color, strokeStyle: color});
            notes.push(n);
        }

        else if(randomElement === "dotted quarter note" ){
          
          if((currentMeasure[1] - Math.floor(currentMeasure[1])) !== 0){
            
            let n = new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }).addDot(0);
            let m  = new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: "8" });

            n.setStyle({fillStyle: color, strokeStyle: color});
            notes.push(n);
            m.setStyle({fillStyle: color, strokeStyle: color});
            notes.push(m);

            currentMeasure[1] = currentMeasure[1] - 0.5;
            arr[beatBox-3]="single eighth note";
            answerBank.set(meas, arr);
          }
          else{
            let n = new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }).addDot(0);
            n.setStyle({fillStyle: color, strokeStyle: color});
            notes.push(n);
          }
        }


        else if(randomElement === "single eighth note"){

          if(currentMeasure[1] == 0.5){
          notes2 = [];
          let n = new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration });
          let m =new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration });
            n.setStyle({fillStyle: color, strokeStyle: color});
            m.setStyle({fillStyle: color, strokeStyle: color}); 
          notes2.push(n);
          notes2.push(m);
          var b = new VF.Beam(notes2);
          b.setStyle({
            fillStyle: color,
            strokeStyle: color,
          });
          beams.push(b);
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
              let n = new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration });
              let m = new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: "q" }).addDot(0);

              n.setStyle({fillStyle: color, strokeStyle: color});
              notes.push(n);
              m.setStyle({fillStyle: color, strokeStyle: color});
              notes.push(m);

              currentMeasure[1] = currentMeasure[1] - 1.5;
              arr[beatBox-1]="dotted quarter note";
              answerBank.set(meas, arr);
            }
            else{
              let n =new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration });
              let m = new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: "q" });
              let l = new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration });

              n.setStyle({fillStyle: color, strokeStyle: color});
              notes.push(n);
              m.setStyle({fillStyle: color, strokeStyle: color});
              notes.push(m);
              l.setStyle({fillStyle: color, strokeStyle: color});
              notes.push(l);

              currentMeasure[1] = currentMeasure[1] - 1.5;
              arr[beatBox-1]="quarter note";
              arr[beatBox-3] = "single eighth note";
              answerBank.set(meas, arr);
            }
          }
          
        }
        
        else if(randomElement === "eighth pair"){
          
          notes2 = [];
          let n = new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration });
          let m =new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration });
            n.setStyle({fillStyle: color, strokeStyle: color});
            m.setStyle({fillStyle: color, strokeStyle: color}); 
          notes2.push(n);
          notes2.push(m);
          var b = new VF.Beam(notes2);
          b.setStyle({
            fillStyle: color,
            strokeStyle: color,
          });
          beams.push(b);
          notes = notes.concat(notes2);
       
        }
        else
        {
          let n = new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration });
          n.setStyle({fillStyle: color, strokeStyle: color});
            notes.push(n);

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

let ans = [];
let meas1 = answerBank.get(1);
let meas2 = answerBank.get(2);

for(let i = 0; i < meas1.length; i++){
  if(meas1[i] === "eighth pair"){
    ans.push("single eighth note");
    ans.push("single eighth note");
    i++;
  }
  else if(meas1[i] == ""){
    ans.push("\u2192");
  }
  else{
    ans.push(meas1[i]);
  }
}
for(let i = 0; i < meas2.length; i++){
  if(meas2[i] === "eighth pair"){
    ans.push("single eighth note");
    ans.push("single eighth note");
    i++;
  }
  else if(meas2[i] == ""){
    ans.push("\u2192");
  }
  else{
    ans.push(meas2[i]);
  }
}

let submit = document.getElementById("submit");
submit.addEventListener("click", function(){evaluate(ans, submit, 2)} );
