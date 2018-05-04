// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(document).ready(function() {
  $(".change-devoured").on("click", function(event) {
    var id = $(this).data("id");
    console.log(id);
    
    var newDevoured = $(this).data("newdevoured");
    console.log(newDevoured);

    var devoured = {
      devoured: 1
    };

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: devoured
    }).then(
      function() {
        console.log("changed devoured to ", devoured);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = {
      name: $("#newBurgerInput").val().trim(),
      devoured: 0
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("created new burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

});
