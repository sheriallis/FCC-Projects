const url = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand";

const request = function() {
  $.ajax({
    url: url,
    type: "GET",
    cache: false
  }).done(function(data) {
    $("blockquote").html(
      data[0].content + "<cite>— " + data[0].title + "</cite>"
    );
    createTweet(data[0].content, data[0].title);
  });
};

const createTweet = function(quote, author) {
  const tweetBody = quote.substring(3, quote.length - 5) + "— " + author;
  const tweetLink = 'https://twitter.com/intent/tweet?text="' + tweetBody + '"';
  $(".tweet-link").prop("href", tweetLink);
};

request();

$(".get-quote").on("click", function(e) {
  e.preventDefault();
  request();
});
