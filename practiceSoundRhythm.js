
//ALL STORAGE VARIABLES FOR GAME MODE ARE 6
function practice2(rhythmArray, ans, selectedLevel){
    var listen = document.getElementById("listen2");
    var submit = document.getElementById("submit2");
    
    listen.addEventListener("click", function(){getSound1(rhythmArray, listen, submit)});
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
        res.innerHTML = "Correct! \u266B";
    }

    else{
        res.innerHTML = "Not quite! The answer was: " + ans;
 
    }
    var samelvl = document.getElementById("samelvl");
    samelvl.style.visibility = "visible"; 
    samelvl.addEventListener("click", function(){
    localStorage.setItem("lvlriddim", selectedLevel+"");
    //alert(localStorage);
    window.location.reload()});
    
    generateNew.style.visibility = "visible";  
    generateNew.addEventListener("click", function(){
        localStorage.clear();
        window.location.reload()});        
    
}

function getSound1(rhythmArray, btn, btn2){

    var notesArray = [];
    for(j = 0; j < rhythmArray.length; j++){
        notesArray.push("E4");
            
        
    }
    btn.disabled=true;
    btn2.disabled = true;

    var synth = new Tone.Synth();
    
    synth.toMaster();
    for(var k = 0; k < notesArray.length; k++){
        synth.triggerAttackRelease(notesArray[k], rhythmArray[k][0], "+"+rhythmArray[k][1]);
    }  
   
    
    setTimeout(function(){
        btn.removeAttribute('disabled');
        btn2.removeAttribute('disabled');
    }, 5000)
    
    }