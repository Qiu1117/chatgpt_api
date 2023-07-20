$(document).ready(function () {
    $("#send-message").click(function () {
        var message = $("#prompt-input").val();
        $("#prompt-input").val("");
        sendMessage(message);
        getResponse(message);
    });
});

function sendMessage(message) {
    $("#chat-messages").append("<p><strong>我:</strong> " + message + "</p>");
}

function getResponse(message) {
    $.ajax({
        // url: "https://api.openai.com/v1/engines/text-davinci-003/completions",
        // url: "https://api.openai.com/v1/models",
        url: "https://api.openai.com/v1/chat/completions",
        type: "POST",
        // type: "GET",

        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + "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"
        },
        data: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [{ "role": "system", "content": "You are a helpful assistant." }, { "role": "user", "content": message }],
            // prompt: message,
            max_tokens: 4000
        }),
        success: function (response) {
            // 处理API返回的数据
            console.log(response.choices[0].message.content);
            var text = response.choices[0].message.content;
            $("#chat-messages").append("<p><strong>ChatGPT:</strong> " + text + "</p>");

        },
        error: function (xhr, status, error) {
            // 处理请求错误
            console.error(error);
        }
    });
}