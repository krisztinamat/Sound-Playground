function practice(notesArray, ans){
    
    var listen = document.getElementById("listen");
    var submit = document.getElementById("submit");
    
    listen.addEventListener("click", function(){getSound1(notesArray, listen, submit)});
    submit.addEventListener("click", function(){getAns0(ans, boolean, level)} );
}

function practice2(notesArray, ans, boolean, level){
    var listen = document.getElementById("listen2");
    var submit = document.getElementById("submit2");
    
    listen.addEventListener("click", function(){getSound1(notesArray, listen, submit)});
    submit.addEventListener("click", function(){getAns0(ans, boolean, level)} );
   
    
}

function practice3(notesArray, ans){
    listen.addEventListener("click", function(){getSound1(notesArray, listen, submit)});
    submit.addEventListener("click", function(){getAns3(ans)} );

}

function practice4(notesArray, ans, level){
    var listen = document.getElementById("listen2");
    var submit = document.getElementById("submit2");
    
    listen.addEventListener("click", function(){getSound2(notesArray, listen, submit)});
    submit.addEventListener("click", function(){getAnswer2(ans, level)} );
}

function getAns3(ans){
    var category = document.getElementById("answerChoice");
    category.disabled = "disabled";
    var selectedCategory = category.options[category.selectedIndex].text;

    var res = document.getElementById("result");
    var generateNew = document.getElementById("new");
    res.style.visibility = "visible";

    if(selectedCategory === ans){
        res.innerHTML = "Correct! \u266B";
    }

    else{
        res.innerHTML = "Not quite! The answer was: " + ans;
    }

       
        generateNew.style.visibility = "visible";
        generateNew.addEventListener("click", function(){
        window.location.reload()}); 

   

}

function getAns0(ans, boolean, level){
    var category = document.getElementById("answerChoice");
    category.disabled = "disabled";
    var selectedCategory = category.options[category.selectedIndex].text;

    var res = document.getElementById("result");
    var generateNew = document.getElementById("new");
    res.style.visibility = "visible";

    if(selectedCategory === ans){
        res.innerHTML = "Correct! \u266B";
    }

    else{
        res.innerHTML = "Not quite! The answer was: " + ans;
    }

    if(boolean == false){
       
        generateNew.style.visibility = "visible";
        generateNew.addEventListener("click", function(){
        window.location.reload()}); 

    }
    else{
        var sameintval = document.getElementById("sameintval");
        sameintval.style.visibility = "visible"; 
        sameintval.addEventListener("click", function(){
        sessionStorage.setItem("intval", level+"");
        //alert(sessionStorage);
        window.location.reload()});

        generateNew.style.visibility = "visible";
        generateNew.addEventListener("click", function(){sessionStorage.removeItem("intval");
            window.location.reload()}); 

    }

}

function getAns(ans, selectedCategory, note){
    var category = document.getElementById("answerChoiceN");
    category.disabled = "disabled";
    var selectedCategory = category.options[category.selectedIndex].text;

    var res = document.getElementById("result");
    var generateNew = document.getElementById("new");
    res.style.visibility = "visible";

    if(selectedCategory === ans){
        res.innerHTML = "Correct! \u266B";
    }

    else{
        res.innerHTML = "Not quite! The answer was: " + ans;
    }
    generateNew.style.visibility = "visible";  
    var samemode = document.getElementById("samemode");
    samemode.style.visibility = "visible"; 
    samemode.addEventListener("click", function(){
    sessionStorage.setItem("mode", note);
    //alert(sessionStorage);
    window.location.reload()});
    generateNew.addEventListener("click", function(){sessionStorage.clear();
        window.location.reload()});         
    
}

function getAnswer2(ans, level){
    var category = document.getElementById("answerChoice");
    category.disabled = "disabled";
    var selectedCategory = category.options[category.selectedIndex].text;

    var res = document.getElementById("result");
    var generateNew = document.getElementById("new");
    var samelvl= document.getElementById("sameintval");
    res.style.visibility = "visible";

    if(selectedCategory === ans){
        res.innerHTML = "Correct! \u266B";

    }

    else{
        res.innerHTML = "Not quite! The answer was: " + ans;
  
    }

    
        samelvl.style.visibility = "visible";
        samelvl.addEventListener("click", function(){
        sessionStorage.setItem("intval3a", level+"");
        window.location.reload()});
    
        generateNew.style.visibility = "visible";
        generateNew.addEventListener("click", function(){sessionStorage.removeItem("intval3a");
            window.location.reload()}); 
}



function getAns2(ans, rhythm){
    var category1 = document.getElementById("answerChoice1");
    category1.disabled = "disabled";
    var selectedCategory1 = category1.options[category1.selectedIndex].text;


    var category2 = document.getElementById("answerChoice2");
    category2.disabled = "disabled";
    var selectedCategory2 = category2.options[category2.selectedIndex].text;

    var res = document.getElementById("result");
    var generateNew = document.getElementById("new");
    res.style.visibility = "visible";

    if(selectedCategory1 === ans[0] && selectedCategory2 === ans[1] ){
        res.innerHTML = "Correct! \u266B";
    }

    else if(selectedCategory1 === ans[0] ^ selectedCategory2 === ans[1]){
        res.innerHTML = "Looks like you missed one part of the question. The answer is: " + ans[0] + ", which is worth " + ans[1] +".   ";
    }

    else{
        res.innerHTML = "Not quite! The answer is: " + ans[0] + ", which is worth " + ans[1] + ".   ";
    }
    generateNew.style.visibility = "visible";  
    var samemode = document.getElementById("samemode");
    samemode.style.visibility = "visible"; 
    samemode.addEventListener("click", function(){
    sessionStorage.setItem("mode", rhythm);
    //alert(sessionStorage);
    window.location.reload()});
    generateNew.addEventListener("click", function(){sessionStorage.clear();
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
    
    setTimeout(function(){
        btn.removeAttribute('disabled');
        btn2.removeAttribute('disabled');
    }, 2000)
    
    }

    function getSound2(notesArray, btn, btn2){
        btn.disabled=true;
        btn2.disabled = true;
        
        Tone.Transport.bpm.value = 120;
        
        var toneArray = [];
        
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