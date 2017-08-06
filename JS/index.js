'use strict';
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const KEY = 'AIzaSyAk0xd2CJsODngALIrRMmOXzsQq2HPLWII'

function getDataFromApi(searchTerm, callback) {
  const settings = {
    url: YOUTUBE_SEARCH_URL,
    data: {
      part: 'snippet',
      key: KEY,
      q: searchTerm,
    },
    dataType: 'json',
    type: 'GET',
    success: callback,
    timeout: 5000,
    error: function() {
      alert('error loading video');
    }
  };
  $.ajax(settings);
}

function renderResult(result) {
  return `
    <div>
      <h2 class="js-result-title">${result.snippet.title}</h2>
      <a class="js-result-thumbnail" href="https://www.youtube.com/watch?v=${result.id.videoId}"
        target="_blank" data-toggle="lightbox">
        <img src="${result.snippet.thumbnails.medium.url}"
        alt="thumbnail of youtube video" class="js-result-thumbnail">
      </a>
      <p>
        Youtuber: <a class="js-channel-id" href="https://www.youtube.com/channel/${result.snippet.channelId}"
        target="_blank">${result.snippet.channelTitle}</a>
      </p>
    </div>
  `;
}

function displayYoutubeSearchData(data) {
  console.log(data);
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
  $('.js-search-results').prop('hidden', false);
  $('#pageTokenPrev').val(data.prevPageToken);
  $('#pageTokenNext').val(data.nextPageToken);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const searchTermTarget = $(event.currentTarget).find('.js-query');
    const searchTerm = searchTermTarget.val();
    // Clear out the input
    searchTermTarget.val('');
    getDataFromApi(searchTerm, displayYoutubeSearchData);
  });
}

$(watchSubmit);

$(document).on('click', '[data-toggle="lightbox"]', function(event) {
  event.preventDefault();
  $(this).ekkoLightbox();
});
