// Test / driver code (temporary). Eventually will get this from the server.

$(function() {

  // $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

  function createTweetElement(tweet) {


    /////////////////////////////////////////Building the header
    let $header = ($("<header>")).addClass("tweet-header")
      .append($("<img>").addClass("user-avatar").attr("src", tweet.user.avatars.small))
      .append($("<span>").addClass("user-name").text(tweet.user.name))
      .append($("<span>").addClass("user-handle").text(tweet.user.handle));
    ///////////////////////////////////////////////////////Building the footer

    let $icons = ($("<div>", {
        "class": "icons"
      })).append($("<i>", {
        "class": "fa fa-flag",
        "aria-hidden": "true"
      }))
      .append($("<i>", {
        "class": "fa fa-heart",
        "aria-hidden": "true"
      }))
      .append($("<i>", {
        "class": "fa fa-retweet",
        "aria-hidden": "true"
      }));

    let $footer = ($('<footer>').append($("<span>")).text(tweet.created_at)).append($icons);
    //////////////////////////////////////////////////////
    let $article = ($('<article>').addClass("tweet").append($header));

    let $main = ($("<main>", {
        "class": "tweet-content"
      }))
      .append($("<p>").text(tweet.content.text));

    let $combine = $article.append($header).append($main).append($footer);

    return $combine;

  }

  function renderOldTweets() {

    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function(oldTweets) {
        for (let x in oldTweets) {

          let $tweet = createTweetElement(oldTweets[oldTweets.length - x - 1]);


          $('#tweets-container').append($tweet);
        }
      }
    });
  }

  renderOldTweets();

  function loadTweets() {

    $.ajax({
      url: '/tweets',
      type: 'GET',
      success: function(tweetObject) {
        let $temp = createTweetElement(tweetObject[tweetObject.length - 1]);
        $('#tweets-container').prepend($temp);
        $('#tweets-container .tweet:first-child').hide().slideDown();
      }
    });

  }

  $("form").submit(function(object) {

    let textAreaContent = document.getElementById('tweet-input').value.length;
    event.preventDefault();

    if (textAreaContent === 0) {
      alert('Please enter content for your tweet!');
    } else if (textAreaContent > 140) {
      alert('That tweet is to long, please keep it under 140 characters!');
    } else {
      var tweetString = $("form").serialize();
      $('textarea').val('');
      $.ajax({
        type: 'POST',
        url: '/tweets',
        data: tweetString,
        encode: true,
        success: function() {
          loadTweets();
        }
      });
    }

  });

  $('.compose-button').click(function() {
    $(this).toggleClass('highlight');
    $('html, body').animate({
      scrollTop: '0px'
    }, 300);
    $('.container .new-tweet').slideToggle();
    $('.container textarea').select();
  });

});