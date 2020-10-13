//as of 8/16/20: changed var to let/const

function getAnswerRhythmRandomizer(ans, rhythm){
    let category1 = document.getElementById("answerChoice1");
    category1.disabled = "disabled";
    let selectedCategory1 = category1.options[category1.selectedIndex].text;

    let category2 = document.getElementById("answerChoice2");
    category2.disabled = "disabled";
    let selectedCategory2 = category2.options[category2.selectedIndex].text;

    let category3 = document.getElementById("answerChoice3");
    category3.disabled = "disabled";
    let selectedCategory3 = category3.options[category3.selectedIndex].text;


    let res = document.getElementById("result");
    let generateNew = document.getElementById("new");
    res.style.visibility = "visible";

    if(selectedCategory1 === ans[0] && selectedCategory2 === ans[1] && selectedCategory3 === ans[2] ){
        res.innerHTML = "Correct! \u266B";
    }
    else{

        if((selectedCategory1 === ans[0] && selectedCategory2 === ans[1]) ^ (selectedCategory3 === ans[2] && selectedCategory2 === ans[1]) ^ (selectedCategory1 === ans[0] && selectedCategory3 === ans[2])){
            res.innerHTML = "Looks like you missed one part of the question. The answer is: " + ans[0] + " "+ans[1]+ ", with a value of " + ans[2] +".";
        }
        else if(selectedCategory3 === ans[2] ^ selectedCategory2 === ans[1] ^ selectedCategory1 === ans[0]){
            res.innerHTML = "Looks like you missed a few parts of the question. The answer is: " + ans[0] + " "+ans[1]+ ", with a value of " + ans[2] +".";
    
        }
    
        else{
            res.innerHTML = "Not quite! The answer is: " + ans[0] + ", with a value of " + ans[1] + ".";
        }

    }
   
    generateNew.style.visibility = "visible";  
    let samemode = document.getElementById("samemode");
    samemode.style.visibility = "visible"; 
    samemode.addEventListener("click", function(){ 
    sessionStorage.setItem("timeSig2", rhythm);
    window.location.reload()});


    generateNew.addEventListener("click", function(){
        sessionStorage.removeItem("timeSig2");
        window.location.reload()});        
    
}

function pitchDirection(ans){
    let category = document.getElementById("answerChoice");
    category.disabled = "disabled";
    let selectedCategory = category.options[category.selectedIndex].text;

    let res = document.getElementById("result");
    let generateNew = document.getElementById("new");
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

function intervalHarmony(ans, level){
    let category = document.getElementById("answerChoice");
    category.disabled = "disabled";
    let selectedCategory = category.options[category.selectedIndex].text;

    let res = document.getElementById("result");
    let generateNew = document.getElementById("new");
    let samelvl= document.getElementById("sameintval");
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

function intervalByNumber(ans, boolean, level){
    let category = document.getElementById("answerChoice");
    category.disabled = "disabled";
    let selectedCategory = category.options[category.selectedIndex].text;

    let res = document.getElementById("result");
    let generateNew = document.getElementById("new");
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
        let sameintval = document.getElementById("sameintval");
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

function musicMathDropdown(ans, submit, symbols, level, boolean){
    submit.disabled = "disabled";

    const answerBank = new Map();
    answerBank.set(1, "quarter note");
    answerBank.set(2, "half note");
    answerBank.set(3, "dotted half note");
    answerBank.set(4, "whole note");
    answerBank.set(0.5, "eighth note");
    answerBank.set(0.75, "dotted eighth note");
    answerBank.set(1.5, "dotted quarter note");
    answerBank.set(0.25, "sixteenth note");

    ans = answerBank.get(ans);
  
    let m = document.getElementById("answerChoices");
    m.disabled = "disabled";
    let value = m.options[m.selectedIndex].value;
    
    let res = document.getElementById("result");
    let generateNew = document.getElementById("new");
    res.style.visibility = "visible";

if(ans === value){
    res.innerHTML = "Correct! \u266B";
}

else{
    res.innerHTML = "Not quite. The correct answer is " + symbols.get(ans)[0] +" beat(s), so you need to select " + symbols.get(ans)[1];}

    generateNew.style.visibility = "visible";  
    let samemode = document.getElementById("samemode");
    samemode.style.visibility = "visible"; 
    samemode.addEventListener("click", function(){
        if(boolean){
            sessionStorage.setItem("checked", "yes");
        }
    sessionStorage.setItem("lvlmath", level+"");
    //alert(sessionStorage);
    window.location.reload()});
    generateNew.addEventListener("click", function(){sessionStorage.removeItem("lvlmath");
    sessionStorage.removeItem("checked");
        window.location.reload()});

}

function musicMathTyped(ans, submit, box, level, boolean){
    submit.disabled = "disabled";
    box.disabled = "disabled";
    
    let input = box.value;
    
    if(input.includes('/')){
        let index = input.indexOf('/');
        let numerator = Number(input.substring(0, index));
        let denominator = Number(input.substring(index+1, input.length));
        input = numerator/denominator;   
    }
    
    let res = document.getElementById("result");
    let generateNew = document.getElementById("new");
    res.style.visibility = "visible";
    
    if(input == ans){
        res.innerHTML = "Correct! \u266B";
        
    }
    
    else{
        res.innerHTML = "Not quite. The correct answer is " +  ans +" beat(s).";
    }
    
    generateNew.style.visibility = "visible";  
        let samemode = document.getElementById("samemode");
        samemode.style.visibility = "visible"; 
        samemode.addEventListener("click", function(){
        if(boolean){
            sessionStorage.setItem("checked", "yes");
        }
        sessionStorage.setItem("lvlmath", level+"");
        //alert(sessionStorage);
        window.location.reload()});
        generateNew.addEventListener("click", function(){sessionStorage.removeItem("lvlmath");
        sessionStorage.removeItem("checked");
            window.location.reload()});
    
    }

    function pitchDictation(ans, selectedLevel){
        //alert(selectedLevel);
        let a = document.getElementById("A");
        a.onclick = null;
        let b = document.getElementById("B");
        b.onclick = null;
        let c = document.getElementById("C");
        c.onclick = null;
    
        let res = document.getElementById("result");
        let generateNew = document.getElementById("new");
        res.style.visibility = "visible";
    
        if(sessionStorage.getItem("selection") === ans){
            res.innerHTML = "Correct! \u266B";
        }
    
        else{
            res.innerHTML = "Not quite! The answer was: " + ans;
        }
        let samelvl = document.getElementById("samelvl");
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

    function melodicDictation(ans, selectedLevelPitch, selectedLevelRhythm){
        //alert(selectedLevel);
        let a = document.getElementById("A");
        a.onclick = null;
        let b = document.getElementById("B");
        b.onclick = null;
        let c = document.getElementById("C");
        c.onclick = null;
        let d = document.getElementById("D");
        d.onclick = null;
    
        let res = document.getElementById("result");
        let generateNew = document.getElementById("new");
        res.style.visibility = "visible";
    
        if(sessionStorage.getItem("selection") === ans){
            res.innerHTML = "Correct! \u266B";
      
        }
    
        else{
            res.innerHTML = "Not quite! The answer was: " + ans;
    
        }
        let samelvl = document.getElementById("samelvl");
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

    function harmonicDictation(ans, melody, harmony){
        //alert(selectedLevel);
        let a = document.getElementById("A");
        a.onclick = null;
        let b = document.getElementById("B");
        b.onclick = null;
        let c = document.getElementById("C");
        c.onclick = null;
    
        let res = document.getElementById("result");
        let generateNew = document.getElementById("new");
        res.style.visibility = "visible";
    
        if(sessionStorage.getItem("selection") === ans){
            res.innerHTML = "Correct! \u266B";
        }
    
        else{
            res.innerHTML = "Not quite! The answer was: " + ans;
        }
        let samelvl = document.getElementById("samelvl");
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

function rhythmDictation(ans, selectedLevel){
    //alert(selectedLevel);
    let a = document.getElementById("A");
    a.onclick = null;
    let b = document.getElementById("B");
    b.onclick = null;
    let c = document.getElementById("C");
    c.onclick = null;

    let res = document.getElementById("result");
    let generateNew = document.getElementById("new");
    res.style.visibility = "visible";

    if(sessionStorage.getItem("selection") === ans){
        res.innerHTML = "Correct! \u266B";
    }

    else{
        res.innerHTML = "Not quite! The answer was: " + ans;
 
    }
    let samelvl = document.getElementById("samelvl");
    samelvl.style.visibility = "visible"; 
    samelvl.addEventListener("click", function(){
    sessionStorage.setItem("lvlriddim", selectedLevel+"");
    //alert(sessionStorage);
    window.location.reload()});
    
    generateNew.style.visibility = "visible";  
    generateNew.addEventListener("click", function(){
        sessionStorage.clear();
        window.location.reload()});        
    
}
