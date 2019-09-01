# interactive-form

This project was developed to show/hide input fields of a form or implement error messages to interact with user. With jQuery,
the script.js file will run exactly the same in all major browsers. 

Notice that the email address input validation is based on regex pattern. To validate whether an email address is real, 
best pratice is to send a validation email to submitted address and request user to open up the email, click the url, and
confirm email address from there. Same thing with credit card number, card holder's name, zip code and CVV number, validation 
will need support of 3rd party resouces and additional code.

List of input will have different error messages depending on the error
1. Email address (one msg for empty input and one for invalid input)
2. Credit card number (one msg for empty input and one for invalid input)
3. Zip code (one msg for empty input and one for invalid input)
4. CVV code (one msg for empty input and one for invalid input)

List of input will have "real time" validation messages:
1. Email address - once user touches this field, but the input is invalid, an error message will show until input is corrected.
2. Credit card number - once user touches this field, but the input is invalid, an error message will show until input is corrected.
3. Zip code - once user touches this field, but the input is invalid, an error message will show until input is corrected.
4. CVV code - once user touches this field, but the input is invalid, an error message will show until input is corrected.
5. Activity - once user touches this field, but total amount due is USD0, an error message will show to remind user that at least one activity needs to be selected.
