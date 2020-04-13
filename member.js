 function uploadData() {
    alert("Starting");
    var name = document.getElementById("name").value;
    var phoneNo = document.getElementById("phoneNo").value;
    var areaOfMinistry = document.getElementById("areaOfMinistry").value;
    var email = document.getElementById("email").value;
    var birthday = document.getElementById("birthday").value;
    var selectedFile = document.getElementById("file").files[0];
    var imageUrl = null;
    
    alert("OK");

    var database = firebase.database().ref().child('members');
    var memberId = database.push().key;

    var memberRef = firebase.storage().ref('member_profile_image/' + memberId + '.jpg');
    alert('MemberId: ' +memberId);

    var task = memberRef.put(selectedFile);
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
        //alert("Uploading member data");
        //var date = firebase.database.ServerValue.TIMESTAMP;
        memberRef.getDownloadURL().then(function(url) {
            firebase.database().ref('members/' + memberId).set({
                id: memberId,
                name: name,
                imageUrl: url,
                birthday: birthday,
                areaOfMinistry: areaOfMinistry,
                phoneNo: phoneNo,
                email: email
            });
            alert('Successfully uploaded');
            document.getElementById("myform").reset();
        }).catch(function(error){
            alert('Unable to get download url');
        });
    }
);
}

function clearFields() {
    
}