// var toolbarOptions = [
//     ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
//     ['blockquote', 'code-block'],

//     [{ 'header': 1 }, { 'header': 2 }],               // custom button values
//     [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//     [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
//     [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
//     [{ 'direction': 'rtl' }],                         // text direction

//     [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
//     [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

//     [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
//     [{ 'font': [] }],
//     [{ 'align': [] }],

//     ['clean'],                                         // remove formatting button

//     ['link', 'image', 'video'],                        // link and image, video

//     ['emoji'],                                         // emoji

//     ['mention'],                                       // mention

//     ['undo', 'redo'],                                  // undo and redo
// ];

// var quill = new Quill('#editor', {
//     modules: {
//         toolbar: toolbarOptions,
//         'emoji-shortname': true,                       // enable emoji-shortname module
//         'emoji-textarea': true,                        // enable emoji-textarea module
//         'emoji-toolbar': true,                         // enable emoji-toolbar module
//         'mention': true,                               // enable mention module
//     },
//     theme: 'snow'
// });