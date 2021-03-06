function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function populateDivs(ansArray, ans, incorrect1, incorrect1ans, incorrect2, incorrect2ans, incorrect3, incorrect3ans, rhythmBank, commonBeams){

    let div1 = document.getElementById(ans);
    let div2 = document.getElementById(incorrect1ans);
    let div3 = document.getElementById(incorrect2ans);
    let div4 = document.getElementById(incorrect3ans);
    
    //console.log(ansArray);
    //console.log(incorrect1);
    //console.log(incorrect2);
    //console.log(incorrect3);


    drawStaff(div1, ansArray, rhythmBank, commonBeams);
    drawStaff(div2, incorrect1, rhythmBank, commonBeams);
    drawStaff(div3, incorrect2, rhythmBank, commonBeams);
    drawStaff(div4, incorrect3, rhythmBank, commonBeams);
    
    }
    
    
    function drawStaff(div1, array, rhythmBank, commonBeams){
        
    const noteMap = new Map();
    noteMap.set("A3", "a/3");
    noteMap.set("B3", "b/3");
    noteMap.set("C4", "c/4");
    noteMap.set("D4", "d/4");
    noteMap.set("E4", "e/4");
    noteMap.set("F4", "f/4");
    noteMap.set("G4", "g/4");
    noteMap.set("A4", "a/4");
    noteMap.set("B4", "b/4");
    noteMap.set("C5", "c/5");
    noteMap.set("D5", "d/5");
    noteMap.set("E5", "e/5");
    noteMap.set("F5", "f/5");

        var VF = Vex.Flow;
        var div = div1;
        var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
        renderer.resize(400, 150);
        var context = renderer.getContext();
        var stave = new VF.Stave(10, 20, 350);
        stave.addClef("treble");
        stave.addTimeSignature("4/4")
        stave.setContext(context).draw();
    
        
    
    let notes = [];
    let beams = [];

    const correspondingIndex = new Map();
    let a = 0;
    for(let i = 0; i < array[0].length; i++){
        let currentItem = rhythmBank.get(array[0][i]); 
        if(currentItem[2]== true){
            let arr = commonBeams.get(array[0][i]);
            let arr2 = [];
            for(let k = a; k < a+arr.length; k++){
                arr2.push(k);
            }
            correspondingIndex.set(i, arr2);
            a+=arr.length;
        }
        else{
            correspondingIndex.set(i, [a]);
            a++;
        }
        
    }
    
    for(let i = 0; i < array[0].length; i++){
        let currentItem = rhythmBank.get(array[0][i]);
        let currentPitch = correspondingIndex.get(i); //array
        let truepitch = array[1][currentPitch[0]];
        truepitch = noteMap.get(truepitch);
        
        if(currentItem[2]== true){
            
            let arr = commonBeams.get(array[0][i]);
            notes1 = []

            for(let j = 0; j < arr.length; j++){
                
                let data = rhythmBank.get(arr[j]);
                let duration = data[0];
                let pitch = correspondingIndex.get(i);
                //console.log(pitch);
                pitch = noteMap.get(array[1][pitch[j]]);
                //console.log(pitch);
                if(data[3] == true){
                    notes1.push(new VF.StaveNote({clef: "treble", keys: [pitch], duration: duration }).addDot(0));
                }
                else{
                    notes1.push(new VF.StaveNote({clef: "treble", keys: [pitch], duration: duration })); 
                }
               
            }
    
              beams.push(new VF.Beam(notes1));
              notes = notes.concat(notes1); 
    
        }
        else{
            let duration = currentItem[0];
            if(currentItem[3] == true){
                notes.push(new VF.StaveNote({clef: "treble", keys: [truepitch], duration: duration }).addDot(0));
            }
            else{
                notes.push(new VF.StaveNote({clef: "treble", keys: [truepitch], duration: duration })); 
            }
        
        }
    }
    
    var voice = new VF.Voice({num_beats: 4,  beat_value: 4});
    voice.setStrict(false);
    voice.addTickables(notes);
    
    VF.Formatter.FormatAndDraw(context, stave, notes);
    beams.forEach(function(b) {b.setContext(context).draw()});
    
    }