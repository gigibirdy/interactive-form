//Functions that will be used for multiple input fields.

//Generate error message for invalid input.
function inputErrMessage(element, errMsg, errMsgClass) {
  element.css('border', '2px solid red');
  $(errMsg).css('color', 'red').insertBefore(element);
  element.prev().attr('class', errMsgClass);
};

function removeEmptyErrMsg(emptyMsgElement, errMsgElement, element) {
  /*Once user starts entering, if the empty field error message exists,
  remove it.*/
  emptyMsgElement.remove();
  //If the invalid input error message exists, remove it.
  if (errMsgElement) {
    errMsgElement.remove();
    element.css('border', 'none');
  }
};
//-----------------------------------------------------------------------------
//Name field

//Set autofocus
$('#name').focus();

//Validate name field
function validateName() {
  if ($('#name').prop('value') === '') {
    return (false);
  } else {
    return (true);
  }
};
/*If name field is empty and loses focus, a error message will show to remind
user.*/
$('#name').on('blur', function(e) {
  if (validateName() === false && $('.nameMessage').length === 0) {
    const errMsg = '<p>*Please enter your name</p>';
    inputErrMessage($('#name'), errMsg, 'nameMessage');
  }
});

/*Once name field has input, the error message will be removed.*/
$('#name').on('keyup', function(e) {
  removeEmptyErrMsg($('.nameMessage'), $('.nameMessage'), $('#name'));
});

//----------------------------------------------------------------------------
//Email field

//Validate email address
function validateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return (true);
  } else {
    return (false);
  }
};

$('#mail').on('keyup', function(e) {
  removeEmptyErrMsg($('.emptyMailMessage'), $('.mailMessage'), $('#mail'));
  //If invalid email address entered, append error massage
  if (validateEmail($(e.target).prop('value')) === false) {
    const errMsg = '<p>Invalid email address</p>';
    inputErrMessage($('#mail'), errMsg, 'mailMessage');
  }
});

//----------------------------------------------------------------------------
//Job title field

//Hide text field before the "Other" option of job title is selected
$('#other-title').hide();

/*To show the text field when the "Other" option is selected from the "Job Role"
drop down menu.*/
$('#title').change(function(e) {
  $('#other-title').hide();
  if (e.target.value === 'other') {
    $('#other-title').show();
  }
});

//---------------------------------------------------------------------------
//Color & design field

/*Hide the "Color" label and select menu until a T-Shirt design is selected
from the "Design" menu.*/
function hideColor() {
  if ($('#design').prop('value') === 'Select Theme') {
    $('#colors-js-puns').hide();
  }
};
hideColor();

/*Show the "Color" label and select menu once user chooses design theme and
remove all color options.*/
function showColor() {
  $('#colors-js-puns').show();
  $('#color option').remove();
};

$('#design').change(function(e) {
  showColor();
  const jspunsColor = '<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>' +
    '<option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option>' +
    '<option value="gold">Gold (JS Puns shirt only)</option>';
  const jsColor = '<option value="tomato">Tomato (I &#9829; JS shirt only)</option>' +
    '<option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option>' +
    '<option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>';
  //Append color options based on user's choice of design theme.
  if (e.target.value === 'js puns') {
    $('#color').append(jspunsColor);
  } else if (e.target.value === 'heart js') {
    $('#color').append(jsColor);
  } else {
    $('#color').prepend('<option value="">Please select a T-shirt theme</option>');
  }
});

//-----------------------------------------------------------------------------
//Activity field

//When a checkbox is checked,
$('input[type="checkbox"]').on('change', function(e) {
  $('input[type="checkbox"]').each(function() {
    //Disable checkbox of activities in competing time slot.
    if ($(e.target).attr('name') !== $(this).attr('name') &&
      $(e.target).attr('data-day-and-time') === $(this).attr('data-day-and-time')) {
      if ($(this).prop('disabled') === false) {
        $(this).attr('disabled', 'disabled');
        $('<label>Workshop below in the competing time slot isn\'t available.</label>').css('color', 'grey').insertBefore($(this).parent());
        $(this).parent().css({'text-decoration': 'line-through'});
      } else {
        /*Enable the checkbox of activities when active in competing time slot
        is unchecked.*/
        $(this).removeAttr('disabled');
        $(this).parent().prev().remove();
        $(this).parent().css('text-decoration', 'none');
      }
    }
  });
  //Caculate running total and append it next to the last active option
  let total = 0;
  $('input[type="checkbox"]').each(function() {
    if ($(this).prop('checked') === true) {
      total += parseInt($(this).attr('data-cost').slice(1));
    }
  })
  if ($('h3')) {
    $('h3').remove();
  }
  $(this).parent().parent().append('<h3>Total: USD ' + total + '</h3>');
  /*If user touches the activity field but total is 0, show error message to
  remind user.*/
  if (total === 0) {
    const errMsg = '<p>*Please select at least one activity</p>';
    inputErrMessage($('.activities'), errMsg, 'activityMessage');
  } else {
    removeEmptyErrMsg($('.activityMessage'), $('.activityMessage'), $('.activities'));
  }
});

//----------------------------------------------------------------------------
//Payment field

/*Set value of "Select Payment Method" option to empty string, so user will
not be able to select the "Select Payment Method" option.*/
$('#payment option[value="select method"]').attr('value', "");
/*When the web page is loaded initially, user should not see the the "PayPal"
and "Bitcoin" information.*/
$('#paypal').hide();
$('#bitcoin').hide();

$('#payment').on('change', function(e) {
  /*Display payment sections based on the payment option chosen in the select
  menu.*/
  $('#payment').prev().text('I\'m going to pay with:');
  $('#payment').prev().append(' ' + $(e.target).prop('value'));
  switch ($(e.target).prop('value')) {
    /*When a user selects the "PayPal" payment option, hide the "credit card"
    and "Bitcoin" information.*/
    case 'PayPal':
      $('#paypal').show();
      $('#credit-card').hide();
      $('#bitcoin').hide();
      break;
      /*When a user selects the "Bitcoin" payment option, hide the "credit
      card" and "PayPal" information.*/
    case 'Bitcoin':
      $('#bitcoin').show();
      $('#credit-card').hide();
      $('#paypal').hide();
      break;
      /*Default is to display the #credit-card div, and hide the "PayPal"
      and "Bitcoin" information.*/
    default:
      $('#credit-card').show();
      $('#paypal').hide();
      $('#bitcoin').hide();
  }
});

//validate credit card number
function validateCreditCard(num) {
  if ((/^[0-9]{13}[0-9]{0,3}$/).test(num)) {
    return (true);
  } else {
    return (false);
  }
};

$('#cc-num').on('keyup', function(e) {
  removeEmptyErrMsg($('.emptyCCNMessage'), $('.CCNMessage'), $('#cc-num'));
  /*If input is not a number or short than 13 digits or longer than 16 digits,
  append error message.*/
  const errMsg = '<p>Please enter a number that is between 13 and 16 digits long.</p>';
  if (validateCreditCard($(e.target).prop('value')) === false) {
    inputErrMessage($('#cc-num'), errMsg, 'CCNMessage');
  }
});

//Validate zip code
function validateZipCode(num) {
  if ((/^[0-9]{5}$/).test(num)) {
    return (true);
  } else {
    return (false);
  }
};

$('#zip').on('keyup', function(e) {
  removeEmptyErrMsg($('.emptyZipMessage'), $('.zipCodeMessage'), $('#zip'));
  /*If input is not a number or short or longer than 5 digits, append error
  message.*/
  const errMsg = '<p>Please enter a number that is 5 digits long.</p>';
  if (validateZipCode($(e.target).prop('value')) === false) {
    inputErrMessage($('#zip'), errMsg, 'zipCodeMessage');
  }
});

//Validate CVV
function validateCVV(num) {
  if ((/^[0-9]{3}$/).test(num)) {
    return (true);
  } else {
    return (false);
  }
};

$('#cvv').on('keyup', function(e) {
  removeEmptyErrMsg($('.emptyCVVMessage'), $('.CVVMessage'), $('#cvv'));
  /*If input is not a number or short or longer than 3 digits, append error
  message.*/
  const errMsg = '<p>Please enter a number that is 3 digits long.</p>';
  if (validateCVV($(e.target).prop('value')) === false) {
    inputErrMessage($('#cvv'), errMsg, 'CVVMessage');
  }
});

//-----------------------------------------------------------------------------
//Submit button

$('button[type="submit"]').on('click', function(e) {
  //If name field is empty, prevent user from submitting the form.
  if ($('.nameMessage')) {
    e.preventDefault();
  };
  /*If user never touched the activity field before submitting the form,
  prevent the form from submitting and show error message when user clicks
  the submit button.*/
  if ($('.activities h3').length === 0 && $('.activityMessage').length === 0) {
    e.preventDefault();
    const errMsg = '<p>*Please select at least one activity</p>';
    inputErrMessage($('.activities'), errMsg, 'activityMessage');
  } else if ($('activityMessage')) {
    e.preventDefault();
  };

  function submitError(element, emptyMsgElement, field, emptyMsgClass, errMsgElement) {
    /*If user never touched the input field before submitting the form,
    prevent the form from submitting and show error message when user clicks
    the submit button.*/
    if (element.prop('value') === '' && emptyMsgElement.length === 0) {
      e.preventDefault();
      element.css('border', '2px solid red');
      $('<p>* ' + field + ' cannot be empty</p>').css('color', 'red').insertBefore(element);
      element.prev().attr('class', emptyMsgClass)
      /*If error message exists due to invalid input, prevent user from
      submitting the form when user clicks the submit button.*/
    } else if (errMsgElement) {
      e.preventDefault();
    }
  }
  submitError($('#mail'), $('.emptyMailMessage'), 'Email address', 'emptyMailMessage', $('.mailMessage'));
  submitError($('#cc-num'), $('.emptyCCNMessage'), 'Credit card number', 'emptyCCNMessage', $('.zipCodeMessage'));
  submitError($('#zip'), $('.emptyZipMessage'), 'Zip code', 'emptyZipMessage', $('.zipCodeMessage'));
  submitError($('#cvv'), $('.emptyCVVMessage'), 'CVV code', 'emptyCVVMessage', $('.CVVMessage'));
})
