$(document).ready(function() {


    selectTableRows()

    $(".custom-select__dropdown-check input").change(function() {
        let selectedFilter = []
        let filterCheckbox = $(this).parents(".filter__item").children(".filter__check").children("input")

        $(this).parents(".custom-select__dropdown-inner").find("input").each(function(index, el) {
            if ($(el).prop('checked')) {
                selectedFilter.push($(el).prop('checked'))
            }
        });
        $(this).parents(".custom-select").find(".custom-select__num").addClass("custom-select__num--active").html(selectedFilter.length)
        $(this).parents(".custom-select").find(".custom-select__num").addClass("custom-select__num--active")
        $(this).parents(".custom-select").find(".custom-select__placeholder").addClass("custom-select__placeholder--disable")

        if (selectedFilter.length === 0) {
            $(this).parents(".custom-select").find(".custom-select__placeholder").removeClass("custom-select__placeholder--disable")
            $(this).parents(".custom-select").find(".custom-select__num").removeClass("custom-select__num--active")
        }
        if (selectedFilter.indexOf(true) !== -1) {
            $(filterCheckbox).prop("checked", true)
        } else {
            $(filterCheckbox).prop("checked", false)
        }
        selectedFilter = []


    })

    $(".table__sort").click(function() {
        $(this).toggleClass("table__sort--active")
    })
})


function selectTableRows() {
    let selectedRow = 0

    $(".table-check__item input").change(function() {
        let val = $(this).prop('checked')


        if (val) {
            $(this).parents("tr").addClass("selecter-row")
            selectedRow++
        } else {
            $(this).parents("tr").removeClass("selecter-row")
            selectedRow--
        }
        checkboxesValue($(this))
        $(".table-nav__selected-num").html(selectedRow)
    })

    $(".table-check__all input").change(function() {
        let checkboxes = []
        $(this).parents("table").find(".table-check__item input").each(function(index, el) {
            checkboxes.push($(el).prop('checked'))
        });

        let val = $(this).prop('checked')
        if (val) {
            $(this).parents("table").find(".table-check__item input").prop('checked', true)
            $(this).parents("table").find("tbody").children("tr").addClass("selecter-row")
            $(this).parents(".table-filter").find(".table-nav__left").addClass("table-nav__left--active")
            $(this).parents(".table-filter").find(".table-nav__selected-num").html(checkboxes.length)
            selectedRow = checkboxes.length
        } else {
            $(this).parents("table").find(".table-check__item input").prop('checked', false)
            $(this).parents("table").find("tbody").children("tr").removeClass("selecter-row")
            $(".table-nav__left").removeClass("table-nav__left--active")
            $(".table-nav__selected-num").html(0)
        }

        // checkboxesValue()
    })

    $(".table-nav__clear").click(function() {
        $(this).parents(".table-filter").find("tbody").children("tr").removeClass("selecter-row")
        $(this).parents(".table-filter").find(".table-check__item input").prop('checked', false)
        $(this).parents(".table-filter").find(".table-check__all input").prop('checked', false)
        $(this).parents(".table-filter").find(".table-nav__left").removeClass("table-nav__left--active")
        selectedRow = 0
    })

    function checkboxesValue(el) {
        let checkboxes = []
        let checked = false


        $(el).parents(".table-filter").find(".table-check__item input").each(function(index, el) {
            checkboxes.push($(el).prop('checked'))
        });

        if (checkboxes.indexOf(false) === -1) {
            $(el).parents(".table-filter").find(".table-check__all input").prop('checked', true)
        } else {
            $(el).parents(".table-filter").find(".table-check__all input").prop('checked', false)
        }

        if (checkboxes.indexOf(true) !== -1) {
            $(el).parents(".table-filter").find(".table-nav__left").addClass("table-nav__left--active")
        } else {
            $(el).parents(".table-filter").find(".table-nav__left").removeClass("table-nav__left--active")
            selectedRow = 0
        }
    }
}