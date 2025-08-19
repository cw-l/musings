document.addEventListener("DOMContentLoaded", function () {
  // Select all code blocks inside your blog post content
  document.querySelectorAll(".blog-post_content pre").forEach(function (pre) {
    // Create the copy button
    const button = document.createElement("button");
    button.className = "copy-button";
    button.innerText = "Copy";

    // Click event
    button.addEventListener("click", function () {
      const code = pre.querySelector("code");
      if (!code) return;

      // Try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code.innerText)
          .then(() => showCopied(button))
          .catch(() => fallbackCopy(code.innerText, button));
      } else {
        // Fallback for insecure context or older browsers
        fallbackCopy(code.innerText, button);
      }
    });

    // Ensure pre is relative so button positions correctly
    pre.style.position = "relative";
    pre.appendChild(button);
  });

  // Show "Copied!" temporarily
  function showCopied(button) {
    button.innerText = "Copied!";
    setTimeout(() => (button.innerText = "Copy"), 2000);
  }

  // Fallback copy using hidden textarea
  function fallbackCopy(text, button) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      showCopied(button);
    } catch (err) {
      console.error("Fallback: Could not copy text", err);
    }
    document.body.removeChild(textarea);
  }
});
