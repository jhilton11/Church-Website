function loadData() {
    let cardContainer = document.getElementById("news-card-container");
    console.log("Hello hello");
    fetch("https://jsonplaceholder.typicode.com/photos")
    .then(response => response.json())
    .then(function (result) {
        //let json = JSON.parse(result);
        console.log("JSON Delivered");
        console.log("JSON length: " + result.length);

        let length = result.length;

        if (length > 5) {
            length = 5
            console.log("Length is greater than 5");
        }

        //create cards
        for (i=0; i<length; i++) {
            let card = document.createElement('div');
            card.className = 'card shadow cursor-pointer';

            let cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            let title = document.createElement('h5');
            title.innerText = result[i].title;
            console.log(result[i].title);
            title.className = 'card-title';

            let image = document.createElement('img');
            image.src = result[i].thumbnailUrl;
            console.log(result[i].thumbnailUrl);

            let button = document.createElement("button");
            button.innerHTML = "Read more";
            button.id = (i+1);
            button.addEventListener("click", function() {
                alert("Card: " + button.id);
            });

            cardBody.appendChild(title);
            cardBody.appendChild(image);
            cardBody.appendChild(button);
            card.appendChild(cardBody);
            cardContainer.appendChild(card);
        }
    });
}

function scroll() {
    $(".navbar a").click(function(){
        $("body,html").animate({
         scrollTop:$("#" + $(this).data('value')).offset().top
        },1000)
        
       })
      
}
