const fs = require("fs");
const { program } = require("commander");
const YAML = require("js-yaml");
const chalk = require("chalk");

/**
 * initiating argument parser to take input
 * use '-f <file paths>'
 * or use '-d' for debug
 */
program.version("0.0.1");
program.requiredOption("-f, --file [letters...]", "location of the yaml file").option("-d, --debug", "output extra debugging");
program.parse(process.argv);
const options = program.opts();
options.debug ? [console.log(chalk.yellow("arguments:")), console.log(options)] : [];

/**
 * looping over every file turn those from YAML to JSON
 */
for (let i = 0; i < options.file.length; i++) {
  try {
    const doc = YAML.load(fs.readFileSync(options.file[i], "utf8"));
    options.debug
      ? [console.log(chalk.yellow("YAML to JSON of '") + chalk.underline.bold.cyan(options.file[i]) + chalk.yellow("':")), console.log(doc)]
      : [];
  } catch (e) {
    console.log(chalk.red("ERROR:"));
    console.log(e);
  }
}
