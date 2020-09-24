export default function () {
  var textareas = document.querySelectorAll('.js-textarea-resize');

  // Return if textareas don't exist
  if (!textareas) { return; }

  for (var i = 0; i < textareas.length; i++) {
    textareas[i].addEventListener('keydown', function () {
      var textarea = this;
      textarea.style.cssText = 'height:' + textarea.scrollHeight + 'px';
    });
  }
}
