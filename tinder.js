var time_delay = 450; // 80ms
var _likes = 0;
var mytimer = null;
var stop_liking_at = 500
var match_percentage ;
var btns_selector_string = "button[type=button][draggable].button.Expand";
var likebtn_index = 3;
var nopebtn_index = 1;
var found_end_card =[];
var found_text = "";


function makeOneLike() {
    return function () {
        var d_btns = document.querySelectorAll(btns_selector_string);
        var nope_btn = document.querySelectorAll(btns_selector_string)[nopebtn_index];
        var swipeable_cards = document.querySelector('[style="transform: translate3d(0px, 0px, 0px) rotate(0deg) scale(1, 1); transform-origin: center center;"]');
        if (d_btns == undefined || d_btns.length == 0 || d_btns[likebtn_index].hasAttribute('aria-disabled') || swipeable_cards == undefined  ){
            console.log('Stop liking loop');
            clearInterval(mytimer);
            setTimeout(function(){
                startLiking();
            },time_delay * 5)//restart liking loop in delay * 5 time ms
        }
        else {
            if (Math.random() > match_percentage){
                nope_btn.click();
            }else{
                d_btns[likebtn_index].click();
                countLikes();

            }
            
        }
        
    };
}

function startLiking(_match_p = 0.8){
    match_percentage = _match_p
    stopLiking();
    mytimer = setInterval(makeOneLike(),time_delay)
    
}

function stopLiking(){
    console.log('Liking is being stopped');
    clearInterval(mytimer);
    console.log(`Number of likes is now:  ${_likes}`);
    
}

function countLikes(){
    _likes ++;
    var likes_check_value = 20;
    
    //notify on every likes_check_value likes
    if( (_likes % 20) == 0)
    console.log(`Number of likes is now:  ${_likes}`);

     if(_likes >= stop_liking_at)
        stopLiking();
}

// Select the node that will be observed for mutations
const [targetNode] = document.getElementsByClassName('App__body');

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };


const mutationCallback = (mutation_list,observer)=>{

    found_end_card = Array(...document.querySelectorAll('.keen-slider__slide')).map(n=>n.textContent).filter(n=>n.includes("You're Out of Likes"))

    if (found_end_card.length){
        console.log('stop liking now',found_end_card);
        stopLiking();
        observer.disconnect();
    }
}


// Create an observer instance linked to the callback function
const observer = new MutationObserver(mutationCallback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);

// Later, you can stop observing
// observer.disconnect();

startLiking();

