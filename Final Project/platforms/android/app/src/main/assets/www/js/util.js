/**
 * File Name: util.js
 *
 * Revision History:
 *       Talon Ernst/Taylor McVittie, 2020-04-04 : Created
 */
//Shows/Hides the delivery/pickup div
function DeliveryPickup() {

    var isitChecked =  $('input[name=orderType]:checked').val();
    if (isitChecked === "Delivery"){
        $("#orderDeliveryRequirements").show();
    }
    else{
        $("#orderDeliveryRequirements").hide();
    }
}

//Finds the current date and returns it to be placed in the textbox
function SetDateForReview() {
    var date = Date().substr("0","15");
    return date;
}

//Validation for the Order form
function OrderValidation() {
    var form = $("#frmOrder");
    form.validate({
        rules: {
            orderName: {
                required: true,
                minlength: 2,
                maxlength: 20
            },
            orderPhoneNumber: {
                required: true,
                PhoneNumberCheck: true
            },
            orderAddress: {
                required: true
            },
            orderCity: {
                required: true
            },
            orderPostalCode: {
                required: true,
                PostalCodeCheck: true
            },
            orderQuantity: {
                required: true,
                min: 1
            }
        },
        messages: {
            orderName: {
                required: "Name must be 2-30 characters",
                minlength: "Length must be 2-30 characters",
                maxlength: "Length must be 2-30 characters"
            },
            orderPhoneNumber: {
                required: "Phone number is required",
                PhoneNumberCheck: "Please enter a valid phone number"
            },
            orderAddress: {
                required: "An address is required"
            },
            orderCity: {
                required: "A city is required"
            },
            orderPostalCode: {
                required: "A postal code is required",
                PostalCodeCheck: "Postal code not in correct format"
            },
            orderQuantity: {
                required: "A quantity is required",
                min: "Quantity must be at least 1"
            }
        }
    });
    return form.valid();
}

//Validation for the Adding a Review form
function ReviewValidation() {
    var form = $("#frmReview");
    form.validate({
        rules: {
            reviewName: {
                required: true,
                minlength: 2,
                maxlength: 20
            },
            reviewLiking: {
                required: true,
                min: 0,
                max: 100
            }
        },
        messages: {
            reviewName: {
                required: "Name must be 2-30 characters",
                minlength: "Length must be 2-30 characters",
                maxlength: "Length must be 2-30 characters"
            },
            reviewLiking: {
                required: "A rating is required",
                min: "Rating must be at least 0",
                max: "Rating cannot be greater than 100"
            }
        }
    });
    return form.valid();
}

//Validation for the Editing a Review form
function EditingReviewValidation() {
    var form = $("#frmEditReview");
    form.validate({
        rules: {
            editReviewName: {
                required: true,
                minlength: 2,
                maxlength: 20
            },
            editReviewLiking: {
                required: true,
                min: 0,
                max: 100
            }
        },
        messages: {
            editReviewName: {
                required: "Name must be 2-30 characters",
                minlength: "Length must be 2-30 characters",
                maxlength: "Length must be 2-30 characters"
            },
            editReviewLiking: {
                required: "A rating is required",
                min: "Rating must be at least 0",
                max: "Rating cannot be greater than 100"
            }
        }
    });
    return form.valid();
}

//Validation for the Email form
function EmailValidation() {
    var form = $("#frmEmail");
    form.validate({
        rules: {
            email: {
                required: true,
                EmailCheck: true
            }
        },
        messages: {
            email: {
                required: "An email is required",
                EmailCheck: "Not a valid email address"
            }
        }
    });
    return form.valid();
}

//Validation for the Editing an email form
function UpdatingEmail() {
    var form = $("#frmCurrentEmail");
    form.validate({
        rules: {
            currentEmail: {
                required: true,
                EmailCheck: true
            }
        },
        messages: {
            currentEmail: {
                required: "An email is required",
                EmailCheck: "Not a valid email address"
            }
        }
    });
    return form.valid();
}

//Custom email check
jQuery.validator.addMethod("EmailCheck",
    function (value, element) {
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return this.optional(element) || regex.test(value);
    },
    "Please enter a valid email"
);

//Custom phone number check
jQuery.validator.addMethod("PhoneNumberCheck",
    function (value, element) {
        var regex = /^\d{3}-\d{3}-\d{4}$/;
        var regex2 = /^\(\d{3}\)\d{3}-\d{4}$/;
        return this.optional(element) || regex.test(value) || regex2.test(value);
    },
    "Our custom PhoneNumber checker"
);

//Custom postal code check
jQuery.validator.addMethod("PostalCodeCheck",
    function (value, element) {
        var regex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
        return this.optional(element) || regex.test(value);
    },
    "Our custom PostalCode checker"
);

//Calculates the total for your order on the order page
function CalculateTotal() {
    var tax = 0;
    var selectedProvince = $('#orderProvince').val();
    var typeOfPizza = $('#orderPizzaType').val();
    var pizzaSize = $("#orderPizzaSize").val();
    var quantity = $("#orderQuantity").val();
    var pizzaPrice = 0;
    switch(selectedProvince) {
        case "AB":
        case "NT":
        case "NU":
        case "YT":
            tax = 1.05;
            break;
        case "BC":
        case "MB":
            tax = 1.12;
            break;
        case "NB":
        case "NL":
        case "NS":
        case "PE":
            tax = 1.15;
            break;
        case "ON":
            tax = 1.13;
            break;
        case "QC":
            tax = 1.14975;
            break;
        case "SK":
            tax = 1.11;
            break;
    }

    if (typeOfPizza === "Pepperoni"){
        switch (pizzaSize) {
            case "Small":
                pizzaPrice = 9.19;
                break;
            case "Medium":
                pizzaPrice = 10.99;
                break;
            case "Large":
                pizzaPrice = 13.29;
                break;
            case "Extra Large":
                pizzaPrice = 16.69;
                break;
        }
    }
    else if (typeOfPizza === "Cheese"){
        switch (pizzaSize) {
            case "Small":
                pizzaPrice = 7.79;
                break;
            case "Medium":
                pizzaPrice = 9.29;
                break;
            case "Large":
                pizzaPrice = 11.29;
                break;
            case "Extra Large":
                pizzaPrice = 14.49;
                break;
        }
    }
    else if (typeOfPizza === "Meat Lovers"){
        switch (pizzaSize) {
            case "Small":
                pizzaPrice = 13.79;
                break;
            case "Medium":
                pizzaPrice = 15.99;
                break;
            case "Large":
                pizzaPrice = 19.29;
                break;
            case "Extra Large":
                pizzaPrice = 23.29;
                break;
        }
    }
    else if (typeOfPizza === "Vegetarian"){
        switch (pizzaSize) {
            case "Small":
                pizzaPrice = 12.19;
                break;
            case "Medium":
                pizzaPrice = 14.29;
                break;
            case "Large":
                pizzaPrice = 17.29;
                break;
            case "Extra Large":
                pizzaPrice = 20.79;
                break;
        }
    }
    else if (typeOfPizza === "Hawaiian"){
        switch (pizzaSize) {
            case "Small":
                pizzaPrice = 13.29;
                break;
            case "Medium":
                pizzaPrice = 15.29;
                break;
            case "Large":
                pizzaPrice = 17.99;
                break;
            case "Extra Large":
                pizzaPrice = 21.49;
                break;
        }
    }
    var subTotal = Number(pizzaPrice) * Number(quantity);
    var total = "$" + (Number(subTotal) * Number(tax)).toFixed(2);
    $("#orderTotal").val(total);

    return total;
}