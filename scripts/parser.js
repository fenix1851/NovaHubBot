const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
// list of professions from unformattedList
rl.question('Enter string to split by , ', string => {
    const formatted_string = string.split(",")
    console.log(formatted_string)
    rl.close();
  });
