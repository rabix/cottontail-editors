angular.module('registryApp.common')
    .service('Globals', function() {
        return {
            "theme": "cgc",
            "pageSection": "projects",
            "pageSubSection": "apps",
            "currencySign": "$",
            "environment": "beta",
            "metaSchema": {
                "chunk": {
                    "regex": "^[-+]?\\d*?\\d*$",
                    "type": "integer",
                    "id": "chunk",
                    "regexErrMsg": "Chunk number must be an integer.",
                    "description": "This field is for special cases when sequencing reads from a single library have been split over multiple files. In most cases this will be left blank.",
                    "name": "Chunk number"
                },
                "sample": {
                    "regex": "^[0-9a-zA-Z_.-]*$",
                    "type": "string",
                    "id": "sample",
                    "regexErrMsg": "Sample ID may only contain English letters, numbers, '-', '_' and '.'",
                    "description": "You can name your sample here. Generally a single DNA library is prepared from a single sample and run in a single lane/slide of the sequencing platform. If this is not the case for your experiment, please fill in the next two fields. This will populate the @RG:SM filed in the alignment file.",
                    "name": "Sample ID"
                },
                "paired_end": {
                    "type": "enum",
                    "id": "paired_end",
                    "description": "Is your data paired end? If not, leave this blank. If so, select 1 or 2 for the first or second file of paired end data associated with a single sample or library.",
                    "values": ["1", "2"],
                    "name": "Paired End"
                },
                "qual_scale": {
                    "type": "enum",
                    "id": "qual_scale",
                    "description": "Quality scale encoding. If you have a BAM file, quality scale should always be set to 'sanger'.",
                    "values": ["sanger", "illumina13", "illumina15", "illumina18", "solexa"],
                    "name": "Quality scale"
                },
                "platform_unit": {
                    "regex": "^[0-9a-zA-Z_.-]*$",
                    "type": "string",
                    "id": "platform_unit",
                    "regexErrMsg": "Lane/slide may only contain English letters, numbers, '-', '_' and '.'",
                    "description": "Some large sequencing libraries (such as whole genome libraries) may be split over multiple lanes (Illumina) or slides (SOLiD). If this is the case, enter a lane/slide unit ID here. Lane/slide ID can also be referred to as \"platform unit.\" This will populate the @RG:PU field in the alignment file.",
                    "name": "Lane/slide"
                },
                "seq_tech": {
                    "type": "enum",
                    "id": "seq_tech",
                    "description": "Select the technology used to generate this library file. This will populate the @RG:PL field in the alignment file.",
                    "values": ["454", "Helicos", "Illumina", "Solid", "IonTorrent", "PacBio"],
                    "name": "Sequencing technology"
                },
                "library": {
                    "regex": "^[0-9a-zA-Z_.-]*$",
                    "type": "string",
                    "id": "library",
                    "regexErrMsg": "Library ID may only contain English letters, numbers, '-', '_' and '.'",
                    "description": "If your have sequenced a single sample multiple times, you may have more than one library file corresponding to a single sample. If this is the case, enter a library ID here.  Otherwise leave it blank. Some downstream analyses group by library and others by sample. This will populate the @RG:LB field in the alignment file.",
                    "name": "Library ID"
                },
                "file_type": {
                    "regex": "^[0-9a-zA-Z_.-]*$",
                    "type": "enum",
                    "id": "file_type",
                    "values": ["text", "binary", "fasta", "fastq", "qual", "bam", "bam_index", "illumina_export", "vcf", "sam", "sff", "bed", "archive", "xsq", "csfasta", "juncs", "gtf", "gff", "enlis_genome", "bcf", "bax.h5", "plx.h5", "cmp.h5", "frg", "wig", "bigwig", "bigbed", "bedgraph"],
                    "description": "What type of file are you uploading? The drop down list shows all file types currently supported on SBG. If you don't see the file format you have uploaded here, send us feedback.",
                    "name": "File type"
                }
            },
            "publicProject": {
                "id": "17dcf490-bf02-400b-a7c1-685c52209380",
                "type": "REPO",
                "isRabix": false,
                "isPublic": true
            },
            "stashProject": {
                "id": "1a81fa00-f0fc-4291-8ba2-f66e5b1ba437",
                "slug": "admin",
                "createdByUsername": "admin",
                "isRabix": false,
                "type": "STASH"
            },
            "urlTemplates": {
                "user": {
                    "project": {
                        "list": "/u/<projectOwner>/",
                        "details": "/u/<projectOwner>/<projectSlug>/"
                    },
                    "task": {
                        "list": "/u/<projectOwner>/<projectSlug>/tasks/",
                        "details": "/u/<projectOwner>/<projectSlug>/tasks/<taskId>/",
                        "stats": "/u/<projectOwner>/<projectSlug>/tasks/<taskId>/stats/"
                    },
                    "rabixApp": {
                        "list": "/u/<projectOwner>/<projectSlug>/apps/#",
                        "details": "/u/<projectOwner>/<projectSlug>/apps/#<appSlug>/",
                        "detailsRevision": "/u/<projectOwner>/<projectSlug>/apps/#<appSlug>/<appRevision>",
                        "edit": "/u/<projectOwner>/<projectSlug>/apps/<appSlug>/edit/?type=<appType>"
                    },
                    "pipeline": {
                        "list": "/u/<projectOwner>/<projectSlug>/pipelines/",
                        "details": "/u/<projectOwner>/<projectSlug>/pipelines/<pipelineId>/",
                        "detailsRevision": "/u/<projectOwner>/<projectSlug>/pipelines/<pipelineId>/?revision=<pipelineRev>",
                        "editRevision": "/u/<projectOwner>/<projectSlug>/pipelines/<pipelineId>/edit/?revision=<pipelineRev>"
                    },
                    "publicPipeline": {
                        "list": "/u/<projectOwner>/<projectSlug>/pipelines/",
                        "details": "/u/<projectOwner>/<projectSlug>/pipelines/<pipelineId>/",
                        "detailsRevision": "/u/<projectOwner>/<projectSlug>/pipelines/<pipelineId>/?version=<pipelineRev>",
                        "editRevision": "/u/<projectOwner>/<projectSlug>/pipelines/<pipelineId>/edit/?version=<pipelineRev>"
                    },
                    "file": {
                        "list": "/u/<projectOwner>/<projectSlug>/files/",
                        "details": "/u/<projectOwner>/<projectSlug>/files/<fileId>/",
                        "publish": "/files/view/<publishHash>-<baseHash>/<fileName>"
                    },
                    "payment": {
                        "list": "/payments/",
                        "details": "/payments/details/<billingGroupId>/",
                        "create": "/payments/create/"
                    },
                    "genomeBrowserFileAnalysis": {"analysis": "/u/<projectOwner>/<projectSlug>/analysis/#files:<fileSlug>"}
                },
                "sbg": {
                    "pipeline": {
                        "list": "/public/pipelines/",
                        "details": "/public/pipelines/<pipelineId>/",
                        "detailsRevision": "/public/pipelines/<pipelineId>/?revision=<pipelineRev>",
                        "editRevision": "/public/pipelines/<pipelineId>/edit/?revision=<pipelineRev>"
                    },
                    "publicPipeline": {
                        "list": "/public/pipelines/",
                        "details": "/public/pipelines/<pipelineId>/",
                        "detailsRevision": "/public/pipelines/<pipelineId>/?version=<pipelineRev>",
                        "editRevision": "/public/pipelines/<pipelineId>/edit/?version=<pipelineRev>"
                    },
                    "app": {"list": "/apps/#", "details": "/apps/#<appId>"},
                    "publicRabixWorkflow": {
                        "list": "/public/apps/#workflow/",
                        "details": "/public/apps/#workflow/<appProjectOwner>/<appProjectSlug>/<appSlug>/",
                        "detailsRevision": "/public/apps/#workflow/<appProjectOwner>/<appProjectSlug>/<appSlug>/<appRevision>"
                    },
                    "publicRabixTool": {
                        "list": "/public/apps/#tool/",
                        "details": "/public/apps/#tool/<appProjectOwner>/<appProjectSlug>/<appSlug>/",
                        "detailsRevision": "/public/apps/#tool/<appProjectOwner>/<appProjectSlug>/<appSlug>/<appRevision>"
                    },
                    "file": {
                        "list": "/public/files/",
                        "details": "/public/files/<fileId>/",
                        "publish": "/files/view/<publishHash>-<baseHash>/<fileName>"
                    },
                    "payment": {
                        "list": "/payments/",
                        "details": "/payments/details/<billingGroupId>/",
                        "create": "/payments/create/"
                    },
                    "genomeBrowserFileAnalysis": {"analysis": "/public/analysis/#files:<fileSlug>"}
                },
                "my": {
                    "pipeline": {
                        "list": "/my/pipelines/",
                        "details": "/my/pipelines/<pipelineId>/",
                        "detailsRevision": "/my/pipelines/<pipelineId>/?revision=<pipelineRev>",
                        "editRevision": "/my/pipelines/<pipelineId>/edit/?revision=<pipelineRev>"
                    },
                    "publicPipeline": {
                        "list": "/my/pipelines/",
                        "details": "/my/pipelines/<pipelineId>/",
                        "detailsRevision": "/my/pipelines/<pipelineId>/?version=<pipelineRev>",
                        "editRevision": "/my/pipelines/<pipelineId>/edit/?version=<pipelineRev>"
                    },
                    "file": {
                        "list": "/my/files/",
                        "details": "/my/files/<fileId>/",
                        "publish": "/files/view/<publishHash>-<baseHash>/<fileName>"
                    },
                    "payment": {
                        "list": "/payments/",
                        "details": "/payments/details/<billingGroupId>/",
                        "create": "/payments/create/"
                    },
                    "genomeBrowserFileAnalysis": {"analysis": "/my/analysis/#files:<fileSlug>"}
                },
                "loginWithRedirect": "/login/?next=<redirectionUrl>"
            },
            "base": "/static/",
            "apiUrls": {
                "pilososHost": "https://staging-pilosos.sbgenomics.com:28044",
                "moriartyLogUrl": "https://staging-moriarty.sbgenomics.com:4242/js/",
                "publicAPI": "https://staging-api.sbgenomics.com:27444",
                "watson": "https://staging-watson.sbgenomics.com/v1/projects/",
                "brood": "https://staging-brood.sbgenomics.com/v1/",
                "gatekeeper": "https://staging-gatekeeper.sbgenomics.com:27778",
                "gringotts": "https://staging-gringotts.sbgenomics.com",
                "vaporStore": "https://staging-fs.sbgenomics.com",
                "peon": "https://staging-peon.sbgenomics.com/v0/tasks/",
                "hatchery": "https://staging-hatchery.sbgenomics.com",
                "userPreferences": "/options/prefs/",
                "userProfile": "/user/<username>/",
                "susuwatari": "https://staging-susuwatari.sbgenomics.com:28888",
                "manaus": "https://staging-manaus.sbgenomics.com:8443",
                "genomeReaderUrl": "https://staging-genome-reader.sbgenomics.com:4787",
                "genomeBrowserUrl": "https://staging-luceafarul.sbgenomics.com",
                "kvericaUrl": "https://staging-kverica.sbgenomics.com",
                "logout": "https://staging-gatekeeper.sbgenomics.com:27778/v1/session/close",
                "log": "/log/",
                "comments": "/comment/"
            },
            "settings": {
                "theme": "cgc",
                "localisation": "cgc",
                "platform": "",
                "currencySign": "$",
                "freeCredit": "100",
                "killSessionAfterSeconds": 86400,
                "showKillSessionWarningBeforeSeconds": 300,
                "devProjectIsDefault": false,
                "useNewMetadataSchema": false,
                "allowTCGAProjects": false,
                "allowTCGAFiles": false,
                "allowArchivingFiles": false,
                "useEmptyStates": false,
                "billingGroupCreationEnabled": false,
                "tags": {"tcga": ""}
            },
            "urls": {
                "caseExplorer": "/tcga/#app/case-explorer",
                "dataExplorer": "/tcga/#app/data-browser",
                "returnToPreviousPage": "/u/admin/grapefruit/apps/new-tool/edit/?type=tool&amp;rev=0",
                "apiDocs": "https://developer.sbgenomics.com/",
                "appsDocsLink": "https://docs.sbgenomics.com/display/developerhub/The+Tool+Editor",
                "pipelinesDocsLink": "https://docs.sbgenomics.com/display/sbg/Pipelines",
                "filesDocsLink": "https://docs.sbgenomics.com/display/sbg/Add+Files",
                "tasksDocsLink": "https://docs.sbgenomics.com/display/sbg/Execute+a+Pipeline",
                "membersDocsLink": "https://docs.sbgenomics.com/display/sbg/Manage+Project+Members",
                "projectsDocsLink": "https://docs.sbgenomics.com/display/sbg/Projects",
                "sdkDocs": "http://pythonhosted.org/sbgsdk/tutorial.html",
                "uploaderUserGuide": "https://docs.sbgenomics.com/display/sbg/Add+Files#AddFiles-AddfileswiththeSevenBridgesUploader",
                "uploaderFilePathLinux32": "/uploader/SBG_Uploader32.sh",
                "uploaderFilePathLinux64": "/uploader/SBG_Uploader64.sh",
                "uploaderFilePathMac": "/uploader/SBG_Uploader.dmg",
                "uploaderFilePathWindows32": "/uploader/SBG_Uploader32.exe",
                "uploaderFilePathWindows64": "/uploader/SBG_Uploader64.exe",
                "commandlineFilePath": "/sbg-uploader/sbg-uploader.tgz",
                "commandlineUserGuide": "https://docs.sbgenomics.com/display/developerhub/Command+Line+Uploader",
                "commandLineOptions": "https://docs.sbgenomics.com/display/developerhub/Command+Line+Uploader#CommandLineUploader-Commandlineoptions",
                "billingEmailAddress": "sales@sbgenomics.com"
            },
            "user": {
                "permissions": {
                    "canCopy": true,
                    "canWrite": true,
                    "canExec": true,
                    "isAdmin": true,
                    "isOwner": true,
                    "canPublish": false
                },
                "id": "40afcc1f-c3b7-42b6-99b6-e61c7976a408",
                "platformId": "40afcc1f-c3b7-42b6-99b6-e61c7976a408",
                "sessionId": "72ba0bf6-92e4-4db5-9541-e000a7e6ad1f",
                "tags": [],
                "name": "admin",
                "fullName": "Admin",
                "affiliation": "SBG",
                "phone": "+381111111111",
                "email": "spam@sbgenomics.com",
                "gravatarUrl": "https://secure.gravatar.com/avatar/4eccf0ae952b0f4bdd6173c0a0d0385d?d=mm",
                "stashId": "1a81fa00-f0fc-4291-8ba2-f66e5b1ba437",
                "stashRemoteId": "1a81fa00-f0fc-4291-8ba2-f66e5b1ba437",
                "memberSince": "March 26, 2013, 3:19 a.m.",
                "isStaff": true,
                "preferences": {
                    "cwl-apps-picker": {"itemCount": 25},
                    "pipelineNumofRows": "25",
                    "apps": {"itemCount": 50, "order": {"direction": "desc", "by": "name"}},
                    "genomeBrowser_GB_SESSION_7f7315f6-2297-4abe-ba09-19d282da3df1": [{
                        "undoData": {
                            "bam": "https://staging-genome-reader.sbgenomics.com:4787/bam/readd",
                            "start": "77411491",
                            "fasta": {
                                "fai_url": "sbg:///file/52d69fc0e4b0a77ec4fd2066",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "77412491",
                            "chr": "6",
                            "updatePositionValues": true
                        }
                    }],
                    "genomeBrowser_55a767eee4b0db201e76dae4": [{
                        "undoData": {
                            "bam": "https://staging-genome-reader.sbgenomics.com:4787/bam/readd",
                            "start": "4500000",
                            "fasta": {
                                "fai_url": "sbg:///file/52d69fc0e4b0a77ec4fd2066",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "4501000",
                            "chr": "1",
                            "updatePositionValues": true
                        }
                    }],
                    "genomeBrowser_GB_SESSION_29c7fc8f-8377-4fa1-905f-abddc5315012": [{
                        "undoData": {
                            "bam": "https://staging-genome-reader.sbgenomics.com:4787/bam/readd",
                            "start": "23952968",
                            "fasta": {
                                "fai_url": "sbg:///file/52d69fc0e4b0a77ec4fd2065",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/52d69fc0e4b0a77ec4fd20a9"
                            },
                            "end": "23953968",
                            "chr": "chr17",
                            "updatePositionValues": true
                        }
                    }],
                    "genomeBrowser_52e0ed10e4b069f418bd26c7": [{
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "63023826",
                            "fasta": {
                                "fai_url": "sbg:///file/52e0ed10e4b069f418be4523",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4567"
                            },
                            "end": "63025326",
                            "chr": "chr13",
                            "updatePositionValues": true
                        }
                    }],
                    "genomeBrowser_497880": [{
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "30295722",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "30296562",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "15349680",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "15350520",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "30295722",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "30296002",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "30295786",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "30296066",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "30295740",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "30296020",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "30295710",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "30295990",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "30295655",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "30295935",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "30295605",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "30295885",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "12404055",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "12404335",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "14755150",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "14755430",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "14755221",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "14755222",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "14755221",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "14755222",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "14755221",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "14755222",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "14755221",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "14755222",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "14755220",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "14755223",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "14755217",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "14755226",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "14755208",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "14755235",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "14755181",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "14755262",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "14755100",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "14755343",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "14754857",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "14755586",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "14754128",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "14756315",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "14751941",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "14758502",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "14745380",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "14765063",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "14751941",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "14758502",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "14754128",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "14756315",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "14754857",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "14755586",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "14754801",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "14755530",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "14754933",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "14755662",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "14754983",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "14755712",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "14755264",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "14755265",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "14755264",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "14755265",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "14755264",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "14755265",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "14755264",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "14755265",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "14755263",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "14755266",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "14755260",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "14755269",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "14755251",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "14755278",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "14755224",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "14755305",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "14755143",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "14755386",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "14754900",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "14755629",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "14754171",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "14756358",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "14753998",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "14756185",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "14754756",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "14756943",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "14756108",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "14758295",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "13890380",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "13892567",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "13268826",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "13271013",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "11728453",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "11730640",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "9296285",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "9298472",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "6783045",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "6785232",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "5080528",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "5082715",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "2918601",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "2920788",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "25267519",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "25269706",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "23321785",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "23323972",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "25808001",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "25810188",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "26943013",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "26945200",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "28483385",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "28485572",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "26591699",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "26593886",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "26592579",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "26592756",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "26592650",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "26592661",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "26592654",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "26592656",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "26592655",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "26592656",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "26592655",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "26592656",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "26592655",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "26592656",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "26592654",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "26592657",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "26592651",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "26592660",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "26592642",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "26592669",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "26592615",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "26592696",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "26592534",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "26592777",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "26592291",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "26593020",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "26592356",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "26593085",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "26592312",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "26593041",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "26592274",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "26593003",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "22646183",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "22646912",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20889618",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20890347",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888889",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20891076",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20886702",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20893263",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20886083",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20892644",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20885696",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20892257",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888492",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888610",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888531",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888554",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888542",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888543",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888542",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888543",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888543",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888544",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888543",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888544",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888543",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888544",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888542",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888545",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888539",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888548",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888530",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888557",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888503",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888584",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888422",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888665",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888410",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888653",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888403",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888646",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888403",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888646",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888511",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888513",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888512",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888513",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888512",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888513",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888512",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888513",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888511",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888514",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888508",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888517",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888499",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888526",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888472",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888553",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888472",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888553",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888510",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888511",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888510",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888511",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888510",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888511",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888510",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888511",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888510",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888511",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888510",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888511",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888510",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888511",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888510",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888511",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888509",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888512",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888506",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888515",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888497",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888524",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888470",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888551",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888389",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888632",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888493",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888736",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888490",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888733",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888487",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888730",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888479",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888722",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888474",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888717",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888564",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888566",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888562",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888568",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888556",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888574",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888538",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888592",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888484",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888646",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888484",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888646",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888545",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888548",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888542",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888551",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888533",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888560",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888506",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888587",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888425",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888668",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888182",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888911",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20887453",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20889640",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20887314",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20889501",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888402",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888700",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20888104",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20888998",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "20887210",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "20889892",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "10539393",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "10542075",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "10536711",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "10544757",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "10528665",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "10552803",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "10504527",
                            "fasta": {
                                "fai_url": "sbg:///file/371773",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/23328"
                            },
                            "end": "10576941",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }],
                    "dashboard": {},
                    "genomeBrowser_548afa3be4b0183f51908b15": [{
                        "undoData": {
                            "bam": "https://beta2-64.sbgenomics.com:4787/bam/reads",
                            "start": "146527812",
                            "fasta": {
                                "fai_url": "sbg:///file/52d69fc0e4b0a77ec4fd2066",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52d69fc0e4b0a77ec4fd2072"
                            },
                            "end": "146528813",
                            "chr": "1",
                            "updatePositionValues": true
                        }
                    }],
                    "genomeBrowser_5321d69be4b06eea9f1523cf": [{
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "8281512",
                            "fasta": {
                                "fai_url": "sbg:///file/52e0ed10e4b069f418be4524",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "8281794",
                            "chr": "17",
                            "updatePositionValues": true
                        }
                    }],
                    "pipelinepicker": {"visibleColumnsIndex": [0, 4, 5, 6]},
                    "genomeBrowser_558c2bd2e4b0ea1bb1f0320a": [{
                        "undoData": {
                            "bam": "https://staging-genome-reader.sbgenomics.com:4787/bam/readd",
                            "start": "4500000",
                            "fasta": {
                                "fai_url": "sbg:///file/52d69fc0e4b0a77ec4fd2066",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "4501000",
                            "chr": "1",
                            "updatePositionValues": true
                        }
                    }],
                    "genomeBrowser_556ec9f5e4b0a86834a2d115": [{
                        "undoData": {
                            "bam": "https://staging-genome-reader.sbgenomics.com:4787/bam/readd",
                            "start": "4500000",
                            "fasta": {
                                "fai_url": "sbg:///file/52d69fc0e4b0a77ec4fd2066",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52d69fc0e4b0a77ec4fd2072"
                            },
                            "end": "4501000",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }],
                    "pipelines": {"visibleColumnsIndex": [0, 1, 2, 3, 4], "order": {"direction": "asc", "by": "name"}},
                    "genomeBrowser_56b0ce9560b222b0e4ecb063": [{
                        "undoData": {
                            "bam": "https://staging-genome-reader.sbgenomics.com:4787/bam/readd",
                            "start": "4500000",
                            "fasta": {
                                "fai_url": "sbg:///file/52d69fc0e4b0a77ec4fd2065",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/52d69fc0e4b0a77ec4fd20a9"
                            },
                            "end": "4501000",
                            "chr": "chr1",
                            "updatePositionValues": true
                        }
                    }],
                    "genomeBrowser_54883b6ee4b0a0a666e687e6": [{
                        "undoData": {
                            "bam": "https://staging-genome-reader.sbgenomics.com:4787/bam/readd",
                            "start": "4500000",
                            "fasta": {
                                "fai_url": "sbg:///file/52d69fc0e4b0a77ec4fd2065",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/52d69fc0e4b0a77ec4fd20a9"
                            },
                            "end": "4501000",
                            "chr": "chr1",
                            "updatePositionValues": true
                        }
                    }],
                    "setup_finished": true,
                    "genomeBrowser_56b1ceac60b20a933aaafc7e": [{
                        "undoData": {
                            "bam": "https://staging-genome-reader.sbgenomics.com:4787/bam/readd",
                            "start": "4500000",
                            "fasta": {
                                "fai_url": "sbg:///file/52d69fc0e4b0a77ec4fd2066",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "4501000",
                            "chr": "1",
                            "updatePositionValues": true
                        }
                    }],
                    "genomeBrowser_GB_SESSION_405733a3-6ce1-40a0-b027-37d57954f09f": [{
                        "undoData": {
                            "bam": "https://staging-genome-reader.sbgenomics.com:4787/bam/readd",
                            "start": "56560718",
                            "fasta": {
                                "fai_url": "sbg:///file/52d69fc0e4b0a77ec4fd2066",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "56561718",
                            "chr": "17",
                            "updatePositionValues": true
                        }
                    }],
                    "genomeBrowser_GB_SESSION_523adea2-e1df-43e7-b349-766b4c00d8bd": [{
                        "undoData": {
                            "bam": "https://staging-genome-reader.sbgenomics.com:4787/bam/readd",
                            "start": "5751937",
                            "fasta": {
                                "fai_url": "sbg:///file/52d69fc0e4b0a77ec4fd2065",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/52d69fc0e4b0a77ec4fd20a9"
                            },
                            "end": "5752937",
                            "chr": "chr15",
                            "updatePositionValues": true
                        }
                    }],
                    "genomeBrowser_GB_SESSION_7b618620-d49f-4763-bd2a-c16a8e399a0f": [{
                        "undoData": {
                            "bam": "https://staging-genome-reader.sbgenomics.com:4787/bam/readd",
                            "start": "4500000",
                            "fasta": {
                                "fai_url": "sbg:///file/52d69fc0e4b0a77ec4fd2065",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/52d69fc0e4b0a77ec4fd20a9"
                            },
                            "end": "4501000",
                            "chr": "chr1",
                            "updatePositionValues": true
                        }
                    }],
                    "projects": {"rowCount": 100, "order": {"direction": "desc", "by": "createdByUsername"}},
                    "genomeBrowser_567bb85e60b23cce8013a138": [{
                        "undoData": {
                            "bam": "https://staging-genome-reader.sbgenomics.com:4787/bam/readd",
                            "start": "4500000",
                            "fasta": {
                                "fai_url": "sbg:///file/52d69fc0e4b0a77ec4fd2065",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/52d69fc0e4b0a77ec4fd20a9"
                            },
                            "end": "4501000",
                            "chr": "chr1",
                            "updatePositionValues": true
                        }
                    }],
                    "appssdsf": {"order": {"direction": "asc", "by": "modifiedBy"}},
                    "chrome_multi_download_ntf": true,
                    "genomeBrowser_567bb8bb60b231439744653e": [{
                        "undoData": {
                            "bam": "https://staging-genome-reader.sbgenomics.com:4787/bam/readd",
                            "start": "4500000",
                            "fasta": {
                                "fai_url": "sbg:///file/52d69fc0e4b0a77ec4fd2065",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/52d69fc0e4b0a77ec4fd20a9"
                            },
                            "end": "4501000",
                            "chr": "chr1",
                            "updatePositionValues": true
                        }
                    }],
                    "sortData": [1, "asc", 0],
                    "genomeBrowser_GB_SESSION_d03e2ef0-910e-4220-9bd2-0681f03cbb2d": [{
                        "undoData": {
                            "bam": "https://staging-genome-reader.sbgenomics.com:4787/bam/readd",
                            "start": "196256954",
                            "fasta": {
                                "fai_url": "sbg:///file/52d69fc0e4b0a77ec4fd2066",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "196257954",
                            "chr": "1",
                            "updatePositionValues": true
                        }
                    }],
                    "genomeBrowser_5371ed82e4b0fc3f7424c318": [{
                        "undoData": {
                            "bam": "https://beta2-53.sbgenomics.com:4787/bam/reads",
                            "start": "30581931",
                            "fasta": {
                                "fai_url": "sbg:///file/52d69fc0e4b0a77ec4fd2066",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52d69fc0e4b0a77ec4fd2072"
                            },
                            "end": "30582931",
                            "chr": "20",
                            "updatePositionValues": true
                        }
                    }],
                    "files": {
                        "rowCount": 100,
                        "visibleColumnsIndex": [0, 1, 2, 4, 5, 10],
                        "order": {"by": "size", "order": "asc", "direction": "desc"}
                    },
                    "_messages_": [{
                        "type": "warning",
                        "id": "18434a36-4f8f-401b-bb2f-11a7e4557938",
                        "close_button_text": "",
                        "close_button_icon": "",
                        "loc": null,
                        "content": "<p>test</p>",
                        "close_button_class_name": "",
                        "role": null,
                        "has_close_button": true,
                        "content_no_escape": true
                    }],
                    "genomeBrowser_5356c908e4b0715189ebd452": [{
                        "undoData": {
                            "bam": "https://bioteam.sbgenomics.com:4787/bam/reads",
                            "start": "223398428",
                            "fasta": {
                                "fai_url": "sbg:///file/52d69fc0e4b0a77ec4fd2066",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52d69fc0e4b0a77ec4fd2072"
                            },
                            "end": "223398465",
                            "chr": "1",
                            "updatePositionValues": true
                        }
                    }],
                    "genomeBrowser_GB_SESSION_5108a326-3b7f-48c7-9304-a13e2f26ecf1": [{
                        "undoData": {
                            "bam": "https://staging-genome-reader.sbgenomics.com:4787/bam/readd",
                            "start": "4500000",
                            "fasta": {
                                "fai_url": "sbg:///file/52d69fc0e4b0a77ec4fd2065",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/52d69fc0e4b0a77ec4fd20a9"
                            },
                            "end": "4501000",
                            "chr": "chr1",
                            "updatePositionValues": true
                        }
                    }],
                    "genomeBrowser_GB_SESSION_6da14ddb-1a11-4bbc-8d3a-1fa51af7daf5": [{
                        "undoData": {
                            "bam": "https://staging-genome-reader.sbgenomics.com:4787/bam/readd",
                            "start": "113600649",
                            "fasta": {
                                "fai_url": "sbg:///file/52d69fc0e4b0a77ec4fd2066",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "113601649",
                            "chr": "10",
                            "updatePositionValues": true
                        }
                    }],
                    "quarantine_notification": false,
                    "genomeBrowser_GB_SESSION_7d4e9255-a4a8-4b1c-a69a-035aecdb4bd7": [{
                        "undoData": {
                            "bam": "https://staging-genome-reader.sbgenomics.com:4787/bam/readd",
                            "start": "4499921",
                            "fasta": {
                                "fai_url": "sbg:///file/52d69fc0e4b0a77ec4fd2066",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "4500921",
                            "chr": "1",
                            "updatePositionValues": true
                        }
                    }],
                    "genomeBrowser_52f0a2e6e4b0c354d75beeed": [{
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "4499934",
                            "fasta": {
                                "fai_url": "sbg:///file/52e0ed10e4b069f418be4524",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "4500934",
                            "chr": "1",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "4499901",
                            "fasta": {
                                "fai_url": "sbg:///file/52e0ed10e4b069f418be4524",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "4500901",
                            "chr": "1",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "4500234",
                            "fasta": {
                                "fai_url": "sbg:///file/52e0ed10e4b069f418be4524",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "4500567",
                            "chr": "1",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "4500271",
                            "fasta": {
                                "fai_url": "sbg:///file/52e0ed10e4b069f418be4524",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "4500604",
                            "chr": "1",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "4500378",
                            "fasta": {
                                "fai_url": "sbg:///file/52e0ed10e4b069f418be4524",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "4500711",
                            "chr": "1",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "4500402",
                            "fasta": {
                                "fai_url": "sbg:///file/52e0ed10e4b069f418be4524",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "4500735",
                            "chr": "1",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "137990518",
                            "fasta": {
                                "fai_url": "sbg:///file/52e0ed10e4b069f418be4524",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "137990851",
                            "chr": "1",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "137990716",
                            "fasta": {
                                "fai_url": "sbg:///file/52e0ed10e4b069f418be4524",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "137991049",
                            "chr": "1",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "137990795",
                            "fasta": {
                                "fai_url": "sbg:///file/52e0ed10e4b069f418be4524",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "137991128",
                            "chr": "1",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "137990685",
                            "fasta": {
                                "fai_url": "sbg:///file/52e0ed10e4b069f418be4524",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "137991018",
                            "chr": "1",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "137990658",
                            "fasta": {
                                "fai_url": "sbg:///file/52e0ed10e4b069f418be4524",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "137990991",
                            "chr": "1",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "137990599",
                            "fasta": {
                                "fai_url": "sbg:///file/52e0ed10e4b069f418be4524",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "137990932",
                            "chr": "1",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "137990520",
                            "fasta": {
                                "fai_url": "sbg:///file/52e0ed10e4b069f418be4524",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "137990853",
                            "chr": "1",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "137990421",
                            "fasta": {
                                "fai_url": "sbg:///file/52e0ed10e4b069f418be4524",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "137990754",
                            "chr": "1",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "137990310",
                            "fasta": {
                                "fai_url": "sbg:///file/52e0ed10e4b069f418be4524",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "137990643",
                            "chr": "1",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "137990358",
                            "fasta": {
                                "fai_url": "sbg:///file/52e0ed10e4b069f418be4524",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "137990691",
                            "chr": "1",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "137990285",
                            "fasta": {
                                "fai_url": "sbg:///file/52e0ed10e4b069f418be4524",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "137990618",
                            "chr": "1",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "137990253",
                            "fasta": {
                                "fai_url": "sbg:///file/52e0ed10e4b069f418be4524",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "137990586",
                            "chr": "1",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "137990244",
                            "fasta": {
                                "fai_url": "sbg:///file/52e0ed10e4b069f418be4524",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "137990577",
                            "chr": "1",
                            "updatePositionValues": true
                        }
                    }],
                    "genomeBrowser_GB_SESSION_54051625-643c-4b98-bd38-7cf7baa9aab7": [{
                        "undoData": {
                            "bam": "https://staging-genome-reader.sbgenomics.com:4787/bam/readd",
                            "start": "83882421",
                            "fasta": {
                                "fai_url": "sbg:///file/52d69fc0e4b0a77ec4fd2066",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "83980836",
                            "chr": "13",
                            "updatePositionValues": true
                        }
                    }],
                    "genomeBrowser_GB_SESSION_5e9cf559-8cd1-4870-8e71-2d7e99ee8a9e": [{
                        "undoData": {
                            "bam": "https://staging-genome-reader.sbgenomics.com:4787/bam/readd",
                            "start": "27574189",
                            "fasta": {
                                "fai_url": "sbg:///file/52d69fc0e4b0a77ec4fd2066",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "27575194",
                            "chr": "13",
                            "updatePositionValues": true
                        }
                    }],
                    "genomeBrowser_GB_SESSION_8eef6b31-0b99-4833-8877-16c446258112": [{
                        "undoData": {
                            "bam": "https://staging-genome-reader.sbgenomics.com:4787/bam/readd",
                            "start": "80767046",
                            "fasta": {
                                "fai_url": "sbg:///file/52d69fc0e4b0a77ec4fd2066",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "80767378",
                            "chr": "9",
                            "updatePositionValues": true
                        }
                    }],
                    "login_count": 4325,
                    "tasks": {"rowCount": 50, "order": {"direction": "asc", "by": "startedOn"}},
                    "genomeBrowser_55cc6f07e4b092e7cdcd1a08": [{
                        "undoData": {
                            "bam": "https://staging-genome-reader.sbgenomics.com:4787/bam/readd",
                            "start": "4500000",
                            "fasta": {
                                "fai_url": "sbg:///file/52d69fc0e4b0a77ec4fd2066",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "4501000",
                            "chr": "1",
                            "updatePositionValues": true
                        }
                    }],
                    "genomeBrowser_556ec9f5e4b0a86834a2d11d": [{
                        "undoData": {
                            "bam": "https://staging-genome-reader.sbgenomics.com:4787/bam/readd",
                            "start": "4500000",
                            "fasta": {
                                "fai_url": "sbg:///file/52d69fc0e4b0a77ec4fd2065",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/52d69fc0e4b0a77ec4fd20a9"
                            },
                            "end": "4501000",
                            "chr": "chr1",
                            "updatePositionValues": true
                        }
                    }],
                    "genomeBrowser_56b0ce9560b222b0e4ecb073": [{
                        "undoData": {
                            "bam": "https://staging-genome-reader.sbgenomics.com:4787/bam/readd",
                            "start": "4500000",
                            "fasta": {
                                "fai_url": "sbg:///file/52d69fc0e4b0a77ec4fd2065",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/52d69fc0e4b0a77ec4fd20a9"
                            },
                            "end": "4501000",
                            "chr": "chr1",
                            "updatePositionValues": true
                        }
                    }],
                    "taskNumofRows": "50",
                    "genomeBrowser_5326a905e4b06eea9f1544b1": [{
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "1",
                            "fasta": {
                                "fai_url": "sbg:///file/52e0ed10e4b069f418be4524",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "249250621",
                            "chr": "1",
                            "updatePositionValues": true
                        }
                    }],
                    "visibleColumnsIndex": [0, 1, 2, 3, 12],
                    "task": {},
                    "genomeBrowser_GB_SESSION_c6bcc1b1-9d43-451b-be37-3cf18a8c826b": [{
                        "undoData": {
                            "bam": "https://staging-genome-reader.sbgenomics.com:4787/bam/readd",
                            "start": "202646153",
                            "fasta": {
                                "fai_url": "sbg:///file/52d69fc0e4b0a77ec4fd2066",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "202646172",
                            "chr": "1",
                            "updatePositionValues": true
                        }
                    }],
                    "expandOnRedraw": false,
                    "genomeBrowser_543bf13be4b0d2dc6b0cb8cb": [{
                        "undoData": {
                            "bam": "https://staging-genome-reader.sbgenomics.com:4787/bam/readd",
                            "start": "4500000",
                            "fasta": {
                                "fai_url": "sbg:///file/52d69fc0e4b0a77ec4fd2066",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "4501000",
                            "chr": "1",
                            "updatePositionValues": true
                        }
                    }],
                    "isChecklistHidden": false,
                    "genomeBrowser_519282": [{
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "1647745",
                            "fasta": {
                                "fai_url": "sbg:///file/371772",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/242424"
                            },
                            "end": "1647746",
                            "chr": "1",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "1647744",
                            "fasta": {
                                "fai_url": "sbg:///file/371772",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/242424"
                            },
                            "end": "1647747",
                            "chr": "1",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "1647741",
                            "fasta": {
                                "fai_url": "sbg:///file/371772",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/242424"
                            },
                            "end": "1647750",
                            "chr": "1",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "1647732",
                            "fasta": {
                                "fai_url": "sbg:///file/371772",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/242424"
                            },
                            "end": "1647759",
                            "chr": "1",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "1647705",
                            "fasta": {
                                "fai_url": "sbg:///file/371772",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/242424"
                            },
                            "end": "1647786",
                            "chr": "1",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "1647624",
                            "fasta": {
                                "fai_url": "sbg:///file/371772",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/242424"
                            },
                            "end": "1647867",
                            "chr": "1",
                            "updatePositionValues": true
                        }
                    }, {
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "1647381",
                            "fasta": {
                                "fai_url": "sbg:///file/371772",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/242424"
                            },
                            "end": "1648110",
                            "chr": "1",
                            "updatePositionValues": true
                        }
                    }],
                    "skip_welcome": true,
                    "files_schema_v2": {
                        "visibleColumnsIndex": [0, 1, 2, 3, 10, 11, 13],
                        "order": {"direction": "desc", "by": "size"}
                    },
                    "genomeBrowser_56b0ce9560b222b0e4ecb05d": [{
                        "undoData": {
                            "bam": "https://staging-genome-reader.sbgenomics.com:4787/bam/readd",
                            "start": "4500000",
                            "fasta": {
                                "fai_url": "sbg:///file/52d69fc0e4b0a77ec4fd2066",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "4501000",
                            "chr": "1",
                            "updatePositionValues": true
                        }
                    }],
                    "genomeBrowser_GB_SESSION_a16f449b-c7be-453f-8d8c-57baee8abecc": [{
                        "undoData": {
                            "bam": "https://staging-genome-reader.sbgenomics.com:4787/bam/readd",
                            "start": "4500000",
                            "fasta": {
                                "fai_url": "sbg:///file/52d69fc0e4b0a77ec4fd2066",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "4501000",
                            "chr": "1",
                            "updatePositionValues": true
                        }
                    }],
                    "tool": {},
                    "fileNumofRows": "25",
                    "genomeBrowser_GB_SESSION_4e88f2a9-7bc7-4cfb-87f9-b37293fe1f10": [{
                        "undoData": {
                            "bam": "https://staging-genome-reader.sbgenomics.com:4787/bam/readd",
                            "start": "124625311",
                            "fasta": {
                                "fai_url": "sbg:///file/52d69fc0e4b0a77ec4fd2066",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "124626311",
                            "chr": "8",
                            "updatePositionValues": true
                        }
                    }],
                    "genomeBrowser_GB_SESSION_2c6874bd-b0bf-4016-a546-18d3923bcf5b": [{
                        "undoData": {
                            "bam": "https://staging-genome-reader.sbgenomics.com:4787/bam/readd",
                            "start": "58478030",
                            "fasta": {
                                "fai_url": "sbg:///file/52d69fc0e4b0a77ec4fd2066",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "58479029",
                            "chr": "9",
                            "updatePositionValues": true
                        }
                    }],
                    "genomeBrowser_GB_SESSION_0aac2d50-1adb-41cb-8562-d6d48a7d9208": [{
                        "undoData": {
                            "bam": "https://staging-genome-reader.sbgenomics.com:4787/bam/readd",
                            "start": "29239015",
                            "fasta": {
                                "fai_url": "sbg:///file/52d69fc0e4b0a77ec4fd2066",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52d69fc0e4b0a77ec4fd2072"
                            },
                            "end": "29240015",
                            "chr": "2",
                            "updatePositionValues": true
                        }
                    }],
                    "projectNumofRows": "50",
                    "genomeBrowser_557ad6e7e4b086a428288cc5": [{
                        "undoData": {
                            "bam": "https://staging-genome-reader.sbgenomics.com:4787/bam/readd",
                            "start": "4500000",
                            "fasta": {
                                "fai_url": "sbg:///file/52d69fc0e4b0a77ec4fd2066",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52d69fc0e4b0a77ec4fd2072"
                            },
                            "end": "4501000",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }],
                    "genomeBrowser_558c2bb2e4b0ea1bb1f03203": [{
                        "undoData": {
                            "bam": "https://staging-genome-reader.sbgenomics.com:4787/bam/readd",
                            "start": "4500000",
                            "fasta": {
                                "fai_url": "sbg:///file/52d69fc0e4b0a77ec4fd2066",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "4501000",
                            "chr": "1",
                            "updatePositionValues": true
                        }
                    }],
                    "genomeBrowser_GB_SESSION_60b4d8fa-d953-4a29-999a-babd42dbe526": [{
                        "undoData": {
                            "bam": "https://staging-genome-reader.sbgenomics.com:4787/bam/readd",
                            "start": "99699756",
                            "fasta": {
                                "fai_url": "sbg:///file/52d69fc0e4b0a77ec4fd2066",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "99700756",
                            "chr": "8",
                            "updatePositionValues": true
                        }
                    }],
                    "genomeBrowser_55a50623e4b05b54be7e96e7": [{
                        "undoData": {
                            "bam": "https://staging-genome-reader.sbgenomics.com:4787/bam/readd",
                            "start": "4500000",
                            "fasta": {
                                "fai_url": "sbg:///file/52d69fc0e4b0a77ec4fd2066",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52d69fc0e4b0a77ec4fd2072"
                            },
                            "end": "4501000",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }],
                    "tos_notification": false,
                    "taskfilepicker": {
                        "rowCount": 100,
                        "visibleColumnsIndex": [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11],
                        "order": {"direction": "asc", "by": "name"}
                    },
                    "project_dashboard": {},
                    "genomeBrowser_558bec13e4b0afb662b71e9a": [{
                        "undoData": {
                            "bam": "https://staging-genome-reader.sbgenomics.com:4787/bam/readd",
                            "start": "4500000",
                            "fasta": {
                                "fai_url": "sbg:///file/52d69fc0e4b0a77ec4fd2066",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "4501000",
                            "chr": "1",
                            "updatePositionValues": true
                        }
                    }],
                    "genomeBrowser_GB_SESSION_9457c9fe-d1eb-4360-b7a2-e4f7ca7bbd77": [{
                        "undoData": {
                            "bam": "https://staging-genome-reader.sbgenomics.com:4787/bam/readd",
                            "start": "4500242",
                            "fasta": {
                                "fai_url": "sbg:///file/52d69fc0e4b0a77ec4fd2066",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "4500575",
                            "chr": "1",
                            "updatePositionValues": true
                        }
                    }],
                    "genomeBrowser_GB_SESSION_86db7af6-6df4-4297-94c9-8dbdf8e0b321": [{
                        "undoData": {
                            "bam": "https://staging-genome-reader.sbgenomics.com:4787/bam/readd",
                            "start": "120190357",
                            "fasta": {
                                "fai_url": "sbg:///file/52d69fc0e4b0a77ec4fd2066",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4530"
                            },
                            "end": "120433357",
                            "chr": "8",
                            "updatePositionValues": true
                        }
                    }],
                    "filepicker": {
                        "rowCount": 100,
                        "visibleColumnsIndex": [0, 1, 2, 4, 5, 9, 11],
                        "order": {"by": "file_type", "order": "asc", "direction": "desc"}
                    },
                    "rabix_tasks": {
                        "visibleColumnsIndex": [0, 4, 6, 7, 8],
                        "itemCount": 100,
                        "order": {"direction": "desc", "by": "startedOn"}
                    },
                    "getting_started": [2, 1],
                    "genomeBrowser_52e0ed0fe4b069f418bc44a5": [{
                        "undoData": {
                            "bam": "https://gr.sbgenomics.com/bam/read",
                            "start": "42679728",
                            "fasta": {
                                "fai_url": "sbg:///file/52e0ed10e4b069f418be4523",
                                "name": "Human hg19",
                                "fasta_url": "sbg:///file/52e0ed10e4b069f418be4567"
                            },
                            "end": "42683891",
                            "chr": "chr20",
                            "updatePositionValues": true
                        }
                    }],
                    "genomeBrowser_54883b72e4b0a0a666e687fc": [{
                        "undoData": {
                            "bam": "https://staging-genome-reader.sbgenomics.com:4787/bam/readd",
                            "start": "4500000",
                            "fasta": {
                                "fai_url": "sbg:///file/52d69fc0e4b0a77ec4fd2066",
                                "name": "Human g1k v37",
                                "fasta_url": "sbg:///file/52d69fc0e4b0a77ec4fd2072"
                            },
                            "end": "4501000",
                            "chr": "chr21",
                            "updatePositionValues": true
                        }
                    }],
                    "showDrafts": 1
                },
                "notifications": [],
                "messages": []
            },
            "appType": "tool",
            "projectId": "584fb4de-13da-4dad-9e2b-63d35992e320",
            "action": "",
            "projectOwner": "admin",
            "projectSlug": "grapefruit",
            "appName": "new-tool",
            "revision": "0",
            "appUrl": "admin/grapefruit/new-tool/0",
            "get_apps_url": "admin/ grapefruit",
            app: {
                "id": "http://cwl-demo-vayu.sbgenomics.com:27444/admin/cwl-demo/cat/1/raw/",
                "class": "CommandLineTool",
                "label": "Cat",
                "description": "",
                "requirements": [
                    {
                        "class": "ExpressionEngineRequirement",
                        "id": "#cwl-js-engine",
                        "requirements": [
                            {
                                "class": "DockerRequirement",
                                "dockerPull": "rabix/js-engine"
                            }
                        ]
                    }
                ],
                "inputs": [
                    {
                        "type": [
                            "File"
                        ],
                        "inputBinding": {
                            "separate": true,
                            "loadContents": true,
                            "sbg:cmdInclude": true
                        },
                        "id": "#input_file",
                        "sbg:stageInput": "copy"
                    },
                    {
                        "type": [
                            "null",
                            {
                                "type": "array",
                                "name": "arra",
                                "items": "string"
                            }
                        ],
                        "id": "#arra",
                        "sbg:stageInput": null
                    },
                    {
                        "type": [
                            "null",
                            {
                                "type": "map",
                                "name": "map",
                                "values": "string"
                            }
                        ],
                        "id": "#map",
                        "sbg:stageInput": null
                    },
                    {
                        "type": [
                            "null",
                            {
                                "type": "array",
                                "name": "record",
                                "items": {
                                    "type": "record",
                                    "fields": [
                                        {
                                            "type": [
                                                "null",
                                                "string"
                                            ],
                                            "name": "asdf",
                                            "inputBinding": {
                                                "sbg:cmdInclude": "true",
                                                "separate": true,
                                                "prefix": "array rec"
                                            }
                                        }
                                    ],
                                    "name": "record"
                                }
                            }
                        ],
                        "inputBinding": {
                            "sbg:cmdInclude": true,
                            "separate": true
                        },
                        "id": "#record",
                        "sbg:stageInput": null
                    }
                ],
                "outputs": [
                    {
                        "type": [
                            "null",
                            "File"
                        ],
                        "outputBinding": {
                            "glob": "output.txt",
                            "outputEval": {
                                "engine": "#cwl-js-engine",
                                "script": "{ \n\t$self.metadata = $self.metadata ? $self.metadata : {};\n\n\t$self.metadata.contents = $self.contents;\n  \n  \treturn $self;\n}",
                                "class": "Expression"
                            },
                            "loadContents": true
                        },
                        "id": "#output_file"
                    }
                ],
                "hints": [
                    {
                        "class": "sbg:CPURequirement",
                        "value": 1
                    },
                    {
                        "class": "sbg:MemRequirement",
                        "value": 1000
                    },
                    {
                        "dockerImageId": "",
                        "class": "DockerRequirement",
                        "dockerPull": "ubuntu:latest"
                    }
                ],
                "baseCommand": [
                    "cat"
                ],
                "stdin": "",
                "stdout": "output.txt",
                "successCodes": [],
                "temporaryFailCodes": [],
                "arguments": [],
                "sbg:job": {
                    "inputs": {
                        "input_file": {
                            "path": "/path/to/input_file.ext",
                            "secondaryFiles": [],
                            "class": "File",
                            "size": 0
                        }
                    },
                    "allocatedResources": {
                        "cpu": 1,
                        "mem": 1000
                    }
                },
                "sbg:modifiedBy": "admin",
                "sbg:revision": 1,
                "sbg:latestRevision": 1,
                "sbg:validationErrors": [],
                "sbg:modifiedOn": 1453467750,
                "sbg:createdOn": 1453467092,
                "sbg:id": "admin/cwl-demo/cat/1",
                "sbg:cmdPreview": "cat  /path/to/input_file.ext > output.txt",
                "sbg:createdBy": "admin",
                "sbg:contributors": [
                    "admin"
                ],
                "sbg:sbgMaintained": false,
                "sbg:revisionsInfo": [
                    {
                        "sbg:modifiedBy": "admin",
                        "sbg:revision": 0,
                        "sbg:modifiedOn": 1453467092
                    },
                    {
                        "sbg:modifiedBy": "admin",
                        "sbg:revision": 1,
                        "sbg:modifiedOn": 1453467750
                    }
                ],
                "sbg:project": "admin/cwl-demo"
            }
        };
    });
