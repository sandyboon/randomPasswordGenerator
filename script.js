let generateBtn = document.querySelector('#generate');

let passwordSpecialChars = ' !"#$%&\'()*+,-./:;<=>?@[]^_`{|}~';
let lowerCaseChars = 'abcdefghijklmnopqrstuvqzyz';
let upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let numberchars = '12345678890';

let passwordProperties = {
  length: -1,
  containsLowerCase: null,
  containsUpperCase: null,
  containsNumber: null,
  containsSpecialCharacter: null
  // countOfAllowedCharcterTypes:  function(){
  //   let typeOFAllowedChars = 0;
  //   for (var prop in this) {
  //     if (Object.prototype.hasOwnProperty.call(this, prop) && (typeof prop === '')) {

  //     }
  // }
  // }
};

// Write password to the #password input
function writePassword(passwordProperties) {
  if (
    typeof passwordProperties === 'undefined' ||
    passwordProperties === null
  ) {
    alert('Please refresh the page.');
  }
  //Ask the user for the length of the password, if not already provided.
  askUserForPasswordChoices(passwordProperties);

  validatePassWordChoices(passwordProperties);

  let password = generatePassword(passwordProperties);
  setPassword(password);
}

function askUserForPasswordChoices(passwordProperties) {
  if (passwordProperties.length < 0) {
    passwordProperties.length = prompt(
      'Please provide the length of the random password. The specified length must be a number between 8 and 128.'
    );
  }
  if (passwordProperties.containsLowerCase === null) {
    passwordProperties.containsLowerCase = confirm(
      'Should the password contain at least one lower case character(a-z)?'
    );
  }
  if (passwordProperties.containsUpperCase === null) {
    passwordProperties.containsUpperCase = confirm(
      'Should the password contain at least one upper case character(A-Z)?'
    );
  }
  if (passwordProperties.containsNumber === null) {
    passwordProperties.containsNumber = confirm(
      'Should the password contain at least one number(0-9)?'
    );
  }
  if (passwordProperties.containsSpecialCharacter === null) {
    passwordProperties.containsSpecialCharacter = confirm(
      'Should the password contain at least one special character(!"#$%&\'()*+,-./:;<=>?@[]^_`{|}~)?'
    );
  }
}

function setPassword(password) {
  let passwordText = document.querySelector('#password');
  passwordText.value = password;
}

function generatePassword(passwordProperties) {
  let passwordMatchingCritera = [];
  pushMinimumRequiredChars(passwordProperties, passwordMatchingCritera);
  //find out how many more characters need to be pushed into the array to satisfy the length requirement.
  pushRemainingCharacters(passwordProperties, passwordMatchingCritera);

  return passwordMatchingCritera.join('');
}

function pushRemainingCharacters(passwordProperties, passwordMatchingCritera) {
  let fillerCount = passwordProperties.length - passwordMatchingCritera.length;
  for (let i = 1; i <= fillerCount; i++) {
    //This is the predfined order of priority that we have hard coded. This can further be randomized
    if (passwordProperties.containsLowerCase) {
      passwordMatchingCritera.push(getRandomLowerCaseChar());
    } else if (passwordProperties.containsUpperCase) {
      passwordMatchingCritera.push(getRandomUpperCaseChar());
    } else if (passwordProperties.containsNumber) {
      passwordMatchingCritera.push(getRandomNumber());
    } else if (passwordProperties.containsSpecialCharacter) {
      passwordMatchingCritera.push(getRandomSpecialChar());
    }
  }
}

function pushMinimumRequiredChars(passwordProperties, passwordMatchingCritera) {
  if (passwordProperties.containsLowerCase) {
    passwordMatchingCritera.push(getRandomLowerCaseChar());
  }
  if (passwordProperties.containsUpperCase) {
    passwordMatchingCritera.push(getRandomUpperCaseChar());
  }
  if (passwordProperties.containsNumber) {
    passwordMatchingCritera.push(getRandomNumber());
  }
  if (passwordProperties.containsSpecialCharacter) {
    passwordMatchingCritera.push(getRandomSpecialChar());
  }
}

function validatePassWordChoices(passwordProperties) {
  console.log('pass length: ' + passwordProperties.length);
  if (passwordProperties.length < 8 || passwordProperties.length > 128) {
    alert(
      'Password must be at least 8 and at most 128 chracters long. Please provide a valid length'
    );
    //reset the length
    passwordProperties.length = -1;
    writePassword(passwordProperties);
  }
  if (
    !(
      passwordProperties.containsLowerCase ||
      passwordProperties.containsUpperCase ||
      passwordProperties.containsNumber ||
      passwordProperties.containsSpecialCharacter
    )
  ) {
    alert(
      'Please select at lease one character type to be included in the password'
    );
    passwordProperties.containsLowerCase = null;
    passwordProperties.containsUpperCase = null;
    passwordProperties.containsNumber = null;
    passwordProperties.containsSpecialCharacter = null;
    writePassword(passwordProperties);
  }
}

function getRandomSpecialChar() {
  return passwordSpecialChars[genreateRandomNumber(32)];
}

function getRandomNumber() {
  return numberchars[genreateRandomNumber(9)];
}

function getRandomUpperCaseChar() {
  return upperCaseChars[genreateRandomNumber(25)];
}

function getRandomLowerCaseChar() {
  return lowerCaseChars[genreateRandomNumber(25)];
}

/**
 * Generate a random number from 0 to @param max.
 * @param {*} max
 */
function genreateRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

// Add event listener to generate button
generateBtn.addEventListener('click', function() {
  writePassword(passwordProperties);
});

//clear password on window load
window.onload = function() {
  setPassword('');
};
