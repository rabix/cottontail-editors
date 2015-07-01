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
            stdin: 'If a tool can only take input on stdin, set an expression (</>) here to reference the input file (e.g. $job.inputs.reads.path).',
            stdout: 'Enter file name to redirect standard output into. To construct a name based on inputs, use an expression (</>).',
            addArgument: 'Describe a command line argument that doesn’t map directly to any of the tool’s inputs (e.g. —num-threads should have the “value” field set to $job.allocatedResources.cpu expression).'
		},
		inputs: {
			properties: 'Define tool input ports.',
            addInput: 'Add new input port.'
		},
		outputs: {
			properties: ''
		},
		metadata: {
			metadata: ''
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