
//ALL STORAGE VARIABLES FOR GAME MODE ARE 6
function practice2(rhythmArray, ans, selectedLevelPitch, selectedLevelRhythm){
    var listen = document.getElementById("listen2");
    var submit = document.getElementById("submit2");
    
    listen.addEventListener("click", function(){getSound1(rhythmArray, listen, submit)});
    submit.addEventListener("click", function(){getAns(ans, selectedLevelPitch, selectedLevelRhythm)} );
}

function getAns(ans, selectedLevelPitch, selectedLevelRhythm){
    //alert(selectedLevel);
    var a = document.getElementById("A");
    a.onclick = null;
    var b = document.getElementById("B");
    b.onclick = null;
    var c = document.getElementById("C");
    c.onclick = null;
    var d = document.getElementById("D");
    d.onclick = null;

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
    sessionStorage.setItem("lvlpitch", selectedLevelPitch+"");
    sessionStorage.setItem("lvlrhythm", selectedLevelRhythm+"");
   
    sessionStorage.removeItem("selection");
    //alertsessionStorage);
    window.location.reload()});
    
    generateNew.style.visibility = "visible";  
    generateNew.addEventListener("click", function(){
       /*sessionStorage.removeItem("lvlpitch");
    sessionStorage.removeItem("lvlrhythm");
    sessionStorage.removeItem("selection");*/
    sessionStorage.clear();
        location = location;
    });        
    
}

function getSound1(rhythmArray, btn, btn2){

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