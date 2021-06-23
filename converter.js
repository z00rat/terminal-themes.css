const fs = require("fs");
var path = require("path");
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

var JSONS = [];
/**
 * looping over every file turn those from YAML to JSON
 */
for (let i = 0; i < options.file.length; i++) {
  try {
    JSONS[i] = YAML.load(fs.readFileSync(options.file[i], "utf8"));
    /**
     * @tutorial https://stackoverflow.com/a/50502331
     */
    JSONS[i].filename = path.basename(options.file[i], path.extname(options.file[i]));
    options.debug
      ? [
          console.log(
            chalk.yellow(chalk.bold.redBright("[" + i + "] ") + "YAML to JSON of '") +
              chalk.underline.bold.cyan(JSONS[i].filename) +
              chalk.yellow(":")
          ),
          console.log(JSONS[i]),
        ]
      : [];
  } catch (e) {
    console.log(chalk.red("ERROR:"));
    console.log(e);
  }
}
