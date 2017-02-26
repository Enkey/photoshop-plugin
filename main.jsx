//@include 'template.jsx';
var w = new Window('dialog {orientation: "column",  preferredSize:[500, 300], properties: {closeButton: true},text: "Shapes in template",  margin: 15, alignChildren: [" ", "top"]}');

var templateGroup = w.add('panel {orientation: "row",  text: "Template", preferredSize:[500, 50], alignment: "fill", alignChildren: ["fill", " "]}');
var templatePanel = templateGroup.add('group {orientation: "row", preferredSize:[120, 24], alignment: "fill",  alignChildren: ["fill", "top"]}');
var chooseTemplateFileButton = templatePanel.add('button {text: "Select template..."}');

var templateFile = null;

chooseTemplateFileButton.onClick = function () {
    var file = File.openDialog("Choose template", "*.psd");
    templateFile = File(file);
    var strFilename = templateFile + "";
    chooseTemplateFileButton.text = strFilename.split('/').pop();
    return false;
};

//Shapes field
var shapesGroup = w.add('panel {orientation: "row",  text: "Shapes", preferredSize:[500, 50], alignment: "fill", alignChildren: ["fill", " "]}');
var shapesPanel = shapesGroup.add('group {orientation: "row", preferredSize:[120, 24], alignment: "fill",  alignChildren: ["fill", "top"]}');
var chooseShapesButton = shapesPanel.add('button {text: "Select shapes..."}');

var shapeFiles = null;

chooseShapesButton.onClick = function () {
    shapeFiles = File.openDialog("Choose shapes", "*.png", true);
    chooseShapesButton.text = 'Selected ('+shapeFiles.length + ') file(s)';
    return false;
};


//Bottom buttons
var bottomButtonsGroup = w.add('group {orientation: "row", size:[500, 24], alignment: "fill", alignChildren: ["right", " "]}');
var cancelButton = bottomButtonsGroup.add('button {text: "Cancel"}');
var submitButton = bottomButtonsGroup.add('button {text: "ОК"}');


submitButton.onClick = function () {

    if(!templateFile) {
        alert('Please, choose template')
    }

    if(!shapeFiles.length) {
        alert('Please, choose some shapes')
    }

    var options = {
        templateFile: templateFile,
        shapeFiles: shapeFiles
    };

    w.close();

    drawTemplate(options);

    return true;
};
cancelButton.onClick = function () {
    return w.close();
};

w.show();
