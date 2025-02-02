document.addEventListener("DOMContentLoaded", function() {
  const image = document.querySelector("#image-container img");
  const root = document.documentElement;

  function updateStyles() {
    
    // detect viewport height
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    let wiiuHeight, wiiuWidth;
    
    if (viewportHeight > viewportWidth){
      wiiuHeight = `100%`;
      wiiuWidth = `${viewportWidth * 0.75}px`;
    } else {
      wiiuHeight = `${viewportHeight * 0.25}px`;
      wiiuWidth = `100%`;
    }

    const imageWidth = image.clientWidth;
    const imageHeight = image.clientHeight;
    const textLength = "isfshax".length; // Adjust this to your word
    const baseSizeAdjustment = 1.6; // Adjust this value to fine-tune the text size

    const fontSize = `${(imageWidth / textLength) * baseSizeAdjustment}px`;
    const nandWidth = `${imageWidth / 3.0}px`;
    const nandLeft = `${imageWidth * 0.68}px`;
    const nandTop = `${imageHeight * 1.15}px`;
    const bodyLeft = `${image.offsetLeft}px`;
    const headerBelowTop = `${imageHeight * 2.2}px`;
    const bodyBelowTop = `${imageHeight * 1.05}px`;
    const creditsBelowTop = `${imageHeight * 2.6}px`;
    const dlSize = `${(imageWidth / "Download".length) * 0.42}px`;
    const bodySize = `${(imageWidth / "isfshax is a coldboot boot1 exploit for Wii U ".length) * 1.7}px`;
    const marginTop = `${imageHeight * 0.3}px`;
    const dotLeft = `${imageWidth * 0.0785}px`;
    const dotTop = `${imageHeight * 0.682}px`;
    const dotSize = `${imageWidth * 0.01}px`;
    const shineSize = `${imageWidth * 0.04}px`;
    const textLeft = `${imageWidth * 0.95}px`;
    const textTop = `${imageHeight * 1.95}px`;
    const bodyTextWidth = `${imageWidth * 0.7}px`;
    const bodyTextHeight = `${imageHeight * 0.5}px`;
    const bodyTextFontSize = `${imageWidth * 0.02}px`;
    const uiTop = `${textTop}px`;
    const buttonOffset = `${imageWidth * 0.025}px`;
    const buttonOneSize = `${imageWidth * 0.05}px`;
    const buttonPadding = `${imageWidth * 0.01}px`;
    const buttonPadding2 = `${imageWidth * 0.025}px`;
    const creditsSize = `${(imageWidth / "isfshax is a coldboot boot1 exploit for Wii U ".length) * 1.2}px`;

    root.style.setProperty("--body-left", bodyLeft);
    root.style.setProperty("--header-below-top", headerBelowTop);
    root.style.setProperty("--body-below-top", bodyBelowTop);
    root.style.setProperty("--header-size", dlSize);
    root.style.setProperty("--body-size", bodySize);
    root.style.setProperty("--font-size", fontSize);
    root.style.setProperty("--margin-top", marginTop);
    root.style.setProperty("--dot-left", dotLeft);
    root.style.setProperty("--dot-top", dotTop);
    root.style.setProperty("--dot-size", dotSize);
    root.style.setProperty("--shine-size", shineSize);
    root.style.setProperty("--text-left", textLeft);
    root.style.setProperty("--text-top", textTop);
    root.style.setProperty("--nand-width", nandWidth);
    root.style.setProperty("--nand-left", nandLeft);
    root.style.setProperty("--nand-top", nandTop);
    root.style.setProperty("--body-text-width", bodyTextWidth);
    root.style.setProperty("--body-text-height", bodyTextHeight);
    root.style.setProperty("--body-text-font-size", bodyTextFontSize);
    root.style.setProperty("--ui-top", uiTop);
    root.style.setProperty("--button-one-size", buttonOneSize);
    root.style.setProperty("--button-padding", buttonPadding);
    root.style.setProperty("--button-padding2", buttonPadding2);
    root.style.setProperty("--button-offset", buttonOffset);
    root.style.setProperty("--credits-below-top", creditsBelowTop);
    root.style.setProperty("--credits-size", creditsSize);
    root.style.setProperty("--wiiu-height", wiiuHeight);
    root.style.setProperty("--wiiu-width", wiiuWidth);
  }

  // Update styles on load and resize
  updateStyles();
  window.addEventListener("resize", function() {
    updateStyles();
  });

  // Ensure functions run a few times after the page is finished loading
  setTimeout(updateStyles, 100);
  setTimeout(updateStyles, 200);
  setTimeout(updateStyles, 300);
  
  // Run updateStyles using requestAnimationFrame
  function updateStylesLoop() {
    updateStyles();
    requestAnimationFrame(updateStylesLoop);
  }

  requestAnimationFrame(updateStylesLoop);
});
