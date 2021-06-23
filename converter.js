const fs = require("fs");
const { program } = require("commander");
const YAML = require("js-yaml");
const chalk = require("chalk");

program.version("0.0.1");
program.requiredOption("-f, --file [letters...]", "location of the yaml file").option("-d, --debug", "output extra debugging");
program.parse(process.argv);
const options = program.opts();

options.debug ? [console.log(chalk.yellow("arguments:")), console.log(options)] : [];

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
