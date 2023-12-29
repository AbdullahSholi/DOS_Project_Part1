

// console.log("test")




// const purchase = document.getElementById("purchase");
// const search = document.getElementById("search");
// const info = document.getElementById("info");


// purchase.onclick = ()=>{
//   const id = document.getElementById("id").value;
//   const cost = document.getElementById("cost").value;
//   axios.post(`http://localhost:8083/order-server/purch`,{id:id,orderCost:cost}).then((res)=>{
//   console.log(res.data)
// })

// }

// search.onclick = ()=>{
//   const topic = document.getElementById("topic").value;
//   axios.get(`http://localhost:8083/catalog-server/search/${topic}`).then((res)=>{
//   console.log(res.data)
// })

// }

// info.onclick = ()=>{
//   const id = document.getElementById("id").value;
//   axios.get(`http://localhost:8083/catalog-server/info/${id}`).then((res)=>{
//   console.log(res.data)
//   })

// }

///////////////////////
import { Command } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs';
import axios from "axios"

///////////////////////////
let counterFilePath1 = './counter1.txt';
let counterFilePath2 = './counter2.txt';
let counterFilePath3 = './counter3.txt';

// Function to read the counter value from a file
function readCounter1() {
  try {
    return parseInt(fs.readFileSync(counterFilePath1, 'utf8')) || 1;
  } catch (error) {
    return 1;
  }
}

// Function to write the counter value to a file
function writeCounter1(counter1) {
  fs.writeFileSync(counterFilePath1, counter1.toString(), 'utf8');
}

// Function to read the counter value from a file
function readCounter2() {
  try {
    return parseInt(fs.readFileSync(counterFilePath2, 'utf8')) || 1;
  } catch (error) {
    return 1;
  }
}

// Function to write the counter value to a file
function writeCounter2(counter2) {
  fs.writeFileSync(counterFilePath2, counter2.toString(), 'utf8');
}

// Function to read the counter value from a file
function readCounter3() {
  try {
    return parseInt(fs.readFileSync(counterFilePath3, 'utf8')) || 1;
  } catch (error) {
    return 1;
  }
}

// Function to write the counter value to a file
function writeCounter3(counter3) {
  fs.writeFileSync(counterFilePath3, counter3.toString(), 'utf8');
}

let counter1 = readCounter1();
let counter2 = readCounter2();
let counter3 = readCounter3();


//////////////////////////


  const program = new Command();
  program.name('CLI').description('CLI for DOS Project').version('1.0.0');
  let questionSearch = [
    {
      type: 'input',
      name: 'bookTitle',
      message: 'please enter book topic to get details about it: ',
    },
  ];

  let questionInfo=[{
    type: 'number',
    name: 'itemNumber',
    message: 'please enter items number to get info about it: ',
  },]

  let questionPurchase = [{
    type: 'number',
    name: 'itemNumber',
    message: 'please enter book item number to purchase it: ',
  },
  {
    type: 'number',
    name: 'money',
    message: 'Enter amount of money to pay:  ',
  },
]
  
  program
    .command('search-book-title')
    .alias('s')
    .description('search about specific book using book topic')
    .action(() => {
      inquirer
        .prompt(questionSearch)
        .then(async (answers) => {
      
          try {
            if (counter1 % 2 === 1) {
              counter1++;
              writeCounter1(counter1);
              const result = await axios.get(`http://localhost:8083/catalog-server/search/${answers.bookTitle}`);
              console.log('Response Data:', result.data);
              console.log(counter1,"From Original");
            } else {
              counter1++;
              writeCounter1(counter1);
              const result1 = await axios.get(`http://localhost:8083/catalog-server-replica/search/${answers.bookTitle}`);
              console.log('Response Data:', result1.data);
              console.log(counter1,"From Replica");
            }
          } catch (error) {
            console.error('Error during request:', error.message);
          }
        })
        .catch((error) => {
          if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
          } else {
            // Something else went wrong
          }
        });
    });
  
    program
    .command('info-book-item-number')
    .alias('i')
    .description('info about specific book using item number')
    .action(() => {
      inquirer
        .prompt(questionInfo)
        .then(async (answers) => {
          try {
            if (counter2 % 2 === 1) {
              counter2++;
              writeCounter2(counter2);
              const result = await axios.get(`http://localhost:8083/catalog-server/info/${answers.itemNumber}`);
              console.log('Response Data:', result.data);
              console.log(counter2,"From Original");
            } else {
              counter2++;
              writeCounter2(counter2);
              const result1 = await axios.get(`http://localhost:8083/catalog-server-replica/info/${answers.itemNumber}`);
              console.log('Response Data:', result1.data);
              console.log(counter2,"From Replica");
            }
          } catch (error) {
            console.error('Error during request:', error.message);
          }
        })
        .catch((error) => {
          if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
          } else {
            // Something else went wrong
          }
        });
    });
    
    program
    .command('purchase-book-by-item-number')
    .alias('p')
    .description('purchase specific book using item number')
    .action(() => {
      inquirer
        .prompt(questionPurchase)
        .then(async (answers) => {
          // console.log(answers)
          // console.log(answers.purchase)
          try {
            if (counter3 % 2 === 1) {
              counter3++;
              writeCounter3(counter3);
              const result = await axios.post(`http://localhost:8083/order-server/purch`,{id:answers.itemNumber,orderCost:answers.money});
              console.log('Response Data:', result.data);
              console.log(counter3,"From Original");
            } else {
              counter3++;
              writeCounter3(counter3);
              const result1 = await axios.post(`http://localhost:8083/order-server-replica/purch`,{id:answers.itemNumber,orderCost:answers.money});
              console.log('Response Data:', result1.data);
              console.log(counter3,"From Replica");
            }
          } catch (error) {
            console.error('Error during request:', error.message);
          }
        })
        .catch((error) => {
          if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
          } else {
            // Something else went wrong
          }
        });
    });
  
  program.parse();
