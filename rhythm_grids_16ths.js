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
answerBank.set(1, ["","","","","","","","", "","","","","","","",""]);

rhythmBank.set("sixteenth group", ["16", 1]);
rhythmBank.set("sixteenth pair", ["16", 0.5]);
rhythmBank.set("single sixteenth note", ["16", 0.25]);
rhythmBank.set("eighth pair", ["8", 1] );
rhythmBank.set("single eighth note",["8", 0.5] );
rhythmBank.set("dotted eighth note", ["8", 0.75]);
rhythmBank.set("quarter note", ["q", 1]);
rhythmBank.set("dotted quarter note", ["q", 1.5]);

const rhythmArr = ["sixteenth group", "sixteenth pair", "single sixteenth note", "dotted eighth note","quarter note",  "eighth pair", "dotted quarter note", "single eighth note"];

let currentMeasure = [1, 4]; //first item is measure number, and second is remaining beats;

let notes = [];

let beams = [];

while(currentMeasure[1] > 0 ){
  let meas = currentMeasure[0];
  let beatBox = (currentMeasure[1]*4)-1;


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

        if(randomElement === "dotted eighth note"){
          notes2 = [];
            notes2.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }).addModifier(new VF.Dot(), 0));
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
            let options = [1, 2]; //1 = dotted eighth, 2 = eighth, single 16
            notes2 = [];
            let num = options[Math.floor(Math.random() * options.length)];
            if(num == 1){
            notes2.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
            notes2.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: "8" }).addModifier(new VF.Dot(), 0) );
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
          let options = [1, 2, 3] //1 = dotted quarter, 2 = quarter to eighth, 3 = quarter to two sixteenths, 4 = beam with 
          notes2 = [];
          arr[beatBox] = "single sixteenth note";
          arr[beatBox-1] = "single sixteenth note";
          answerBank.set(meas, arr);

          if(currentMeasure[1]> 1){
          let num = options[Math.floor(Math.random() * options.length)];
          if(num == 1){
            notes2.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
            notes2.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
            notes2.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: "q" }).addModifier(new VF.Dot(), 0));
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
            
            notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }).addModifier(new VF.Dot(), 0));
            notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: "8" }) );
            currentMeasure[1] = currentMeasure[1] - 0.5;
            arr[beatBox-6]="single eighth note";
            answerBank.set(meas, arr);
          }
          else{
            notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }).addModifier(new VF.Dot(), 0));
          }
        }


        else if(randomElement === "single eighth note"){

          if(currentMeasure[1] == 0.5){
            let options = [1, 2];
            notes2 = [];
            num = options[Math.floor(Math.random() * options.length)];
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

            let randomOutcome = [1, 2];
            let random2 = randomOutcome[Math.floor(Math.random() * randomOutcome.length)];
            if(random2 == 1){
              notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
              notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: "q" }).addModifier(new VF.Dot(), 0));
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

let ans = [];
let meas1 = answerBank.get(1);

for(let i = 0; i < meas1.length; i++){
 
  if(meas1[i] == ""){
    ans.push("\u2192");
  }
  else{
    ans.push(meas1[i]);
  }
}

let submit = document.getElementById("submit");
submit.addEventListener("click", function(){evaluate(ans, submit, 3)} );
