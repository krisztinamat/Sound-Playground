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
rhythmBank.set("eighth pair", [new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: "8" }), 1] );
rhythmBank.set("quarter note", ["q", 1]);
rhythmBank.set("half note", ["h", 2]);
rhythmBank.set("dotted half note", ["h", 3]);
rhythmBank.set("whole note", ["w", 4]);

var rhythmArr = ["quarter note", "half note", "whole note", "dotted half note"];

var currentMeasure = [1, 4]; //first item is measure number, and second is remaining beats;

var notes = [];



while(currentMeasure[1] > 0 ){
    var beatsLeft = currentMeasure[1];
    var randomElement = rhythmArr[Math.floor(Math.random() * rhythmArr.length)];
    console.log(randomElement);
    var currentArr = rhythmBank.get(randomElement);
    var beatValue = currentArr[1];
    console.log("beat value: " + beatValue); 

    if(beatValue > beatsLeft){ continue; }

    else{
        currentMeasure[1] = beatsLeft - beatValue;
        
        var duration = currentArr[0];
        if(randomElement === "dotted half note"){
            notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }).addDot(0));
        }
        else{notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));}
        
    }

    if(currentMeasure[1] == 0 && currentMeasure[0] < 2){
        notes.push(new VF.BarNote());
        currentMeasure[0] = 2;
        currentMeasure[1] = 4;
        continue;
    }
    
} 
//currentMeasure[1] = 4;


var voice = new VF.Voice({num_beats: 4,  beat_value: 4});
voice.setStrict(false);
voice.addTickables(notes);

// Format and justify the notes to 400 pixels.
var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);

// Render voice
voice.draw(context, stave); 
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
      
          for (var j = 0; j < 8; j++) {
            var td = document.createElement('TD');
            td.width = '75';
            if(i == 0 ){
            td.appendChild(document.createTextNode(j%4+1));
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

