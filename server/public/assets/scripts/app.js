$(document).ready(function(){

   $("#messageInput").submit(function(event){
      event.preventDefault();
      var values = {};

      $.each($(this).serializeArray(), function(i, field){
         values[field.name] = field.value;
      });
      console.log(values);
   });

   $("#messageInput").submit(addMessage);

   //$("#peopleContainer").on('click', '.delete', deletePerson);
   //$("#peopleContainer").on('click', '.submitSearch', findSomeone);
   getData();

});

function getData(values){
   $.ajax({
      type: "GET",
      url: "/data",
      data: values,
      success: function(data){
         updateDOM(data);
      }
   })
}

function addMessage(){
   event.preventDefault();
   var values = {};

   $.each($(this).serializeArray(), function(i, field){
      values[field.name] = field.value;
   });


   $.ajax({
      type: "POST",
      url: "/data",
      data: values,
      success: function(data){
         getData();
      }
   });
}

function updateDOM(data){
   $("#messageContainer").empty();

   for(var i = 0; i < data.length; i++){
      var el = "<div class='well col-md-6'>" +
          "<p>" + data[i].message + "</p>" +
          "<p2>" + data[i].name + "</p>" +
          //"<button class='delete btn btn-danger' data-id='" +
          //data[i].id + "'>Delete</button>" +
          "</div>";

      $("#messageContainer").append(el);
   }
}