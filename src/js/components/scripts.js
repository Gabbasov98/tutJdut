function docSlider() {
    var swiper = new Swiper('.modal-doc .swiper-container', {
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
            nextEl: '.modal-doc .swiper-button-next',
            prevEl: '.modal-doc .swiper-button-prev',
        },
        pagination: {
            el: '.modal-doc .swiper-pagination',
            type: 'fraction',
        },
    })
}


$(document).ready(function() {
    docSlider()
    $("[data-bs-target='#docModal3']").click(function() {
        setTimeout(() => {
            docSlider()
        }, 200);
    })

    $.datepicker.setDefaults($.datepicker.regional["ru"]);
    $(".date-input input").datepicker();
    dateFilter()


    $("[data-bs-toggle]").click(function() {
        $.datepicker.setDefaults($.datepicker.regional["ru"]);
        $(".date-input input").datepicker();
    })

    searchFild()
    customSelect()
    tabs()





    $(".pass-field__btn").click(function() {
        if ($(this).hasClass("pass-field__btn--active")) {
            $(this).removeClass("pass-field__btn--active")
            $(this).siblings("input").attr("type", "password")
        } else {
            $(this).addClass("pass-field__btn--active")
            $(this).siblings("input").attr("type", "text")
        }
    })

    $(".worker-sidebar__link").click(function(event) {
        event.preventDefault();
        var idc = $(this).attr('href'),
            top = $(idc).offset().top;
        $('body,html').animate({ scrollTop: top }, 0);
    });


    $(window).scroll(function() {
        var $sections = $('.add-worker__step');
        $sections.each(function(i, el) {
            var top = $(el).offset().top;

            var bottom = top + $(el).height();
            var scroll = $(window).scrollTop();
            var idn = $(el).attr('id');
            if (scroll > top && scroll < bottom) {
                $('.worker-sidebar__link.worker-sidebar__link--active').removeClass('worker-sidebar__link--active');
                $('.worker-sidebar__link[href="#' + idn + '"]').addClass('worker-sidebar__link--active');
            }
        });
    });

    $(".upload-one input").change(function(e) {
        let parentBlock = $(this).parents(".add-worker__upload")
        var file = $(this).val().split('\\').pop();
        let fileBadge = `
        <div class="add-worker__uploaded-item">
            <span>${file}</span>
            <button class="add-worker__uploaded-item-delete">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.75">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.1785 9.00021L13.756 5.42271C14.0819 5.09687 14.0819 4.57021 13.756 4.24437C13.4302 3.91854 12.9035 3.91854 12.5777 4.24437L9.00021 7.82187L5.42271 4.24437C5.09688 3.91854 4.57021 3.91854 4.24438 4.24437C3.91854 4.57021 3.91854 5.09687 4.24438 5.42271L7.82188 9.00021L4.24438 12.5777C3.91854 12.9035 3.91854 13.4302 4.24438 13.756C4.40688 13.9185 4.62021 14.0002 4.83354 14.0002C5.04688 14.0002 5.26021 13.9185 5.42271 13.756L9.00021 10.1785L12.5777 13.756C12.7402 13.9185 12.9535 14.0002 13.1669 14.0002C13.3802 14.0002 13.5935 13.9185 13.756 13.756C14.0819 13.4302 14.0819 12.9035 13.756 12.5777L10.1785 9.00021Z" fill="#85949E"/>
                    </g>
                </svg>
            </button>
        </div>`
        $(this).parents(".add-worker__file").addClass("add-worker__file--hidden")
        $(parentBlock).find(".add-worker__uploaded").append(fileBadge)

        $(parentBlock).find(".add-worker__uploaded-item-delete").click(function() {
            $(this).parents(".add-worker__upload").find(".add-worker__file").removeClass("add-worker__file--hidden")
            $(this).parents(".add-worker__uploaded-item").remove()
        })
    })

    $(".add-worker__uploaded-item-delete").click(function() {
        $(this).parents(".add-worker__uploaded-item").remove()
    })

    moreDropdown()

    $(".table__edit-select-btn").click(function() {
        $(this).parents(".table__edit-select").removeClass("table__edit-select--disabled")
    })
    $(".table__edit-select-save").click(function() {
        $(this).parents(".table__edit-select").addClass("table__edit-select--disabled")
    })

    $(".migrant-equip__btn").click(function() {
        $(this).parents(".migrant-equip__item").addClass("migrant-equip__item--active")
    })

    $(".migrant-equip__btn").hover(onIn);


    function onIn() {
        if (window.innerWidth > 992) {
            let el = $(this)
            setTimeout(function() {
                if (el.is(':hover')) {
                    $(".migrant-equip__item").removeClass("migrant-equip__item--active")
                    $(el).parents(".migrant-equip__item").addClass("migrant-equip__item--active")

                }
            }, 300);
        }
    }

    $(document).mouseup(function(e) {
        var div = $('.migrant-equip__dropdown');
        if (!div.is(e.target) && div.has(e.target).length === 0) {
            if ($(div).parents(".migrant-equip__item").hasClass("migrant-equip__item--active")) {
                $(div).parents(".migrant-equip__item").removeClass("migrant-equip__item--active")
            }
        }
    });


    $(".modal .table-check__item input").change(function() {
        disableInterviewBtn($(this))
    })
    $(".modal .modal__date input").change(function() {
        disableInterviewBtn($(this))
    })
    $(".modal .table-check__all input").change(function() {
        disableInterviewBtn($(this))
    })


})

function disableInterviewBtn(parent) {
    let isSelected = $(parent).parents(".modal").find(".table-nav__left").hasClass("table-nav__left--active")
    let dateValue = $(".modal__date input").val()
    if (isSelected && dateValue) {
        $(".modal__interview-btn").prop("disabled", false)
    } else {
        $(".modal__interview-btn").prop("disabled", true)
    }
}

function moreDropdown() {
    $(".more__btn").click(function() {
        $(this).parents(".more").addClass("more--active")
    })
    $(document).mouseup(function(e) {
        var div = $('.more__dropdown');
        if (!div.is(e.target) && div.has(e.target).length === 0) {
            if ($(div).parents(".more").hasClass("more--active")) {
                $(div).parents(".more").removeClass("more--active")
            }
        }
    });
}


function dateFilter() {
    let monthNamesRussian = [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь"
    ]
    moment.locale('ru');
    moment.updateLocale('ru', {
        months: monthNamesRussian
    });

    $('.date-range input').on('apply.daterangepicker', function(ev, picker) {
        console.log($(this))
        let parent = $(this).parents(".date-range")
        $(parent).addClass("date-range--ranged")
        $(parent).find(".date-range__filled").html(`
            ${picker.startDate.format('D MMMM YYYY')} - ${picker.endDate.format('D MMMM YYYY')}
        `)
        $(this).parents(".date-filter").find(".date-filter__item").removeClass("date-filter__item--active")

        if (!$(this).hasClass("filter-date")) {
            $(parent).addClass("date-filter__item--active")
        } else {
            $(this).parents(".filter__item").find("input[type='checkbox']").prop("checked", "true")
        }
    });

    $('.date-range input').daterangepicker({
        autoApply: true,
        "opens": "left",
        locale: {
            "format": "D MMMM YYYY",
            "separator": " - ",
            "applyLabel": "Apply",
            "cancelLabel": "Cancel",
            "fromLabel": "From",
            "toLabel": "To",
            "customRangeLabel": "Custom",
            "weekLabel": "W",
            "daysOfWeek": [
                "Вс",
                "Пн",
                "Вт",
                "Ср",
                "Чт",
                "Пт",
                "Сб"
            ],
            "monthNames": monthNamesRussian,
            "firstDay": 1
        }
    });

    $(".date-filter__item").click(function() {
        let parent = $(this).parents(".date-filter")
        $(parent).find(".date-range").removeClass("date-filter__item--active")
        $(parent).find(".date-filter__item").removeClass("date-filter__item--active")
        $(this).addClass("date-filter__item--active")
    })
}

function searchFild() {
    $(".search-field input").keyup(function() {
        let val = $(this).val()

        if (val) {
            $(this).siblings(".search-field__clear").addClass("search-field__clear--active")
            $(this).addClass("input--active")
        } else {
            $(this).siblings(".search-field__clear").removeClass("search-field__clear--active")
            $(this).removeClass("input--active")
        }
    })

    $(".search-field__clear").click(function() {
        $(this).siblings("input").val("")
    })
}

function customSelect() {
    $(".custom-select__target").click(function() {
        $(this).parents(".custom-select").toggleClass("custom-select--active")
    })

    $(".custom-select__top").click(function() {
        $(this).parents(".custom-select").toggleClass("custom-select--active")
    })

    $(document).mouseup(function(e) {
        var div = $('.custom-select__dropdown-inner');
        if (!div.is(e.target) && div.has(e.target).length === 0) {
            if (div.parents(".custom-select").hasClass("custom-select--active")) {
                div.parents(".custom-select").removeClass("custom-select--active")
            }
        }
    });

    function unselectOption(dropdown) {
        if ($(dropdown).hasClass("custom-select__dropdown-item--country")) {
            $(".custom-select__dropdown-item--country").removeClass("custom-select__dropdown-item--selected")
            $(dropdown).addClass("custom-select__dropdown-item--selected")
            $(dropdown).next().slideToggle()
        } else {
            $(dropdown).parents(".custom-select__dropdown").find(".custom-select__dropdown-item").removeClass("custom-select__dropdown-item--selected")
            $(dropdown).parents(".custom-select").removeClass("custom-select--active")
        }
    }

    $(".custom-select__dropdown-item").click(function() {
        let text = $(this).text().replace(/\s+/g, ' ').trim()
        unselectOption($(this))
        $(this).addClass("custom-select__dropdown-item--selected")
        $(this).parents(".custom-select").find("input").attr("value", text)
    })
}

function tabs() {
    $(".tab").click(function() {
        let path = $(this).attr("data-tab-path")
        $(this).parents(".tab-parent").find(".tab").removeClass("tab--active")
        $(this).parents(".tab-parent").find(`.tab[data-tab-path="${path}"]`).addClass("tab--active")
        $(this).parents(".tab-parent").find(".tab__content").removeClass("tab__content--active")
        $(this).parents(".tab-parent").find(`.tab__content[data-tab-path="${path}"]`).addClass("tab__content--active")
    })

    $(".tab2").click(function() {
        let path = $(this).attr("data-tab-path")
        $(this).parents(".tab-parent").find(".tab2").removeClass("tab2--active")
        $(this).parents(".tab-parent").find(`.tab2[data-tab-path="${path}"]`).addClass("tab2--active")
        $(this).parents(".tab-parent").find(".tab2-content").removeClass("tab2-content--active")
        $(this).parents(".tab-parent").find(`.tab2-content[data-tab-path="${path}"]`).addClass("tab2-content--active")
    })

    $(".work-history__tab").click(function() {
        let path = $(this).attr("data-tab-path")
        $(".work-history__tab").removeClass("work-history__tab--active")
        $(`.work-history__tab[data-tab-path="${path}"]`).addClass("work-history__tab--active")
        $(".work-history__tab-content").removeClass("work-history__tab-content--active")
        $(`.work-history__tab-content[data-tab-path="${path}"]`).addClass("work-history__tab-content--active")
    })
}