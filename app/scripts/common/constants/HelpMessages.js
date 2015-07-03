/**
 * Created by Maya on 2.4.15.
 */
'use strict';

angular.module('registryApp.common').constant('HelpMessages', {
	cliche: {
		general: {
			environment: 'Docker container information',
			resources: 'Tool execution resource requirements',
			command: 'Set for building base command',
			arguments: 'Additional command line arguments',
            dockerPull: 'Enter image repository and (optionally) tag. For example, images.sbgenomics.com/jsmith/mytool:latest or ubuntu. We suggest using SB image registry (images.sbgenomics.com) to speed up transfer of image data to compute nodes.',
            imageId: 'Optionally set to hash of the image to make sure same image is used every time.',
            cpu: 'Leave at 0 for multi-threaded tools or set 1 for single threaded tools',
            memory: 'Amount of RAM (in MB) required by the tool.',
            baseCMD: 'Enter name of the executable and (optionally) sub-command and fixed arguments (e.g. “bamtools sort -bS”).',
            addBaseCMD: 'Add base command.',
            successCodes: 'Array of success exit status codes',
            tempFailCodes: 'Array of temporary fail exit status codes',
            stdin: 'If a tool can only take input on stdin, set an expression (</>) here to reference the input file (e.g. $job.inputs.reads.path).',
            stdout: 'Enter file name to redirect standard output into. To construct a name based on inputs, use an expression (</>).',
            addArgument: 'Describe a command line argument that doesn\'t map directly to any of the tool’s inputs (e.g. —num-threads should have the “value” field set to $job.allocatedResources.cpu expression).'
		},
		inputs: {
			properties: 'Define tool input ports.',
            addInput: 'Add new input port.',
            inputId: 'IDs must be unique for all input and output ports. Value of this port will be available in expressions as $job.inputs["port_id"].',
            type: 'Represents input type.',
            itemType: 'Represents array item type.',
            label: 'Name to show when presenting the input on graphical interfaces.',
            description: 'Help text to show when presenting the input on graphical interfaces.',
            category: 'Category where this input will be grouped under.',
            inputBinding: 'Include this input into command line, and it will show in command line preview bellow.'
		},
		outputs: {
			properties: 'Define tool output ports.',
            outputId: 'Unique input id ( required property ).',
            addOutput: 'Add new output port.',
            type: 'Represents output type.',
            itemType: 'Represents array item type.',
            glob: 'File(s) matching this glob expression will be reported as output(s) on this port.',
            metadata: 'File metadata is a map of string->string. If value depends on tool inputs, use an expression (</>) \n\n like $job.inputs.reads.meta.sample. more info (link to advanced features -> metadata)',
            secondaryFiles: 'click + to add secondary files and set expression or enumerate them',
            secondaryFilesInfo: 'If a tool creates index files, list them here using file naming rules: “.ext” \n\n means that “.ext” is appended to original file name; “^.ext” means “.ext” is appended to file base name (after original extension is removed).'
		},
        // inputBindings and outputBindings
        bindings: {
            position: 'An integer priority of the input on the command line (lower comes first).',
            prefix: '\n\nPrefix for named arguments (e.g. —input-file or -i). If value is not supplied or false, the prefix will not be added. \n\n If value is True, only prefix will be added.',
            separatePrefix: 'Character to use as separator between prefix and value. \n\n “Space” means pass as separate arguments.',
            itemSeparator: 'Separate items in command line.',
            value: 'Enter an expression (</>) to transform the input value before passing it to the command line. \n\n Original value is available as $self variable.'
        },
		metadata: {
			metadata: 'Fill additional information about app.',
            label: 'Set app label',
            description: 'Set app description using markdown.',
            toolkit: 'Set app toolkit.',
            toolkitVersion: 'Set app toolkit version.',
            homepage: 'App homepage url.',
            categories: 'Add app relevant it fits in categories by entering name and pressing enter.'
		},
		test: {
			allocatedResources: '',
			inputs: ''
		},
		script: {
			script: ''
		}
	},
	dyole: {

	},
	main: {

	},
	app: {

	}
});