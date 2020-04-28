
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

    if(sessionStorage.getItem("selection") === ans){
        res.innerHTML = "Correct! \u266B";
    }

    else{
        res.innerHTML = "Not quite! The answer was: " + ans;
    }
    var samelvl = document.getElementById("samelvl");
    samelvl.style.visibility = "visible"; 
    samelvl.addEventListener("click", function(){
    sessionStorage.setItem("lvl", selectedLevel+"");
    //alert(sessionStorage);
    window.location.reload()});
    
    generateNew.style.visibility = "visible";  
    generateNew.addEventListener("click", function(){
        sessionStorage.clear();
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

    function practice2part(notesArray, ans, melody, harmony){
        var listen = document.getElementById("listen2");
        var submit = document.getElementById("submit2");
        
        listen.addEventListener("click", function(){getSound2part(notesArray, listen, submit)});
        submit.addEventListener("click", function(){getAns2part(ans, melody, harmony)} );
    }
    
    function getAns2part(ans, melody, harmony){
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
    
        if(sessionStorage.getItem("selection") === ans){
            res.innerHTML = "Correct! \u266B";
        }
    
        else{
            res.innerHTML = "Not quite! The answer was: " + ans;
        }
        var samelvl = document.getElementById("samelvl");
        samelvl.style.visibility = "visible"; 
        samelvl.addEventListener("click", function(){
        sessionStorage.setItem("lvlmelody", melody+"");
        sessionStorage.setItem("lvlharmony", harmony+"");
        //alert(sessionStorage);
        window.location.reload()});
        
        generateNew.style.visibility = "visible";  
        generateNew.addEventListener("click", function(){
            sessionStorage.removeItem("lvlmelody");
            sessionStorage.removeItem("lvlharmony");
            window.location.reload()});        
        
    }
    
    function getSound2part(notesArray, btn, btn2){
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