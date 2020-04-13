 function uploadData() {
    var title = document.getElementById("title").value;
    var author = document.getElementById("author").value;
    var id = document.getElementById("id").value;
    var date = document.getElementById("date").value;
    var selectedFile = document.getElementById("file").files[0];
    var imageUrl = null;
    
    alert("OK");

    var database = firebase.database().ref().child('videos');
    var videoId = database.push().key;

    var videoRef = firebase.storage().ref('video_image_url/' + videoId + '.jpg');
    alert('VideoId: ' +videoId);

    var task = videoRef.put(selectedFile);
    alert("Uploading picture");

    task.on('state_changed',
    function progress(snapshot) {
        //var percent = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
        //uploadProgress.value = percent;
    },
    function error(err) {
        alert('Error');
    },
    function complete() {
        //var date = firebase.database.ServerValue.TIMESTAMP;
        videoRef.getDownloadURL().then(function(url) {
            firebase.database().ref('videos/' + videoId).set({
                id: videoId,
                title: title,
                imageUrl: url,
                date: date
            });
            alert('Successfully uploaded');
        }).catch(function(error){
            alert('Unable to get download url');
        });
    }
);
}

function clearFields() {
    
}