$(function() {
  var toggleUrlField = function(element) {
    if (element.checked) {
      $("#"+element.dataset.urlFieldId).show();
    }
    else {
      $("#"+element.dataset.urlFieldId).hide();
    }
  };
  $(".checkbox-for-url").each(function(index, element){
    toggleUrlField(element);
  });

  $(document).on('change', '.checkbox-for-url', function(event){
    console.log("Checkbox clicked");
    toggleUrlField(event.target);
  });
});