const url = "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand";

const request = function() {
  $.ajax({
    url: url,
    type: "GET"
  }).done(function(data) {
    console.log(data);
    $("blockquote").html(
      data[0].content + "<cite>— " + data[0].title + "</cite>"
    );
  });
};

request();

$(".get-quote").on("click", function(e) {
  e.preventDefault();
  request();
});
