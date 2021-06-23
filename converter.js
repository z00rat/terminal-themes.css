const { program } = require("commander");
program.version("0.0.1");

// .option("-d, --debug", "output extra debugging")
program.requiredOption("-f, --file [letters...]", "location of the yaml file");
program.parse(process.argv);
const options = program.opts();

console.log(options);
