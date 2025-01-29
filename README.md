<h1>Dynamic Page Builder: Test, Learn, Create!</h1>

<h3>Overview</h3>

Dynamic Page Builder is a versatile and interactive web application that allows users to design, preview, and generate custom web pages by inputting HTML, CSS, and JavaScript code. It includes a powerful image upload feature that dynamically integrates uploaded images into the user's generated web content.

<h3>Features</h3>

Code Editors: Separate text areas for HTML, CSS, and JavaScript inputs.

Live Preview: Generate and view the custom web page in an iframe without refreshing the page.

Image Upload and Management:

Upload multiple image files.

Replace image paths in the generated content with base64 data URLs.

Display uploaded images in a thumbnail list.

Option to remove individual images.

Dynamic counter showing the number of uploaded images.

Responsive Design: The layout adapts for different screen sizes using media queries.

<h3>Usage Instructions</h3>

<h5>1. Writing Code</h5>

Enter your custom HTML code in the HTML editor.

Use the CSS editor to style your web page.

Add interactivity using the JavaScript editor.

<h5>2. Uploading Images</h5>

Click the "Choose Files" button to select one or multiple image files.

Uploaded images are displayed as thumbnails.

To remove an image, click the red remove button on the thumbnail.

<h5>3. Generating the Web Page</h5>

Click the Generate your page button to preview your code.

The app will embed uploaded images and replace their references in the HTML with base64 data URLs.

<h5>4. Viewing the Preview</h5>

The generated page is displayed in the iframe below the "Preview View" heading.

<h3>Technical Details</h3>

<h6>Image Handling</h6>

Uploaded images are converted to base64 format using the FileReader API.

The image references in the HTML are dynamically replaced with base64 URLs before rendering.

<h6>Dynamic Content Integration</h6>

JavaScript dynamically assembles a complete web page by combining HTML, CSS, and JavaScript inputs.

Content is injected into the iframe to display the preview.

<h6>Responsive Design</h6>

Flexbox and media queries ensure that the layout adapts seamlessly across different screen sizes.

<h6>Code Files</h6>

index.html: Structure of the page, including code editors and preview elements.

styles.css: Styling for layout, buttons, and image elements.

script.js: JavaScript logic for dynamic page generation and image management.

<h3>Created by Gustavo Leimbek</h3>
