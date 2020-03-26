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

/*var eighthPair = [
    new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: "8" }),
    new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: "8" })
  ];

var eighths = VF.Beam(eighthPair); */

//rhythmBank.set("eighth pair", [eighths, 1]);
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



while(currentMeasure[1] > 0 ){
    var beatsLeft = currentMeasure[1];
    var randomElement = rhythmArr[Math.floor(Math.random() * rhythmArr.length)];
    console.log(randomElement);

    var currentArr = rhythmBank.get(randomElement);
    var beatValue = currentArr[1];


    if(beatValue > beatsLeft){ 
    continue; 
    }


    else{
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
          }
          else{
            notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }).addDot(0));
          }
        }


        else if(randomElement === "single eighth note"){

          if(currentMeasure[1] == 0.5){
            notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
            notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
            currentMeasure[1] = 0;

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
            }
            else{
              notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
              notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: "q" }));
              notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
              currentMeasure[1] = currentMeasure[1] - 1.5;
            }
          }
          
        }
        
        else if(randomElement === "eighth pair"){
          
          notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
          notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
       
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
//beams.forEach(function(b) {b.setContext(context).draw()});



// Format and justify the notes to 400 pixels.
//var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);

// Render voice
//voice.draw(context, stave); */ //STOP HERE
   /* var beams = VF.Beam.generateBeams(notes);
    Vex.Flow.Formatter.FormatAndDraw(context, stave, notes);
    beams.forEach(function(b) {b.setContext(context).draw()}); */

    addTable();


    function addTable() {
        console.log("hello");
        var myTableDiv = document.getElementById("myDynamicTable");
      
        var table = document.createElement('TABLE');
        table.border = '1';
      
        var tableBody = document.createElement('TBODY');
        table.appendChild(tableBody);
      
        for (var i = 0; i < 2; i++) {
          var tr = document.createElement('TR');
          tableBody.appendChild(tr);
      
          for (var j = 0; j < 16; j++) {
            var td = document.createElement('TD');
            td.width = '75';
            if(i == 0 ){
            if(j%2 == 0){
              if(j == 0 || j == 8){td.appendChild(document.createTextNode("1"));}
              if(j == 2 || j == 10){td.appendChild(document.createTextNode("2"));}
              if(j == 4 || j == 12){td.appendChild(document.createTextNode("3"));}
              if(j == 6 || j == 14){td.appendChild(document.createTextNode("4"));}
            }
            else{
              td.appendChild(document.createTextNode("+"));
            }
            
            }
            else{
                td.appendChild(document.createTextNode('\xa0'));
                tr.style.emptyCells = "show";

            }
            tr.appendChild(td);
          }
        }
        myTableDiv.appendChild(table);
      }

