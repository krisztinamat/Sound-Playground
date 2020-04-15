
function practice2(notesArray, ans, selectedLevel){
    var listen = document.getElementById("listen2");
    var submit = document.getElementById("submit2");
    
    listen.addEventListener("click", function(){getSound1(notesArray, listen, submit)});
    submit.addEventListener("click", function(){getAns(ans, selectedLevel)} );
}

function getAns(ans, selectedLevel){
    //alert(selectedLevel);
    var a = document.getElementById("A");
    a.onclick = null;
    var b = document.getElementById("B");
    b.onclick = null;
    var c = document.getElementById("C");
    c.onclick = null;

    var res = document.getElementById("result");
    var generateNew = document.getElementById("new");
    res.style.visibility = "visible";

    if(localStorage.getItem("selection") === ans){
        res.innerHTML = "Correct! Nice job!";
    }

    else{
        res.innerHTML = "Not quite! The answer was: " + ans;
    }
    var samelvl = document.getElementById("samelvl");
    samelvl.style.visibility = "visible"; 
    samelvl.addEventListener("click", function(){
    localStorage.setItem("lvl", selectedLevel+"");
    //alert(localStorage);
    window.location.reload()});
    
    generateNew.style.visibility = "visible";  
    generateNew.addEventListener("click", function(){
        localStorage.clear();
        window.location.reload()});        
    
}

function getSound1(notesArray, btn, btn2){
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