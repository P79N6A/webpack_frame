//import('!style-loader!css-loader!./test.css');
//import('./test.css');
import('./index.scss');
import $ from 'jquery';
import initLogin from './login';

function renderHeaderBkg() {
    if($("#header").offset().top > 0){
        $(".fit-header").addClass("bkg");
    }else{
        $(".fit-header").removeClass("bkg");
    }
}
function initHeader() {
    initLogin();
    renderHeaderBkg();

    $('.logoItem, #pageIndex').on('click', function(event){
        location.reload();
    });
    $(window).scroll(function(event){
        renderHeaderBkg();
    });
}

function initMenus() {
    $(".navigation .item").mouseenter( function (e) {
        var name = $(this).attr("name");
        if(name){
            $(this).addClass("active");
        }
    });
    $(".navigation .item").mouseleave( function (e) {
        $(this).removeClass("active");
    });
}

$(function () {
    initMenus();
    initHeader();
});
