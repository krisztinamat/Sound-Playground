function practice(notesArray, ans){
    
    var listen = document.getElementById("listen");
    var submit = document.getElementById("submit");
    
    listen.addEventListener("click", function(){getSound1(notesArray, listen, submit)});
    submit.addEventListener("click", function(){intervalByNumber(ans, boolean, level)} );
}

function melodyAudio(rhythmArray, ans, selectedLevelPitch, selectedLevelRhythm){
    var listen = document.getElementById("listen2");
    var submit = document.getElementById("submit2");
    
    listen.addEventListener("click", function(){getMelody(rhythmArray, listen, submit)});
    submit.addEventListener("click", function(){melodicDictation(ans, selectedLevelPitch, selectedLevelRhythm)} );
}

function getMelody(rhythmArray, btn, btn2){

    btn.disabled=true;
    btn2.disabled = true;

    var synth = new Tone.Synth();
    
    synth.toMaster();
    for(var k = 0; k < rhythmArray.length; k++){
        synth.triggerAttackRelease(rhythmArray[k][3], rhythmArray[k][0], "+"+rhythmArray[k][1]);
    }  
   
    
    setTimeout(function(){
        btn.removeAttribute('disabled');
        btn2.removeAttribute('disabled');
    }, 5000)
    
    }

function intervalHarmonyAudio(notesArray, ans, level){
    var listen = document.getElementById("listen2");
    var submit = document.getElementById("submit2");
    
    listen.addEventListener("click", function(){listenTwoNotesStacked(notesArray, listen, submit)});
    submit.addEventListener("click", function(){intervalHarmony(ans, level)} );
}

function intervalByNumberAudio(notesArray, ans, boolean, level){
    var listen = document.getElementById("listen2");
    var submit = document.getElementById("submit2");
    
    listen.addEventListener("click", function(){listenTwoNotes(notesArray, listen, submit)});
    submit.addEventListener("click", function(){intervalByNumber(ans, boolean, level)} );
    
}

function pitchDirectionAudio(notesArray, ans){
    listen.addEventListener("click", function(){listenTwoNotes(notesArray, listen, submit)});
    submit.addEventListener("click", function(){pitchDirection(ans)} );

}

function pitchDictationAudio(notesArray, ans, selectedLevel){
    var listen = document.getElementById("listen2");
    var submit = document.getElementById("submit2");
    
    listen.addEventListener("click", function(){pitchPattern(notesArray, listen, submit)});
    submit.addEventListener("click", function(){pitchDictation(ans, selectedLevel)} );
}

function pitchPattern(notesArray, btn, btn2){
    btn.disabled=true;
    btn2.disabled = true;
    
    Tone.Transport.bpm.value = 200;
    
    var toneArray = [];
    
    for(i = 0; i<notesArray.length; i++){
        var tone = notesArray[i];
        toneArray[i] = tone;
    }
    
    var synth = new Tone.Synth();
    
    synth.toMaster();
    
    synth.triggerAttackRelease(toneArray[0], "1m");
    synth.triggerAttackRelease(toneArray[1], "1m", "+1m");
    synth.triggerAttackRelease(toneArray[2], "1m", "+2m");
    synth.triggerAttackRelease(toneArray[3], "1m", "+3m");  
    
    setTimeout(function(){
        btn.removeAttribute('disabled');
        btn2.removeAttribute('disabled');
    }, 5000)
    
    }


function harmonicDictationAudio(notesArray, ans, melody, harmony){
    var listen = document.getElementById("listen2");
    var submit = document.getElementById("submit2");    

    listen.addEventListener("click", function(){listenChords(notesArray, listen, submit)});
    submit.addEventListener("click", function(){harmonicDictation(ans, melody, harmony)} );
}

 function listenChords(notesArray, btn, btn2){
    btn.disabled=true;
    btn2.disabled = true;
        
    Tone.Transport.bpm.value = 60;
         
    var poly = new Tone.PolySynth();
            
    poly.toDestination();
        
    poly.triggerAttackRelease([notesArray[0][0], notesArray[0][1]], "4n");
    poly.triggerAttackRelease([notesArray[1][0], notesArray[1][1]], "4n", "+1.5");
    poly.triggerAttackRelease([notesArray[2][0], notesArray[2][1]], "4n", "+3.0");
    poly.triggerAttackRelease([notesArray[3][0], notesArray[3][1]], "4n", "+4.5");
        
    setTimeout(function(){
        btn.removeAttribute('disabled');
        btn2.removeAttribute('disabled');
    }, 5000)
        
}

function rhythmDictationAudio(rhythmArray, ans, selectedLevel){
    var listen = document.getElementById("listen2");
    var submit = document.getElementById("submit2");
    
    listen.addEventListener("click", function(){listenRhythm(rhythmArray, listen, submit)});
    submit.addEventListener("click", function(){rhythmDictation(ans, selectedLevel)} );
}

function listenRhythm(rhythmArray, btn, btn2){

    let notesArray = [];
    for(j = 0; j < rhythmArray.length; j++){
        notesArray.push("E4");
            
        
    }
    btn.disabled=true;
    btn2.disabled = true;

    var synth = new Tone.Synth();
    
    synth.toMaster();
    for(let k = 0; k < notesArray.length; k++){
        synth.triggerAttackRelease(notesArray[k], rhythmArray[k][0], "+"+rhythmArray[k][1]);
    }  
   
    
    setTimeout(function(){
        btn.removeAttribute('disabled');
        btn2.removeAttribute('disabled');
    }, 5000)
    
    }

function listenTwoNotes(notesArray, btn, btn2){
    btn.disabled=true;
    btn2.disabled = true;
    
    Tone.Transport.bpm.value = 200;
    
    let toneArray = [];
    
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

    function listenTwoNotesStacked(notesArray, btn, btn2){
        btn.disabled=true;
        btn2.disabled = true;
        
        Tone.Transport.bpm.value = 120;
        
        let toneArray = [];
        
        for(i = 0; i<notesArray.length; i++){
            var tone = notesArray[i];
            toneArray[i] = tone;
        }
        
        
        var poly = new Tone.PolySynth();
        
        poly.toMaster();

        poly.triggerAttackRelease([toneArray[0], toneArray[1]], "4n."); 
        
        setTimeout(function(){
            btn.removeAttribute('disabled');
            btn2.removeAttribute('disabled');
        }, 2000)
        
        }