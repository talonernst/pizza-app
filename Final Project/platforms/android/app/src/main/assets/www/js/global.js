/**
 * File Name: global.js
 *
 * Revision History:
 *       Talon Ernst/Taylor McVittie, 2020-04-04 : Created
 */

function ShowOrderDeliveryForm_Change() {
    DeliveryPickup();
}

function PlaceOrder_Click() {
    PlaceOrder();
    ResetOrderPage();
}

function GoHome_Click() {
    $(location).prop("href", "#homePage");
    ResetOrderPage();
}

function SetDate_Show() {
    var date = Date().substr("0","15");
    $("#reviewDate").val(date);
}

function ReviewValidation_Click() {
    AddReview();
}

function GoBackToOrder_Click() {
    $(location).prop("href", "#orderPage");
}

function ReviewOrder_Click() {
    AddOrder();
}

function GetReviews_Show() {
    GetReviews();
}

function GetCurrentReview_Show() {
    ShowCurrentReview();
}

function UpdateReview_Click() {
    UpdateReview();
}

function DeleteReview_Click() {
    DeleteReview();
}

function EmailValidation_Click() {
    EmailValidationCheck();
}

function CurrentEmail_Show() {
    CurrentEmail();
}

function CurrentEmailValidation_Click() {
    UpdateEmail();
}

function DeleteCurrentEmail_Click() {
    DeleteEmail();
}

function GoToAboutPage_Click() {
    $(location).prop("href", "#aboutPage");
}

//init function
function init() {
    console.log("DOM is ready");

    //CRUD for email in email list
    $("#btnDeleteEmail").on("click", DeleteCurrentEmail_Click);
    $("#btnUpdateEmail").on("click", CurrentEmailValidation_Click);

    //Shows the current emails info
    $("#currentEmailPage").on("pageshow", CurrentEmail_Show);

    //Adds email to email list
    $("#addToEmailList").on("click", EmailValidation_Click);

    //Validation for order page
    $("#reviewOrder").on("click", ReviewOrder_Click);

    //Shows/Hides the delivery div based on user input
    $("#deliveryType").on("change", ShowOrderDeliveryForm_Change);

    //Places order
    $("#btnPlaceOrder").on("click", PlaceOrder_Click);

    //Sends user to home page
    $("#btnHome").on("click", GoHome_Click);

    //Sets the date on the review page
    $("#reviewPage").on("pageshow", SetDate_Show);

    //Validation for the review page
    $("#reviewSubmit").on("click", ReviewValidation_Click);

    //Allows user to edit their order
    $("#btnEditOrder").on("click", GoBackToOrder_Click);

    //Gets a list of reviews and displays them on screen
    $("#seeReviewPage").on("pageshow", GetReviews_Show);

    //Show the current reviews information
    $("#editReviewsPage").on("pageshow", GetCurrentReview_Show);

    //CRUD for editing reviews
    $("#btnUpdate").on("click", UpdateReview_Click);
    $("#btnDelete").on("click", DeleteReview_Click);


    //Controls the 2 buttons on the main menu
    $("#goToAboutPage").on("click", GoToAboutPage_Click);
    $("#goToOrderPage").on("click", GoBackToOrder_Click)
}

//Create Database and tables
function initDB(){
    console.info("Creating Database... ");
    try {
        DB.CreateDatabase();
        if (db) {
            console.info("Creating Tables...");
            DB.createTables();
        }
        else{
            console.error("Error: cannot create tables: Database is not available");
        }
    } catch (e) {
        console.error("Error:  (Fatal) Error in initDB(). Cannot proceed");
    }
}

//document.ready function
$(document).ready(function () {
    init();
    initDB();
});


