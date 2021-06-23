const fs = require("fs");
var path = require("path");
const { program } = require("commander");
const YAML = require("js-yaml");
const chalk = require("chalk");
const { toCSS, toJSON } = require("cssjson");
var csso = require("csso");
var css = require("css");

/**
 * initiating argument parser to take input
 * use '-f <file paths>'
 * or use '-d' for debug
 */
program.version("0.0.1");
program.requiredOption("-f, --file [letters...]", "location of the yaml file").option("-d, --debug", "output extra debugging");
program.parse(process.argv);
const options = program.opts();
isDebug = options.debug;
isDebug ? [console.log(chalk.yellow("arguments:")), console.log(options)] : [];

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
    isDebug
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

function compressColor(hex) {
  var output;
  // console.log(hex);

  output = csso.minify("p { color: " + hex + "; }").css;
  // console.log(output);
  output = css.parse(output);
  // console.log(output);
  output = output.stylesheet.rules[0].declarations[0].value;
  // console.log(output);
  output = output.substring(1);

  // console.log(output);
  return output;
}

for (let i = 0; i < JSONS.length; i++) {
  try {
    input = JSONS[i].colors;
    filename = JSONS[i].filename;
    output = {};

    /**
     * creating json without '#' in color
     * @tutorial https://stackoverflow.com/a/4564478
     */
    output.bright = {};
    output.bright.black = compressColor(input.bright.black);
    output.bright.blue = compressColor(input.bright.blue);
    output.bright.cyan = compressColor(input.bright.cyan);
    output.bright.green = compressColor(input.bright.green);
    output.bright.magenta = compressColor(input.bright.magenta);
    output.bright.red = compressColor(input.bright.red);
    output.bright.white = compressColor(input.bright.white);
    output.bright.yellow = compressColor(input.bright.yellow);
    output.normal = {};
    output.normal.black = compressColor(input.normal.black);
    output.normal.blue = compressColor(input.normal.blue);
    output.normal.cyan = compressColor(input.normal.cyan);
    output.normal.green = compressColor(input.normal.green);
    output.normal.magenta = compressColor(input.normal.magenta);
    output.normal.red = compressColor(input.normal.red);
    output.normal.white = compressColor(input.normal.white);
    output.normal.yellow = compressColor(input.normal.yellow);
    output.primary = {};
    output.primary.background = compressColor(input.primary.background);
    output.primary.foreground = compressColor(input.primary.foreground);
    output.selection = {};
    output.selection.background = compressColor(input.selection.background);
    output.selection.text = compressColor(input.selection.text);
    output.cursor = {};
    output.cursor.cursor = compressColor(input.cursor.cursor);
    output.cursor.text = compressColor(input.cursor.text);
    var fullJson = JSON.stringify(output);

    isDebug
      ? [
          console.log(chalk.bgRedBright.black(filename + " :")),
          // console.log(chalk.bgBlueBright.black(JSON.stringify(input))),
          console.log(chalk.bgBlueBright.black(JSON.stringify(output))),
        ]
      : [];

    fs.writeFileSync("json/" + filename + ".json", fullJson);
  } catch (e) {
    console.log(chalk.red("ERROR:"));
    console.log(e);
  }
}
