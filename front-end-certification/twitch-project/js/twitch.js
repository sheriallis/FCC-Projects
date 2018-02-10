$(function() {
  const streamers = [
    "HardlyDifficult",
    "Adam13531",
    "Noopkat",
    "rthor_",
    "JessicaMak",
    "LiveOrDevTrying",
    "kentcdodds",
    "RainbowWarrior_",
    "stonehearth",
    "DrunkDevs",
    "DonTheDeveloper",
    "jhovgaard",
    "tsoding",
    "FrancoisCote_io",
    "XenocideAcademy",
    "Jacklifear",
    "JoshStrobl"
  ];

  for (let i = 0; i < streamers.length; i++) {
    let getChannel = $.getJSON(
      "https://wind-bow.glitch.me/twitch-api/channels/" + streamers[i]
    );
    let getStream = $.getJSON(
      "https://wind-bow.glitch.me/twitch-api/streams/" + streamers[i]
    );

    $.when(getChannel, getStream).done(function(channel, stream) {
      let logo = channel[0].logo;
      let name = channel[0].display_name;
      let url = channel[0].url;
      let status, statusBadge, desc;

      if (stream[0].stream !== null) {
        desc = "<strong>Streaming:</strong> " + channel[0].status;
        status = "online";
        statusBadge = "success";
      } else if (channel[0].status === 404) {
        name = "Channel Could Not Be Found";
        desc =
          "This channel does not exist. Click to view featured Twitch streamers.";
        status = "error";
        logo =
          "https://raw.githubusercontent.com/sheriallis/twitch-api-project/master/img/placeholder_logo.png";
        url = "https://twitch.tv";
        statusBadge = "danger";
      } else {
        status = "offline";
        desc = "This channel is currently offline.";
        statusBadge = "light";
      }

      displayData(logo, name, url, status, statusBadge, desc);
    });
  }

  const displayData = function(logo, name, url, status, statusClass, desc) {
    $(".streamers-list").append(
      `
      <div class="card border-${statusClass} bg-light m-3 ${status}" style="width: 20rem;">
      <div class="card-header">${name}</div>
      <div class="card-body">
        <img class="user-image mb-3 mt-3 rounded-circle" src="${logo}">
        <p>${desc}
        </p>
        <p><a href="${url}" class="badge badge-${statusClass}">${status}</a></p>
      </div>
    </div>
      `
    );
  };

  $(".filter-online").click(function() {
    $(".online").removeClass("d-none");
    $(".all-streams").removeClass("active");
    $(".filter-offline").removeClass("active");
    $(this).addClass("active");
    $(".offline").addClass("d-none");
  });
  $(".filter-offline").click(function() {
    $(".offline").removeClass("d-none");
    $(".all-streams").removeClass("active");
    $(".filter-online").removeClass("active");
    $(this).addClass("active");
    $(".online").addClass("d-none");
  });
  $(".all-streams").click(function() {
    $(".offline").removeClass("d-none");
    $(".online").removeClass("d-none");
    $(".filter-online").removeClass("active");
    $(".filter-offline").removeClass("active");
    $(this).addClass("active");
  });
});
