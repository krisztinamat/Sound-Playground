window.onload = function(){
    sessionStorage.removeItem("lvlpitch");
    sessionStorage.removeItem("lvlrhythm");
    sessionStorage.removeItem("timeSig2");
    sessionStorage.removeItem("checked");
    sessionStorage.removeItem("lvlmath");
    sessionStorage.removeItem("lvlriddim");
    sessionStorage.removeItem("lvl");
    sessionStorage.removeItem("intval");
    sessionStorage.removeItem("intval3a");

    if(sessionStorage.getItem("lvlmelody") != null && sessionStorage.getItem("lvlharmony") != null){
        this.generateQuestion(Number(sessionStorage.getItem("lvlmelody")), Number(sessionStorage.getItem("lvlharmony")));
    }
}


function highlight(div){
    
    var a = document.getElementById("A");
    var b = document.getElementById("B");
    var c = document.getElementById("C");

    a.style.backgroundColor = "white";
    b.style.backgroundColor = "white";
    c.style.backgroundColor = "white";

    if(div === 'A'){
        a.style.backgroundColor = "rgb(222, 221, 250)";
         
    }
    if(div === 'B'){
        b.style.backgroundColor = "rgb(222, 221, 250)";  
    }
    if(div === 'C'){
        c.style.backgroundColor = "rgb(222, 221, 250)";  
    }
    sessionStorage.setItem("selection", div);
    
}

function generateQuestion(melody, harmony){
    //alert(lvl);
    var btn = document.getElementById("exercise");
    btn.disabled = true;

    var question = document.getElementById("question");
    question.style.visibility = "visible";

    if(harmony == null && melody == null){
    
    var level = document.getElementById("levelMelodic");
    level.disabled = "disabled";
    var melody1 = level.options[level.selectedIndex].value;

    level = document.getElementById("levelHarmonic");
    level.disabled = "disabled";
    var harmony1 = level.options[level.selectedIndex].value;

    buildQuestion(melody1, harmony1);
    }

    else{
        var level = document.getElementById("levelMelodic");
        level.value = melody;
        level.disabled = "disabled";

        var level2 = document.getElementById("levelHarmonic");
        level2.value = harmony;
        level2.disabled = "disabled";
   
        buildQuestion(melody, harmony);
    }
   

}

function buildQuestion(melody, harmony){

    var arrayPossible = ["A3", "B3",
    "C4", "D4",  "E4", "F4",  "G4",  "A4",  "B4",
    "C5", "D5", "E5"];

    var noteMap = new Map();
    noteMap.set("A3", "a/3");
    noteMap.set("B3", "b/3");
    noteMap.set("C4", "c/4");
    noteMap.set("D4", "d/4");
    noteMap.set("E4", "e/4");
    noteMap.set("F4", "f/4");
    noteMap.set("G4", "g/4");
    noteMap.set("A4", "a/4");
    noteMap.set("B4", "b/4");
    noteMap.set("C5", "c/5");
    noteMap.set("D5", "d/5");
    noteMap.set("E5", "e/5");
    noteMap.set("F5", "f/5");
    noteMap.set("G5", "g/5");
    noteMap.set("A5", "a/5");
    
    var notesArray = [];
    var incorrect1 = [];
    var incorrect2 = [];

    
    //incorrect1.push(note1);
    //incorrect2.push(note1);

    var direction = [-1, 1];


    var intervalArray = [0, 1];
    var intervalH = [2, 3];
    

    if(melody == 2){
        intervalArray = [0, 1, 2];
    }

    else if(melody == 3){
        intervalArray = [0, 1, 2, 3, 4]; 
    }

    else if(melody == 4){
        intervalArray = [0, 1, 2, 3, 4, 5, 6, 7]; 
    }

    if(harmony == 2){
      intervalH = [2, 3, 4, 5]
    } 
    else if(harmony == 3){
        intervalH = [2, 3, 4, 5, 6, 7]
    }
    var order = []
    var index1 = Math.floor(Math.random() * arrayPossible.length);
    var note1 = arrayPossible[index1];
    
    var harmonize = intervalH[Math.floor(Math.random()*intervalH.length)];
    var directionA = direction[Math.floor(Math.random() * direction.length)]; 
    if(((harmonize * directionA)+ index1 > arrayPossible.length-1) || ((harmonize * directionA)+ index1 < 0)){
        directionA = directionA * -1;
    }
    var othernoteIndex = (harmonize*directionA)+index1;
    var other = arrayPossible[othernoteIndex];
    if(index1 > othernoteIndex){
       order.push(note1);
       order.push(other)  ; 
    }
    else{
        order.push(other);
        order.push(note1);
    }
    notesArray.push(order);
    incorrect1.push(order);
    incorrect2.push(order);
      
    //console.log(current);
    var currentTop = arrayPossible.indexOf(order[0]);
    var currentBottom = arrayPossible.indexOf(order[1]);
    
    while(notesArray.length < 4){ //populate the voice 1 and 2 together as two-cell arrays [[], [], [], []]
        //console.log("hello");
        
        var sopBass = [];
        var position = currentTop;
        var position2 = currentBottom;

        var nextNote = intervalArray[Math.floor(Math.random() * intervalArray.length)];
        if(nextNote == null){
            continue;
        }
        var nextdirection = direction[Math.floor(Math.random() * direction.length)];

        if(((nextNote * nextdirection)+ position > arrayPossible.length-1) || ((nextNote * nextdirection)+ position < 0)){
            nextdirection = nextdirection * -1;
        } 
        var nextindex = (nextNote * nextdirection)+ position;
        nextNote = arrayPossible[nextindex];

        var interval = intervalH[Math.floor(Math.random()*intervalH.length)];

       while(nextindex-interval < 0 || !(intervalArray.includes(Math.abs((nextindex-interval)-position2)))){
           //console.log(Math.abs((nextindex-interval)-position2));
           //console.log(intervalArray);
           interval = intervalH[Math.floor(Math.random()*intervalH.length)];
           //console.log("hi");
       } 

       var nextindex2 = (nextindex-interval);

       nextNoteBass = nextindex2;
       currentTop = nextindex;
       currentBottom = nextNoteBass;
       nextNoteBass = arrayPossible[nextNoteBass];

        sopBass.push(nextNote);
        sopBass.push(nextNoteBass);
        notesArray.push(sopBass);
    
    }

    //console.log(notesArray);


    currentTop = arrayPossible.indexOf(order[0]);
    currentBottom = arrayPossible.indexOf(order[1]);
    var j = 1
    while(j < 4){
          
        var sopBass = [];
        var position = currentTop;
        var position2 = currentBottom;

        var nextNote = intervalArray[Math.floor(Math.random() * intervalArray.length)];
        if(nextNote == null){
            continue;
        }
        if(j == 1 && nextNote === notesArray[1][0]){
            continue;
        }
        var nextdirection = direction[Math.floor(Math.random() * direction.length)];

        if(((nextNote * nextdirection)+ position > arrayPossible.length-1) || ((nextNote * nextdirection)+ position < 0)){
            nextdirection = nextdirection * -1;
        } 
        var nextindex = (nextNote * nextdirection)+ position;
        nextNote = arrayPossible[nextindex];

        var interval = intervalH[Math.floor(Math.random()*intervalH.length)];

       while(nextindex-interval < 0 || !(intervalArray.includes(Math.abs((nextindex-interval)-position2)))){
           //console.log(Math.abs((nextindex-interval)-position2));
           //console.log(intervalArray);
           interval = intervalH[Math.floor(Math.random()*intervalH.length)];
           //console.log("hi");
       } 

       var nextindex2 = (nextindex-interval);

       nextNoteBass = nextindex2;
       currentTop = nextindex;
       currentBottom = nextNoteBass;
       nextNoteBass = arrayPossible[nextNoteBass];

        sopBass.push(nextNote);
        sopBass.push(nextNoteBass);
       incorrect1.push(sopBass);
       j++;

    }
    currentTop = arrayPossible.indexOf(order[0]);
    currentBottom = arrayPossible.indexOf(order[1]);
    var j = 1
    while(j < 4){
          
        var sopBass = [];
        var position = currentTop;
        var position2 = currentBottom;

        var nextNote = intervalArray[Math.floor(Math.random() * intervalArray.length)];
        if(nextNote == null){
            continue;
        }
        if(j == 2 && nextNote === notesArray[2][0]){
            continue;
        }
        if(j == 3 && nextNote === incorrect1[3][0]){
            continue;
        }
        var nextdirection = direction[Math.floor(Math.random() * direction.length)];

        if(((nextNote * nextdirection)+ position > arrayPossible.length-1) || ((nextNote * nextdirection)+ position < 0)){
            nextdirection = nextdirection * -1;
        } 
        var nextindex = (nextNote * nextdirection)+ position;
        nextNote = arrayPossible[nextindex];

        var interval = intervalH[Math.floor(Math.random()*intervalH.length)];

       while(nextindex-interval < 0 || !(intervalArray.includes(Math.abs((nextindex-interval)-position2)))){
           //console.log(Math.abs((nextindex-interval)-position2));
           //console.log(intervalArray);
           interval = intervalH[Math.floor(Math.random()*intervalH.length)];
           //console.log("hi");
       } 

       var nextindex2 = (nextindex-interval);

       nextNoteBass = nextindex2;
       currentTop = nextindex;
       currentBottom = nextNoteBass;
       nextNoteBass = arrayPossible[nextNoteBass];

        sopBass.push(nextNote);
        sopBass.push(nextNoteBass);
       incorrect2.push(sopBass);
       j++;

    }


    var mc = ["A", "B", "C"];
    shuffle(mc);
    var ans = mc[0]
    var incorrect1ans = mc[1]
    var incorrect2ans = mc[2];

    populateDivs(notesArray, ans, incorrect1, incorrect1ans, incorrect2, incorrect2ans, noteMap);
    practice2part(notesArray, ans, melody, harmony);

}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function populateDivs(notesArray, ans, incorrect1, incorrect1ans, incorrect2, incorrect2ans, noteMap){

var div1 = document.getElementById(ans);
var div2 = document.getElementById(incorrect1ans);
var div3 = document.getElementById(incorrect2ans);


drawStaff(div1, notesArray, noteMap);
drawStaff(div2, incorrect1, noteMap);
drawStaff(div3, incorrect2, noteMap);

}


function drawStaff(div1, array, noteMap){
    var VF = Vex.Flow;
    var div = div1;
    var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
    renderer.resize(400, 150);
    var context = renderer.getContext();
    var stave = new VF.Stave(10, 20, 330);
    stave.addClef("treble");
    stave.setContext(context).draw();

var notes = [];
var notes2 = [];

//console.log(array);

for(var i = 0; i < array.length; i++){
    var n1 = noteMap.get(array[i][0]); 
    notes.push(new VF.StaveNote({clef: "treble", keys: [n1], duration: "q", stem_direction: VF.StaveNote.STEM_UP }));
}
for(var i = 0; i < array.length; i++){
    var n1 = noteMap.get(array[i][1]); 
    notes2.push(new VF.StaveNote({clef: "treble", keys: [n1], duration: "q", stem_direction: VF.StaveNote.STEM_DOWN }));
}
//console.log(notes.length + ","+notes2.length);

var voices = [
	new VF.Voice({num_beats: 4,  beat_value: 4}).addTickables(notes),
	new VF.Voice({num_beats: 4,  beat_value: 4}).addTickables(notes2)]

// Format and justify the notes to 400 pixels.
var formatter = new VF.Formatter().joinVoices(voices).format(voices, 300);

// Render voices
voices.forEach(function(v) { v.draw(context, stave); })

}




