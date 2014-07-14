/**
 * Created by kfrye on 7/14/14.
 */

// Create a button with the specified label, color, width, and height
function createButton(labelText, color, width, height) {
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