# Reproducible Analyses for Bioinformatics (Rabix)

## Editors
The purpose of the Rabix editors is to implement a graphical user interface for describing tools in the [Common Workflow Language](http://common-workflow-language.github.io/). They were originally written as an open source project, now referred to as [rabix.org](https://www.rabix.org/), as a single application. They have since been decoupled from one another and integrated into the SevenBridges and the Cancer Genomics Cloud platforms.

The CWL specification which these editors currently support is [draft-2](http://common-workflow-language.github.io/draft-2/). Future iterations should support CWL 1.0 when it is finalized. The two editors are the Command Line Tool Editor (**Cliche**) and the Workflow Editor (**Dyole**).

Cliche is used to edit Command Line Tools and could once edit Expression Tools, but this functionality has been dropped. Dyole edits Workflows through an SVG based graphical editor. 

> Note about this README: Some of the instructions assume that you are using a JetBrains IDE of some sort (WebStorm, Idea, PHPStorm, whatever). This doesn't mean you have to use one of them. Anything you feel comfortable coding in is valid. 
> 
> If you do use an editor that isn't one of these and can reproduce the same set up, please do add the instructions to the guide!



## Installation

Both editors are served by [camellia](https://gitlab.sbgenomics.com:9443/sbg/camellia) through a single html file called [app-edit.html](https://gitlab.sbgenomics.com:9443/sbg/camellia/blob/develop/apps/rabix/templates/rabix/project/app-edit.html). Go there for more information about how JavaScript and CSS files are loaded onto the page. Either is loaded depending on the url hash. `?type=tool` loads Cliche, and `?type=workflow` loads Dyole.

Locally, this repo should reside in `frontend/js/editors`. When bootstrapping the project using [sbg-fe](https://gitlab.sbgenomics.com:9443/filip/sbg-fe), the repo will already be there. If you are using a JetBrains IDE as your git interface, be sure to include the git repo in your IDE's version control.


To start working on the editors, start a grunt watcher which will take care of templates and styles.

```bash
$ cd frontend
$ npm install # in case it wasn't done already
$ grunt rabix-watch
```

## Style and Linting

### JSHint
A `.jshintrc` file is included in the root of the repository. To enable jshinting in your JetBrains IDE, go to File > Default Settings > Languages & Frameworks > JavaScript > Code Quality Tools > JSHint

![jshint](http://i.imgur.com/3jrNSDj.png)

Enable JSHint and the Use config files. The IDE will automatically find the right .jshintrc file depending on the path of the file being edited.

### Code Style

To facillitate consistent coding styles, we'll try implementing [JavaScript Coding Style](http://jscs.info/). Install the jscs CLI by running

```
npm install jscs -g
```

JetBrains IDEs have automatic support for JSCS. You can enable it by going to File > Default Settings > Languages & Frameworks > JavaScript > Code Quality Tools > JSCS

![jscs](http://i.imgur.com/AdtaouOh.png)

Enable the configuration as so. The rules, found in `.jscsrc`, will be tweaked as we work out this project's personal coding style. Some files might be completely red with errors for the silliest reasons. Reformat as you go and reformat liberally. 

### Reformatting
JSCS can be set as the default reformatting guide for JavaScript files. To configure it, go to File > Default Settings > Editor > Code Style > JavaScript and click `Manage...` Select Import, and find the `.jscsrc` file located in the root of this project. There is also another file for formatting HTML, it can be imported into your JetBrains IDE by going to File > Default Settings > Import Settings and importing `jetbrains-html-code-style.xml`


## Tests

Coming soon, one hopes... If you have the time and motivation to implement a test suite, by all means do.

## Committing

It's a good idea to have descriptive commit messages. For commits that are directly related to JIRA tickets, you can format the commit like so

```
SBPLA-123 Ticket title

Description of the changes.
```

To enable tracking JIRA tickets through Tasks, follow [this guide](https://www.jetbrains.com/phpstorm/help/enabling-integration-with-an-issue-tracking-system.html).