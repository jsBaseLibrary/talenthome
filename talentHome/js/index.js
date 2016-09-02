(function(window, $){

    /*~function (desW) {
        var winW = document.documentElement.clientWidth;
        document.documentElement.style.fontSize = winW / desW * 100 + "px";
    }(1920);*/
    $('a[href*=#]').click(function() {  
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {  
                var $target = $(this.hash);  
                $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');  
                if ($target.length) {  
                    var targetOffset = $target.offset().top - 55;  
                    $('html,body').animate({  
                        scrollTop: targetOffset  
                    },800);  
                    return false;  
                }  
            }  
    });  
    var $nav = $('.product-nav'),
        iNavTop = $nav.offset().top-56;

    $(window).on('scroll', function(){
        var sTop = $(document).scrollTop();
        
        if(sTop > iNavTop){
            $nav.addClass('fixed');
        }else{
            $nav.removeClass('fixed');
        }
    });

    //nav a
    $('.product-nav a').on('click',function(){
        $('.product-nav a').removeClass('pressColor');
        $(this).addClass('pressColor');
    });
    //控制arrow
    $('.arrow').on('click',function(){
        $firstIconList = $('#firstIconList');
        $lastIconList = $('#lastIconList');
        if($firstIconList.hasClass('hideDiv')){
            $firstIconList.removeClass('hideDiv');$lastIconList.addClass('hideDiv');
        }else{
            $lastIconList.removeClass('hideDiv');$firstIconList.addClass('hideDiv');
        }
    });

    //input验证
    $('#commit').on('blur','input',function(){
        //清除border高亮
        $(this).removeClass('focusInput');
        //获取正则
        var pattern = $(this).attr('data-pattern');
        //获取input名字
        var name = $(this).parent().find('span:first-child').text();
        //获取input输入值
        var inputVal = $(this).val();
        //判断有无初始化过
        if($(this).parent().find('.commit').length===0){
            var span = document.createElement('span');
            $(span).addClass('commit u-col-offset-3 u-col-md-offset-3 u-col-xs-offset-3');
            $(span).css({'font-size': '0.8em','color': '#a33849','padding': '3px',
                'border-radius': '2px','display': 'inline-block',
                'height':'auto','line-height': '0',
                'position':'absolute','min-width':'120px','left':'13px','top':'15px'});
            $(this).parent().append(span);
            (this).removeAttribute('placeholder');

        }else {    
            $(this).parent().find('.commit').show();
        }
        //判断是否匹配
        var regexp = new RegExp(pattern, 'g');
        if(regexp.test(inputVal)){
            var dom = $(this).parent().find('.commit')[0];
            if(dom.style.display==='none')$(dom).show();
            else $(dom).hide();$(this).parent().find('input').removeClass('errorInfo');   
        }else{
            var spanDom = $(this).parent().find('.commit');
            if(spanDom){
                $(this).parent().find('input').addClass('errorInfo');
                $(this).parent().find('input').val('');
                spanDom.text("请输入您的"+name);
            }
        }
    });
    //focus
    $('#commit').on('focus','input',function(){
        $(this).addClass('focusInput');
        var spanDom = $(this).parent().find('.commit').hide();        
    });
    $('#commit').on('click','.commit',function(){
        $(this).parent().find('input').focus();       
    });
    $('#message').on('focus',function(){
        $(this).addClass('focusInput');
    });
    $('#message').on('blur',function(){
        $(this).removeClass('focusInput');
    });

    //发送ajax请求
    var $commitIndex = $('#commitIndex');
        
    $commitIndex.on('click',function(){
        var $corp_name = $('#corp_name').val().trim(),
            $user_name = $('#user_name').val().trim(),
            $email = $('#email').val().trim(),
            $mobile = $('#mobile').val().trim(),
            $message = $('#message').val().trim();
        var options = {
            corp_name:$corp_name,
            user_name:$user_name,
            email:$email,
            mobile:$mobile,
            message:$message
        };
        $('#commit input').blur();
        var obj =[];
        $.each($('.commit'),function(){
            if($(this).css('display').toLowerCase()!=='none')obj.push($(this));
        })
        if(obj.length==0){
            $.ajax({
                url:'/hrsrv/internal/contact/sendemail',
                data:options,
                type:'get',
                dataType:'json',
                success:function(res){
                    u.messageDialog({
                        msg: res.message,
                        title: "提示",
                        btnText: "确定"
                    });
                    $.each($('#commit input'),function(){
                        $(this).val('');
                    });
                    
                    $('#message').val('');
                }
            });
        }else{
            return false;
        }
    });

})(window, jQuery);