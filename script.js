$(document).ready(function(){

    var bears = [];
    var sortBol = false;
    var bearName = $('.bear-input').val();
    var bearCat = $('.category-input').val();
    var bearCute = $('#selCuteness').val();

    //adding bears tothe bear array
    function addBear(bName, bCategory, bCute){
        var currBear = {
            name: bName,
            category:bCategory,
            cuteness: bCute
        }
        bears.push(currBear);
    }

    //updating bear list
    function renderBears(){
        $('.bears-list').empty();

        bears.forEach(function(bear) {
            $('.bears-list').append("<li>This bear's name is " + bear.name + ". He is a " + bear.category + " bear. Cuteness level: "+bear.cuteness+"</li>");
        });
    }

    $('.post-bear').click(function(){
        $('.alert-warning').remove();
        updateBearVars();

        //checking the validation of the fields
        if (bearName.length >0 && bearCat.length >0 && bearCute !== null){
            addBear(bearName, bearCat, bearCute);
            renderBears();
            clearFields();
        }
        else{  
        
        var msg = " Your bear is not valid, please insert: " + getErrMsg();
        $('.container').append("<div class='alert alert-warning col-md-6 col-md-offset-3'><strong>Warning!</strong> "+msg+"</div>");
        }
    });

    function clearFields(){
         $('.bear-input').val('');
         $('.category-input').val('');
         $('#selCuteness').val('');
    }

    function updateBearVars(){
        bearName = $('.bear-input').val();
        bearCat = $('.category-input').val();
        bearCute = $('#selCuteness').val();
    }

    //checking if the fields are not empty, and returnin
    function getErrMsg(){
        var currMsgs = ['bear name ', 'bear catrgory ', 'bear cuteness rating '];
        var varArr = [bearName,bearCat,bearCute];
        var missingMsg ="";

        for (var i=0;i<currMsgs.length;i++){
            if (varArr[i] === null || varArr[i] === ""){
                    missingMsg+= currMsgs[i] + ", ";
            }
        }

        missingMsg = missingMsg.slice(0 ,missingMsg.length-2) + ".";
       
        return missingMsg;
   }
    
    $('.sort-bear').click(function(){
        if (!sortBol){
            bears.sort(function(a, b){
                return a.cuteness-b.cuteness
            });
        }
        else{
            bears.sort(function(a, b){
                return b.cuteness-a.cuteness
            });
        }

        sortBol = !sortBol;
        renderBears();
    });

});

