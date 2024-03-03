window.addEventListener('scroll', function(){
   localStorage.setItem('scrollPosition', window.scrollY);
});

window.addEventListener('load', function(){
    var savedScrollPosition = localStorage.getItem('scrollPosition');
    if (savedScrollPosition !== null){
        window.scrollTo({top:parseInt(savedScrollPosition), left:0,behavior:"instant"});
    };
})