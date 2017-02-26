//@include 'template.jsx';

var options = {
    templateFile: null,
    shapeFiles: null,
    exportToPng: false,
};

var w = new Window('dialog {orientation: "column",  preferredSize:[500, 300], properties: {closeButton: true},text: "Shapes in template",  margin: 15, alignChildren: [" ", "top"]}');

var templateGroup = w.add('panel {orientation: "row",  text: "Template", preferredSize:[500, 50], alignment: "fill", alignChildren: ["fill", " "]}');
var templatePanel = templateGroup.add('group {orientation: "row", preferredSize:[120, 24], alignment: "fill",  alignChildren: ["fill", "top"]}');
var chooseTemplateFileButton = templatePanel.add('button {text: "Select template..."}');


chooseTemplateFileButton.onClick = function () {
    var file = File.openDialog("Choose template", "*.psd");
    if (file) {
        options.templateFile = new File(file);
        var strFilename = options.templateFile + "";
        chooseTemplateFileButton.text = strFilename.split('/').pop();
    }
    return false;
};

//Shapes field
var shapesGroup = w.add('panel {orientation: "row",  text: "Shapes", preferredSize:[500, 50], alignment: "fill", alignChildren: ["fill", " "]}');
var shapesPanel = shapesGroup.add('group {orientation: "row", preferredSize:[120, 24], alignment: "fill",  alignChildren: ["fill", "top"]}');
var chooseShapesButton = shapesPanel.add('button {text: "Select shapes..."}');

chooseShapesButton.onClick = function () {
    options.shapeFiles = File.openDialog("Choose shapes", "*.png", true);
    chooseShapesButton.text = 'Selected (' + options.shapeFiles.length + ') file(s)';
    return false;
};

//Checkbox - export or not
var checkBoxGroup = w.add('group {orientation: "row", preferredSize:[120, 24], alignment: "fill",  alignChildren: ["left", " "]}');
var checkboxExport = checkBoxGroup.add('checkbox{text: "Auto export to PNG?"}');

//Checkbox - export or not
var progressBarGroup = w.add('group {orientation: "row", preferredSize:[500, 24], alignment: "fill",  alignChildren: ["left", " "]}');
var progressBar = progressBarGroup.add('progressbar {value: 0, size: [500, 24]}');
progressBar.visible = false;

//Bottom buttons
var bottomButtonsGroup = w.add('group {orientation: "row", size:[500, 24], alignment: "fill", alignChildren: ["right", " "]}');
var cancelButton = bottomButtonsGroup.add('button {text: "Cancel"}');
var submitButton = bottomButtonsGroup.add('button {text: "ОК"}');


submitButton.onClick = function () {

    if (!options.templateFile) {
        alert('Please, choose template')
    }

    if (!options.shapeFiles.length) {
        alert('Please, choose some shapes')
    }

    progressBar.visible = true;
    drawTemplate(options, function (progress) {
        progressBar.value = progress;
    });

    w.close();

    return true;
};
cancelButton.onClick = function () {
    return w.close();
};

w.show();
