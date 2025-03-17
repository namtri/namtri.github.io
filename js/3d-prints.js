import lightGallery from "https://cdn.skypack.dev/lightgallery@2.8.1";
import lgThumbnail from "https://cdn.skypack.dev/lightgallery@2.8.1/plugins/thumbnail";

const $galleryContainers = document.getElementsByClassName('gallery-container');

const customButtons = `<button type="button" id="lg-toolbar-prev" aria-label="Previous slide" class="lg-toolbar-prev lg-icon"></button>
	<button type="button" id="lg-toolbar-next" aria-label="Next slide" class="lg-toolbar-next lg-icon"></button>`;

$($galleryContainers).each(function() {
	$(this).on("lgInit", (event) => {
	  const pluginInstance = event.detail.instance;

	  // Note append and find are not jQuery methods
	  // These are utility methods provided by lightGallery
	  const $toolbar = pluginInstance.outer.find(".lg-toolbar");

	  // TODO This doesn't work with multiple containers on the same page, will need some work
	  $toolbar.prepend(customButtons);
	  document.getElementById("lg-toolbar-prev").addEventListener("click", () => {
	    pluginInstance.goToPrevSlide();
	  });
	  document.getElementById("lg-toolbar-next").addEventListener("click", () => {
	    pluginInstance.goToNextSlide();
	  });
	});
});

$($galleryContainers).each(function() {
	lightGallery(this, {
		speed: 500,
		download: false
	});
});

// start page with limited vis
$("div.limited-vis").hide();

$("#toggle-additional-projects").click(function() {
	$("div.limited-vis").toggle();
});
