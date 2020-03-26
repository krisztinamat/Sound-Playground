var VF = Vex.Flow;
var div = document.getElementById("generatedExercise");
var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

renderer.resize(300, 150);
var context = renderer.getContext();

var stave = new VF.Stave(10, 20, 200);
stave.addClef("treble");
stave.setContext(context).draw();


var rhythmBank = new Map(); //key is a rhythm, value is beat total

var ans = ["", ""];

rhythmBank.set("whole note", ["4 beats", "w"] );
rhythmBank.set("whole rest", ["4 beats", "wr"] );
rhythmBank.set("dotted half note",["3 beats", "h"] );
rhythmBank.set("half note", ["2 beats", "h"]);
rhythmBank.set("half rest", ["2 beats", "hr"]);
rhythmBank.set("quarter note", ["1 beat", "q"]);
rhythmBank.set("quarter rest", ["1 beat", "qr"]);
rhythmBank.set("eighth note", ["1/2 of a beat", "8"]);
rhythmBank.set("eighth rest", ["1/2 of a beat", "8r"]);
rhythmBank.set("dotted quarter note", ["1 and 1/2 beats", "q"]);
rhythmBank.set("sixteenth note", ["1/4 of a beat", "16"]);
rhythmBank.set("sixteenth rest", ["1/4 of a beat", "16r"]);
rhythmBank.set("dotted eighth note", ["3/4 of a beat", "8"]);
rhythmBank.set("sixteenth note pair", ["1/2 of a beat", "16"]);
rhythmBank.set("eighth note pair", ["1 beat", "8"]);
rhythmBank.set("four sixteenth notes", ["1 beat", "16"]);



var rhythmArr = ["quarter note", "quarter rest", "half note", "half rest", "whole note","whole rest", "dotted half note", "eighth note pair", "dotted quarter note", "eighth note",
"eighth rest", "four sixteenth notes", "sixteenth note pair", "dotted eighth note", "sixteenth note", "sixteenth rest"];

var randomElement = rhythmArr[Math.floor(Math.random() * rhythmArr.length)];
var info = rhythmBank.get(randomElement);

ans[0] = randomElement;
ans[1] = info[0];

var duration = info[1];

var notes = [];

if(randomElement === "whole rest"){
    notes.push(new VF.StaveNote({clef: "treble", keys: ["d/5"], duration: duration }));
}
else if(randomElement === "half rest" || randomElement === "quarter rest" || randomElement === "eighth rest" || randomElement === "sixteenth rest"){
    notes.push(new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: duration }));
}

else if(randomElement === "dotted half note" || randomElement === "dotted quarter note" || randomElement === "dotted eighth note"){
    notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }).addDot(0));
}
else if(randomElement === "eighth note pair" || randomElement === "sixteenth note pair"){
    notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
    notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
}
else if(randomElement === "four sixteenth notes"){
    notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
    notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
    notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
    notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));

}
else{
    notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }));
}

var beams = VF.Beam.generateBeams(notes);
Vex.Flow.Formatter.FormatAndDraw(context, stave, notes);
beams.forEach(function(b) {b.setContext(context).draw()})

var submit = document.getElementById("submit");

submit.addEventListener("click", function(){getAns2(ans)} );


