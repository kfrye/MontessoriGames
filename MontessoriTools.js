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
    drawNumbers(xCoor, yCoor);
}

// Add numbers to the clock
function drawNumbers(xCoor, yCoor){
    var numbers=[1,2,3,4,5,6,7,8,9,10,11,12];

    for (var num in numbers) {
        var text = placeNumber(numbers[num], xCoor, yCoor, clockRadius + 20);
        stage.addChild(text);
    }
}

function toRadians(angle) {
    return angle * (Math.PI / 180);
}

function placeNumber(number, xCoor, yCoor, radius) {
    var placement=((number%12/12)*360);
    var text=new createjs.Text(number.toString(),"25px Arial");
    text.textBaseline="middle";
    text.textAlign="center";
    text.x=xCoor;
    text.y=yCoor;
    var x=radius*Math.sin(toRadians(placement));
    var y=radius*Math.cos(toRadians(placement));
    text.regX=-x;
    text.regY=y;
    return text;

}

// Generate a random time and return an object containing it
function generateTime(clock) {
    var hour = Math.floor((Math.random() * 12) + 1);
    var minArray = ["00", "15", "30", "45"];
    var minIndex = Math.floor((Math.random() * 4));
    var min = minArray[minIndex];
    clock.hour = hour;
    clock.min = min;
    return clock;
}

// Get the angle of rotation for the given x,y coordinates relative
// to the x-axis
function getAngle(x, y) {
    var angle = Math.atan2(y, x);
    angle = angle * (180/Math.PI);
    if(angle < 0)
    {
        angle = 360 - (-angle);
    }
    return angle;
}

function getAngleFromNumber(num) {
    var angle = 30 * (num - 3);
    return angle;
}

// Add the submit button to the canvas
function createSubmitButton(xCoor, yCoor) {
    var submitContainer = new createjs.Container();
    submitContainer.x = xCoor;
    submitContainer.y = yCoor;
    stage.addChild(submitContainer);

    var submitButton = new createjs.Shape();
    submitButton.graphics.beginFill("#0066CC").drawRoundRect(0,0, buttonWidth, buttonHeight, 2 );
    submitButton.on("click", submitButtonClickHandler);
    submitContainer.addChild(submitButton);

    var submitText = new createjs.Text("Submit", "bold 25px Arial", "white");
    submitText.textAlign = "center";
    submitText.textBaseline = "middle";
    submitText.x = buttonWidth/2;
    submitText.y = 20;
    submitContainer.addChild(submitText);
}

// Add the 'New Clock' button to the canvas
function createNewGameButton(xCoor, yCoor, text) {
    var newClockContainer = new createjs.Container();
    newClockContainer.y = yCoor;
    newClockContainer.x = xCoor;
    stage.addChild(newClockContainer);

    var newGameButton = new createjs.Shape();
    newGameButton.graphics.beginFill("#CC3300").drawRoundRect(0,0, buttonWidth, buttonHeight, 2 );
    newGameButton.on("click", newGameButtonClickHandler);
    newClockContainer.addChild(newGameButton);

    var newClockText = new createjs.Text(text, "bold 25px Arial", "white");
    newClockText.textAlign = "center";
    newClockText.textBaseline = "middle";
    newClockText.x = buttonWidth/2;
    newClockText.y = 20;
    newClockContainer.addChild(newClockText);
}

function CreateBorder() {
    var border = new createjs.Shape();
    border.graphics.beginStroke("blue");
    border.graphics.setStrokeStyle(5);
    border.snapToPixel = true;
    border.graphics.drawRoundRect(0, 0, stageWidth, stageHeight, 20);
    stage.addChild(border);
}