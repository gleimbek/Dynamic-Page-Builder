document.getElementById('runButton').addEventListener('click', async function () {
    const htmlCode = document.getElementById('htmlInput').value;
    const cssCode = document.getElementById('cssInput').value;
    const jsCode = document.getElementById('jsInput').value;
    
    const imageMap = {};

    // Get the loaded images from loadedImages
    for (let file of loadedImages) {
        const base64 = await fileToBase64(file);
        imageMap[file.name] = base64; // Save to map with file name as key
    }

    // Create a page that references uploaded images
    let modifiedHtml = htmlCode;

    // Replace local image paths with base64
    for (const [fileName, base64Data] of Object.entries(imageMap)) {
        const regex = new RegExp(`src=["'].*?${fileName}["']`, 'g');
        modifiedHtml = modifiedHtml.replace(regex, `src="${base64Data}"`);
    }

    // Create the full content for the iframe
    const fullPage = `<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>${cssCode}</style>
    </head>
    <body>
        ${modifiedHtml}
        <script>${jsCode}<\/script>
    </body>
    </html>`;

    // Render content in the iframe
    const preview = document.getElementById('preview');
    const previewDocument = preview.contentWindow.document;
    previewDocument.open();
    previewDocument.write(fullPage);
    previewDocument.close();
});

// Convert files to base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

let loadedImages = []; // List of uploaded images

// Handling the image load event
document.getElementById('imageUpload').addEventListener('change', function () {
    const fileList = this.files;

    // Add the new selected images to the list of uploaded images
    Array.from(fileList).forEach(file => {
        // Make sure you don't add the same image more than once
        if (!loadedImages.some(loadedFile => loadedFile.name === file.name)) {
            loadedImages.push(file);
        }
    });

    updateImageList(); // Refresh view with uploaded images
    updateImageCounter(); //Update the counter

    // Clean the "Choose Files" button
    this.value = ''; // Clear file input
});

// Function to update the visual list of images
function updateImageList() {
    const imageListContainer = document.getElementById('imageListContainer');
    imageListContainer.innerHTML = ''; // Clear the current list

    if (loadedImages.length === 0) {
        imageListContainer.innerHTML = '<p>No hay imágenes cargadas.</p>';
        return;
    }

    // Loop through uploaded images and create their view in HTML
    loadedImages.forEach((file, index) => {
        const listItem = document.createElement('div');
        listItem.classList.add('image-item');

        const img = document.createElement('img');
        img.src = URL.createObjectURL(file); // Using the URL object to display the image
        img.alt = file.name;

        // Image delete button
        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-button');
        removeButton.innerHTML = 'X';

        // Delete image by clicking the button
        removeButton.addEventListener('click', function () {
            loadedImages.splice(index, 1); // Remove the image from the array
            updateImageList(); // Re-render the image list
            updateImageCounter(); // Update the counter
            renderPage(); // Call the function that renders the page
        });

        // Add image and button to container
        listItem.appendChild(img);
        listItem.appendChild(removeButton);
        imageListContainer.appendChild(listItem);

        // Allow to see large image on click
        img.addEventListener('click', function () {
            showImagePreview(img.src);
        });
    });
}

// Function to update visible image counter
function updateImageCounter() {
    const imageCount = document.querySelectorAll('#imageListContainer img').length;
    const counterElement = document.getElementById('imageCounter');

    if (counterElement) {
        counterElement.textContent = `Imágenes visibles: ${imageCount}`;
    }
}

// Function to show image preview when clicked
function showImagePreview(src) {
    const previewContainer = document.getElementById('imagePreview');
    previewContainer.innerHTML = `<img src="${src}" alt="Vista previa de la imagen">`;
}

