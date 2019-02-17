let loginArray = []; // Creating Initial empty array

const prompt = require('cli-prompt'); //Allows javascript's prompt function to work on terminals
const LineByLineReader = require('line-by-line'), // A library that allows me to itterate through each line in a text file
      lr = new LineByLineReader('UD.txt');
      lr.on('error', function (err) { 
          console.log(err.toString()); //i If theres an error reading the lines, log a human readable error the the console
      });

      lr.on('line', function (line) { 
        // pause emitting of lines...
        lr.pause();
    
        // ...do your asynchronous line processing..
        setTimeout(function () {
            let splitLine = line.split(',');
            if (splitLine[0] !== 'USERNAME') {
                let user = splitLine[0];
                let pass = splitLine[1];
                loginArray.push({username: user, password: pass});
            }

            // ...and continue emitting lines.
            lr.resume();
        }, 100);
    });

      lr.on('end', function() {
          // All lines are read, file is closed now
          init();
      });

      function init() {
          prompt('(L) to Login | (C) to create a new user\n', val => {
              let lowerVal = val.toLowerCase();
              if (lowerVal === 'l') {
                  login();
              } else if (lowerVal === 'c') {
                  createUser();
              } else {
                  console.log('Wrong Input');
                  init();
              }
          })
        }

        function login() {
            let tfSwitch = false;
            prompt('Please enter your user name and hit enter\n', val => {
                loginArray.forEach(obj => {
                    if (obj.username === val) {
                        password(val)
                        tfSwitch = true;
                    }
                })
                if (!tfSwitch) {
                    console.log('User name was not found\n');
                    init();
                }
            })
        }

        function password(userName) {
            tfSwitch = false;
            prompt.password('Enter your password\n', val => {
                loginArray.forEach(obj => {
                    if (obj.username === userName && obj.password === val) { 
                        tfSwitch = true;
                        console.log('You are logged in!\n');
                    }
                });
                if (!tfSwitch) {
                    console.log('Wrong password, try again\n');
                    init();
                }
            })
        }

        function createUser() {
            prompt('Please enter your first name, last name, and student ID, seperated by a space\nExample: Tom Waits 1234\n', val => {
                if (val.toLowerCase().split(' ') && val.toLowerCase().split(' ').length === 3) {
                    let arr = val.toLowerCase().split(' ')
                    let userName = arr[0][0] + arr[1][0] + arr[1][1] + arr[2][0] + arr[2][1] + arr[2][2];
                    console.log(`Your username is ${userName}`);
                    createPassword();
                }
                else {
                    console.log('Wrong format, try again\n');
                    createUser();
                }
            })
        }

        function createPassword() {
            prompt.password('Please create a password\n', val => {
                let temp = val;
                prompt.password('Please reenter your password\n', val => {
                    if (temp === val) {
                        console.log('Account created!\n')
                        init();
                    } else {
                        console.log('Passwords did not match, try again\n');
                        createUser();
                    }
                })
            })
        }


    //   function runPrompts() {
    //     prompt('(L)ogin or (C)reate a new user? | (L) to log in, (C) to create a new user', (val) => {

    //         // If user logs in
    //         if (val.toLowerCase() == 'l' || val.toLowerCase() === 'login') {
    //             prompt('Please enter your user name and hit enter', (val) => {
    //                 let trueSwitch = false;
    //                 loginArray.forEach(obj => {
    //                     if (obj.username === val) {
    //                         currentUserData[0] = obj;
    //                         trueSwitch = true;
    //                     }
    //                 });

    //                 if (!trueSwitch) {
    //                     console.log(`Username was not found`);
    //                     runPrompts();
    //                 } else {
    //                     let currentUser = val;
    //                     prompt.password('Enter Password', (val) => {
    //                         loginArray.forEach(obj => {
    //                             if (currentUserData.password === 'val') {
    //                                 console.log('YOU FUCKING DID IT')
    //                             } else {
    //                                 console.log('Wrong Password');
    //                                 runPrompts();
    //                             }
    //                         })
    //                     })
    //                 }
    //             });
    //         }

    //         // If incorrect value, reprompt

    //         if (val.toLowerCase() !== 'l' && val.toLowerCase !== 'c') {
    //             console.log('wrong input');
    //             runPrompts();
    //         }
        
    //     });
    //   }

    //   runPrompts()