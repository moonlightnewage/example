$(document).ready(function() {
    $(".slider").each(function() { // обрабатываем каждый слайдер
        var obj = $(this);
        $(obj).append("<div class='nav'></div>");
        $(obj).find("li").each(function() {
            $(obj).find(".nav").append("<span rel='" + $(this).index() + "'></span>"); // добавляем блок навигации
            $(this).addClass("slider" + $(this).index());
        });
        $(obj).find("span").first().addClass("on"); // делаем активным первый элемент меню
    });
});

function sliderJS(obj, sl) { // slider function
    var ul = $(sl).find("ul"); // находим блок
    var bl = $(sl).find("li.slider" + obj); // находим любой из элементов блока
    var step = $(bl).width(); // ширина объекта
    $(ul).animate({
        marginLeft: "-" + step * obj
    }, 500); // 500 это скорость перемотки
}
$(document).on("click", ".slider .nav span", function() { // slider click navigate
    var sl = $(this).closest(".slider"); // находим, в каком блоке был клик
    $(sl).find("span").removeClass("on"); // убираем активный элемент
    $(this).addClass("on"); // делаем активным текущий
    var obj = $(this).attr("rel"); // узнаем его номер
    sliderJS(obj, sl); // слайдим
    return false;
});


//Form BEGIN

$("#contactForm").validator().on("submit", function(event) {
    if (event.isDefaultPrevented()) {
        // обработка неправильной формы
        formError();
    } else {
        event.preventDefault();
        submitForm();
    }
});

function submitForm() {
    //form variables
    var name = $("#name").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var message = $("#message").val();

    $.ajax({
        type: "POST",
        url: "php/form-process.php",
        data: "name=" + name + "&email=" + email + "&phone=" + phone + "&message=" + message,
        success: function(text) {
            if (text == "success") {
                formSuccess();
            } else {
                formError();
            }
        }
    });
}

function formSuccess() {
    $("#contactForm")[0].reset();
    submitMSG(true, "Ваше сообщение отправлено!");
}

function formError() {
    submitMSG(false, "Пожалуйста, заполните все обязательные поля!");
}

function submitMSG(valid, msg) {
    if (valid) {
        var messageClasses = "reply success";
    } else {
        var messageClasses = "reply fail";
    }
    $("#msgSubmitted").removeClass().addClass(messageClasses).text(msg);
}
//Form END
