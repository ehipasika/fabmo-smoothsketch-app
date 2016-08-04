var SafeZ = 0.2
var g = ""

function make(){

	g=""

	//calculate scaling
	//Bill's mods
    var Scale
    
    DeltaX = (MaxX - MinX)
    DeltaY = (MaxY - MinY)
    var ScaleFactorX = SizeX / DeltaX
    var ScaleFactorY = SizeY / DeltaY
    if (ScaleFactorX < ScaleFactorY) {
        Scale = ScaleFactorX
    }
    else {
        Scale = ScaleFactorY
    }
	//console.log(Scale)
	//end Bill's mods

	var material = {feed:500,plunge:200}
	var pass = 1
	var pass_no=1
	var pass_depth=1

	//add test for inch/metric based on size of drawing
	//Bill's mod

	if (SizeX > 6){
		g+="g21\n"}
	else{
		g+="g20\n"
	}
	
	g+="g0z " + SafeZ + "\n"
	g+="m4\n"
	g+="g4p2\n"

	while(pass<=pass_no){
   
   	for(i=0;i<smooth.length;i++){
	
			g+="g0x"+(((smooth[i][0].x) - MinX) * Scale) .toFixed(3)  +"y"+ ((DeltaY - ((smooth[i][0].y)- MinY)) * Scale).toFixed(3) + "\n"
   		g+="g1z " + CutDepth + "f60\n"
   		g+="g1f60\n"
   		for(j=1;j<smooth[i].length;j++){
	     		g+="g1x"+(((smooth[i][j].x) - MinX) * Scale) .toFixed(3)  +"y"+ ((DeltaY - ((smooth[i][j].y) - MinY) )* Scale).toFixed(3)  + "\n"
			}
			g+="g0z " + SafeZ + "\n"
   	}
   	pass++
	}

g+="m5\n"
g+="m30\n"

fabmo.submitJob({
   file : g,
   filename : "sketch.g",
  name : "SKETCH",
   description : "Smooth Sketch"
});

}