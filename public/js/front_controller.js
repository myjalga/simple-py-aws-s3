
"use strict"

var Modal = ReactBootstrap.Modal;
var FormGroup = ReactBootstrap.FormGroup;
var ControlLabel = ReactBootstrap.ControlLabel;
var FormControl = ReactBootstrap.FormControl;
var HelpBlock = ReactBootstrap.HelpBlock;
var Button =  ReactBootstrap.Button;
var Panel = ReactBootstrap.Panel;


/**
 * @class Path
 */
var Path = React.createClass({
    /**
     * @description Handle path list
     */
    renderList: function (list, i) {
        
        return (
            <li key={i}>
                {
                    (list === 'Home') ? 
                    (
                        <a href="/">
                            {list}
                        </a>
                    ) : (
                        <a>
                            {list}
                        </a>
                    )
                }
            </li>
        );
    },

    render: function () {
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 bucket-path">
                <ol className="breadcrumb">
                    {this.props.path.map(this.renderList, this)}
                </ol>
            </div>
        );
    }
});

/**
 * @class Create Bucket
 */
var CreateBucket = React.createClass({

    getInitialState: function () {
        return {
            value: ''
        }
    },

    getValidationState: function () {
        const length = this.state.value.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
    },

    handleChange: function (e) {
        this.setState({ value: e.target.value });
    },

    handleSubmit: function () {
        console.log('handleSubmit createbucket')
        
        var data = new FormData();
        data.append('name', this.state.value);
        $.ajax({
            type: 'POST',
            url: '/api/create/bucket',
            data: data,
            contentType: false,
            processData: false,
            success: function (response) {
                console.log('handleSubmit response', response);
                this.props.onClose();
                window.location = '/'
            }.bind(this)
        });
    },

    render: function () {
        return (
            <div>
                <Modal show={this.props.show} onHide={()=>{this.props.onClose()}}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Bucket</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup
                            controlId="formBasicText"
                            validationState={this.getValidationState()}>

                            <ControlLabel>Bucket Name</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.text}
                                placeholder="Enter bucket name here"
                                onChange={this.handleChange} />
                            <FormControl.Feedback/>
                            <HelpBlock>Make the bucket name unique as much as possible.</HelpBlock>
                        </FormGroup>
                    </Modal.Body>
                     <Modal.Footer>
                        <Button onClick={this.handleSubmit}>Submit</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
});


/**
 * @class Rename Bucket
 */
var RenameBucket = React.createClass({
    getInitialState: function () {
        return {
            value: '',
            bucket: null
        }
    },

    getValidationState: function () {
        const length = this.state.value.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
    },

    componentWillReceiveProps: function () {
        this.setState({bucket: this.props.bucket})
    },

    componentWillMount: function () {
        this.setState({bucket: this.props.bucket})
    },

    handleChange: function (e) {
        this.setState({ value: e.target.value });
    },

    handleSubmit: function () {
        console.log('handleSubmit createbucket')
        
        var data = new FormData();
        data.append('prevname', this.state.bucket);
        data.append('newname', this.state.value);
        $.ajax({
            type: 'POST',
            url: '/api/rename/bucket',
            data: data,
            contentType: false,
            processData: false,
            success: function (response) {
                this.props.onClose();
                window.location = '/'
            }.bind(this)
        });
    },
    render: function () {
        return (
            <div>
                <Modal show={this.props.show} onHide={()=>{this.props.onClose()}}>
                    <Modal.Header closeButton>
                        <Modal.Title>Rename Bucket</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup
                            controlId="formBasicText"
                            validationState={this.getValidationState()}>

                            <ControlLabel>New Bucket Name</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.text}
                                placeholder="Enter new bucket name here"
                                onChange={this.handleChange} />
                            <FormControl.Feedback/>
                            <HelpBlock>Make the bucket name unique as much as possible.</HelpBlock>
                        </FormGroup>
                    </Modal.Body>
                     <Modal.Footer>
                        <Button onClick={this.handleSubmit}>Save</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
});

/**
 * @class DeleteBucket
 */
var DeleteBucket = React.createClass({

    getInitialState: function () {
        return {
            bucket: null
        }
    },

    handleSubmit: function () {
        if (this.state.bucket) {
            var data = new FormData();
            data.append('bucket', this.state.bucket);
            $.ajax({
                type: 'POST',
                url: "/api/delete/bucket",
                data: data,
                contentType: false,
                processData: false,
                success: function (response) {
                    this.props.onClose();
                    window.location = '/';
                }.bind(this)
            });
        } else {
            this.props.onClose();
        }
    },

    componentWillReceiveProps: function () {
        this.setState({bucket: this.props.bucket})
    },

    componentWillMount: function () {
        this.setState({bucket: this.props.bucket});
    },

    render: function () {
        var title = (<h3>Warning</h3>)
        return (
            <div>
                <Modal show={this.props.show} onHide={()=>{this.props.onClose()}}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Bucket</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Panel header={title} bsStyle="danger">
                            You are about to delete the bucket!
                        </Panel>
                    </Modal.Body>
                     <Modal.Footer>
                        <Button bsStyle="danger" onClick={this.handleSubmit}>Delete</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
});

/**
 * @class  UploadFile
 */
var UploadFile = React.createClass({

    getInitialState: function () {
        return {
            file: '',
            bucket: null
        }
    },

    handleSubmit: function () {
        console.log(this.state.file);
        var data = new FormData();
        data.append('file', $('#file-id')[0].files[0]);
        data.append('bucket', this.props.bucket);

        $.ajax({
            type: 'POST',
            url: '/api/upload/file',
            data: data,
            contentType: false,
            processData: false,
            success: function (response) {
                this.props.onClose();
                window.location = '/';
            }.bind(this)
        });
    },
    
    handleChange: function (e) {
        this.setState({file: e.target.value});
    },

    componentWillReceiveProps: function () {
        this.setState({bucket: this.props.bucket})
    },

    componentWillMount: function () {
        this.setState({bucket: this.props.bucket})
    },

    render: function () {
        return (
            <div>
                <Modal show={this.props.show} onHide={()=>{this.props.onClose()}}>
                    <Modal.Header closeButton>
                        <Modal.Title>Upload File</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup controlId="file-id">
                            <ControlLabel>File</ControlLabel>
                            <FormControl
                                type="file"
                                value={this.state.file}
                                onChange={this.handleChange}/>
                            <HelpBlock>Select a file to upload</HelpBlock>
                        </FormGroup>
                    </Modal.Body>
                     <Modal.Footer>
                        <Button onClick={this.handleSubmit}>Submit</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
});

/**
 * @class File
 */
var File = React.createClass({

    getInitialState: function () {
        return {
            file: '',
            bucket: ''
        }
    },

    componentWillReceiveProps: function () {
        console.log('File componentWillReceiveProps', this.props.file);
        this.setState({
            bucket: this.props.bucket,
            file: this.props.file
        })
    },

    componentWillMount: function () {
        this.setState({
            bucket: this.props.bucket,
            file: this.props.file
        })
    },

    componentDidMount: function () {
        this.setState({
            bucket: this.props.bucket,
            file: this.props.file
        })
    },

    handleDownload: function () {
        console.log(`/api/download/file?file=${this.props.file}&bucket=${this.props.bucket}`);
        $.ajax({
            type: 'GET',
            url: `/api/download/file?file=${this.props.file}&bucket=${this.props.bucket}`,
            contentType: false,
            processData: false,
            success: function (response) {
                window.open(response.path)
                this.props.onClose()
            }.bind(this)
        });
    },

    handleDelete: function () {
        var data = new FormData();
        data.append('bucket', this.props.bucket);
        data.append('file', this.props.file);
        $.ajax({
            type: 'POST',
            url: "/api/delete/file",
            data: data,
            contentType: false,
            processData: false,
            success: function (response) {
                this.props.onClose();
                window.location = '/';
            }.bind(this)
        });

    },

    render: function () {
        var dl = (<h3>Download</h3>)
        var del = (<h3>Delete</h3>)
        return (
            <div>
                <Modal show={this.props.show} onHide={()=>{this.props.onClose()}}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.file}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Panel header={dl} bsStyle="success">
                            <div className="col-lg-12" style={{textAlign: 'center'}}>
                                <strong>Press the button to download the file!</strong>
                            </div>
                            <div>
                                <Button 
                                    onClick={this.handleDownload}
                                    bsStyle="success"
                                    bsSize="large" block>Download</Button>
                            </div>
                        </Panel>

                        <Panel header={del} bsStyle="danger">
                            <div className="col-lg-12" style={{textAlign: 'center'}}>
                                <strong>Delete the file!</strong>
                            </div>
                            <div>
                                <Button 
                                    onClick={this.handleDelete}
                                    bsStyle="danger" 
                                    bsSize="large" block>Delete</Button>
                            </div>
                        </Panel>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
});


/**
 * @class Content
 */
var Content = React.createClass({

    getInitialState: function () {
        return {
            path: 'Home',
            title: 'Home',
            content: null,
            list: []
        };
    },

    /**
     * @description Call before render the elements
     */
    componentWillMount: function () {
        this.setState({
            content: this.props.content,
            path: this.props.pathInfo
        });
        $.get('/api/get/buckets', function(data) {
            console.log('/api/get/buckets', data);
            this.setState({list: data.buckets})
        }.bind(this));
    }, 

    /**
     * @description Handle select event in the list
     */
    handleBucketSelect: function (content, type) {
        $.get(`/api/get/bucket/files?bucket=${content}`, function(data) {
            var path = this.state.path;
            path = path.concat(content);
            this.setState({
                content: 'file',
                list: data.files,
                path: path
            });
            this.props.contentChange('file');
            this.props.pathChange(path);
        }.bind(this));
    },

    /**
     * @description Handle file selection
     */
    handleFileSelect: function (file, type) {
        this.props.showFileEvent(file);
    },

    /**
     * @description handle the list of the content
     * @param {Object} content - Could be file or bucket info
     * @param {Integer} i - Index
     */
    renderContentList: function (list, i) {

        var name = null;
        var {content} = this.state;
        var fn = null;

        if (content === 'file') {
            name = list.file;
            fn = function (name, content, obj) {
                obj.handleFileSelect(name, content);
            }
        } else {
            name = list.bucket;
            fn = function (name, content, obj) {
                obj.handleBucketSelect(name, content);
            }
        }
        return (
            <li 
                key={i} 
                className="list-group-item"
                onClick={()=>fn(name, content, this)}>
                {name}
            </li>
        );
    },

    /**
     * @description Handle actions when list are buckets
     */
    homeActions: function (self) {
        var actions = ['Create Bucket'];
        
        var fn = null;

        return actions.map(function (action, i) {
            if (action === 'Create Bucket') {
                fn = function () {
                    self.props.showCreateBucket()
                }
            }
            return (
                <li 
                    className="user-select-action" 
                    key={i}
                    onClick={()=>fn()}>
                    <a>
                        {action}
                    </a>
                </li>
            );
        }, this);
    },

    /**
     * @description handle actions when when list are files
     */
    bucketActions: function (self) {
        var actions = ['Rename Bucket', 'Upload File', 'Delete Bucket'];
        return actions.map(function (action, i) {
            var fn = null;
            if (action === 'Rename Bucket') {
                fn = function (self) {
                    self.props.showRenameBucket();
                }
            }
            else if (action === 'Upload File') {
                fn = function (self) {
                    self.props.showUploadFile();
                }
            }
            else if (action === 'Delete Bucket') {
                fn = function (self) {
                    self.props.showDeleteBucket();
                }
            }

            return (
                <li className="user-select-action" key={i}>
                    <a onClick={()=>fn(this)}>
                        {action}
                    </a>
                </li>
            );
        }, this);
    },
    // Home: Create Bucket
    // Bucket: // Rename Bucket, Delete Bucket, Upload File

    render: function () {
        return (
            <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        {this.state.path[this.state.path.length - 1]}
                        <div className="user-action">
                            <div className="dropdown">
                                <button className="btn btn-default btn-xs dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                    Action
                                    <span className="caret"></span>
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                                    {(this.state.content === "bucket") ? this.homeActions(this) : this.bucketActions(this)}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="panel-body">
                        <ul className="list-group">
                            {this.state.list.map(this.renderContentList, this)}
                        </ul>
                    </div>            
                </div>
            </div>
        );
    }
});

/**
 * @class Container
 */
var Container = React.createClass({

    /**
     * @description Initia State
     */
    getInitialState: function () {
        return {
            showCreateBucket: false,
            showUploadFile: false,
            showRenameBucket: false,
            showDeleteBucket: false,
            showFile: false,
            pathInfo: ['Home'],
            currentContent: 'bucket', // bucket or file
            bucketContent: 'Bucket_name',
            listContent: [],
            targetFile: ''
        }
    },

    /**
     * @description Handle content change
     */
    handleContentChange: function (content) {
        this.setState({currentContent: content});
    },

    /**
     * @description Handle close events in create bucket panel
     */
    handleCreateBucketClose: function () {
        this.setState({showCreateBucket: false});
    },

    /**
     * @description Handle show action for create bucket
     */
    handleShowCreateBucket: function () {
        this.setState({showCreateBucket: true});
    },

    /**
     * @description Handle path change
     */
    handlePathChange: function (path) {
        this.setState({pathInfo: path});
    },

    /**
     * @description handle if need to refresh, then query
     */
    handleRefresh: function (refresh) {

    },

    /**
     * @description handle show Rename bucket
     */
    handleShowRenameBucket: function() {
        this.setState({showRenameBucket: true});
    },

     /**
      * @description Handle Rename Bucket close
      */
     handleRenameBucketClose: function () {
         this.setState({showRenameBucket: false});
     },
    
    /**
     * @description handle show delete bucket panel
     */
    handleShowDeleteBucket: function () {
        this.setState({showDeleteBucket: true});
    },

    /**
     * @description Handle the delete close of the panel
     */
    handleDeleteBucketClose: function () {
        this.setState({showDeleteBucket: false});
    },

    /**
     * @description handle show Upload panel
     */
    handleShowUpload: function () {
        this.setState({
            showUploadFile: true
        });
    },

    /**
     * @description Handle close event for Upload file
     */
    handleUploadClose: function () {
        this.setState({showUploadFile: false});
    },

    /**
     * @description handle File event panel
     */
    handleShowFileEvent: function (file) {
        console.log(file);
        this.setState({
            targetFile: file
        });
        this.setState({showFile: true});
    },

    /**
     * @description handle close event for File action
     */
    handleFileEventClose: function () {
        this.setState({
            showFile: false
        });
    },

    /**
     * @description render the content
     */
    render: function () {
        return (
            <div className="row col-lg-12 col-md-12 col-sm-12 main-container" 
                style={{padding: '0px 100px 0px 100px'}}>
                <Path path={this.state.pathInfo}/>

                <Content 
                    content={this.state.currentContent}
                    bucket={this.state.bucketContent}
                    showRenameBucket={this.handleShowRenameBucket}
                    showCreateBucket={this.handleShowCreateBucket}
                    showDeleteBucket={this.handleShowDeleteBucket}
                    showUploadFile={this.handleShowUpload}
                    showFileEvent={this.handleShowFileEvent}
                    pathInfo={this.state.pathInfo}
                    pathChange={this.handlePathChange}
                    contentChange={this.handleContentChange}/>

                <CreateBucket 
                    show={this.state.showCreateBucket}
                    onClose={this.handleCreateBucketClose}/>
                
                <RenameBucket 
                    show={this.state.showRenameBucket}
                    onClose={this.handleRenameBucketClose}
                    bucket={this.state.pathInfo[this.state.pathInfo.length - 1]}/>

                <DeleteBucket 
                    show={this.state.showDeleteBucket}
                    onClose={this.handleDeleteBucketClose}
                    bucket={this.state.pathInfo[this.state.pathInfo.length - 1]}/>
                
                <UploadFile
                    show={this.state.showUploadFile}
                    onClose={this.handleUploadClose}
                    bucket={this.state.pathInfo[this.state.pathInfo.length - 1]}/>
                
                <File 
                    show={this.state.showFile}
                    onClose={this.handleFileEventClose}
                    file={this.state.targetFile}
                    bucket={this.state.pathInfo[this.state.pathInfo.length - 1]}/>
            </div>
        )
    }
});

ReactDOM.render(<Container />, document.getElementById("main-container"));