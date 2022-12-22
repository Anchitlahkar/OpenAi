$(document).ready(function () {
    $("#submit").click(() => {
        val = document.getElementById("input-text").value
        openai_test(val)
    })
})

function text_change(){
    val = document.getElementById("input-text").value

    if(val !== ""){
        $("#input-text").css("font-style","normal")
    }
    else{
        $("#input-text").css("font-style","italic")
    }
}

setInterval(text_change, 500);

var result = ""

function stretchy(element) {
    var value = element.value;

    function update() {
        var h = element.scrollHeight;
        if (h > element.offsetHeight || h < element.offsetHeight - 48)
            element.style.height = (h) + 'px';

        else if (h < element.offsetHeight || h > element.offsetHeight - 48)
            element.style.height = (h) + 'px';
    }

    element.onkeyup = update;
    setInterval(update, 500);
    update();

}

stretchy(document.getElementById('input-text'));

async function openai_test(text) {

    $(".loading").append(`<div><div class="fa-5x loading_class">
  <i class="fa fa-spinner fa-spin fa-pulse"></i></div></div>`)

    var url = "https://api.openai.com/v1/engines/text-davinci-002/completions";

    var data = `{
        "prompt": "${text}",
        "temperature": 0.7,
        "max_tokens": 2048,
        "top_p": 1,
        "frequency_penalty": 0.75,
        "presence_penalty": 0
      }`;

    await $.ajax({
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "POST",
        "headers": {
            "Authorization": "Bearer {API}",
            "Content-Type": "application/json",
        },
        data: data,
        success: function (response) {
            text = response.choices[0].text
            result = text.replaceAll("\n", "<br>")
            $("#result-text").html(`<p>${result}<br><br></p>`)
            $(".loading_class").remove()
            $("#input-text").val("Write a")


        },
        error: function (error) {
            $("#result-text").html(`<p><i>Sorry. Unable to compile</i></p>`)
        }
    })
}

$(".loading_class").remove()
$(".result").destroy
$("#result-text").html(`<p id="result" style={}>${result}</p>`)