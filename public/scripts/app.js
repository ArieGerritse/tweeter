// Test / driver code (temporary). Eventually will get this from the server.

$(function() {

  //creates a single tweet element in 4 seconds of HTML untin returing the combined
  //version of all 4 parts which include the header, footer, main, and container
  function createTweetElement(tweet) {


    let dateFrom = moment(tweet.created_at).fromNow();

    //Building the header with username, avatars and handle
    let $header = ($("<header>")).addClass("tweet-header")
      .append($("<img>").addClass("user-avatar").attr("src", tweet.user.avatars.small))
      .append($("<span>").addClass("user-name").text(tweet.user.name))
      .append($("<span>").addClass("user-handle").text(tweet.user.handle));
    ///////////////////////////////////////////////////////Building the footer
    // The footer iscomposed of the icons plus the time created
    let $icons = ($("<div>", {
        "class": "icons"
      })).append($("<i>", {
        "class": "fa fa-flag",
        "aria-hidden": "true"
      }))
      .append($("<i>", {
        "class": "fa fa-heart-o",
        "aria-hidden": "true"
      }))
      .append($("<i>", {
        "class": "fa fa-retweet",
        "aria-hidden": "true"
      }));

    let $footer = $('<footer>').append($("<span>").addClass("tweet-time").text(dateFrom)).append($icons);

    //Creation of the article which is the wraper of all the inner parts
    let $article = ($('<article>').addClass("tweet").append($header));

    //The main content holds the tweet content of the tweet
    let $main = ($("<main>", {
        "class": "tweet-content"
      }))
      .append($("<p>").text(tweet.content.text));

    let $combine = $article.append($header).append($main).append($footer);



    return $combine;

  }

  //This funciton is run once on load/refresh to load and post all the previously
  //posted tweets
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

  //Runs on document ready
  renderOldTweets();

  //This function is dengined to load the last tweet added to the datbase which was the
  //newest tweet created, and then posteds it to the tweet container
  function loadTweets() {
    $.ajax({
      url: '/tweets',
      type: 'GET',
      success: function(tweetObject) {
        let $temp = createTweetElement(tweetObject[tweetObject.length - 1]);
        $('#tweets-container').prepend($temp);

        //This just makes a slide animation on every new tweet as it is added to the main page
        $('#tweets-container .tweet:first-child').hide().slideDown();
      }
    });

  }


  //On clicking submit on the tweet text area commit form, first checks to make sure the
  //tweet is within paramaters and if not sends an alert
  $("form").submit(function(object) {

    let textAreaContent = $("textarea#tweet-input").val().length;
    event.preventDefault();


    //Checks if the textarea is over 0/empty and below 140
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
        success: function(hey) {
          loadTweets();
        }
      });
    }

  });

  //This code section toggles the slide on the enter tweet textarea bar on the tweet
  //main page, as well as toggles the class for the button for unique CSS applications
  $('.compose-button').click(function() {
    $(this).toggleClass('highlight');
    $('html, body').animate({
      scrollTop: '0px'
    }, 300);
    $('.container .new-tweet').slideToggle();
    $('.container textarea').select();
  });


  //This function runs every 3 seconds, updating the tweet created times in real time
  setInterval(function() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function(tweetData) {
        for (let i = tweetData.length - 1; i >= 0; i--) {
          $('.tweet-time').eq(tweetData.length - 1 - i).text(moment(tweetData[i].created_at).fromNow());
        }
      }
    });
  }, 3000);


});