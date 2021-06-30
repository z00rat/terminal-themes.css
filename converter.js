const fs = require("fs");
var path = require("path");
const { program } = require("commander");
const YAML = require("js-yaml");
const chalk = require("chalk");
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
              chalk.yellow("':")
          ),
          // console.log(JSONS[i]),
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

function cssMinClassGen(clr, className, jsonCssMin) {
  // console.log(clr);

  className = "." + className;
  jsonCssMin[className] = {};
  jsonCssMin[className].color = "#" + clr;

  className = className + "B";
  jsonCssMin[className] = {};
  jsonCssMin[className]["background-color"] = "#" + clr;
  // theCss = jsonToCss.of(jsonCssMin);
  // console.log(jsonCssMin);
  // console.log(theCss);

  return jsonCssMin;
}

function cssVarGen(clr, varName, jsonCss) {
  // console.log(clr);

  varName = "--" + varName;
  jsonCss[":root"][varName] = "#" + clr;

  // theCss = jsonToCss.of(jsonCss);
  // console.log(jsonCss);
  // console.log(theCss);

  return jsonCss;
}

function cssMinVarGen(clr, varName, jsonCssMin) {
  // console.log(clr);

  varName = "--" + varName;
  jsonCssMin[":root"][varName] = "#" + clr;

  // theCss = jsonToCss.of(jsonCssMin);
  // console.log(jsonCssMin);
  // console.log(theCss);

  return jsonCssMin;
}

// console.log("#!/bin/bash\n");
/**
 * json/css generate loop
 */
for (let i = 0; i < JSONS.length; i++) {
  try {
    input = JSONS[i].colors;
    filename = JSONS[i].filename;
    jsonOut = {};
    jsonOutMin = {};
    jsonCss = {};
    jsonCssMin = {};

    isDebug ? [console.log(chalk.bgRedBright.black(filename + " :"))] : [];
    console.log(chalk.bold.green("FILE NAME: ") + chalk.italic.underline.blue(filename));
    // console.log('tput setaf 3 && echo "FILE: ' + filename + '" && tput sgr0');

    if (input.selection == null || input.cursor == null) {
      // console.log(chalk.bold.red("this file don't have any 'selection' or 'cursor', which is not acceptable."));
      continue;
    }

    {
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
    }

    isDebug
      ? [
          // console.log(chalk.bgBlueBright.black(JSON.stringify(input))),
          console.log(chalk.bgBlueBright.black(JSON.stringify(jsonOut))),
        ]
      : [];

    {
      jsonOutMin.N0 = jsonOut.normal.black;
      jsonOutMin.N1 = jsonOut.normal.red;
      jsonOutMin.N2 = jsonOut.normal.green;
      jsonOutMin.N3 = jsonOut.normal.yellow;
      jsonOutMin.N4 = jsonOut.normal.blue;
      jsonOutMin.N5 = jsonOut.normal.magenta;
      jsonOutMin.N6 = jsonOut.normal.cyan;
      jsonOutMin.N7 = jsonOut.normal.white;
      jsonOutMin.N0 = jsonOut.bright.black;
      jsonOutMin.N1 = jsonOut.bright.red;
      jsonOutMin.N2 = jsonOut.bright.green;
      jsonOutMin.N3 = jsonOut.bright.yellow;
      jsonOutMin.N4 = jsonOut.bright.blue;
      jsonOutMin.N5 = jsonOut.bright.magenta;
      jsonOutMin.N6 = jsonOut.bright.cyan;
      jsonOutMin.N7 = jsonOut.bright.white;
      jsonOutMin.Pb = jsonOut.primary.background;
      jsonOutMin.Pf = jsonOut.primary.foreground;
      jsonOutMin.Sb = jsonOut.selection.background;
      jsonOutMin.St = jsonOut.selection.text;
      jsonOutMin.Cc = jsonOut.cursor.cursor;
      jsonOutMin.Ct = jsonOut.cursor.text;

      var MINJSON = JSON.stringify(jsonOutMin);
    }

    isDebug ? [console.log(chalk.bgBlue.black(JSON.stringify(jsonOutMin)))] : [];

    {
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
    }

    isDebug
      ? [
          // console.log(jsonCss),
          // console.log(cssClass),
          console.log(chalk.bgMagentaBright.black(CSSCLASS)),
        ]
      : [];

    {
      jsonCssMin = cssMinClassGen(jsonOut.normal.black, "N0", jsonCssMin);
      jsonCssMin = cssMinClassGen(jsonOut.normal.red, "N1", jsonCssMin);
      jsonCssMin = cssMinClassGen(jsonOut.normal.green, "N2", jsonCssMin);
      jsonCssMin = cssMinClassGen(jsonOut.normal.yellow, "N3", jsonCssMin);
      jsonCssMin = cssMinClassGen(jsonOut.normal.blue, "N4", jsonCssMin);
      jsonCssMin = cssMinClassGen(jsonOut.normal.magenta, "N5", jsonCssMin);
      jsonCssMin = cssMinClassGen(jsonOut.normal.cyan, "N6", jsonCssMin);
      jsonCssMin = cssMinClassGen(jsonOut.normal.white, "N7", jsonCssMin);
      jsonCssMin = cssMinClassGen(jsonOut.bright.black, "B0", jsonCssMin);
      jsonCssMin = cssMinClassGen(jsonOut.bright.red, "B1", jsonCssMin);
      jsonCssMin = cssMinClassGen(jsonOut.bright.green, "B2", jsonCssMin);
      jsonCssMin = cssMinClassGen(jsonOut.bright.yellow, "B3", jsonCssMin);
      jsonCssMin = cssMinClassGen(jsonOut.bright.blue, "B4", jsonCssMin);
      jsonCssMin = cssMinClassGen(jsonOut.bright.magenta, "B5", jsonCssMin);
      jsonCssMin = cssMinClassGen(jsonOut.bright.cyan, "B6", jsonCssMin);
      jsonCssMin = cssMinClassGen(jsonOut.bright.white, "B7", jsonCssMin);
      jsonCssMin = cssMinClassGen(jsonOut.primary.background, "Pb", jsonCssMin);
      jsonCssMin = cssMinClassGen(jsonOut.primary.foreground, "Pf", jsonCssMin);
      jsonCssMin = cssMinClassGen(jsonOut.selection.background, "Sb", jsonCssMin);
      jsonCssMin = cssMinClassGen(jsonOut.selection.text, "St", jsonCssMin);
      jsonCssMin = cssMinClassGen(jsonOut.cursor.cursor, "Cc", jsonCssMin);
      jsonCssMin = cssMinClassGen(jsonOut.cursor.text, "Ct", jsonCssMin);

      var MINCSSCLASS = csso.minify(jsonToCss.of(jsonCssMin)).css;
    }

    isDebug
      ? [
          // console.log(jsonCssMin),
          console.log(chalk.bgMagenta.black(MINCSSCLASS)),
        ]
      : [];

    {
      jsonCss = {};
      jsonCss[":root"] = {};

      jsonCss = cssVarGen(jsonOut.normal.black, "normal-black", jsonCss);
      jsonCss = cssVarGen(jsonOut.normal.blue, "normal-blue", jsonCss);
      jsonCss = cssVarGen(jsonOut.normal.cyan, "normal-cyan", jsonCss);
      jsonCss = cssVarGen(jsonOut.normal.green, "normal-green", jsonCss);
      jsonCss = cssVarGen(jsonOut.normal.magenta, "normal-magenta", jsonCss);
      jsonCss = cssVarGen(jsonOut.normal.red, "normal-red", jsonCss);
      jsonCss = cssVarGen(jsonOut.normal.white, "normal-white", jsonCss);
      jsonCss = cssVarGen(jsonOut.normal.yellow, "normal-yellow", jsonCss);
      jsonCss = cssVarGen(jsonOut.bright.black, "bright-black", jsonCss);
      jsonCss = cssVarGen(jsonOut.bright.blue, "bright-blue", jsonCss);
      jsonCss = cssVarGen(jsonOut.bright.cyan, "bright-cyan", jsonCss);
      jsonCss = cssVarGen(jsonOut.bright.green, "bright-green", jsonCss);
      jsonCss = cssVarGen(jsonOut.bright.magenta, "bright-magenta", jsonCss);
      jsonCss = cssVarGen(jsonOut.bright.red, "bright-red", jsonCss);
      jsonCss = cssVarGen(jsonOut.bright.white, "bright-white", jsonCss);
      jsonCss = cssVarGen(jsonOut.bright.yellow, "bright-yellow", jsonCss);
      jsonCss = cssVarGen(jsonOut.primary.background, "primary-background", jsonCss);
      jsonCss = cssVarGen(jsonOut.primary.foreground, "primary-foreground", jsonCss);
      jsonCss = cssVarGen(jsonOut.selection.background, "selection-background", jsonCss);
      jsonCss = cssVarGen(jsonOut.selection.text, "selection-text", jsonCss);
      jsonCss = cssVarGen(jsonOut.cursor.cursor, "cursor-cursor", jsonCss);
      jsonCss = cssVarGen(jsonOut.cursor.text, "cursor-text", jsonCss);

      var CSSVAR = csso.minify(jsonToCss.of(jsonCss)).css;
    }

    isDebug
      ? [
          // console.log(jsonCss),
          // console.log(cssClass),
          console.log(chalk.bgGreenBright.black(CSSVAR)),
        ]
      : [];

    {
      jsonCssMin = {};
      jsonCssMin[":root"] = {};

      jsonCssMin = cssMinVarGen(jsonOut.normal.black, "N0", jsonCssMin);
      jsonCssMin = cssMinVarGen(jsonOut.normal.red, "N1", jsonCssMin);
      jsonCssMin = cssMinVarGen(jsonOut.normal.green, "N2", jsonCssMin);
      jsonCssMin = cssMinVarGen(jsonOut.normal.yellow, "N3", jsonCssMin);
      jsonCssMin = cssMinVarGen(jsonOut.normal.blue, "N4", jsonCssMin);
      jsonCssMin = cssMinVarGen(jsonOut.normal.magenta, "N5", jsonCssMin);
      jsonCssMin = cssMinVarGen(jsonOut.normal.cyan, "N6", jsonCssMin);
      jsonCssMin = cssMinVarGen(jsonOut.normal.white, "N7", jsonCssMin);
      jsonCssMin = cssMinVarGen(jsonOut.bright.black, "B0", jsonCssMin);
      jsonCssMin = cssMinVarGen(jsonOut.bright.red, "B1", jsonCssMin);
      jsonCssMin = cssMinVarGen(jsonOut.bright.green, "B2", jsonCssMin);
      jsonCssMin = cssMinVarGen(jsonOut.bright.yellow, "B3", jsonCssMin);
      jsonCssMin = cssMinVarGen(jsonOut.bright.blue, "B4", jsonCssMin);
      jsonCssMin = cssMinVarGen(jsonOut.bright.magenta, "B5", jsonCssMin);
      jsonCssMin = cssMinVarGen(jsonOut.bright.cyan, "B6", jsonCssMin);
      jsonCssMin = cssMinVarGen(jsonOut.bright.white, "B7", jsonCssMin);
      jsonCssMin = cssMinVarGen(jsonOut.primary.background, "Pb", jsonCssMin);
      jsonCssMin = cssMinVarGen(jsonOut.primary.foreground, "Pf", jsonCssMin);
      jsonCssMin = cssMinVarGen(jsonOut.selection.background, "Sb", jsonCssMin);
      jsonCssMin = cssMinVarGen(jsonOut.selection.text, "St", jsonCssMin);
      jsonCssMin = cssMinVarGen(jsonOut.cursor.cursor, "Cc", jsonCssMin);
      jsonCssMin = cssMinVarGen(jsonOut.cursor.text, "Ct", jsonCssMin);

      var MINCSSVAR = csso.minify(jsonToCss.of(jsonCssMin)).css;
    }

    isDebug
      ? [
          // console.log(jsonCssMin),
          console.log(chalk.bgGreen.black(MINCSSVAR)),
        ]
      : [];

    //
    console.log(chalk.redBright.bold("[ FULLJSON    ]") + chalk.yellow(" writing to ") + chalk.magenta("json/" + filename + ".json"));
    fs.writeFileSync("json/" + filename + ".json", FULLJSON);
    // prettier-ignore
    // console.log('cd json && git add "' + filename + ".json\" && git commit -s -m \"adding 'full+big json' version of '" + filename + "'\" && cd ..");

    console.log(chalk.redBright.bold("[ MINJSON     ]") + chalk.yellow(" writing to ") + chalk.magenta("json-min/" + filename + ".json"));
    fs.writeFileSync("json-min/" + filename + ".json", MINJSON);
    // prettier-ignore
    // console.log('cd json-min && git add "' + filename + ".json\" && git commit -s -m \"adding 'full+min json' version of '" + filename + "'\" && cd ..");

    console.log(chalk.redBright.bold("[ CSSCLASS    ]") + chalk.yellow(" writing to ") + chalk.magenta("css-class/" + filename + ".css"));
    fs.writeFileSync("css-class/" + filename + ".css", CSSCLASS);
    // prettier-ignore
    // console.log('cd css-class && git add "' + filename + ".css\" && git commit -s -m \"adding 'full+big css-class' version of '" + filename + "'\" && cd ..");

    console.log(chalk.redBright.bold("[ MINCSSCLASS ]") + chalk.yellow(" writing to ") + chalk.magenta("css-class-min/" + filename + ".css"));
    fs.writeFileSync("css-class-min/" + filename + ".css", MINCSSCLASS);
    // prettier-ignore
    // console.log('cd css-class-min && git add "' + filename + ".css\" && git commit -s -m \"adding 'full+min css-class' version of '" + filename + "'\" && cd ..");

    console.log(chalk.redBright.bold("[ CSSVAR      ]") + chalk.yellow(" writing to ") + chalk.magenta("css-var/" + filename + ".css"));
    fs.writeFileSync("css-var/" + filename + ".css", CSSVAR);
    // prettier-ignore
    // console.log('cd css-var && git add "' + filename + ".css\" && git commit -s -m \"adding 'full+big css-variable' version of '" + filename + "'\" && cd ..");

    console.log(chalk.redBright.bold("[ MINCSSVAR   ]") + chalk.yellow(" writing to ") + chalk.magenta("css-var-min/" + filename + ".css"));
    fs.writeFileSync("css-var-min/" + filename + ".css", MINCSSVAR);
    // prettier-ignore
    // console.log('cd css-var-min && git add "' + filename + ".css\" && git commit -s -m \"adding 'full+min css-variable' version of '" + filename + "'\" && cd ..");

    //
  } catch (e) {
    console.log(chalk.red("ERROR:"));
    console.log(e);
  }
}
