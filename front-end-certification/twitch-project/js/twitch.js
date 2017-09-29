$(function() {
  const streamers = [
    "HardlyDifficult",
    "Adam13531",
    "Noopkat",
    "rthor_",
    "LiveOrDevTrying",
    "RainbowWarrior_",
    "stonehearth",
    "DrunkDevs",
    "DonTheDeveloper",
    "jhovgaard",
    "tsoding",
    "JessicaMak",
    "FrancoisCote_io",
    "XenocideAcademy",
    "kentcdodds",
    "Jacklifear",
    "JoshStrobl"
  ];

  for (let i = 0; i < streamers.length; i++) {
    let getChannel = $.getJSON(
      "https://cors.now.sh/https://wind-bow.gomix.me/twitch-api/channels/" +
        streamers[i]
    );
    let getStream = $.getJSON(
      "https://cors.now.sh/https://wind-bow.gomix.me/twitch-api/streams/" +
        streamers[i]
    );

    $.when(getChannel, getStream).done(function(channel, stream) {
      let logo = channel[0].logo;
      let name = channel[0].display_name;
      let url = channel[0].url;
      let status, statusBadge, desc;

      if (stream[0].stream !== null) {
        desc = "<strong>Streaming:</strong> " + channel[0].status;
        status = "online";
        statusBadge = "badge-success";
      } else if (channel[0].status === 404) {
        name = "Channel Could Not Be Found";
        desc =
          "This channel does not exist. Click to view featured Twitch streamers.";
        status = "error";
        logo =
          "https://raw.githubusercontent.com/sheriallis/twitch-api-project/master/img/placeholder_logo.png";
        url = "https://twitch.tv";
        statusBadge = "badge-danger";
      } else {
        status = "offline";
        desc = "This channel is currently offline.";
        statusBadge = "badge-light";
      }

      displayData(logo, name, url, status, statusBadge, desc);
    });
  }

  const displayData = function(logo, name, url, status, statusBadge, desc) {
    $(".streamers-list").append(
      `
        <div class="col-md-4">
          <h3>${name}</h3>
        <img class="user-image mb-3 mt-3 rounded-circle" src="${logo}">
        <p>${desc}
        </p>
        <p><a href="${url}" class="badge ${statusBadge}">${status}</a></p>
      </div>
      `
    );
  };
});
