// Replace with your YouTube Data API key
const API_KEY = 'AIzaSyAnmhKYNIjy410aIQKmrKTN7rH8b87nYKg';

// Replace with your YouTube Data API key

// Function to load the API client and the YouTube Data API
function initClient() {
    gapi.load('client', () => {
        gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
        }).then(() => {
            console.log('API client loaded');
        }).catch((error) => {
            console.error('Error loading API client', error);
        });
    });
}

// Function to search for educational videos
function searchEducationalVideos() {
    const query = document.getElementById('searchQuery').value;
    if (!query) {
        alert('Please enter a search query.');
        return;
    }

    // Adding educational-related keywords to the search query
    const educationalQuery = `${query} education learning tutorial`;

    gapi.client.youtube.search.list({
        part: 'snippet',
        q: educationalQuery,
        type: 'video',
        maxResults: 10
    }).then((response) => {
        const videos = response.result.items;
        displayVideos(videos);
    }).catch((error) => {
        console.error('Error searching for videos', error);
    });
}

// Function to display videos
function displayVideos(videos) {
    const videoList = document.getElementById('videoList');
    videoList.innerHTML = ''; // Clear previous results

    videos.forEach((video) => {
        const title = video.snippet.title;
        const videoId = video.id.videoId;
        const thumbnail = video.snippet.thumbnails.default.url;
        const videoElement = `
            <div>
                <h3>${title}</h3>
                <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                    <img src="${thumbnail}" alt="${title}">
                </a>
            </div>
        `;
        videoList.innerHTML += videoElement;
    });
}

// Initialize the client
initClient();
