/**
 * File Name: facade.js
 *
 * Revision History:
 *       Talon Ernst/Taylor McVittie, 2020-04-04 : Created
 */

//Displays the orders info
function DisplayInfo(name, PhoneNumber, selectedProvince, isitChecked, Address, city, postalCode, deliveryPayment,
                     typeOfPizza, pizzaSize, quantity, total) {
    var html = "";
    html += "<li><h1>Your order type was: " + isitChecked +"</h1>" +
        "<p>Name: " + name + "</p>" +
        "<p>Phone Number: " + PhoneNumber + "</p>" +
        "<p>Province: " + selectedProvince + "</p>";

    if (isitChecked === "Delivery"){
        html +=
            "<p>Address: " + Address + "</p>" +
            "<p>City: " + city + "</p>" +
            "<p>Postal Code: " + postalCode + "</p>" +
            "<p>Payment Type: " + deliveryPayment + "</p>";
    }
    else{
        html += "<p>Address: " + Address + "</p>" +
        "<p>City: " + city + "</p>" +
        "<p>Postal Code: " + postalCode + "</p>" +
        "<p>Payment Type: " + deliveryPayment + "</p>";
    }

   html += "<p>Pizza Type: " + typeOfPizza + "</p>" +
    "<p>Pizza Size: " + pizzaSize + "</p>" +
    "<p>Quantity: " + quantity + "</p>" +
    "<p>Total: " + total + "</p>" +
    "</li>";

    var lv = $("#lvViewOrder");
    lv = lv.html(html);
    lv.listview("refresh");
}

//Does Order Validation
function AddOrder() {
    if (OrderValidation()){
        $(location).prop("href", "#seeOrderPage");

        var total = CalculateTotal();
        var name = $("#orderName").val();
        var PhoneNumber = $("#orderPhoneNumber").val();
        var Address = "";
        var city = "";
        var postalCode = "";
        var deliveryPayment = "";
        var selectedProvince = $('#orderProvince').val();

        var isitChecked =  $('input[name=orderType]:checked').val();
        if (isitChecked === "Delivery"){
            Address = $("#orderAddress").val();
            city = $("#orderCity").val();
            postalCode = $("#orderPostalCode").val();
            deliveryPayment = $("#orderDeliveryPayment").val();
        }
        else {
            Address = "N/A";
            city =  "N/A";
            postalCode =  "N/A";
            deliveryPayment = "N/A";
        }
        var typeOfPizza = $('#orderPizzaType').val();
        var pizzaSize = $("#orderPizzaSize").val();
        var quantity = $("#orderQuantity").val();
        DisplayInfo(name, PhoneNumber, selectedProvince, isitChecked, Address, city, postalCode, deliveryPayment,
            typeOfPizza, pizzaSize, quantity, total);
        console.info("Form is valid");
    }
    else {
        console.error("Form is invalid");
    }
}


//Adds order to DB
function PlaceOrder() {
    var total = CalculateTotal();

    //Adding order to DB
    var name = $("#orderName").val();
    var PhoneNumber = $("#orderPhoneNumber").val();
    var Address = "";
    var city = "";
    var postalCode = "";
    var deliveryPayment = "";
    var selectedProvince = $('#orderProvince').val();

    var isitChecked =  $('input[name=orderType]:checked').val();
    if (isitChecked === "Delivery"){
        Address = $("#orderAddress").val();
        city = $("#orderCity").val();
        postalCode = $("#orderPostalCode").val();
        deliveryPayment = $("#orderDeliveryPayment").val();
    }
    else {
        Address = "N/A";
        city =  "N/A";
        postalCode =  "N/A";
        deliveryPayment = "N/A";
    }
    var typeOfPizza = $('#orderPizzaType').val();
    var pizzaSize = $("#orderPizzaSize").val();
    var quantity = $("#orderQuantity").val();

    var options = [name, PhoneNumber, selectedProvince, isitChecked, Address, city, postalCode, deliveryPayment,
        typeOfPizza, pizzaSize, quantity, total];

    Orders.insert(options, callback);
    $(location).prop("href", "#homePage");
    function callback(){
        alert ("Order added successfully");
    }
}


//Review validation and ands review to DB
function AddReview() {
    if (ReviewValidation()){
        console.info("Form is valid");

        var name = $("#reviewName").val();
        var comments = $("#reviewComments").val();
        var reviewDate = $("#reviewDate").val();
        var likingPercentage = $("#reviewLiking").val();
        var isitChecked =  $('input[name=yesorno]:checked').val();
        var returning = "";
        if (isitChecked === "Yes"){
            returning = "Yes";
        }
        else {
            returning = "No";
        }
        var referAFriend = $("#reviewReferFriend").prop("checked");

        var options = [name, comments, reviewDate, likingPercentage,
            returning,referAFriend];
        Reviews.insert(options, callback);
        function callback(){
            alert ("Review added successfully");
        }
    }
    else {
        console.error("Form is invalid");
    }
}


//Used to reset the order page if a order is cancelled
function ResetOrderPage() {
    $("#orderName").val("");
    $("#orderPhoneNumber").val("");
    $("#orderAddress").val("");
    $("#orderCity").val("");
    $("#orderPostalCode").val("");
    $("#orderDeliveryPayment").val("Debit");
    $("input[id=orderDelivery][value='Delivery']").prop("checked",true).checkboxradio("refresh");
    $("input[id=orderPickup][value='Pickup']").prop("checked",false).checkboxradio("refresh");
    $("#orderProvince").val("ON").change();
    $("#orderPizzaType").val("Cheese").change();
    $("#orderPizzaSize").val("Small").change();
    $("#orderQuantity").val(1);
    DeliveryPickup();
}


//Gets all reviews and displays them
function GetReviews() {
        var options = [];
    function callback(tx, results) {
        var html = "";
        for (var i = 0; i < results.rows.length; i++){
            var row = results.rows.item(i);

            html += "<li data-theme='b' data-icon='edit'><a data-role='button' data-row-id=" + row['reviewID'] + " href='#' >" +
                "<p>Reviewer Name: " + row['name'] + "</p>" +
                "<p>Review Date: " + row['reviewDate'] + "</p>" +
                "<p>Reviewer Comments: " + row['comments'] + "</p>" +
                "<p>Reviewer Liking: " + row['likingPercentage'] + "%" + "</p>" +
                "<h1>Open review for more information " + "</h1>" +
                "</a></li>";
        }
        var lv = $("#ReviewList");
        lv = lv.html(html);
        GetEmails();
        $("#ReviewList a").on("click", clickHandler);
        lv.listview().listview("refresh");

        function clickHandler()
        {
            var id = $(this).attr("data-row-id");
            localStorage.setItem("id", id);

            $(location).prop("href", "#editReviewsPage");

        }
    }
    Reviews.selectAll(options, callback);
}


//Shows the selected review
function ShowCurrentReview() {
    var id = localStorage.getItem("id");
    var options = [id];
    //window.location.reload();
    function callback(tx, results) {

        var row = results.rows.item(0);

        $("#editReviewName").val(row["name"]);
        $("#editReviewEmail").val(row["email"]);
        $("#editReviewComments").val(row["comments"]);
        $("#editReviewDate").val(row["reviewDate"]);
        $("#editReviewLiking").val(row["likingPercentage"]);

        if (row["returning"] === "Yes"){
            $("#editReviewYes").prop("checked", true).checkboxradio("refresh");
            $("#editReviewNo").prop("checked", false).checkboxradio("refresh");
        }

        else {
            $("#editReviewNo").prop("checked", true).checkboxradio("refresh");
            $("#editReviewYes").prop("checked", false).checkboxradio("refresh");

        }

        if (row["referAFriend"] === "false"){
            $('#editReviewReferFriend').removeAttr('checked').checkboxradio('refresh')

        }
        if (row["referAFriend"] === "true"){
            $('#editReviewReferFriend').prop('checked', true).checkboxradio('refresh');

        }
    }
    Reviews.select(options, callback);
}


//Updates a review
function UpdateReview() {
    if (EditingReviewValidation()){
        console.log("Form is valid");
        var id = localStorage.getItem("id");
        var name = $("#editReviewName").val();
        var comments = $("#editReviewComments").val();
        var reviewDate =  SetDateForReview();
        var liking = $("#editReviewLiking").val();
        var isitChecked =  $('input[name=edityesorno]:checked').val();

        var returning = "";
        if (isitChecked === "Yes"){
            returning = "Yes";
        }
        else {
            returning = "No";
        }

        var referAFriend = $("#editReviewReferFriend").prop("checked");
        var options = [name, comments, reviewDate, liking, returning, referAFriend, id];
        function callback(){
            alert("Review updated successfully");
        }
        Reviews.update(options, callback);
        $(location).prop("href", "#seeReviewPage");
    }
    else {
        console.error("Form is invalid");
    }
}


//Deletes a Review
function DeleteReview() {

    var id = localStorage.getItem("id");
    var options = [id];
    function callback(){
        alert("Review deleted successfully");
    }

    Reviews.delete(options, callback);
    $(location).prop("href", "#seeReviewPage");
}


//Validation for email on about page
function EmailValidationCheck() {
    if (EmailValidation()){
        console.info("Form is valid");
        var email = $("#email").val();

        var options = [email];
        Emails.insert(options, callback);
        function callback(){
            alert("Email added successfully");
        }
    }
    else {
        console.error("Form is invalid");
    }
}


//Gets all emails and displays them
function GetEmails() {
    var options = [];

    function callback(tx, results) {
        var html = "";
        for (var i = 0; i < results.rows.length; i++){
            var row = results.rows.item(i);

            html += "<li data-theme='b' data-icon='edit'><a data-role='button' data-row-id=" + row['id'] + " href='#' >" +
                "<h1>" + "Click for more information"+ "</h1>" +
                "<p>Email: " + row['email'] + "</p>" +
                "</a></li>";
        }
        var lv = $("#emailList");
        lv = lv.html(html);
        lv.listview("refresh");
        $("#emailList a").on("click", clickHandler);
        function clickHandler()
        {
            var id = $(this).attr("data-row-id");
            localStorage.setItem("emailID", id);

            $(location).prop("href", "#currentEmailPage");
        }
    }
    Emails.selectAll(options, callback);
}


//Shows the currently selected email
function CurrentEmail() {
    var id = localStorage.getItem("emailID");
    var options = [id];
    function callback(tx, results) {
        var row = results.rows.item(0);
        $("#currentEmail").val(row['email']);
    }
    Emails.select(options, callback);
}


//Updates the currently selected email
function UpdateEmail() {
    if (UpdatingEmail()){
        console.info("Form is valid");
        var id = localStorage.getItem("emailID");
        var email = $("#currentEmail").val();
        var options = [email, id];

        function callback(){
            alert("Email updated successfully");
        }
        Emails.update(options, callback);
        $(location).prop("href", "#seeReviewPage");
    }
    else {
        console.error("Form is invalid");
    }
}


//Deletes the currently selected email
function DeleteEmail() {
    var id = localStorage.getItem("emailID");
    var options = [id];
    function callback(){
        alert("Email deleted successfully");
    }

    Emails.delete(options, callback);
    $(location).prop("href", "#seeReviewPage");
}