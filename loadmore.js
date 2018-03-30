/*
 * THIS FILE IS PART OF AWStudio PROJECT
 * loadmore.js - load more contents 
 * AUTHOR: ArthurWang
 * E-mail: legendaryarthur@163.com 
 */
var arrData = new Array;
var dataLength = 0;//请求数据的长度

const pageLength = 20;//一次加载的个数

var startX, startY, endX, endY;
var dy = 0;

//加载内容的Ajax函数
function contentAjax() {
	$.ajax({
		url: 'URL',
		type: 'POST',
		timeout: 10000,
		success: function(data) {
			var obj = eval("(" + data + ")");
			arrData = obj.data;

			if(obj.code == "ok") {
				dataLength = obj.data.length;
				if(obj.data.length <= 0) {
					//没有数据时显示没有内容
					$(".no-content").css({
						"display": "block"
					});
				} else {
					var newHtml = contentLists(obj.data);
					$(".content").html(newHtml);
				}
			}
		},
		error: function(xhr, textStatus) {
			console.log(textStatus);
		}
	});
}

//内容字符串拼接
function contentHtml(data) {
	var valueHtml = '';
	var contentLength = data.length >= pageLength ? pageLength : data.length;
	for(var i = 0; i < ; i++) {
			valueHtml += '字符串';
		}
	arrData = arrData.slice(pageLength);
	return valueHtml;
}

//进入页面执行ajax函数加载数据
$(document).ready(function() {
	contentAjax();
});

//监听滑动开始事件
document.addEventListener('touchstart', function(ev) {
	startX = ev.touches[0].pageX;
	startY = ev.touches[0].pageY;
}, false);

//监听滑动结束事件
document.addEventListener('touchend', function(ev) {
	endX = ev.changedTouches[0].pageX;
	endY = ev.changedTouches[0].pageY;
	dy = startY - endY;//计算滑动开始到结束的距离

	var _top = document.documentElement.scrollTop;
	var bodyH = $(document.body).height();
	var contentH = $(".content").height();
	var footerH = $(".footer").height();
	var headerH = $(".header").height();


	if(dataLength > 0) {
		//划到内容底部加载新内容
		if(_top + bodyH - footerH - headerH > contentH) {

			if(dy > 0) {
				if($(".no-more").css("display") == "block") {
					$(".no-more").css({
						"display": "none"
					});
				}
				$(".loading").css({
					"display": "block"
				});
				setTimeout(function() {
					loadmore();
				}, 1000);
			}

		}

	}

}, false);

//加载更多数据
function loadmore() {
	var item = arrData;
	var page = Math.ceil(item.length / pageLength);

	if(page > 0) {
		$(".content").append(recordLists(item));
	}

	page--;

	$(".loading").css({
		"display": "none"
	});

	if(page <= 0) {
		if(!$(".content p").hasClass("no-more")) {
			$(".content").append('<p class="no-more">没有更多内容了</p>');
		}
		$(".no-more").css({
			"display": "block"
		});
	}
	return;
}