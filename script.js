function generateBarcode() {
    var inputText = document.getElementById("barcodeInput").value;

    // Check for leading/trailing whitespaces in rows
    var hasWhitespace = inputText.split('\n').some(function (item) {
        return item.trim() !== item;
    });

    if (hasWhitespace) {
        alert("Please trim leading and trailing whitespaces in the input rows.");
        return;
    }

    var values = inputText.split('\n').map(function (item) {
        return item.trim();
    });

    var container = document.getElementById("barcodeContainer");
    container.innerHTML = ""; // Clear previous content

    values.forEach(function (value) {
        var col = document.createElement("div");
        col.classList.add("col-md-6", "mx-auto", "mb-3");

        var canvas = document.createElement("canvas");
        JsBarcode(canvas, value);
        col.appendChild(canvas);

        container.appendChild(col);
    });

    // Enable the download all button
    document.getElementById("downloadAllBtn").removeAttribute("disabled");
}

function downloadAllBarcodes() {
    var container = document.getElementById("barcodeContainer");

    var zip = new JSZip();

    container.querySelectorAll("canvas").forEach(function (canvas, index) {
        var imageData = canvas.toDataURL("image/png");
        zip.file("Barcode_" + (index + 1) + ".png", imageData.split("base64,")[1], { base64: true });
    });

    zip.generateAsync({ type: "blob" }).then(function (content) {
        saveZip(content);
    });
}

function saveZip(content) {
    var link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = 'All_Barcodes.zip';
    link.click();
}