const mainul = document.querySelector("#mainul");
const myForm = document.forms["addcomment"];

//////////////// MAJOR FORM SUBMIT EFFECT /// adding new comment
myForm.addEventListener("submit", function(e){
    e.preventDefault();
    const value = document.querySelector('input[type="text"]').value;

    const li = document.createElement("li");
    /// add innerHTML to created li
    li.innerHTML = `<div class="wholecomment">
    <div class="boxavatar">
        <div class="avatar"></div>
    </div>
    <div class="boxcontent">
        <div class="nick">Ross Geller</div>
        <div class="date">${formatDate(new Date())}</div>
        <p class="comment">${value}</p>
        <div class="fas fa-thumbs-up"></div>
        <div class="count">0</div>
        <div class="fas fa-thumbs-down"></div>
        <i class="fas fa-ban"></i>
        <i class="fas fa-edit"></i>
        <div class="answer">Odpowiedz</div>

        <form class="addcommentanswer" style="display: none;">
            <input type="text" placeholder="Dodaj odpowiedź publiczną" required="" autocomplete="off" name="inputanswer">
            <div class="barans"></div>
            <input type="submit" value="Odpowiedz" name="addans">
            <input type="button" value="Cancel" name="cancelans">
        </form>
        <div class="showanswers"><div class="number"></div></div>
        <ul class="ul" style="display: none;"> 
        </ul>
    </div>
</div>`;
    /// add li to ul
    mainul.appendChild(li);   
});

//////////cancel button in major form
myForm.addEventListener("click", function(e){
    if(e.target.type == "button"){
        const cancel = document.querySelector('#addcomment input[type="text"]');
        cancel.value = "";
    }

})

/////////////////////////// CLICK EFFECT ON ANY ELEMENT OF MAJOR UL
mainul.addEventListener( 'click', function(e){
    if( e.target.name == 'addans' ) {
        e.preventDefault();

        const valueAns = e.target.previousElementSibling.previousElementSibling.value;

        const liAns = document.createElement("li");
        /// add innerHTML to created li
        liAns.innerHTML = `
        <div class="wholecomment">
            <div class="boxavataranswer">
                <div class="avataranswer"></div>
            </div>
            <div class="boxcontent">
                <div class="nick">Anonim</div>
                <div class="date">${formatDate(new Date())}</div>
                <p class="answercomment">${valueAns}</p>
                <div class="fas fa-thumbs-up"></div>
                <div class="count">0</div>
                <div class="fas fa-thumbs-down"></div>
                <i class="fas fa-ban a"></i>
                <i class="fas fa-edit"></i>
            </div>
        </div>
        `;
        /// targetuj ul dzieki e.target
        const ulAns = e.target.parentElement.nextElementSibling.nextElementSibling;
        /// dodaj do ztargetowanego ul stworzona liAns
        if (e.target.previousElementSibling.previousElementSibling.value !== ""){
            //// if text input contain any char
            ulAns.appendChild(liAns); /// add answer
            e.target.parentElement.style.display = "none"; //close form

            let checknumberli = e.target.parentElement.nextElementSibling.nextElementSibling.getElementsByTagName("li").length; /// check number of answer, li
            e.target.parentElement.nextElementSibling.firstElementChild.textContent = checknumberli; /// add number of answer to div

            const showanstxt = e.target.parentElement.nextElementSibling;
            showanstxt.innerHTML = `Ukryj <i class="fas fa-chevron-up"></i>`;
            const expandmenu = e.target.parentElement.nextElementSibling.nextElementSibling;
            expandmenu.style.display = "block";

            const colors = ["rgba(183, 255, 237, 0.2)","rgb(283, 223, 255, 0.200)","rgba(233, 255, 183, 0.2)"]
            let randomcolor = colors[Math.floor((Math.random() * 3))]
            liAns.firstElementChild.style.backgroundColor = randomcolor;
        } else {

        };

    } else if (e.target.name == 'cancelans') {
        const hide = e.target.parentElement;
        hide.style.display = "none";
    } else if (e.target.classList == "fas fa-ban"){
        const revomemaincomment = e.target.parentElement.parentElement.parentElement;
        mainul.removeChild(revomemaincomment);

    } else if (e.target.classList == "fas fa-ban a"){
        const revomeanswercomment = e.target.parentElement.parentElement.parentElement;
        const ulansw = e.target.parentElement.parentElement.parentElement.parentElement;
        ulansw.removeChild(revomeanswercomment);
        /////if ul has no li set showanswers div to ...
        if(ulansw.getElementsByTagName("li").length == 0) {
            ulansw.previousElementSibling.innerHTML = `<div class="number"></div>`;
        }else {}
    } else if (e.target.classList == "showanswers"){
        const show = e.target.nextElementSibling; 
        let number = e.target.nextElementSibling.getElementsByTagName("li").length;
        if (show.style.display === "none") {
            show.style.display = "block";
            e.target.innerHTML = `Ukryj <i class="fas fa-chevron-up"></i>`;
        } else {
            show.style.display = "none";
            e.target.innerHTML = `Wyświetl odpowiedzi: <div class="number">${number}</div><i class="fas fa-angle-down"></i>`;
            e.target.style.marginLeft = "0px";
        }
    } else if (e.target.classList == "answer"){
        const answer = e.target.nextElementSibling;
        answer.style.display = "block";
    } else if (e.target.classList == "fas fa-thumbs-up"){
        const up = e.target.nextElementSibling;
        up.textContent = eval(up.textContent) + 1;  
    } else if (e.target.classList == "fas fa-thumbs-down"){
        const down = e.target.previousElementSibling;
        down.textContent = eval(down.textContent) - 1;  
    }

});


/// function return date
function formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var hour = date.getHours();
    return day + ' ' + monthNames[monthIndex] + ' ' + hour + 'h:' + minute + 'm:' + second + 's';
  }
