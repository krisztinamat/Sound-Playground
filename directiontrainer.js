window.onload = function() {

    sessionStorage.removeItem("lvlpitch");
    sessionStorage.removeItem("lvlrhythm");
    sessionStorage.removeItem("timeSig2");
    sessionStorage.removeItem("checked");
    sessionStorage.removeItem("lvlmath");
    sessionStorage.removeItem("lvlriddim");
    sessionStorage.removeItem("lvl");
    sessionStorage.removeItem("intval");
    sessionStorage.removeItem("intval3a");
    sessionStorage.removeItem("lvlmelody");
    sessionStorage.removeItem("lvlharmony");
    sessionStorage.removeItem("selection");

    var dictation = generate();
    var notesArray = dictation[0];
    var ans = dictation[1];
    var page = 1;
    practice3(notesArray, ans, false, 0);

    }

function generate(){

    var arrayPossible = ["A2","A#2", "B2", "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3",
    "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4",
    "C5", "C#5", "D5", "D#5", "E5"]
    
    var notesArray = [];
    
    var index1 = Math.floor(Math.random() * arrayPossible.length);
    var index2 = Math.floor(Math.random() * arrayPossible.length);
    var note1 = arrayPossible[index1];
    var note2 = arrayPossible[index2];
    notesArray.push(note1);
    notesArray.push(note2);
    
    var ans = "";
    if(index1 == index2){
    ans = "Music stayed the same";
    }
    if(index1 > index2){
    ans = "Music got lower (went down)";
    }
    if(index1 < index2){
    ans = "Music got higher (went up)";
    }

    var dictation = [notesArray, ans];
    return dictation;   

}



    
    
    
    
    