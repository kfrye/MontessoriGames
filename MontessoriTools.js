/**
 * Created by kfrye on 7/14/14.
 */

// Create a button with the specified label, color, width, and height
function CreateButton(labelText, color, width, height) {
    var cont = new createjs.Container();

    var button = new createjs.Shape();
    button.graphics.beginFill(color).drawRoundRect(0,0, buttonWidth, buttonHeight, 10 );
    cont.addChild(button);

    var label = new createjs.Text(labelText, "bold 25px Arial", "white");
    label.x = width/2;
    label.y = height/2;
    label.textAlign = "center";
    label.textBaseline = "middle";
    cont.addChild(label);

    return cont;
}

function loadSounds() {
    if (!createjs.Sound.initializeDefaultPlugins()) {return;}

    var audioPath = "res/";
    var manifest = [
        {id:"note1", src:"note1.mp3"},
        {id:"note2", src:"note2.mp3"},
        {id:"note3", src:"note3.mp3"},
        {id:"note4", src:"note4.mp3"},
        {id:"note5", src:"note5.mp3"},
        {id:"note6", src:"note6.mp3"},
        {id:"note7", src:"note7.mp3"},
        {id:"note8", src:"note8.mp3"}
    ];
    createjs.Sound.registerManifest(manifest, audioPath);
}

// Randomize members of an array
function Shuffle(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

// Find the appropriate x coordinate for a label
function centerText(label) {
    var b = label.getBounds();
    return stage.canvas.width/2 - b.width/2;
}

// add the clock to the canvas
function createClock(xCoor, yCoor) {
    clockContainer = stage.addChild(new createjs.Container()); // container to hold the clock
    clockContainer.x = xCoor;
    clockContainer.y = yCoor;

    // Add clock minute markers
    for(var deg = 0; deg <= 360; deg+= 6) {
        var marker = new createjs.Shape();
        marker.graphics.beginFill("black").drawCircle(clockRadius,0,1);
        marker.rotation = deg;
        clockContainer.addChild(marker);
    }

    // Add clock minute hand
    min = new createjs.Shape();
    min.graphics.beginFill("black").drawRect(0,0, clockRadius - 15, 10);
    clockContainer.addChild(min);

    // Add clock hour hand
    hr = new createjs.Shape();
    hr.graphics.beginFill("black").drawRect(0,0, clockRadius/2, 14);
    clockContainer.addChild(hr);
    drawNumbers();
    initializeHands();
}