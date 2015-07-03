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
            inputId: 'Unique input id ( required property ).',
            type: 'Represents input type.',
            itemType: 'Represents array item type.',
            label: 'Input label',
            description: 'Input description',
            category: 'Input category',
            inputBinding: 'Include this input into command line, and it will show in command line preview bellow.'
		},
		outputs: {
			properties: 'Define tool output ports.',
            outputId: 'Unique input id ( required property ).',
            addOutput: 'Add new output port.',
            type: 'Represents output type.',
            itemType: 'Represents array item type.',
            glob: 'Add glob to find files relative to the output directory.',
            metadata: 'Add metadata to output.',
            secondaryFiles: 'click + to add secondary files and set expression or enumerate them'
		},
        // inputBindings and outputBindings
        bindings: {
            position: 'Position in command line.',
            prefix: 'Command line prefix.',
            separatePrefix: 'Separate prefix in command line.',
            itemSeparator: 'Separate items in command line.',
            value: 'Set input value or define expression.'
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