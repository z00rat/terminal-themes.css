const fs = require("fs");
var path = require("path");
const { program } = require("commander");
const YAML = require("js-yaml");
const chalk = require("chalk");
const { toCSS, toJSON } = require("cssjson");
var csso = require("csso");
var css = require("css");
const jsonToCss = require("json-to-css");

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

/**
 * to compress color value with csso
 * @param {string} hex the hex value from YAML file
 * @returns compressed color code
 */
function compressColor(hex) {
  var output;
  // console.log(hex);

  output = csso.minify("p { color: " + hex + "; }").css;
  // console.log(output);
  output = css.parse(output);
  // console.log(output);
  output = output.stylesheet.rules[0].declarations[0].value;
  // console.log(output);
  /**
   * creating json without '#' in color
   * @tutorial https://stackoverflow.com/a/4564478
   */
  output = output.substring(1);

  // console.log(output);
  return output;
}

function cssClassGen(clr, className, jsonCss) {
  // console.log(clr);
  // var jsonCss = {};
  // var theCss = "";

  className = "." + className;
  jsonCss[className] = {};
  jsonCss[className].color = "#" + clr;

  className = className + "-bg";
  jsonCss[className] = {};
  jsonCss[className]["background-color"] = "#" + clr;
  // theCss = jsonToCss.of(jsonCss);
  // console.log(jsonCss);
  // console.log(theCss);

  return jsonCss;
}

/**
 * json/css generate loop
 */
for (let i = 0; i < JSONS.length; i++) {
  try {
    input = JSONS[i].colors;
    filename = JSONS[i].filename;
    jsonOut = {};
    jsonCss = {};

    isDebug ? [console.log(chalk.bgRedBright.black(filename + " :"))] : [];

    jsonOut.normal = {};
    jsonOut.bright = {};
    jsonOut.primary = {};
    jsonOut.selection = {};
    jsonOut.cursor = {};
    jsonOut.normal.black = compressColor(input.normal.black);
    jsonOut.normal.blue = compressColor(input.normal.blue);
    jsonOut.normal.cyan = compressColor(input.normal.cyan);
    jsonOut.normal.green = compressColor(input.normal.green);
    jsonOut.normal.magenta = compressColor(input.normal.magenta);
    jsonOut.normal.red = compressColor(input.normal.red);
    jsonOut.normal.white = compressColor(input.normal.white);
    jsonOut.normal.yellow = compressColor(input.normal.yellow);
    jsonOut.bright.black = compressColor(input.bright.black);
    jsonOut.bright.blue = compressColor(input.bright.blue);
    jsonOut.bright.cyan = compressColor(input.bright.cyan);
    jsonOut.bright.green = compressColor(input.bright.green);
    jsonOut.bright.magenta = compressColor(input.bright.magenta);
    jsonOut.bright.red = compressColor(input.bright.red);
    jsonOut.bright.white = compressColor(input.bright.white);
    jsonOut.bright.yellow = compressColor(input.bright.yellow);
    jsonOut.primary.background = compressColor(input.primary.background);
    jsonOut.primary.foreground = compressColor(input.primary.foreground);
    jsonOut.selection.background = compressColor(input.selection.background);
    jsonOut.selection.text = compressColor(input.selection.text);
    jsonOut.cursor.cursor = compressColor(input.cursor.cursor);
    jsonOut.cursor.text = compressColor(input.cursor.text);

    var FULLJSON = JSON.stringify(jsonOut);

    isDebug
      ? [
          // console.log(chalk.bgBlueBright.black(JSON.stringify(input))),
          console.log(chalk.bgBlueBright.black(JSON.stringify(jsonOut))),
        ]
      : [];

    jsonCss = cssClassGen(jsonOut.normal.black, "normal-black", jsonCss);
    jsonCss = cssClassGen(jsonOut.normal.blue, "normal-blue", jsonCss);
    jsonCss = cssClassGen(jsonOut.normal.cyan, "normal-cyan", jsonCss);
    jsonCss = cssClassGen(jsonOut.normal.green, "normal-green", jsonCss);
    jsonCss = cssClassGen(jsonOut.normal.magenta, "normal-magenta", jsonCss);
    jsonCss = cssClassGen(jsonOut.normal.red, "normal-red", jsonCss);
    jsonCss = cssClassGen(jsonOut.normal.white, "normal-white", jsonCss);
    jsonCss = cssClassGen(jsonOut.normal.yellow, "normal-yellow", jsonCss);
    jsonCss = cssClassGen(jsonOut.bright.black, "bright-black", jsonCss);
    jsonCss = cssClassGen(jsonOut.bright.blue, "bright-blue", jsonCss);
    jsonCss = cssClassGen(jsonOut.bright.cyan, "bright-cyan", jsonCss);
    jsonCss = cssClassGen(jsonOut.bright.green, "bright-green", jsonCss);
    jsonCss = cssClassGen(jsonOut.bright.magenta, "bright-magenta", jsonCss);
    jsonCss = cssClassGen(jsonOut.bright.red, "bright-red", jsonCss);
    jsonCss = cssClassGen(jsonOut.bright.white, "bright-white", jsonCss);
    jsonCss = cssClassGen(jsonOut.bright.yellow, "bright-yellow", jsonCss);
    jsonCss = cssClassGen(jsonOut.primary.background, "primary-background", jsonCss);
    jsonCss = cssClassGen(jsonOut.primary.foreground, "primary-foreground", jsonCss);
    jsonCss = cssClassGen(jsonOut.selection.background, "selection-background", jsonCss);
    jsonCss = cssClassGen(jsonOut.selection.text, "selection-text", jsonCss);
    jsonCss = cssClassGen(jsonOut.cursor.cursor, "cursor-cursor", jsonCss);
    jsonCss = cssClassGen(jsonOut.cursor.text, "cursor-text", jsonCss);

    var CSSCLASS = csso.minify(jsonToCss.of(jsonCss)).css;

    isDebug
      ? [
          console.log(jsonCss),
          // console.log(cssClass),
          console.log(chalk.bgMagentaBright.black(JSON.stringify(CSSCLASS))),
        ]
      : [];

    //
    console.log(chalk.redBright.bold("[ FULLJSON ]") + chalk.yellow(" writing to ") + chalk.magenta("json/" + filename + ".json"));
    fs.writeFileSync("json/" + filename + ".json", FULLJSON);

    console.log(chalk.redBright.bold("[ CSSCLASS ]") + chalk.yellow(" writing to ") + chalk.magenta("css-class/" + filename + ".css"));
    fs.writeFileSync("css-class/" + filename + ".css", CSSCLASS);
  } catch (e) {
    console.log(chalk.red("ERROR:"));
    console.log(e);
  }
}
