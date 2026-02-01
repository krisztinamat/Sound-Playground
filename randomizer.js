window.onload = function(){
    sessionStorage.removeItem("lvlpitch");
    sessionStorage.removeItem("lvlrhythm");
    sessionStorage.removeItem("checked");
    sessionStorage.removeItem("lvlmath");
    sessionStorage.removeItem("lvlriddim");
    sessionStorage.removeItem("lvl");
    sessionStorage.removeItem("intval");
    sessionStorage.removeItem("intval3a");
    sessionStorage.removeItem("lvlmelody");
    sessionStorage.removeItem("lvlharmony");
    sessionStorage.removeItem("selection");

    if(sessionStorage.getItem("timeSig2") != null){
        const mode = sessionStorage.getItem("timeSig2");
        if(mode === "3"){
            let type = document.getElementById("mode");
            type.value = 3;
            type.disabled = "disabled";
            this.generateQuestion(3);  
        }
        else if(mode === "2"){
            let type = document.getElementById("mode");
            type.value = 2;
            type.disabled = "disabled";
            this.generateQuestion(2);
        }
        else{
            var type = document.getElementById("mode");
            type.value = 1;
            type.disabled = "disabled";
            this.generateQuestion(1);
        }
    }
}


function generateQuestion(type){
  
    if(type == null){
    let mode = document.getElementById("mode");
    mode.disabled = "disabled";
    type = mode.options[mode.selectedIndex].value;
    }
    
    if(type == 1){
        rhythmRandomize(1);
    }else if(type == 2){
        rhythmRandomize(2);
    }else{
        rhythmRandomize(3);
    }

}

function rhythmRandomize(rhythm){
//console.log(rhythm);
var exercise = document.getElementById("exercise");
exercise.disabled = true;

var VF = Vex.Flow;
var div = document.getElementById("generatedExercise");
var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

renderer.resize(300, 150);
var context = renderer.getContext();

var stave = new VF.Stave(10, 20, 200);
stave.addClef("treble");
stave.setContext(context).draw();


const rhythmBank = new Map(); //key is a rhythm, value is beat total

var ans = ["", ""];
let rhythmArr = [];

if(rhythm == 1){
rhythmBank.set("whole note", ["4 beats", "w", "whole","note(s)"] );
rhythmBank.set("whole rest", ["4 beats", "wr", "whole", "rest(s)"] );
rhythmBank.set("dotted half note",["3 beats", "h", "dotted half", "note(s)"] );
rhythmBank.set("dotted half rest",["3 beats", "hr", "dotted half", "rest(s)"] );
rhythmBank.set("half note", ["2 beats", "h", "half", "note(s)"]);
rhythmBank.set("half rest", ["2 beats", "hr", "half", "rest(s)"]);
rhythmBank.set("quarter note", ["1 beat", "q", "quarter", "note(s)"]);
rhythmBank.set("quarter rest", ["1 beat", "qr", "quarter", "rest(s)"]);
rhythmBank.set("eighth note", ["1/2 of a beat", "8", "single eighth", "note(s)"]);
rhythmBank.set("eighth rest", ["1/2 of a beat", "8r", "single eighth", "rest(s)"]);
rhythmBank.set("dotted quarter note", ["1 and 1/2 beats", "q", "dotted quarter","note(s)"]);
rhythmBank.set("sixteenth note", ["1/4 of a beat", "16", "single sixteenth", "note(s)"]);
rhythmBank.set("sixteenth rest", ["1/4 of a beat", "16r", "single sixteenth", "rest(s)"]);
rhythmBank.set("dotted eighth note", ["3/4 of a beat", "8", "dotted eighth", "note(s)"]);
rhythmBank.set("sixteenth note pair", ["1/2 of a beat", "16", "pair of sixteenth", "note(s)"]);
rhythmBank.set("eighth note pair", ["1 beat", "8", "pair of eighth", "note(s)"]);
rhythmBank.set("four sixteenth notes", ["1 beat", "16", "four sixteenth", "note(s)"]);



rhythmArr = ["quarter note", "quarter rest", "half note", "half rest", 
"whole note","whole rest", "dotted half note", "dotted half rest", 
"eighth note pair", "dotted quarter note", "eighth note",
"eighth rest", "four sixteenth notes", "sixteenth note pair", "dotted eighth note", 
"sixteenth note", "sixteenth rest"];

}
else if (rhythm == 2){
rhythmBank.set("dotted whole note", ["12 beats", "w", "dotted whole", "note(s)"] );
rhythmBank.set("dotted whole rest", ["12 beats", "wr", "dotted whole", "rest(s)"] );
rhythmBank.set("dotted half note",["6 beats", "h", "dotted half", "note(s)"] );
rhythmBank.set("dotted half rest",["6 beats", "hr", "dotted half", "rest(s)"] );
rhythmBank.set("dotted quarter note", ["3 beats", "q", "dotted quarter", "note(s)"]);
rhythmBank.set("dotted quarter rest", ["3 beats", "qr", "dotted quarter", "rest(s)"]);
rhythmBank.set("quarter note", ["2 beats", "q", "quarter", "note(s)"]);
rhythmBank.set("quarter rest", ["2 beats", "qr", "quarter", "rest(s)"]);
rhythmBank.set("eighth note", ["1 beat", "8", "single eighth", "note(s)"]);
rhythmBank.set("eighth rest", ["1 beat", "8r", "single eighth", "rest(s)"]);
rhythmBank.set("sixteenth note", ["1/2 of a beat", "16", "single sixteenth", "note(s)"]);
rhythmBank.set("sixteenth rest", ["1/2 of a beat", "16r", "single sixteenth", "rest(s)"]);
rhythmBank.set("three eighth notes", ["3 beats", "8", "three eighth", "note(s)"]);
rhythmBank.set("six sixteenth notes", ["3 beats", "16", "six sixteenth", "note(s)"]);

rhythmArr = ["quarter note", "quarter rest", "dotted half note", "dotted half rest", "dotted whole note",
"dotted whole rest", "dotted quarter rest", "dotted quarter note", "eighth note",
"eighth rest", "six sixteenth notes", "three eighth notes", "sixteenth note", "sixteenth rest"];
}
else{
    rhythmBank.set("whole note", ["2 beats", "w", "whole","note(s)"] );
    rhythmBank.set("whole rest", ["2 beats", "wr", "whole", "rest(s)"] );
    rhythmBank.set("dotted half note",["1 and 1/2 beats", "h", "dotted half", "note(s)"] );
    rhythmBank.set("dotted half rest",["1 and 1/2 beats", "hr", "dotted half", "rest(s)"] );
    rhythmBank.set("half note",["1 beat", "h", "half", "note(s)"] );
    rhythmBank.set("half rest",["1 beat", "hr", "half", "rest(s)"] );
    rhythmBank.set("dotted quarter note", ["3/4 of a beat", "q", "dotted quarter", "note(s)"]);
    rhythmBank.set("dotted quarter rest", ["3/4 of a beat", "qr", "dotted quarter", "rest(s)"]);
    rhythmBank.set("quarter note", ["1/2 of a beat", "q", "quarter", "note(s)"]);
    rhythmBank.set("quarter rest", ["1/2 of a beat", "qr", "quarter", "rest(s)"]);
    rhythmBank.set("eighth note", ["1/4 of a beat", "8", "single eighth", "note(s)"]);
    rhythmBank.set("eighth rest", ["1/4 of a beat", "8r", "single eighth", "rest(s)"]);
    rhythmBank.set("sixteenth note pair", ["1/4 of a beat", "16", "pair of sixteenth", "note(s)"]);
    rhythmBank.set("eighth note pair", ["1/2 of a beat", "8", "pair of eighth", "note(s)"]);
    rhythmBank.set("four sixteenth notes", ["1/2 of a beat", "16", "four sixteenth", "note(s)"]);
  
    rhythmArr = ["quarter note", "quarter rest", "half note", "half rest", 
    "whole note","whole rest", "dotted half note", "dotted half rest", 
    "eighth note pair", "dotted quarter note", "dotted quarter rest", "eighth note",
    "eighth rest", "four sixteenth notes", "sixteenth note pair", ]; 

}

let rhythmDiv = document.getElementById("rhythm");
rhythmDiv.style.visibility = "visible";
console.log("visible!");

let randomElement = rhythmArr[Math.floor(Math.random() * rhythmArr.length)];
let info = rhythmBank.get(randomElement);

ans[0] = info[2];
ans[1] = info[3];
ans[2] = info[0];

let duration = info[1];

let notes = [];
let beams = [];

if(randomElement === "whole rest"){
    notes.push(new VF.StaveNote({clef: "treble", keys: ["d/5"], duration: duration }));
}
else if(randomElement == "dotted whole rest"){
    notes.push(new VF.StaveNote({clef: "treble", keys: ["d/5"], duration: duration }).addModifier(new VF.Dot(), 0)); 
}
else if(randomElement === "half rest" || randomElement === "quarter rest" || randomElement === "eighth rest" || randomElement === "sixteenth rest"){
    notes.push(new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: duration }));
}
else if(randomElement === "dotted half rest" || randomElement === "dotted quarter rest"){
    notes.push(new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: duration }).addModifier(new VF.Dot(), 0));
}

else if(randomElement === "dotted whole note" || randomElement === "dotted half note" || randomElement === "dotted quarter note" || randomElement === "dotted eighth note"){
    notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }).addModifier(new VF.Dot(), 0));
}
else if(randomElement === "eighth note pair" || randomElement === "sixteenth note pair"){
    notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
    notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
    beams = VF.Beam.generateBeams(notes);
}
else if(randomElement === "four sixteenth notes"){
    notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
    notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
    notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
    notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
    beams = VF.Beam.generateBeams(notes);

}
else if(randomElement === "six sixteenth notes"){
    notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
    notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
    notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
    notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
    notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
    notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
    beams = VF.Beam.generateBeams(notes, {
        groups: [new Vex.Flow.Fraction(3, 8)]
      });

}
else if(randomElement === "three eighth notes"){
    notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
    notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
    notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
    beams = VF.Beam.generateBeams(notes, {
        groups: [new Vex.Flow.Fraction(3, 8)]
      });
}
else{
    notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
}

Vex.Flow.Formatter.FormatAndDraw(context, stave, notes);
beams.forEach(function(b) {b.setContext(context).draw()})


var submit = document.getElementById("submit");
submit.style.visibility = "visible";


submit.addEventListener("click", function(){getAnswerRhythmRandomizer(ans, rhythm)} );

}