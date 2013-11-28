$(function() {
  if($('#records').length > 0) {
    $.getJSON('/latest_records.json', function(response) {
      var html = '',
          template = $('#record_template').html();
      $.each(response, function(i, record) {
        html += Mustache.render(template, record);
      });

      $('.records ul').html(html);
    });
  }

  if($('#photos').length > 0) {
    $.getJSON('/latest_photos.json', function(response) {
      var html = '',
          template = $('#photo_template').html();
      $.each(response, function(i, record) {
        html += Mustache.render(template, record);
      });

      $('.photos').html(html);
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
