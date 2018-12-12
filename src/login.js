import $ from 'jquery';

function initLogin(options){
    initHeader(); 
    initLogout();  
}

function initLogout(){
    $('.loginout').on('click', function(){
        let domain = document.domain;
        let url = window.location.href;
        let directUrl = `http://${domain}/_logout/?url=${url}`;
        window.location.href = directUrl;
    });
}

function initHeader(){
    //查session
    if(window.sessionStorage && sessionStorage.getItem('loginName')){
        var rtx = sessionStorage.getItem('loginName');
        setHeader(rtx);
        return;
    }
    //获取rtx并set session
    $.ajax({
        //url: 'http://fit.oa.com/fbi/logininfo',
        url: '/fbi/logininfo',
        method: 'get',
        success: function(res){
            if(res && res.loginName){
                setHeader(res.loginName);
                if(window.sessionStorage){
                    sessionStorage.setItem('loginName', res.loginName);
                }
            }else{
                setHeader('');
            }
        }
    })
}

function setHeader(rtx){
    //设置头像
    setAvatar(rtx);
    //权限控制
    $.ajax({
        //url: 'http://fitdev.oa.com/fbi/customer/showEntry.do',
        url: '/fbi/customer/showEntry.do',
        data: {
            loginName: rtx
        },
        method: 'get',
        success: function(res){
            if(res && res.data){
                $(".fbi_authority").show();
            }
        }
    })
}

function setAvatar(rtx){
    $('#user_avatar').attr('src', 'http://dayu.oa.com/avatars/' + rtx + '/avatar.jpg');
    $('#user_name').html(rtx);
    
    if(rtx){
        $('.useImg').show();
    }
    else{
        $('.useImg').hide();
    }
}

export default initLogin;