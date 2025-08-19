var AILMP = {
	stopDocumentClick : 'div.header-right, .search-box',
	gnbMenuActive : function(){ 
		//메뉴 활성화 시 서브메뉴 아코디언
		$(".depth-1").click(function (e) {
			e.preventDefault();
			e.stopPropagation();

			let submenu = $(this).next(".submenus");
			let parentLink = $(this);

			if (!submenu.is(":visible")) {
				$(".submenus").slideUp();
				$(".depth-1").removeClass("active");

				submenu.stop(true, true).slideDown();
				parentLink.addClass("active");
			} else {
				submenu.stop(true, true).slideUp();
				parentLink.removeClass("active");
			}
		});

		//우측 메뉴 활성
		$('div.header-right a.tops.d').on('click', function() {
			$('aside.lnb-wrapper').addClass('active');
			$('.film-normal').fadeIn();

			$('a.menu-close').click(function() {
				$('aside.lnb-wrapper').removeClass('active');
				$('.film-normal').fadeOut();
			});
		});

		//상단 검색 영역 활성
		$('div.header-right a.tops.a').on('click', function(e) {
			e.stopPropagation();
			$('div.header-right .search-box').fadeIn();
		});

		//상단 로그인, 회원가입 활성
		$('div.header-right div.b').on('mouseenter mouseleave', function(e) {
			const $target = $('div.header-right div.b p.bloom-login');

			if (e.type === 'mouseenter') {
				$target.css('display', 'block');
			} else if (e.type === 'mouseleave') {
				$target.css('display', 'none');
			}
		});

		//상단 공지사항 활성
		$('.header-right a.tops.c, div.notification-wrap').on('mouseenter mouseleave', function(e) {
			const $target = $('div.notification-wrap');

			if (e.type === 'mouseenter') {
				$target.css('display', 'block');
			} else if (e.type === 'mouseleave') {
				$target.css('display', 'none');
			}
		});

		//prevent document click 
		$(AILMP.stopDocumentClick).on('click', function(e) {
			e.stopPropagation();
		});
	}
}

$(document).ready(function() {
	AILMP.gnbMenuActive();
	$('[data-tooltip="true"]').each(function () {
		new bootstrap.Tooltip(this);
	});

	//document click node show/hide
	$(document).click(function () {
		$('div.header-right .search-box').fadeOut();
	});
});