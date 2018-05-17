document.addEventListener("DOMContentLoaded", function() {

  // Imagination!
  var button = document.querySelector('#button');
  var list   = document.querySelector('#list');
  var index  = 0;

  button.addEventListener('click', function() {

    // console.log(event);

    $.ajax({
      url: 'https://bb-election-api.herokuapp.com/',
      method: 'GET'
    }).done( function(responseData) {
      console.log(responseData);

      responseData.candidates.forEach( function (candidate) {
        var liTag = document.createElement('li');
        var h3Tag = document.createElement('h3');
        var h4Tag = document.createElement('h4');
        h3Tag.innerText = "Name: " + responseData.candidates[index].name;
        h4Tag.innerText = "Votes: " + responseData.candidates[index].votes;
        liTag.append(h3Tag);
        liTag.append(h4Tag);
        list.append(liTag);
        index++;
      });
    });

  });

});
