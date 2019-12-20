'use strict'; 

function Horns(data){
    this.image_url = data.image_url;
    this.title= data.title;
    this.description = data.description;
    this.keyword =data.keyword;
    this.horns=data.horns;
    Horns.all.push(this);
}

Horns.all=[];

Horns.prototype.render = function(){
    let templateMrkup = $('#horns-template').html();
    let template = Handlebars.compile(templateMrkup);
    let hornOutput = template(this);
    $('#photo-template').append(hornOutput);
    $('div').hide();
    $('div').fadeIn(1000);
};

function showSelectBox() {
    let seen = {};
    $('.filter').empty();
    Horns.all.forEach(horn => {
      if (!seen[horn.keyword]) {
        let option = `<option value = "${horn.keyword}">${horn.keyword}</option>`;
        $('.filter').append(option);
        seen[horn.keyword] = true;
  
      }
  
    });

    // function populateSelectBox() {
    //   let seen = {};
    //   let select = $('.filter');// we put this var to save our search in it to not doing that 20times evry time.jq is alibrary and there jop is to find element so to do the searching one time and put it in the var 
    //   $(select).empty();
    //   Horns.all.forEach(horn => {
    //     if (!seen[horn.keyword]) {
    //       let option = `<option value = "${horn.keyword}">${horn.keyword}</option>`;
    //       select.append(option);
    //       seen[horn.keyword] = true;
    
    //     }
  
  }
  function showSortBox() {
    $('.sort').on('change', function () {
      if ($('.sort').val() == 'title') {
        sortingByTitle();
        $('#photo-template').html('');
        Horns.all.forEach(element => {
          element.render();
        });
      } else if ($('.sort').val() == 'number') {
        sortByNumOfHorns();
        $('#photo-template').html('');
        Horns.all.forEach(element => {
          element.render();
        });
      }
    });
  
  }
    

  function sortingByTitle() {
    return Horns.all.sort( (a, b)=>
         (a.title <b.title?-1:1))
     }
  


  function sortByNumOfHorns() {
   return Horns.all.sort( (a, b)=>
        (a.horns < b.horns?-1:1))
    }
     
  
  $('.filter').on('change', function () {
    let selected = $(this).val();
    $('div').hide();
    $(`#${selected}`).fadeIn(1000);
  
  });
  
  $(`button`).click(function () {
    let num = $(this).attr('id');
    showpage(num);
  });
  
  function showpage(pageNum) {
    $('#photo-template').html('');
    Horns.all = [];
    $.get(`../data/page-${pageNum}.json`)
      .then(data => {
        data.forEach(thing => {
          let horn = new Horns(thing)
          horn.render();
        });
      })
      .then(() => showSelectBox())
      .then(() => showSortBox())
  }
  
  $(document).ready(function () {
    showpage(1);
  });
  


 
