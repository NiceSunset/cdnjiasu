console.log("小姐姐");

function ajax(options) {
    // 1.处理默认参数
    var { type, url, success, error, data, timeout } = options;
    type = type || "get";
    data = data || {};
    timeout = timeout || 2000;
    // 2.解析要发送的数据
    var str = "";
    for (var i in data) {
        str += `${i}=${data[i]}&`;
    }
    // 3.根据方式，决定是否处理url
    // if(type == "get"){
    // var d = new Date();
    // url = url + "?" + str + "__qft=" + d.getTime();
    // }
    // 4.开启ajax
    var xhr = new XMLHttpRequest();
    // 注意：open中的方式
    xhr.open(type, url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // 5.执行成功之前，先判断是否传入
            success && success(xhr.responseText);
            // 成功之后，不应有失败
            error = null;
        } else if (xhr.readyState == 4 && xhr.status != 200) {
            // 6.执行失败之前，先判断是否传入
            error && error(xhr.status);
            // 失败之后，不应有成功
            success = null;
            // 且失败不应多次执行
            error = null;
        }
    }
    // 7.如果请求超时，执行失败
    setTimeout(() => {
        error && error("timeout");
        // 失败之后，不应有成功
        success = null;
    }, timeout);
    // 8.最后根据type的方式，决定send的发送内容和格式
    if (type == "post") {
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(str)
    } else {
        xhr.send()
    }
}

/*==========调用============
document.onclick = function(){
ajax({
 type:"get", //发送方式，可选，默认get
url:"http://localhost/ajax/data/data.php", //要请求的地址，必选
success:function(res){ //请求成功之后的函数，必选
console.log(res)
},
 data:{ //要发送的数据，可选，默认不发
 user:"admin",
 pass:13123121123
 },
 error:function(res){ //请求失败之后的函数，可选，默认不处理
 console.log(res)
 },
 timeout:10 //请求超时的时间，可选，默认2000
})
}*/

//上滑显示 下滑隐藏
let previousTop = 0;
window.addEventListener('scroll', function() {
    let currentTop = window.scrollY;
    var nav = document.getElementById('nav');
    var fot = document.getElementById('fot');
    if (currentTop > previousTop) {
        nav.style.opacity = '0';
        fot.style.opacity = '0.7';
    } else {
        nav.style.opacity = '1';
        fot.style.opacity = '1';
    }
    previousTop = window.scrollY;
});

var clipboard = new ClipboardJS('.copyurl');
var copytips = document.getElementById("copytips");
clipboard.on('success', function(e) {
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);
    copytips.style.opacity = '1';
    copytips.innerHTML = '复制成功';
    e.clearSelection();
    setTimeout(function() {
            copytips.style.opacity = '0';
        },
        4000)
});

clipboard.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});