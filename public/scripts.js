$(function() {
  if($('#records').length > 0) {
    $.getJSON('/latest_records.json', function(response) {
      console.log(response);
      var html = '',
          template = $('#record_template').html();
      $.each(response, function(i, record) {
        html += Mustache.render(template, record);
      });

      $('.records ul').html(html);
    });
  }

  $('.nav a').click(function() {
    var href = $(this).attr('href');
    var id = href.replace(/#/, '');
    var $link = $("a[name='"+ id +"']");
    $('html,body').animate({scrollTop: $link.offset().top}, '400');
    return false;
  });
});
