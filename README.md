This project is built using typescript. I have already included build files in git, so you dont need to build typescript to run the project

## Current branch model Follow following steps to run the project

- Navigate to project directory

- Run ``` npm i ``` to install necessary packages

- To take input and run the project you can use following commands 

```  node ./cli.js input.csv output.csv```
or
``` npm run start input.csv  output.csv ```

The program will exit immediately once it write stream to output csv

NB: There will be no `>` character between input and output. Though it's was instructed in document. Those character are automatically stripped from shell.

- To run test use follwoing command
``` npm run test ```

To review the code you can only check `.ts` file. All `.js` file are auto generated. 



