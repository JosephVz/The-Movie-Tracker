var posterUrl = "";
var search = "";
function omdbTest (){
    var link = "https://www.omdbapi.com/?apikey=17b8058a&t=" + search;
    fetch (link)
    .then((response)=> response.json())
    .then((returned)=>{

        if (returned.Response === "False"){
            //Let the user know that their movie wasn't found
        } else{
            console.log(returned);
            console.log(returned.Actors);
            console.log(returned.imdbID);
            $('#returned-title').text(returned.Title);
            $('#returned-title').attr("style","visibility:visible;");
            console.log(returned.Poster);
            posterUrl = returned.Poster;
            $('.returned').attr("src", posterUrl);
            $('.returned').attr("style", "visibility:visible;");
        }
    })
}

async function streamingServicesTest(title){
    var str = title;
    var strArray = str.split(/(\s+)/);
    for (var i = 0; i<strArray.length; i++){
        if (strArray[i] == " ")
        strArray[i] = '%20';
    }

    console.log(strArray.join(""));
    str = strArray.join("");
    var link = "https://streaming-availability.p.rapidapi.com/search/title?title=" + str + '&country=us&show_type=all&output_language=en';
    
    const url = link;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f00aaee43fmsha67ab85a8c221c8p19a26cjsn5127edbb2a6b',
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        var resultArray = result[0];
        console.log(resultArray);



        // for (var i = 0; i<.length; i++){

        // }
    } catch (error) {
        console.error(error);
    }
}

$('#first_name2').bind("enterKey",function(e){
    e.preventDefault();
    search = $('input').val();
    omdbTest(search);
    streamingServicesTest(search);
    $('input').val("");
 });

 $('#first_name2').keyup(function(e){
     if(e.keyCode == 13)
     {
         $(this).trigger("enterKey");
     }
 });
