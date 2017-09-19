$(document).ready(function() {

  $('textarea').keyup(function() {

    let characters = $(this).val().length;

    if (characters >= 140) {
      $('.counter').text(140 - characters).css('color', 'red');
    } else {
      $('.counter').text(140 - characters).css('color', 'black');
    }

  });
});