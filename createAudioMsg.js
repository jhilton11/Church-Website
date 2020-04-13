 function uploadData() {
    var title = document.getElementById("title").value;
    var author = document.getElementById("author").value;
    var date = document.getElementById("date").value;
    var selectedFile = document.getElementById("file").files[0];
    var imageUrl = null;
    
    console.log("OK");

    var database = firebase.database().ref().child('audiomessages');
    var audioId = database.push().key;

    var audioRef = firebase.storage().ref('audioMessages/' + audioId + '.mp3');
    console.log('Audio Id: ' +audioId);

    var task = audioRef.put(selectedFile);
    console.log("Uploading picture");

    task.on('state_changed',
    function progress(snapshot) {
        //var percent = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
        //uploadProgress.value = percent;
    },
    function error(err) {
        console.log('Error');
    },
    function complete() {
        //var date = firebase.database.ServerValue.TIMESTAMP;
        audioRef.getDownloadURL().then(function(url) {
            firebase.database().ref('audiomessages/' + audioId).set({
                id: audioId,
                title: title,
                msgUrl: url,
                date: date,
                author: author
            });
            console.log('Successfully uploaded');
            //document.getElementById("form")
        }).catch(function(error){
            console.log('Unable to get download url');
        });
    }
);
}