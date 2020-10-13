function evaluate(ans, submit, level){
    submit.disabled = "disabled";
  
    compareBank = [];

    switch (level) {
        case 1: 
            compareBank = populateCompareBankQuarters(compareBank);
            break;
        case 2: 
            compareBank = populateCompareBankEighths(compareBank);
            break;
        case 3: 
            compareBank = populateCompareBankSixteenths(compareBank);
            break;
    }
   
    totalCorrect = 16;
  
    for(let i = 0; i < ans.length; i++){
      if(compareBank[i] === "blank"){
        compareBank[i] = "\u2192";
      }
      if(ans[i] === compareBank[i]){
        continue;
      }
      else{
        totalCorrect--;
      }
  
    }
    const symbols = new Map(); //1D15D
  
    symbols.set("\u2192", "\u2192");
    symbols.set("whole note", "\u0B66"); 
    symbols.set("dotted half note", "\u147B");
    symbols.set("half note", "\u146F");
    symbols.set("quarter note", "\u2669");
    symbols.set("dotted quarter note", "\u2669.");
    symbols.set("quarter note", "\u2669");
    symbols.set("single eighth note", "\u266A");
    symbols.set("dotted eighth note", "\u266A.");
    symbols.set("single sixteenth note", "\u16AB");
  
    let res = document.getElementById("result");
      let generateNew = document.getElementById("new");
      res.style.visibility = "visible";
  
      if(totalCorrect === 16){
          res.innerHTML = "Correct! \u266B";
         
      }
  
      else{
          res.innerHTML = "Looks like you missed something. Check the answer in the grid below.";
         }
  
      let body = document.getElementById("answer");
      answer.style.visibility = "visible";
      tbl  = document.createElement('table');
      tbl.style.fontSize = '16px';
      tbl.style.width  = '100%';
     // tbl.style.border = '1px solid black';
  
      for(let i = 0; i < 1; i++){
          let tr = tbl.insertRow();
          for(let j = 0; j < 16; j++){
             
                  let td = tr.insertCell();
                  td.style.width = "20px"
                  let boxInfo = symbols.get(ans[j]);
                  td.appendChild(document.createTextNode(boxInfo));
                  td.style.border = '1px solid black';
            
          }
      }
      answer.appendChild(tbl);
      
      generateNew.style.visibility = "visible";  
      //save();
      generateNew.addEventListener("click", function(){window.location.reload()}); 
    
  
  }

  function populateCompareBankQuarters(compareBank){
    let beatBox = document.getElementById("1choicesBeat1");
    beatBox.disabled = "disabled";
    let value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("1choicesBeat2");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("1choicesBeat3");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("1choicesBeat4");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("2choicesBeat1");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("2choicesBeat2");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("2choicesBeat3");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("2choicesBeat4");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("3choicesBeat1");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("3choicesBeat2");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("3choicesBeat3");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("3choicesBeat4");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("4choicesBeat1");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("4choicesBeat2");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("4choicesBeat3");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("4choicesBeat4");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);

    return compareBank;

  }

  function populateCompareBankEighths(compareBank){
    let beatBox = document.getElementById("1choicesBeat1");
    beatBox.disabled = "disabled";
    let value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("1choicesBeat1+");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("1choicesBeat2");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("1choicesBeat2+");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("1choicesBeat3");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("1choicesBeat3+");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("1choicesBeat4");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("1choicesBeat4+");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("2choicesBeat1");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("2choicesBeat1+");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("2choicesBeat2");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("2choicesBeat2+");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("2choicesBeat3");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("2choicesBeat3+");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("2choicesBeat4");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("2choicesBeat4+");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);

    return compareBank;
  
  }

  function populateCompareBankSixteenths(compareBank){
    let beatBox = document.getElementById("1choicesBeat1");
    beatBox.disabled = "disabled";
    let value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("1choicesBeat1e");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("1choicesBeat1+");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("1choicesBeat1a");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("1choicesBeat2");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("1choicesBeat2e");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("1choicesBeat2+");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("1choicesBeat2a");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("1choicesBeat3");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("1choicesBeat3e");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("1choicesBeat3+");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("1choicesBeat3a");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("1choicesBeat4");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("1choicesBeat4e");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("1choicesBeat4+");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);
  
    beatBox = document.getElementById("1choicesBeat4a");
    beatBox.disabled = "disabled";
    value = beatBox.options[beatBox.selectedIndex].value;
    compareBank.push(value);

    return compareBank;
  }