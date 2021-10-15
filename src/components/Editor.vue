<template>
  <div>
   <form action="javascript:void(0)" method="POST">
    <div class="hidden">
      <textarea id="showHtml" class="form-control" name="details"></textarea>
      <textarea id="showJson" class="form-control" name="detailsJson"></textarea>
    </div>
    <input type="hidden" name="id" value="add id">
  </form>
  <div class="container shadow-edit editorjsTxt mt-3">
<div class="ce-example">
      <div class="ce-example__content _ce-example__content--small">
          <div id="editorjs"></div>
      </div>
      <div class="ce-example__output">
        <pre class="ce-example__output-content" id="output"></pre>
        <div class="ce-example__output-footer">
        </div>
      </div>
    </div>
</div>
  </div>
</template>

<style>
.ce-block__content,
.ce-toolbar__content {
 max-width: 100vw;
  margin: 0 3rem;
}
</style>
