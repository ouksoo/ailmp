// main visual swipe 초기화
const mainVisualSwiper = new Swiper('.main-visual-swiper', {
	loop: true,
	effect: "fade",
	speed: 800,
	autoplay: { 
		delay: 4000, disableOnInteraction: false 
	},
	allowTouchMove: true,
	watchSlidesProgress: true,
	preloadImages: true,
	updateOnWindowResize: true,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	navigation: {
		nextEl: '.main-visual-next',
		prevEl: '.main-visual-prev',
	},
	on: {
    slideChangeTransitionStart(swiper) {
      // 1) 방금까지 활성(slide) → 떠나는 슬라이드로 표시하고 1.00에 고정
      const prev = swiper.slides[swiper.previousIndex];
      if (prev) {
        prev.classList.add('is-leaving');
        const img = prev.querySelector('.slide-visual-bg');
        if (img) {
          img.style.animation = 'none';
          img.style.transform = 'scale(1.00)'; // 튐 방지: 1.00으로 유지
        }
      }

      // 2) 새로 활성될 슬라이드: 애니메이션 재생을 확실히 트리거
      const cur = swiper.slides[swiper.activeIndex];
      if (cur) {
        const img = cur.querySelector('.slide-visual-bg');
        if (img) {
          // 리셋 → 리플로우 → CSS(.swiper-slide-active) 애니메이션 재적용
          img.style.animation = 'none';
          img.style.transform = 'scale(1.10)';
          // 강제 리플로우
          // eslint-disable-next-line no-unused-expressions
          img.offsetHeight;
          img.style.animation = '';
        }
      }
    },

    slideChangeTransitionEnd(swiper) {
      // 3) 이제 전환이 끝났으니, 떠났던 슬라이드를 원래 준비 상태(1.10)로 리셋
      swiper.slides.forEach(slide => {
        if (slide.classList.contains('is-leaving')) {
          const img = slide.querySelector('.slide-visual-bg');
          if (img) {
            img.style.animation = 'none';
            img.style.transform = 'scale(1.10)'; // 화면 밖에서 조용히 리셋
            // 리플로우 후 깔끔히 정리
            // eslint-disable-next-line no-unused-expressions
            img.offsetHeight;
            img.style.animation = '';
          }
          slide.classList.remove('is-leaving');
        }
      });
    },
  }
});


// main visual swipe 초기화
const placeVisualSwiper = new Swiper('.place-visual-swiper', {
	loop: false,
	effect: "fade",
	speed: 800,
	autoplay: false,
	allowTouchMove: true,
	watchSlidesProgress: true,
	preloadImages: true,
	updateOnWindowResize: true,
	pagination: {
        el: ".swiper-pagination",
        type: "fraction",
	},
	navigation: {
		nextEl: '.place-visual-next',
		prevEl: '.place-visual-prev',
	},
	on: {
    slideChangeTransitionStart(swiper) {

    },

    slideChangeTransitionEnd(swiper) {
      
    },
  }
});

// 잇플레이스 PICK swipe 초기화
const mainItSwiper = new Swiper('.main-it-swiper', {
	loop: true,
	speed: 800,
	autoplay: false,
	allowTouchMove: true,
	watchSlidesProgress: true,
	preloadImages: true,
	updateOnWindowResize: true,

	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	navigation: {
		nextEl: '.it-next',
		prevEl: '.it-prev',
	},
	on: {
		slideChangeTransitionStart(swiper) {
			swiper.slides.forEach(slide => {
				const img = slide.querySelector('.slide-it-bg');
				if (!img) return;
				// 애니메이션 강제 리셋
				img.style.animation = 'none';
				//img.style.transform = 'scale(1.10)';
				// 리플로우 후 애니메이션 속성 제거(활성 슬라이드 CSS 선택자가 다시 적용되며 재생)
				img.offsetHeight; // reflow
				img.style.animation = '';
			});
		},
	}
});

//촬영 컨셉에 맞는 공간 찾기 swipe 초기화
var mainConceptSwiper = new Swiper(".concept-slide", {
	direction: 'horizontal',
	loop: true,
	spaceBetween: 24,
	slidesPerView: 2,
	breakpoints: {
		768: {
			slidesPerView: 2.1
		}
	},
	navigation: {
		nextEl: '.concept-next',
		prevEl: '.concept-prev',
	},
	scrollbar: {
		el: '.swiper-scrollbar',
	},
	on: {
		slideChangeTransitionStart: function(se) {
			var thisIndex = se.realIndex+1;
			$('.area-10 div.inner a').fadeOut();
			$('.area-10 div.inner a.story-img-'+thisIndex).fadeIn();
		},
	}
});

/** 리뷰 전체보기 리스트 pc */
var reviewThumbSwiper = new Swiper(".review-thumb-wiper", {
	loop: true,
	spaceBetween: 10,
	slidesPerView: 10,
	freeMode: true,
	watchSlidesProgress: true,
});
var reviewDetailSwiper = new Swiper(".review-detail-swiper", {
	loop: true,
	spaceBetween: 10,
	pagination: {
        el: ".pagination-review",
        type: "fraction",
	},
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
		thumbs: {
		swiper: reviewThumbSwiper,
	},
});
/** //리뷰 전체보기 리스트 pc */

/** 공간사진 전체 보기 */
var reviewThumbSwiper = new Swiper(".picture-total-thumb-wiper", {
	loop: true,
	spaceBetween: 24,
	slidesPerView: 10,
	freeMode: true,
	watchSlidesProgress: true,
});
var reviewDetailSwiper = new Swiper(".picture-totalview-swiper", {
	loop: true,
	spaceBetween: 10,
	pagination: {
        el: ".pagination-pictures",
        type: "fraction",
	},
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
		thumbs: {
		swiper: reviewThumbSwiper,
	},
});
/** //공간사진 전체 보기 */

// 호스트 메인 하단
const hostItSwiper = new Swiper('.host-it-swiper', {
	loop: true,
	speed: 1200,
	effect: "fade",
	autoplay: {
		delay: 5000,
	},
	allowTouchMove: true,
	watchSlidesProgress: true,
	preloadImages: true,
	updateOnWindowResize: true,
});

/* 공간찾기 slide 해상도 적용 */
let placeSearchSwiper = null;

const searchPlaceOptions = {
	loop: true,
	spaceBetween: 40,
	pagination: { 
		el: '.swiper-pagination', 
		clickable: true,
	},
	navigation: { 
		nextEl: '.swiper-button-next', 
		prevEl: '.swiper-button-prev' 
	},
	autoplay: false
};

function ensureSwiperOn() {
	if (!document.querySelector('.place-search-swiper')) return;
	if (placeSearchSwiper && !placeSearchSwiper.destroyed) return;
	placeSearchSwiper = new Swiper('.place-search-swiper', searchPlaceOptions);
	// console.info('on');
}

function ensureSwiperOff() {
	if (placeSearchSwiper && !placeSearchSwiper.destroyed && typeof placeSearchSwiper.destroy === 'function') {
		placeSearchSwiper.destroy(true, true);
	}
	placeSearchSwiper = null;
	// console.info('off');
}

function applyByWidth() { // 현재 폭에 맞게 적용
	if (window.innerWidth <= 1023) ensureSwiperOn();
	else ensureSwiperOff();
}

document.addEventListener('DOMContentLoaded', applyByWidth); // init

let resizeBounceTimer; // 리사이즈(debounce)
	window.addEventListener('resize', () => {
		clearTimeout(resizeBounceTimer);
		resizeBounceTimer = setTimeout(applyByWidth, 150);
});
/* //공간찾기 slide 해상도 적용 */

var AILMP = {
	stopDocumentClick : 'div.header-right, .search-box',
	placeUsertimer : null,
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

		//공간상세보기 "날짜 선택"
		$('div.reservation-select .select-date a').on('click', function(e) {
			e.preventDefault();
			$('div.reserve-place-select').css('display', 'block');
			$('div.reserve-place-select div.close-btn a').on('click', function(e) {
				e.preventDefault();
				$('div.reserve-place-select').css('display', 'none');
			});	
		});

		//공간상세보기 "인원 선택"
		$('div.select-man a.select-person').on('click', function(e) {
			e.preventDefault();
			$(this).toggleClass('active');
			if($(this).next().hasClass('show')) {
				$(this).next().removeClass('show');
			}
			else {
				$(this).next().addClass('show');
			}
		});

		//상단 "공간찾기" 버튼
		$('div.header-left a.find-search-show').on('click', function(e) {
			$('div.search-place').addClass('show');
			$('div.search-apply').css('display', 'block');
			applyByWidth();
			$(this).addClass('on');
		});
		$('a.search-place-close, a.search-place-off').on('click', function(e) {
			$('div.search-place').removeClass('show');
			$('div.search-apply').css('display', 'none');
			$('div.header-left a.find-search-show').removeClass('on');
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

		//리뷰 이미지 전체보기 모바일
		$('.reviewinformation span.thumbnail a').on('click', function() {
			$('#reviewDetailViewModal').addClass('mobile-review');
			$('.mobile-review .modal-go-back').on('click', function() {
				$('#reviewDetailViewModal').removeClass('mobile-review');
			});
		});

		//공간 상세보기 공간 사진 전체 보기
		$('a.view-all-place-pic').on('click', function(e) {
			e.preventDefault();
			$('body').css('overflow', 'hidden');
			$('.picture-backface').fadeIn();

			$('a.picture-backface-close').on('click', function(e) {
				e.preventDefault();
				$('body').css('overflow', 'auto');
				$('.picture-backface').fadeOut();
			});
		});

		//공간 상세보기 "공간 예약하기" 버튼
		$('a.reservation-button').on('click', function(e) {
			e.preventDefault();
			$('div.reserve-wrap').addClass('on');
			$('a.reserve-modal-close-button').on('click', function(e) {
				e.preventDefault();
				$('div.reserve-wrap').removeClass('on');
			});
		});

		//prevent document click 
		$(AILMP.stopDocumentClick).on('click', function(e) {
			e.stopPropagation();
		});
	},
	//공간 리스트 형태 구현
	placeListSortingAnimation : function() {
		const cards = document.querySelectorAll('.masonry-section .card');

		// 모션 최소화 환경이면 바로 표시
		const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReduced) {
			cards.forEach(c => c.classList.add('reveal'));
			return;
		}

		const io = new IntersectionObserver((entries) => {
			entries.forEach((e) => {
				if (!e.isIntersecting) return;
				const i = [...cards].indexOf(e.target);
				// 같은 프레임에 여러 개 들어와도 약간씩 딜레이
				e.target.style.animationDelay = `${(i % 8) * 80}ms`;
				e.target.classList.add('reveal');
				io.unobserve(e.target);
			});
		}, { threshold: 0.1 });

		cards.forEach(c => io.observe(c));
	},
	//공간 상세보기 visual
	placeDetailInitialVisual : function() {
		if (window.innerWidth <= 767) {
			$('body').removeClass('no-scroll');	
		} else {
			$('h2.place-view-title').fadeIn(1300, function() {
				$(this).addClass('active');
				$('div.place-visual-area div.initial').addClass('active');

				const mouseWheelStart = setTimeout(function() {
					window.addEventListener('wheel', AILMP.placeDetailVisualLastScene, { once: true });
				});
			});
		}
	},
	placeDetailVisualLastScene : function(e) {
		if (e.deltaY > 0) {
			$('div.place-visual-area div.initial').removeClass('active, initial');
			const placeBodyScrollAble = setTimeout(function() {
				$('body').removeClass('no-scroll');	
				$('div.place-visual-area div.place-film, div.place-visual-area div.place-detail-info').fadeIn();
				$('#placeVisualAreaUserAction').on('mousemove', function() {
					AILMP.placeUserMouseMoveDetect();
				});
			}, 1000);
		}
	},
	placeUserMouseMoveDetect : function() {
		$('div.place-visual-area div.place-film, div.place-visual-area div.place-detail-info').fadeIn();
		clearTimeout(AILMP.placeUsertimer);
		AILMP.placeUsertimer = setTimeout(() => {
			$('div.place-visual-area div.place-film, div.place-visual-area div.place-detail-info').fadeOut();
		}, 5000);
	},
	pageTabsInitialize : function() {
		//결제하기 텝
		$('div.reservation-tabs div.tab-btn a').on('click', function() {
			let tabNum = $(this).data('tab');
			$('div.reservation-tabs div.tab-btn a').removeClass('on');
			$('div.mypage-reservation-list').css('display', 'none');
			$(this).addClass('on');
			$('div.reservatoin-tab-' + tabNum).css('display', 'block');
		});

		//결제하기 텝
		$('div.payment-method ul.tabs li').on('click', function() {
			let tabNum = $(this).data('tab');
			$('div.payment-method ul.tabs li').removeClass('on');
			$('div.payment-method div.payments').css('display', 'none');
			$(this).addClass('on');
			$('div.payment-method div.payment-' + tabNum).css('display', 'block');
		});

		//고객센터 텝
		$('div.custom-tabs div.tab-btn a').on('click', function() {
			let tabNum = $(this).data('tab');
			$('div.custom-tabs div.tab-btn a').removeClass('on');
			$(this).addClass('on');

			$('div.custom-notice-list').css('display', 'none');
			$('div.custom-event-list').css('display', 'none');

			$('div.notice-tab-' + tabNum).css('display', 'block');
			$('div.event-tab-' + tabNum).css('display', 'block');
		});

		//호스트 공간 관리 텝
		$('div.place-menagement-tabs div.tab-btn a').on('click', function() {
			let tabNum = $(this).data('tab');
			$('div.place-menagement-tabs div.tab-btn a').removeClass('on');
			$('div.place-management-list').css('display', 'none');
			$(this).addClass('on');
			$('div.place-management-tab-' + tabNum).css('display', 'block');

			if(tabNum == 2) {
				$('.stop-temporary').css('display', 'block');
			}
			else {
				$('.stop-temporary').css('display', 'none');
			}
		});
	},
}

$(document).ready(function() {
	AILMP.gnbMenuActive();
	AILMP.placeListSortingAnimation();
	AILMP.pageTabsInitialize();
	AOS.init();

	if ('scrollRestoration' in history) {
		history.scrollRestoration = 'manual';
	}
	window.scrollTo(0, 0);

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

	flatpickr('#reservePlaceDateSelectBox', {
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

/** 브라우져 스크롤 이벤트 통합 */
window.addEventListener('scroll', () => {
	const y = window.scrollY || window.pageYOffset;

	//메인화면 상단 GNB 컨트롤
	if (y >= 100) {
		$('.main-header').removeClass('main-only');
	}
	if (y === 0) {
		$('.main-header').addClass('main-only');
	}
});