import { ipcRenderer as ipc } from 'electron';

const buttonCreated = document.getElementById('upload');

buttonCreated.addEventListener('click', function (event) {
    console.log(rend1);
    ipc.send('open-file-dialog-for-file');
});


ipc.on('selected-file', function (event, path) {
    console.log(rend2);
    console.log('Full path: ', path);
});