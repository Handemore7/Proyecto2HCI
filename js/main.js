var lvl1 = document.querySelector('.GoTolvl1');
var lvl2 = document.querySelector('.GoTolvl2');
var test = document.querySelector('.mainContainer');
console.log(lvl2);
console.log(test);
    var GoToLevel2 = function(event){
      console.log("estoy en el lvl 2");
        document.querySelector(".keyA").style.display='block';
        document.querySelector(".keyL").style.display='block';
    }
    lvl2.addEventListener('click', GoToLevel2);