var AILMP = {
	stopDocumentClick : 'div.header-right, .search-box',
	gnbMenuActive : function(){ 
		//메뉴 활성화 시 서브메뉴 아코디언
		$(".depth-1").on("click", function (e) {
			e.preventDefault();
			e.stopPropagation();

			const $submenu = $(this).next(".submenus");
			const $link = $(this);

			if ($submenu.is(":visible")) {
				// 자기 것 닫기
				$submenu.stop(true, true).slideUp(200);
				$link.removeClass("active");
			} else {
				// 자기 것 열기 (다른 것들은 건드리지 않음)
				$submenu.stop(true, true).slideDown(200);
				$link.addClass("active");
			}
		});

		//상단 "공간찾기" 버튼
		$('div.header-left a.find-search-show').on('click', function(e) {
			$('div.search-place').addClass('show');
			$(this).find('span').addClass('on');
		});
		$('a.search-place-close').on('click', function(e) {
			$('div.search-place').removeClass('show');
			$('div.header-left a.find-search-show span').removeClass('on');
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
			$('div.header-right .search-box').fadeIn(function() {
				$('div.header-right .search-box').addClass('active');
			});
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
		$('.header-right a.tops.c, .menu-header a.tops.c, div.notification-wrap').on('mouseenter mouseleave', function(e) {
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

	//bootstrap tooltip init
	$('[data-tooltip="true"]').each(function () {
		new bootstrap.Tooltip(this);
	});

	//bootstrap selectpicker init
	$('.selectpicker').selectpicker();

	//document click node show/hide
	$(document).click(function () {
		$('div.header-right .search-box').removeClass('active');
		var searchBoxRemove = setTimeout(function() {
			$('div.header-right .search-box').fadeOut();
		}, 500);
	});

	//달력
    function updateHeader(instance) {
      // 커스텀 라벨이 없으면 생성해서 월 헤더 영역에 삽입
		if (!instance._monthLabel) {
			const monthsEl = instance.calendarContainer.querySelector('.flatpickr-months');
			const label = document.createElement('div');
			label.className = 'fp-month-label';
			monthsEl.appendChild(label);
			instance._monthLabel = label;
		}
		// 현재 년/월을 "YYYY. MM"로 표시 (MM은 두 자리)
		const current = new Date(instance.currentYear, instance.currentMonth, 1);
		instance._monthLabel.textContent = instance.formatDate(current, 'Y. m');
    }

    function updateHeaderLabel(instance) {
		const d = new Date(instance.currentYear, instance.currentMonth, 1);
		const y = d.getFullYear();
		const m = String(d.getMonth() + 1).padStart(2, '0');
		instance._fpLabel.textContent = `${y}.${m}`;
    }

    flatpickr('#calendar', {
		inline: true,
		mode: 'range',
		dateFormat: 'Y-m-d',
		defaultDate: [
			new Date(Date.now() - 7*24*60*60*1000),
			new Date()
		],
		locale: flatpickr.l10ns.ko,
		monthSelectorType: 'static',
		onReady(selectedDates, dateStr, instance) {
			const monthsEl = instance.calendarContainer.querySelector('.flatpickr-months');
			if (!instance._fpHeader) {
				const header = document.createElement('div');
				header.className = 'fp-header';
				const prev = document.createElement('button');
				prev.type = 'button'; prev.className = 'fp-btn preview';
				const label = document.createElement('div');
				label.className = 'fp-label';
				const next = document.createElement('button');
				next.type = 'button'; next.className = 'fp-btn next';
				header.append(prev, label, next);
				monthsEl.appendChild(header);
				instance._fpHeader = header;
				instance._fpLabel = label;
				prev.addEventListener('click', () => { instance.changeMonth(-1); updateHeaderLabel(instance); });
				next.addEventListener('click', () => { instance.changeMonth(1);  updateHeaderLabel(instance); });
			}
			updateHeaderLabel(instance);
		},
		onMonthChange: (sd, ds, inst) => updateHeaderLabel(inst),
		onYearChange: (sd, ds, inst) => updateHeaderLabel(inst)
    });
});