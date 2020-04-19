
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function populateDivs(ansArray, ans, incorrect1, incorrect1ans, incorrect2, incorrect2ans, rhythmBank, commonBeams){

    var div1 = document.getElementById(ans);
    var div2 = document.getElementById(incorrect1ans);
    var div3 = document.getElementById(incorrect2ans);
    
    
    drawStaff(div1, ansArray, rhythmBank, commonBeams);
    drawStaff(div2, incorrect1, rhythmBank, commonBeams);
    drawStaff(div3, incorrect2, rhythmBank, commonBeams);
    
    }
    
    
    function drawStaff(div1, array, rhythmBank, commonBeams){
        var VF = Vex.Flow;
        var div = div1;
        var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
        renderer.resize(400, 150);
        var context = renderer.getContext();
        var stave = new VF.Stave(10, 20, 350);
        stave.addClef("treble");
        stave.addTimeSignature("4/4")
        stave.setContext(context).draw();
    
        //console.log(array);
    
    var notes = [];
    var beams = [];
    
    for(var i = 0; i < array.length; i++){
        var currentItem = rhythmBank.get(array[i]);
        if(currentItem[4] == true){
          var duration = currentItem[0]
          notes.push(new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: duration }));
          continue;
        }
        if(currentItem[2]== true){
            
            var arr = commonBeams.get(array[i]);
            notes1 = []
            for(var j = 0; j < arr.length; j++){
                //console.log(arr[j]);
                var data = rhythmBank.get(arr[j]);
                //console.log(data);
                var duration = data[0];
                if(data[3] == true){
                    notes1.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }).addDot(0));
                }
                else{
                    notes1.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration })); 
                }
            }
    
              beams.push(new VF.Beam(notes1));
              notes = notes.concat(notes1);
                    
            
    
    
        }
        else{
            var duration = currentItem[0];
            if(currentItem[3] == true){
                notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration }).addDot(0));
            }
            else{
                notes.push(new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: duration })); 
            }
        
        }
    }
    
    var voice = new VF.Voice({num_beats: 4,  beat_value: 4});
    voice.setStrict(false);
    voice.addTickables(notes);
    
    VF.Formatter.FormatAndDraw(context, stave, notes);
    beams.forEach(function(b) {b.setContext(context).draw()});
    
    }