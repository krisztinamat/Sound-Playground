window.onload = function() {

    var dictation = generate();
    var notesArray = dictation[0];
    var ans = dictation[1];
    practice(notesArray, ans);

    }

function generate(){

    var arrayPossible = ["C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3",
    "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4",
    "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5"]
    
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

function practice(notesArray, ans){
    var listen = document.getElementById("listen");
    var submit = document.getElementById("submit");
    listen.addEventListener("click", function(){getSound1(notesArray, listen, submit)});

    submit.addEventListener("click", function(){getAns(ans)} );
}

function getAns(ans, selectedCategory){
    var category = document.getElementById("answerChoice");
    category.disabled = "disabled";
    var selectedCategory = category.options[category.selectedIndex].text;

    var res = document.getElementById("result");
    var generateNew = document.getElementById("new");
    res.style.visibility = "visible";

    if(selectedCategory === ans){
        res.innerHTML = "Correct! Nice job!";
    }

    else{
        res.innerHTML = "Not quite! The answer was: " + ans;
    }
    generateNew.style.visibility = "visible";  
    generateNew.addEventListener("click", function(){window.location.reload()});        
    
}


function getSound1(notesArray, btn, btn2){
    btn.disabled=true;
    btn2.disabled = true;
    
    Tone.Transport.bpm.value = 150;
    
    toneArray = [];
    
    for(i = 0; i<notesArray.length; i++){
        var tone = notesArray[i];
        toneArray[i] = tone;
    }
    
    var synth = new Tone.Synth();
    
    synth.toMaster();
    
    synth.triggerAttackRelease(toneArray[0], "1m");
    synth.triggerAttackRelease(toneArray[1], "1m", "+1m");  
    
    setTimeout(function(){
        btn.removeAttribute('disabled');
        btn2.removeAttribute('disabled');
    }, 2000)
    
    }
    
    
    
    