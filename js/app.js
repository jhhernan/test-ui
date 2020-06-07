  
let votes= [{"id":"person1", "votes_up":10, "votes_down":10 },
{"id":"person2", "votes_up":20, "votes_down":80 },
{"id":"person3", "votes_up":10, "votes_down":20 },
{"id":"person4", "votes_up":20, "votes_down":10 }];


function choose(event) {
    //console.log(event);
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
        if (!hasVoted) {   //No han seleccionado el voto
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
                }
                
            });            
            buttons.forEach( btn => {       //Deshabilitar botones y cambiar leyenda
                btn.style.display="none";
            });
            button.innerHTML="Vote again";

        }
    }

    

 
}
