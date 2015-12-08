/**
 * Author: Milica Kadic
 * Date: 2/3/15
 * Time: 3:03 PM
 */
'use strict';

angular.module('registryApp.cliche')
    .constant('rawJob',
        /**
         * Skeleton of JobJSON object
         *
         * @typedef {?object} SBGJob
         * @property {object.<string, *>} inputs - Maps test data to inputs of ToolJson
         * @property {AllocatedResources} allocatedResources - CPU and MEM allocated for tool
         */
    {
        inputs: {},

        /**
         * @typedef {object} AllocatedResources
         * @property {int} cpu
         * @property {int} mem
         */
        allocatedResources: {
            cpu: 0,
            mem: 0
        }
    })
    .constant('rawTool',
        /**
         * Skeleton of ToolJSON object
         *
         * @typedef {?object} CWLTool
         * @property {string} id ID supplied by Brood, format user/project/app/rev
         * @property {string} class Tool class, defaults to CommandLineTool
         * @property {string} label Name of tool
         * @property {string} description Description of tool
         * @property {Requirement[]} requirements Tool requirements, include DockerRequirement, ExpressionEngineRequirement and CreateFileRequirement
         * @property {Input[]} inputs
         * @property {Output[]} outputs
         * @property {Hint[]} hints
         * @property {string[]} baseCmd
         * @property {string} stdin
         * @property {string} stdout
         * @property {int[]} successCodes
         * @property {int[]} temporaryFailCodes
         * @property {Argument[]} arguments
         */
    {
        'id': '',
        'class': 'CommandLineTool',
        label: '',
        description: '',
        requirements: [
            /**
             * @typedef {object} Requirement
             * @property {string} class
             */
            {
                'class': 'DockerRequirement',
                dockerImageId: '',
                dockerPull: ''
            },
            {
                'class': 'ExpressionEngineRequirement',
                id: '#cwl-js-engine',
                requirements: [
                    {
                        'class': 'DockerRequirement',
                        dockerPull: 'rabix/js-engine'
                    }
                ]
            },
	        {
		        'class': 'CreateFileRequirement',
		        fileDef: []
	        }
        ],
        inputs: [],
        outputs: [],
        hints: [
            /**
             * @typedef {object} Hint
             * @property {string} class
             * @property {*} value
             */
            {
                'class': 'CPURequirement',
                value: 1
            },
            {
                'class': 'MemRequirement',
                value: 1000
            }
        ],
        //moved CLI adapter to root
        baseCommand: [''],
        stdin: '',
        stdout: '',
        successCodes: [],
        temporaryFailCodes: [],
        arguments: []
    })
    .constant('rawTransform', {
        // defined in ToolSchema.js as ValueFrom
        'class': 'Expression',
        engine: '#cwl-js-engine',
        script: ''
    });