const nameField = $("#name");
const emailField = $("#mail");
const otherTitleField = $("#other-title");
const titleSelectedField = $("#title");
const colorDropDown = $("#color");
const designDropDown = $("#design");
const paymentMethod = $("#payment");
const form = $("form");

/***Setting the focus on the first text field***/
nameField.focus();

/***Hiding the "Other"  option input added to the Job role section***/
otherTitleField.hide();

/***Show the text field when the "Other" option is selected***/

titleSelectedField.change(function(event) {
  const selected = event.target.value;
  selected === "other" ? otherTitleField.show() : otherTitleField.hide();
});

/***T-SHIRT SECTION ***/

/*Hide the SELECT THEME option after the page loads*/
$("#design option:first-child").hide();

/***Remove all options when the page loads****/
colorDropDown.find("option").remove();

/***Update the “Color” field to read “Please select a T-shirt theme”.***/
colorDropDown.append(
  '<option value="shirt-menu">Please select a T-shirt theme</option>'
);

/***Displays only the color options that matches the design selected in the "Design" menu.****/

const toggleDropDown = () => {
  const design = designDropDown.val();
  colorDropDown.empty();

  if (design === "js puns") {
    $("#color").append(
      '<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>'
    );
    $("#color").append(
      '<option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option>'
    );
    $("#color").append(
      '<option value="gold">Gold (JS Puns shirt only)</option>'
    );
  }

  if (design === "heart js") {
    $("#color").append(
      '<option value="tomato">Tomato (I &#9829; JS shirt only)</option>'
    );
    $("#color").append(
      '<option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option>'
    );
    $("#color").append(
      '<option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>'
    );
  }
};

designDropDown.change(toggleDropDown);

/*** ACTIVITY SECTION ***/
/***Create a element to display the total cost and append it to the activities section */
let totalCost = 0;
const priceTotal = $("<div/>", {
  class: "total",
  title: 'The total cost is: $" + totalCost'
})
  .appendTo(".activities")
  .css("color", "yellow")
  .css("font-size", "14pt")
  .css("background", "black");

/**Listening for changes in the activity section **/
$('[type="checkbox"]').click(function(event) {
  /**Reference to the activity checked */
  const activityChecked = $(event.target);

  /**Get hold of the text content of the activity checked */
  const textContent = activityChecked.parent().text();

  /**Index of the dollar sign in the text content**/

  const indexDollar = textContent.indexOf("$");

  /**Cost of activity in the checkbox that was just clicked**/
  const activityCost = textContent.slice(indexDollar + 1, textContent.length);

  /**Converting the cost activity from string to number**/
  const cost = parseInt(activityCost);

  if (activityChecked.is(":checked")) {
    totalCost += cost;
    $(".total").text(`The total cost is: $${totalCost}`);
  } else {
    totalCost -= cost;
    $(".total").text(`The total cost is: $${totalCost}`);
  }

  /***Disabling Conflicting Activities ***/

  /***The index of the em dash ‘—’ in the text content***/
  const $indexDash = textContent.indexOf("—");

  /***The index of the em dash ‘,’ in the text content***/
  const $indexComma = textContent.indexOf(",");

  /***The day and the time text of the activity that was just clicked***/
  const $dayTime = textContent.slice($indexDash + 1, $indexComma);
  console.log($dayTime);

  const checkboxes = $('[type="checkbox"]');
  for (let i = 0; i < checkboxes.length; i++) {
    const $textCheckbox = checkboxes
      .eq(i)
      .parent()
      .text();

    if ($textCheckbox.includes($dayTime) && textContent !== $textCheckbox) {
      if (activityChecked.is(":checked")) {
        $(checkboxes[i])
          .parent()
          .css("text-decoration", "line-through");
        checkboxes.eq(i).attr("disabled", true);
      } else {
        $(checkboxes[i])
          .parent()
          .css("text-decoration", "none");
        checkboxes.eq(i).attr("disabled", false);
      }
    }
  }
});

/***The user should not be able to Select Payment Method***/
$("#payment option[value='select_method']").hide();

/***MAKING  THE CREDIT CARD PAYMENT OPTION THE DEFAULT PAYMENT METHOD***/

/*$("#payment").ready(function() {
  $('select option:contains("Credit Card")').prop("selected", true);
});*/

paymentMethod.ready(function() {
  $('select option:contains("Credit Card")').prop("selected", true);
});

/***TRANVERSING TO THE PAYPAL AND BITCOIN PARAGRAPH IN THE DIV***/

const $paypal = $("#credit-card").next("div");
const $bitcon = $("#credit-card")
  .next("div")
  .next("div");

$bitcon.hide();
$paypal.hide();

/***DISPLAYING AND HIDING PAYMENT SECTIONS BASED ON THE PAYMENT OPTIONS CHOSEN IN THE SELECT MENU.***/
$("#payment").change(function() {
  if (this.value == "credit card") {
    $("#credit-card").show();
    $($paypal).hide();
    $($bitcon).hide();
  } else if (this.value == "paypal") {
    $($paypal).show();
    $($bitcon).hide();
    $("#credit-card").hide();
  } else if (this.value == "bitcoin") {
    $($bitcon).show();
    $($paypal).hide();
    $("#credit-card").hide();
  }
});

/***FORM VALIDATION****/

//helper function
const toggleErrorMessage = (containError, inputId, errorMessage) => {
  $(`#${inputId}-error-text`).remove();

  const input = $("#" + inputId);
  const errorMessageSpan = $("<span></span>")
    .html(`<p>${errorMessage}</p>`)
    .addClass("error-text")
    .attr("id", `${inputId}-error-text`);

  if (containError) {
    errorMessageSpan.insertAfter(input);
    input.addClass("invalid");
  } else {
    input.removeClass("invalid").addClass("valid");
  }
};

//name validation
const nameValidation = () => {
  const name = nameField.val();
  if (name.length === 0) {
    toggleErrorMessage(
      (containError = true),
      (inputId = "name"),
      (errorMessage = "Name is required")
    );
    return false;
  } else {
    toggleErrorMessage((containError = false), (inputId = "name"));
    return true;
  }
};
//email validation
const emailValidation = () => {
  const correctFormat = /^[^@+]+@[^@.]+\.[a-z]+$/i;
  const isValid = correctFormat.test(emailField.val());
  if (!isValid) {
    toggleErrorMessage(
      (containError = true),
      (inputId = "mail"),
      (errorMessage = "Must be a valid email")
    );
    return false;
  } else {
    toggleErrorMessage((containError = false), (inputId = "mail"));
    return true;
  }
};
//calling the name validation function
$("input[name=user_name]").on("input", e => {
  nameValidation();
});

//calling the email validation function
$("input[name=user_email]").on("input", e => {
  emailValidation();
});

//activities validation
$(".activities").attr("id", "activitiesId");

const activitiesValidation = () => {
  if ($("input:checked").length === 0) {
    toggleErrorMessage(
      (containError = true),
      (inputId = "activitiesId"),
      (errorMessage = "At least one activity must be selected")
    );
    return false;
  } else {
    toggleErrorMessage((containError = false), (inputId = "activitiesId"));
    return true;
  }
};

//validate credit card details
const validatePayment = () => {
  const paymentDetailsValidation = selected => {
    if (selected === "credit card") {
      const creditCardValidation = () => {
        const validFormat = /^[\d]{13,16}$/;
        const isValidFormat = validFormat.test($("#cc-num").val());

        if (!isValidFormat) {
          toggleErrorMessage(
            (containError = true),
            (inputId = "cc-num"),
            (errorMessage = "Credit Card Must be between 13-16 digits")
          );
          return false;
        } else {
          toggleErrorMessage((containError = false), (inputId = "cc-num"));
          return true;
        }
      };

      const zipCodeValidation = () => {
        const validFormat = /^[\d]{5,}$/;
        const isValidFormat = validFormat.test($("#zip").val());

        if (!isValidFormat) {
          toggleErrorMessage(
            (containError = true),
            (inputId = "zip"),
            (errorMessage = "Zip code  must be 5 digits")
          );
          return false;
        } else {
          toggleErrorMessage((containError = false), (inputId = "zip"));
          return true;
        }
      };

      const cvvValidation = () => {
        const validFormat = /^[\d]{3}$/;
        const isValidFormat = validFormat.test($("#cvv").val());

        if (!isValidFormat) {
          toggleErrorMessage(
            (containError = true),
            (inputId = "cvv"),
            (errorMessage = "CVV  must be 3 digits")
          );
          return false;
        } else {
          toggleErrorMessage((containError = false), (inputId = "cvv"));
          return true;
        }
      };

      let validPay = false;
      const paymentValidations = [
        creditCardValidation,
        zipCodeValidation,
        cvvValidation
      ];
      for (let i = 0; i < paymentValidations.length; i++) {
        validPay += paymentValidations[i]();
      }

      if (validPay === paymentValidations.length) {
        return true;
      } else {
        return false;
      }
    } //end of selected

    return true;
  }; //paymentDetailsValidation

  let validChecks = false;
  const selected = paymentMethod.val();
  const paymentValidations = [paymentDetailsValidation];

  for (let i = 0; i < paymentValidations.length; i++) {
    validChecks += paymentValidations[i](selected);
  }

  if (validChecks === paymentValidations.length) {
    return true;
  } else {
    return false;
  }
}; //validatePayment

const formValidation = event => {
  isValid = false;
  const validations = [
    nameValidation,
    emailValidation,
    activitiesValidation,
    validatePayment
  ];
  for (let i = 0; i < validations.length; i++) {
    isValid += validations[i]();
  }

  if (isValid === validations.length) {
  } else {
    event.preventDefault();
  }
};

form.on("submit", formValidation);
