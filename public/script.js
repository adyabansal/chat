let socket = io()

$('#loginBox').show()
$('#chatBox').hide()
var x = 0;

function login() {
    socket.emit('login', {
        username: $('#inpUsername').val(),
        password: $('#inpPassword').val()
    })
    $('#inpUsername').val('')
    $('#inpPassword').val('')
}

function sendMsg() {
    socket.emit('msg_send', {
        to: $('#inpToUser').val(),
        msg: $('#inpNewMsg').val()
    })
    $('#inpToUser').val('')
    $('#inpNewMsg').val('')
}
 
$('#btnStart').click(() => {
   login();
})

socket.on('logged_in', () => {
    $('#loginBox').hide()
    $('#chatBox').show()
    x = 1;
})

socket.on('login_failed', () => {
    window.alert('Username or password incorrect')
})

$('#btnSendMsg').click(() => {
   sendMsg();
})

$('#inpNewMsg').keypress((e) => {
    if(e.which == 13)
    if($('#inpNewMsg')!='')
    sendMsg()
})

$('#inpPassword').keypress((e) => {
    if(e.which == 13)
    if($('#inpUsername')!='')
    login()
})

socket.on('msg_rcvd', (data) => {
    $('#ulMsgs').append($('<li>').text(
        `[${data.from}] : ${data.msg}`
    ))
})