window.onload = function(){
    sessionStorage.removeItem("lvlpitch");
    sessionStorage.removeItem("lvlrhythm");
    sessionStorage.removeItem("timeSig2");
    sessionStorage.removeItem("checked");
    sessionStorage.removeItem("lvlmath");
    sessionStorage.removeItem("lvlriddim");
    sessionStorage.removeItem("intval");
    sessionStorage.removeItem("intval3a");
    sessionStorage.removeItem("lvlmelody");
    sessionStorage.removeItem("lvlharmony");
    sessionStorage.removeItem("selection");

    if(sessionStorage.getItem("lvl") != null){
        this.generateQuestion(Number(sessionStorage.getItem("lvl")));
    }
}

function highlight(div){
    
    let a = document.getElementById("A");
    let b = document.getElementById("B");
    let c = document.getElementById("C");

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

function generateQuestion(lvl){
    //alert(lvl);
    let btn = document.getElementById("exercise");
    btn.disabled = true;

    let question = document.getElementById("question");
    question.style.visibility = "visible";

    if(lvl == null){
    
    let level = document.getElementById("level");
    level.disabled = "disabled";
    let selectedLevel = level.options[level.selectedIndex].value;

    buildQuestion(selectedLevel);
    }

    else{
        let level = document.getElementById("level");
        level.value = lvl;
        level.disabled = "disabled";
   
        buildQuestion(lvl);
    }
   

}

function buildQuestion(selectedLevel){

    const arrayPossible = ["A3", "B3",
    "C4", "D4",  "E4", "F4",  "G4",  "A4",  "B4",
    "C5", "D5", "E5", "F5"];

    const noteMap = new Map();
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
    
    let notesArray = [];
    let incorrect1 = [];
    let incorrect2 = [];

    let index1 = Math.floor(Math.random() * arrayPossible.length);
    let note1 = arrayPossible[index1];
    notesArray.push(note1);
    incorrect1.push(note1);
    incorrect2.push(note1);

    const direction = [-1, 1];


    let intervalArray = [0, 1];
    

    if(selectedLevel == 2){
        intervalArray = [0, 1, 2];
    }

    else if(selectedLevel == 3){
        intervalArray = [0, 1, 2, 3, 4]; 
    }

    else if(selectedLevel == 4){
        intervalArray = [0, 1, 2, 3, 4, 5, 6, 7]; 
    }
    
    let current = index1;
    let current1 = index1;
    let current2 = index1;
    //console.log(current);
    
    while(notesArray.length < 4){
        let position = current;
        let nextNote = intervalArray[Math.floor(Math.random() * intervalArray.length)];
        let nextdirection = direction[Math.floor(Math.random() * direction.length)];

        if(((nextNote * nextdirection)+ position > arrayPossible.length-1) || ((nextNote * nextdirection)+ position < 0)){
            nextdirection = nextdirection * -1;
        } 
        let nextindex = (nextNote * nextdirection)+ position;
        nextNote = arrayPossible[nextindex];
        notesArray.push(nextNote);
        current = nextindex;
    }
    let j = 1
    while(j < 4){
        let position1 = current1;
        let nextNote1 = intervalArray[Math.floor(Math.random() * intervalArray.length)]; //incorrect1
        let nextdirection1 = direction[Math.floor(Math.random() * direction.length)];

        if(((nextNote1 * nextdirection1)+ position1 > arrayPossible.length-1) || ((nextNote1 * nextdirection1)+ position1 < 0)){
            nextdirection1 = nextdirection1 * -1;
        }
        let nextindex1 = (nextNote1 * nextdirection1)+ position1;
        nextNote1 = arrayPossible[nextindex1];

        if(nextNote1 == null){
            continue;
        }

        if(j == 1){
           if(notesArray[1] === nextNote1){
               continue;
           }
           else{
            incorrect1.push(nextNote1);
            current1 = nextindex1;
            j++;
            continue;
            } 
        }
        else{
        incorrect1.push(nextNote1);
        current1 = nextindex1;
        j++;
        }

    }
    j=1;
    while(j < 4){    
        let position2 = current2;
        let nextNote2 = intervalArray[Math.floor(Math.random() * intervalArray.length)]; //incorrect1
        let nextdirection2 = direction[Math.floor(Math.random() * direction.length)];

        if(((nextNote2 * nextdirection2)+ position2 > arrayPossible.length-1) || ((nextNote2 * nextdirection2)+ position2 < 0)){
            nextdirection2 = nextdirection2 * -1;
        } 
        let nextindex2 = (nextNote2 * nextdirection2)+ position2;  
        nextNote2 = arrayPossible[nextindex2];

        if(nextNote2 == null){
            continue;
        }

        if(j == 2){
           if(notesArray[2] === nextNote2){
               continue;
           } 
           else{
            incorrect2.push(nextNote2);
            current2 = nextindex2;
            j++;
            }
        }
        else if(j== 3){
            if(incorrect1[j] === nextNote2){
                continue;
            } 
            else{
                incorrect2.push(nextNote2);
                current2 = nextindex2;
                j++;
                }   
        }
        else{
        incorrect2.push(nextNote2);
        current2 = nextindex2;
        j++;
        }

    }


    let mc = ["A", "B", "C"];
    shuffle(mc);
    let ans = mc[0]
    let incorrect1ans = mc[1]
    let incorrect2ans = mc[2];

    populateDivs(notesArray, ans, incorrect1, incorrect1ans, incorrect2, incorrect2ans, noteMap);
    pitchDictationAudio(notesArray, ans, selectedLevel);

}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function populateDivs(notesArray, ans, incorrect1, incorrect1ans, incorrect2, incorrect2ans, noteMap){

let div1 = document.getElementById(ans);
let div2 = document.getElementById(incorrect1ans);
let div3 = document.getElementById(incorrect2ans);


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
    var stave = new VF.Stave(10, 20, 300);
    stave.addClef("treble");
    stave.setContext(context).draw();

var notes = [];

for(let i = 0; i < array.length; i++){
    let n1 = noteMap.get(array[i]); 
    notes.push(new VF.StaveNote({clef: "treble", keys: [n1], duration: "q" }));
}

let voice = new VF.Voice({num_beats: 4,  beat_value: 4});
voice.setStrict(false);
voice.addTickables(notes);

// Format and justify the notes to 400 pixels.
var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 300); //400 adjusts the spacing between notes, and elements

// Render voice
voice.draw(context, stave);

}