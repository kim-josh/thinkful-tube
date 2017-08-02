'use strict';
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const KEY = 'AIzaSyAk0xd2CJsODngALIrRMmOXzsQq2HPLWII'

function getDataFromApi(searchTerm, callback) {
  const settings = {
    url: YOUTUBE_SEARCH_URL,
    data: {
      part: 'snippet',
      key: KEY
      q: 
    },
    dataType: 'json',
    type: 'GET',
    success: callback,
    error: function() {
      alert('error loading video');
    }
  };
  $.ajax(settings);
}

function renderResult(result) {

}

function displayYoutubeData() {

}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();

  });
}
