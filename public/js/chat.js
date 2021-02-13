$(document).ready(function(){
    Pusher.logToConsole = true;

    var pusher = new Pusher('e8d2132d16a15b682cc4', {
        cluster: 'mt1',
        encrypted: false
    });

    var channel = pusher.subscribe('public-chat');
    channel.bind('message-added', onMessageAdded);

    $('#btn-chat').click(function(){
        const message = $("#chat-message").val();
        $("#chat-message").val("");

        //send message
        $.post( "https://rocky-reaches-72297.herokuapp.com/message", { message } );
    });

    function onMessageAdded(data) {
        let template = $("#response-template").html();
        console.log(data.message)
        template = template.replace("{{body}}", data.message);

        $("#message_pusher").append(template);
    }
});
$( '.friend-drawer--onhover' ).on( 'click',  function() {

    $( '.chat-bubble' ).hide('slow').show('slow');

});