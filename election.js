document.addEventListener("DOMContentLoaded", function() {

  // Imagination!
  var button = document.querySelector('#button');
  var list   = document.querySelector('#list');
  var index  = 0;

  // button.addEventListener('click', function() {

    // console.log(event);

    $.ajax({
      url: 'https://bb-election-api.herokuapp.com/',
      method: 'GET'
    }).done( function(responseData) {
      console.log(responseData);

      responseData.candidates.forEach( function (candidate) {
        var form       = document.createElement('form')
        form.method    = 'POST';
        form.action    = 'https://bb-election-api.herokuapp.com/vote'
        var hiddenId   = document.createElement('input');
        hiddenId.type  = 'hidden';
        hiddenId.name  = 'name'
        hiddenId.value = responseData.candidates[index].name;
        var submit     = document.createElement('input');
        submit.type    = 'submit';
        form.append(hiddenId);
        form.append(submit);

        var liTag      = document.createElement('li');
        var h3Tag      = document.createElement('h3');
        var h4Tag      = document.createElement('h4');
        h3Tag.innerText = "Name: " + responseData.candidates[index].name;
        h4Tag.innerText = "Votes: " + responseData.candidates[index].votes;

        liTag.append(h3Tag);
        liTag.append(h4Tag);
        liTag.append(form);
        list.append(liTag);
        index++;

        form.addEventListener('submit', function(event) {
          event.preventDefault();
          console.log('clicked.')

          $.ajax({
            url:    form.action,
            method: form.method,
            dataType: 'json',

            // get the info from the hidden field and creates a URL encoded text string by serializing form values
            data:  $(form).serialize()
          }).done( function(data) {
            console.log(data)

            // shows increasing vote count 
            location.reload();
          })
        });

      });
    });



  // });

});
