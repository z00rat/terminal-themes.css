const fs = require("fs");
const { program } = require("commander");
const yaml = require("js-yaml");

program.version("0.0.1");
program.requiredOption("-f, --file [letters...]", "location of the yaml file").option("-d, --debug", "output extra debugging");
program.parse(process.argv);
const options = program.opts();

if (options.debug) {
  console.log(options);
}

for (let i = 0; i < options.file.length; i++) {
  try {
    const doc = yaml.load(fs.readFileSync(options.file[i], "utf8"));
    console.log(doc);
  } catch (e) {
    console.log(e);
  }
}
