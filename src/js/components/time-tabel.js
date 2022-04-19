$(document).ready(function() {

    $(".tabel__tab").click(function() {
        let path = $(this).attr("data-tab-path")
        $(".tabel__tab").removeClass("tabel__tab--active")
        $(this).addClass("tabel__tab--active")
        $(".tabel__content").removeClass("tabel__content--active")
        $(`.tabel__content[data-tab-path="${path}"]`).addClass("tabel__content--active")
        console.log(path)
    })


    monthPicker()

    $(".month-picker__current").click(function() {
        $(this).parents(".month-picker").addClass("month-picker--active")
    })

    $(document).mouseup(function(e) {
        var div = $('.month-picker');
        if (!div.is(e.target) && div.has(e.target).length === 0) {
            div.removeClass("month-picker--active")
        }
    });

    $(".work-time__next").click(function() {
        $(".work-time").addClass("work-time--last15")
    })
    $(".work-time__prev").click(function() {
        $(".work-time").removeClass("work-time--last15")
    })

    timeTableEdit()
    calculateShifts()
    financeEdit()

    $(".finance__comment-btn").click(function() {
        $(this).parents(".finance__comment").addClass("finance__comment--active")



    })

    $(document).keyup(function(e) {
        if (e.keyCode === 13 && !$(".finance__comment--active").hasClass("finance__comment--filled")) {
            $(".finance__comment").removeClass("finance__comment--active")
        }
    });

    $(document).mouseup(function(e) {
        var div = $('.finance__comment-dropdown');
        if (!div.is(e.target) && div.has(e.target).length === 0) {
            if ($(div).parents(".finance__comment").hasClass("finance__comment--active")) {
                $(div).parents(".finance__comment").removeClass("finance__comment--active")
            }
        }
    });
})


let currentMonth = +moment().month()
let currentYear = +moment().year()

function monthPicker() {
    setMonth(currentMonth, currentYear)
}

function setMonth(month, year) {
    let localeMonth = +moment().month()
    let localeYear = +moment().year()
    $(".month-picker__current").val(`${monthNamesRussian[month]} ${year}`)
    $(".month-picker__year").val(year)
    $(`.month-picker__month`).removeClass("month-picker__month--active")
    $(`.month-picker__month[data-month="${month}"]`).addClass("month-picker__month--active")

    currentMonth = month
    currentYear = year
    if ((localeMonth == month) && (localeYear == year)) {
        $(".month-picker__btn--next").addClass("month-picker__btn--disabled")
    } else {
        $(".month-picker__btn--next").removeClass("month-picker__btn--disabled")
    }
    if (localeYear == year) {
        $(".month-picker__year-btn--next").addClass("month-picker__year-btn--disabled")
    } else {
        $(".month-picker__year-btn--next").removeClass("month-picker__year-btn--disabled")
    }
}

function prevMonth() {
    if (currentMonth === 0) {
        setMonth(11, currentYear - 1)
    } else {
        setMonth(currentMonth - 1, currentYear)
    }
}

function nextMonth() {
    if (currentMonth === 11) {
        setMonth(0, currentYear + 1)
    } else {
        setMonth(currentMonth + 1, currentYear)
    }
}

function prevYear() {
    setMonth(currentMonth, currentYear - 1)
}

function nextYear() {
    setMonth(currentMonth, currentYear + 1)
}

$(".month-picker__month").click(function() {
    let month = +$(this).attr("data-month")
    setMonth(month, currentYear)
    $(".month-picker").removeClass("month-picker--active")
})


function timeTableEdit() {
    let workShift = 0


    function setWorkShift() {

        if (workShift === 0) {
            $(".work-time__input-type").addClass("work-time__input-type--second")
            workShift = 1
        } else if (workShift === 1) {
            $(".work-time__input-type").removeClass("work-time__input-type--second")
            $(".work-time__input-type").addClass("work-time__input-type--third")
            workShift = 2
        } else if (workShift === 2) {
            $(".work-time__input-type").removeClass("work-time__input-type--third")
            workShift = 0
        }
    }

    function setDefaultWorkShip(shiftType = 0) {
        if (shiftType == 0) {
            $(".work-time__input-type").removeClass("work-time__input-type--second")
            $(".work-time__input-type").removeClass("work-time__input-type--third")
        } else if (shiftType == 1) {
            $(".work-time__input-type").addClass("work-time__input-type--second")
            $(".work-time__input-type").removeClass("work-time__input-type--third")
        } else if (shiftType == 2) {
            $(".work-time__input-type").removeClass("work-time__input-type--second")
            $(".work-time__input-type").addClass("work-time__input-type--third")
        }
        workShift = shiftType
    }

    $(".work-time__edit").click(function() {
        let shiftType = +$(this).attr("data-shift")
        let value = $(this).find("span").text()
        let editArea = `
        <div class="work-time__input">
            <input type="number" class="work-time__input-text" min="0" max="24">
            <div class="work-time__input-type">
                <span class="work-time__input-type-first">дневная</span>
                <span class="work-time__input-type-second">ночная</span>
                <span class="work-time__input-type-third">другая</span>
            </div>
        </div>
        `
        $(".work-time__input").remove()
        $(this).parents("td").append(editArea)
        $(".work-time__input-text").val(value)
        $(".work-time__input-text").focus()
        setDefaultWorkShip(shiftType)
            // console.log(value)

        $(".work-time__input-type").click(function() {
            setWorkShift()
        })

        $(".work-time__input-text").on('keyup', function() {
            if ($(this).val() > Number($(this).attr("max"))) {
                val = $(this).val().slice(0, $(this).attr("max").length);
                $(this).val(val);
            }
        });

        $(document).keyup(function(e) {
            if (e.keyCode === 13) {
                let value = $(".work-time__input-text").val()
                let parent = $(".work-time__input").parents("td").find(".work-time__edit")
                $(parent).find("span").html(value)

                if (workShift === 2) {
                    $(parent).removeClass("work-time__edit--dark")
                    $(parent).addClass("work-time__edit--light")
                } else if (workShift === 1) {
                    $(parent).addClass("work-time__edit--dark")
                    $(parent).removeClass("work-time__edit--light")
                } else if (workShift === 0) {
                    $(parent).removeClass("work-time__edit--dark")
                    $(parent).removeClass("work-time__edit--light")
                }
                $(".work-time__input").remove()
                calculateShifts()
                workShift = 0
            }
        });

        $(document).mouseup(function(e) {
            var div = $('.work-time__input');
            if (!div.is(e.target) && div.has(e.target).length === 0) {
                div.remove();
            }
        });
    })
}

function calculateShifts() {
    let rows = $(".work-time tbody").find("tr")

    $(rows).each(function(index, el) {
        let sum = 0
        let shiftsArray = []
        $(el).find(".work-time__edit span").each(function(index2, el2) {
            if (+$(el2).text() > 0) {
                shiftsArray.push(+$(el2).text())
            }
        })

        shiftsArray.forEach(shift => {
            sum = sum + shift
        });
        $(el).find(".work-time__hours").html(sum)
        $(el).find(".work-time__shifts").html(shiftsArray.length)
    })
}

function financeEdit() {


    $(".finance__edit").click(function() {
        let value = +$(this).text()
        let editArea = `
        <div class="finance__input">
            <input type="number">
        </div>
        `

        $(this).append(editArea)
        if (value > 0) {
            $(".finance__input input").val(value)
        }

        $(".finance__input input").focus()

        $(document).keyup(function(e) {
            if (e.keyCode === 13) {
                let value = $(".finance__input input").val()
                let parent = $(".finance__input input").parents("td")
                $(parent).find(".finance__edit").html(value)
                $(".finance__input").remove()
            }
        });

        $(document).mouseup(function(e) {
            var div = $('.finance__input');
            if (!div.is(e.target) && div.has(e.target).length === 0) {
                div.remove();
            }
        });
    })
}