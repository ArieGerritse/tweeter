// Test / driver code (temporary). Eventually will get this from the server.

$(function() {

  var data = [{
    "user": {
      "name": "Newton",
      "avatars": {
        "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  }, {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }, {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }];

  // $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

  function createTweetElement(tweet) {

    // var $temp = $(".all-tweets article").clone().addClass('tweet');
    // $temp.find('.user-avatar').attr('src', tweet.user.avatars.small);
    // $temp.find(".user-name").text(tweet.user.name);
    // $temp.find(".user-handle").text(tweet.user.handle);
    // $temp.find(".tweet-content p").text(tweet.content.text);
    // $temp.find("footer span").text(tweet.created_at);

    // return $temp;


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

  function renderTweets(tweets) {

    for (let x in tweets) {

      let $tweet = createTweetElement(tweets[tweets.length - x - 1]);


      $('#tweets-container').append($tweet);
    }
  }

  renderTweets(data);


});

/*      <article class="tweet" id="tweets-container">
        <header class="tweet-header">
          <a>
          <img class="user-avatar" src="http://fillmurray.com/48/48">
        </a>
          <span class="user-name">Bill Murray</span>
          <span class="user-handle">@bill_murray</span>
        </header>
        <main class="tweet-content">
          <p>Don't think about your errors or failures; otherwise, you'll never do a thing.</p>
        </main>
        <footer>
          <span>10 days</span>
          <div class="icons">
            <i class="fa fa-flag" aria-hidden="true"></i>
            <i class="fa fa-heart" aria-hidden="true"></i>
            <i class="fa fa-retweet" aria-hidden="true"></i>
          </div>
        </footer>
      </article>*/