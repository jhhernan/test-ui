  
// let votes= [{"id":"person1", "votes_up":20, "votes_down":20 },
// {"id":"person2", "votes_up":95, "votes_down":80 },
// {"id":"person3", "votes_up":10, "votes_down":20 },
// {"id":"person4", "votes_up":5, "votes_down":5 }];


function choose(event) {

    const button = event;
    const buttons = button.parentNode.querySelectorAll(".voteBox__btnUp, .voteBox__btnDown");

    buttons.forEach(btn => {
        btn.classList.remove("voteBox__btn--active");
        btn.classList.add("voteBox__btn--inactive");
    });

    button.classList.remove("voteBox__btn--inactive");
    button.classList.add("voteBox__btn--active");
}

function voteNow(event) {
    //Sacando info del storage
    let votes=JSON.parse(localStorage.getItem("votes"));

    const button = event;
    const buttons = button.parentNode.querySelectorAll(".voteBox__btnUp, .voteBox__btnDown");
    const selected = event.parentNode.getAttribute("data-name");
    let hasVoted = false;
    let active;

    if (event.innerHTML.indexOf("Vote again") >= 0) {  //Habilitar botones votar...
        buttons.forEach( btn => {
            btn.style.display="flex";
        });
        button.innerHTML="Vote now";
    } else {
        buttons.forEach(btn => {
            if (btn.classList.contains("voteBox__btn--active")) {
                active = btn.classList.contains("voteBox__btnUp") ? "UP" : "DOWN";
                hasVoted = true;
            }    
        });
        if (!hasVoted) {    //No han seleccionado el voto
            alert("Please choose thumb up or thumb down");
            return;
        }else {             
            votes.forEach((vote,idx)=>{
                if (vote.id===selected) {
                    if (active === "UP"){
                        votes[idx] = {...vote, votes_up: vote.votes_up + 1, }
                    } else {
                        votes[idx] = {...vote, votes_down: vote.votes_down + 1, }
                    }
                    console.log(votes[idx]);
                    updateBars(votes[idx]);
                }
                
            });            
            buttons.forEach( btn => {       //Deshabilitar botones y cambiar leyenda
                btn.style.display="none";
            });
            button.innerHTML="Vote again";
            
            localStorage.setItem("votes",JSON.stringify(votes));            
        }
    } 
}

function updateBars(vote) {
    console.log(vote);
    let percentageUp;
    if (vote.votes_up === 0 && vote.votes_down === 0){
        percentageUp = 50;
    }else {
        percentageUp = Math.round(vote.votes_up/(vote.votes_up + vote.votes_down) * 100);
    }
    const bars = document.querySelectorAll(".voteBox__barUp, .voteBox__barDown");
    bars.forEach( bar => {
        if (bar.getAttribute("data-name") === vote.id){
            if(bar.classList.contains("voteBox__barUp")){
                bar.style.width = percentageUp + "%";
                bar.innerHTML = '<strong class="voteBox__barText"> <i class="fa fa-thumbs-up"></i> ' + percentageUp + '% </strong>';    
            }else if (bar.classList.contains("voteBox__barDown")){
                bar.style.width = (100 - percentageUp) + "%";
                bar.innerHTML = '<strong class="voteBox__barText">' + (100 - percentageUp) + '% <i class="fa fa-thumbs-down fa-flip-horizontal"></i></strong>';
            }
        }
    });

    //Actualizar voteBox_status
    const statusDivs = document.querySelectorAll(".voteBox__status");
    statusDivs.forEach(div => {
        if (div.getAttribute("data-name") === vote.id){
            if (percentageUp >= 50){
                div.innerHTML = '<i class="fa fa-thumbs-up"></i>';
                div.classList.remove("voteBox__status--Down");
                div.classList.add("voteBox__status--Up");
            } else {
                div.innerHTML = '<i class="fa fa-thumbs-down fa-flip-horizontal"></i>';
                div.classList.remove("voteBox__status--Up");
                div.classList.add("voteBox__status--Down");
            }
        }
    });
}

function resetBars(){
    let votes=JSON.parse(localStorage.getItem("votes"));
    votes.forEach(vote => {
        updateBars(vote);
    });
}

window.onload = () => {
    if (localStorage.getItem("votes")===null){
        let votes= [{"id":"person1", "votes_up":20, "votes_down":20 },
         {"id":"person2", "votes_up":95, "votes_down":80 },
         {"id":"person3", "votes_up":10, "votes_down":20 },
         {"id":"person4", "votes_up":5, "votes_down":5 }];
         localStorage.setItem("votes",JSON.stringify(votes));
    }
    resetBars();
}