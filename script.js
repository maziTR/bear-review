$(document).ready(function(){
    
        var $bearName = $('.bear-input');
        var $bearCat = $('.category-input');
        var $bearCute = $('#selCuteness');

        var bearName = $bearName.val();
        var bearCat = $bearCat.val();
        var bearCute = $bearCat.val();

        //var for list sorting
        var sortBol = false;
        
        var bearAppModule = function(){
            var bears = [];
            
            //adding bears tothe bear array
            var addBear = function (bName, bCategory, bCute){
                bears.push({name: bName, category:bCategory, cuteness: bCute });
            }
    
            //updating bear list
            var updateBears = function (){
                var $bearList = $('.bears-list');
                $bearList.empty();
    
                bears.forEach(function(bear) {
                    $bearList.append("<li>This bear's name is " + bear.name + ". He is a " + bear.category + " bear. Cuteness level: "+bear.cuteness+"</li>");
                });
            }
            
            return {
                updateBears: updateBears,
                addBear: addBear,
                getBears: bears
            }
        }
    
        var bearApp = bearAppModule();
    
        $('.post-bear').click(function(){
    
            $('.alert-warning').remove();
            updateBearVars();
    
            //checking the validation of the fields
            if (bearName.length >0 && bearCat.length >0 && bearCute !== null){
                bearApp.addBear(bearName, bearCat, bearCute);
                bearApp.updateBears();
                clearFields();
            }
            else{  
            var msg = " Your bear is not valid, please insert: " + getErrMsg();
            $('.container').append("<div class='alert alert-warning col-md-6 col-md-offset-3'>"+
            "<strong>Warning!</strong> "+msg+"</div>");
            }
        });
    
        function clearFields(){
             $bearName.val('');
             $bearCat.val('');
             $bearCute.val('');
        }
    
        function updateBearVars(){
            bearName = $bearName.val();
            bearCat = $bearCat.val();
            bearCute = $bearCute.val();
        }
    
        //checking if the fields are not empty, and return it
        function getErrMsg(){
            var currMsgs = ['bear name ', 'bear catrgory ', 'bear cuteness rating '];
            var varArr = [bearName, bearCat, bearCute];
            var missingMsg ="";
    
            for (var i=0;i<currMsgs.length;i++){
                if (varArr[i] === null || varArr[i] === ""){
                        missingMsg+= currMsgs[i] + ", ";
                }
            }
    
            missingMsg = missingMsg.slice(0, missingMsg.length-2) + ".";
           
            return missingMsg;
       }
        
        $('.sort-bear').click(function(){
            if (!sortBol){
                bearApp.getBears.sort(function(a, b){
                    return a.cuteness-b.cuteness
                });
            }
            else{
                bearApp.getBears.sort(function(a, b){
                    return b.cuteness-a.cuteness
                });
            }
    
            sortBol = !sortBol;
            bearApp.updateBears();
        });
    
    });
    
    