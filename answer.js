function getAnswer(ans, rhythm){
    var category1 = document.getElementById("answerChoice1");
    category1.disabled = "disabled";
    var selectedCategory1 = category1.options[category1.selectedIndex].text;

    var category2 = document.getElementById("answerChoice2");
    category2.disabled = "disabled";
    var selectedCategory2 = category2.options[category2.selectedIndex].text;

    var category3 = document.getElementById("answerChoice3");
    category3.disabled = "disabled";
    var selectedCategory3 = category3.options[category3.selectedIndex].text;


    var res = document.getElementById("result");
    var generateNew = document.getElementById("new");
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
    var samemode = document.getElementById("samemode");
    samemode.style.visibility = "visible"; 
    samemode.addEventListener("click", function(){
    localStorage.setItem("timeSig2", rhythm);
    //alert(localStorage);
    window.location.reload()});
    generateNew.addEventListener("click", function(){localStorage.removeItem("timeSig2");
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