  
let votes= [{"id":"person1", "votes_up":10, "votes_down":10 },
{"id":"person2", "votes_up":20, "votes_down":80 },
{"id":"person3", "votes_up":10, "votes_down":20 },
{"id":"person4", "votes_up":20, "votes_down":10 }];


function choose(event) {
    console.log(event);
    const button = event;
    const buttons = button.parentNode.querySelectorAll(".voteBox__btnUp, .voteBox__btnDown");

    buttons.forEach(btn => {
        btn.classList.remove("voteBox__btn--active");
        btn.classList.add("voteBox__btn--inactive");
    });

    button.classList.remove("voteBox__btn--inactive");
    button.classList.add("voteBox__btn--active");
}
