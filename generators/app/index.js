'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require("lodash");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        "Preact and esbuild is da shit..."
      )
    );

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'App Name:'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    let camelName=_.upperFirst(_.camelCase(this.props.name));
    this.props.camelName=camelName;

    this.destinationRoot(this.props.name);

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('src/name.jsx'),
      this.destinationPath(`src/${this.props.name}.jsx`),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('src/app/Name.jsx'),
      this.destinationPath(`src/app/${this.props.camelName}App.jsx`),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('src/app/Name.css'),
      this.destinationPath(`src/app/${this.props.camelName}App.css`),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('res/index.html'),
      this.destinationPath('res/index.html'),
      this.props
    );

    this.fs.copy(
      this.templatePath('src/utils/preact-shim.js'),
      this.destinationPath('src/utils/preact-shim.js')
    );
  }

  install() {
    this.installDependencies({
      bower: false
    });
  }
};
