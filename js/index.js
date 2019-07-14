var timer,// 时钟的id
    timerArray = [],// 时钟索引
    timerIndex = -1;// 存放主时钟的回调函数。


$(function () {
  var $footerbutton = $('.footer-button');
  var $backbutton = $('.back-button');
  var $buybgwrap = $('.buy-bg-wrap');
  var $clickbuy = $('.click-buy');
  var $input = $('#acp');
  var imgNum = $('.iconfont img');
  
  //跳转页面
  for(var i = 0; i < imgNum.length; i++) {
    imgNum[i].addEventListener('click', function() {
      alert('将要离开此页面');
    }, false);
  }

  // var val = $input.prop('checked');
  // 点击购买
  $footerbutton.on('click', '.buy-button', function() {
    $buybgwrap.css('display', 'block');
  });
  //赛事回顾
  $footerbutton.on('click', '.back-button', function() {
    alert($backbutton.text());
  })
  // 关闭购买
  $buybgwrap.on('click', '.close-but', function() {
    $buybgwrap.css('display', 'none');
  })
   // 购买确认
   $clickbuy.on('click', 'a', function() {
     if($input.prop("checked") == true) {
      alert('购买成功');
     }else{
      alert('请点击接受此条款');
     }
   });

  getHouersMinutesSecondsByMS();
  //console.log(t)
  // 注册时钟的回调函数。
  timerArray.push(updateMSTimer);
  // 初始化页面主时钟并启动
  timer = setInterval(function() {
      timerIndex += 1;
      timerIndex = timerIndex % 100;
      for(var i = 0; i < timerArray.length; i++) {
          timerArray[i]();// 调用数组中的每个回调函数执行。
      }
  }, 200)
});


//时间 毫秒转换
function getHouersMinutesSecondsByMS (ms) {
  ms = + ms;
  if (ms < 0) {
    return null
  }
  var day = parseInt(ms / (1000 * 60 * 60 * 24));
  var hours = parseInt(ms / (1000 * 60 * 60)) % 24;
  var minutues = parseInt(ms / (1000 * 60)) % 60;
  var seconds = parseInt(ms / 1000) % 60;

  var dayStr = ('0' + day)
  dayStr = dayStr.slice(-2)
  var hourStr = ('0' + hours)
  hourStr = hourStr.slice(-2)
  var minutueStr = ('0' + minutues)
  minutueStr = minutueStr.slice(-2)
  var secondStr = ('0' + seconds)
  secondStr = secondStr.slice(-2)
//拼接字符串
  var str = dayStr + hourStr + minutueStr + secondStr;
  return str.split('');
}


function updateMSTimer() {
    // 每秒中去更新页面中的时间。
    if(timerIndex % 5 != 0) {
        return;
    }
    // 满一秒钟
    // 计算时间差，并更新到页面的span中去
    var endDate = new Date(loadDate.ms.endTime);
    var strArr = getHouersMinutesSecondsByMS(endDate - Date.now());
    // 把时钟变换字符串更新到span标签
    $('#msTimerBox .timer-num').each(function(index, item) {
        $(item).text(strArr[index]);
    });
}

// 页面卸载之前清除时钟。
window.onunload = function() {
    clearInterval(timer);
  }

  // window.onbeforeunload = function() {
  //   return "您是否要离开？";
  // }