var TEMPLATE_IMAGE = 'shape-image';
var TEMPLATE_TITLE = 'shape-name';

function saveAs(doc, docName, appendix) {
    if (docName.indexOf(".") != -1) {
        var basename = getFileName(docName);
    } else {
        var basename = docName;
    }

    var docPath = doc.path;
    var filename = docPath + '/' + basename + "_" + appendix + '.psd';

    var file = new File(filename);
    doc.saveAs(file);

    return file;
}

function getFileName(fileName) {
    return decodeURI(fileName.match(/(.*)\.[^\.]+$/)[1]);
}


function drawTemplate(options) {
    var docTemplate = open(options.templateFile);
    var oldName = docTemplate.name;
    var doc;
    var shapeFilePath;
    var shapeFileName;
    var shapeName;
    var shapeImage;

    for (var i = 0; i < options.shapeFiles.length; i++) {

        shapeFilePath = options.shapeFiles[i] + "";
        shapeFilePath = shapeFilePath.split('/').pop();
        shapeFileName = getFileName(shapeFilePath);

        doc = open(saveAs(docTemplate, oldName, shapeFileName));

        shapeName = doc.artLayers.getByName(TEMPLATE_TITLE);
        shapeName.textItem.contents = shapeFileName;


        shapeImage = doc.artLayers.getByName(TEMPLATE_IMAGE);
        doc.activeLayer = replaceContents(doc, new File(options.shapeFiles[i]), shapeImage);
        doc.activeLayer.name = TEMPLATE_IMAGE;

        exportPng(doc, getFileName(oldName) + "_" + shapeFileName);

        doc.save();
    }

}

function exportPng(doc, file) {
    var opts = new ExportOptionsSaveForWeb();
    opts.format = SaveDocumentType.PNG;
    opts.PNG8 = false;
    opts.quality = 100;

    var pngFile = doc.path + '/' + file + '.png';

    doc.exportDocument(new File(pngFile), ExportType.SAVEFORWEB, opts);
}

function replaceContents(doc, newFile, theSO) {
    doc.activeLayer = theSO;
// =======================================================
    var idplacedLayerReplaceContents = stringIDToTypeID("placedLayerReplaceContents");
    var desc3 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    desc3.putPath(idnull, new File(newFile));
    var idPgNm = charIDToTypeID("PgNm");
    desc3.putInteger(idPgNm, 1);
    executeAction(idplacedLayerReplaceContents, desc3, DialogModes.NO);
    return doc.activeLayer
}