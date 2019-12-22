'use strict';

function Horns(data) {
    this.image_url = data.image_url;
    this.title = data.title;
    this.description = data.description;
    this.keyword = data.keyword;
    this.horns = data.horns;
    Horns.all.push(this);
}

Horns.all = [];

Horns.prototype.render = function () {
    let templateMarkup = $('#horns-template').html();
    let template = Handlebars.compile(templateMarkup);
    let hornOutput = template(this);
    $('#photo-template').append(hornOutput);
    $('div').hide();
    $('div').fadeIn(1000);
};

function selectByKeyword() {

    let seen = {};
    $('.filter').html('')
    Horns.all.forEach(objHorn => {
        if (!seen[objHorn.keyword]) {
            $('.filter').append(`<option value=${objHorn.keyword}>${objHorn.keyword}</option>`);
            seen[objHorn.keyword] = true;
        }

    });
}

function selectBySort() {
    $('.sort').on('change', function () {
        if ($('.sort').val() == 'title') {
            sortingByTitle();
            $('#photo-template').html('');
            Horns.all.forEach(element => {
              element.render();
            })
        } else if ($('.sort').val() == 'number') {
            sortByNumOfHorns();
            $('#photo-template').html('');
            Horns.all.forEach(element => {
              element.render();
            })
        }
    });
}



function sortingByTitle() {
    return Horns.all.sort((a, b) =>
        (a.title < b.title ? -1 : 1))
}


function sortByNumOfHorns() {
    return Horns.all.sort((a, b) =>
        (a.horns < b.horns ? -1 : 1))
}


$(`.filter`).on('change', function () {
    let options = $(this).val();
    $('div').hide();
    $(`.${options}`).fadeIn(1000);
});

$(`button`).click(function () {
    let page12 = $(this).attr(`id`);
    image12(page12);
});

function image12(pageNum) {
    $('#photo-template').html('');
    Horns.all = [];

    $.getJSON(`../data/page-${pageNum}.json`, function (data) {
        $.each(data, function (key, val) {
            let addObj = new Horns(val);
            addObj.render();
        });

        selectByKeyword();
        selectBySort();
    });

}

$(document).ready(function () {
    image12(1);
});
