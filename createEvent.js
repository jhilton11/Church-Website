 function uploadData() {
    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value;
    var date = document.getElementById("date").value;
    var selectedFile = document.getElementById("file").files[0];
    var imageUrl = null;
    
    alert("OK");

    var database = firebase.database().ref().child('events');
    var eventId = database.push().key;

    var eventRef = firebase.storage().ref('event_image_url/' + eventId + '.jpg');
    alert('EventId: ' +eventId);

    var task = eventRef.put(selectedFile);
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
        eventRef.getDownloadURL().then(function(url) {
            firebase.database().ref('events/' + eventRef).set({
                id: eventId,
                title: title,
                description: description,
                date: date,
                imgUrl: url
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