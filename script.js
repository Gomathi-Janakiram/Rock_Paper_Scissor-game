
const props = ["rock", "paper", "scissor"];
let userScore = 0;
let computerScore = 0;

const fetchComputersProp = () => {
    const randomNumber = Math.floor(Math.random() * props.length);
    return props[randomNumber];
}

const updateUserScore = () => {
    const userScoreEle = document.querySelector(".user-score h1");
    userScoreEle.textContent = userScore
}

const updateComputerScore = () => {
    const computerScoreEle = document.querySelector(".computer-score h1");
    computerScoreEle.textContent = computerScore
}

const onUserClick = (usersProp) => {
    const computersProp = fetchComputersProp();
    document.getElementsByClassName("scoreContainer")[0]?.remove()

    if (usersProp && computersProp) {
        if (usersProp == computersProp) {
            showBanner("DRAW", usersProp, computersProp)
        } else if (
            (usersProp == "rock" && computersProp == "scissor") ||
            (usersProp == "scissor" && computersProp == "paper") ||
            (usersProp == "paper" && computersProp == "rock")) {
            userScore ++;
            updateUserScore();
            showBanner("YOU WIN", usersProp, computersProp)
        } else {
            computerScore ++;
            updateComputerScore();
            showBanner("YOU LOSE", usersProp, computersProp)
        }
    }
}

const fetchPropImage = (prop) => {
    const propWrapper = document.createElement("div");
    propWrapper.className = "score";
    propWrapper.style.padding = "8px";
    const content = document.createElement("div");
    content.classList.add(prop, "content")
    const outerContainer = document.createElement("div");
    outerContainer.className = "container";
    const imgContainer = document.createElement("div");
    imgContainer.className = "img-container";
    imgContainer.style.width = "90px";
    imgContainer.style.height = "90px"
    const img = document.createElement("img");
    img.src =`images/${prop}.png`;
    img.setAttribute("width", "70px")

    imgContainer.append(img);
    outerContainer.append(imgContainer);
    content.append(outerContainer)
    propWrapper.append(content);
    return propWrapper
}

const showBanner = (title, usersProp, computersProp) => {
    let message;
    if (title == "DRAW") {
        message = `You both played ${usersProp}`;
    } else if (title == "YOU WIN") {
        message = `${usersProp} beats ${computersProp}`;
    } else if (title == "YOU LOSE") {
        message = `${computersProp} beats ${usersProp}`;
    }

    const contentBanner = document.querySelector(".content-card");
    contentBanner.style.display = "none";

    const scoreCard = document.createElement("section");
    scoreCard.classList.add("score-card", "scoreContainer");
    scoreCard.style.marginTop = "5%";

    const resultMessage = document.createElement("div");
    resultMessage.className = "title";
    resultMessage.style.padding = 0;
    const result = document.createElement("h4");
    result.classList.add("result", "resultHeading")
    if (title == "YOU WIN") {
        result.style.color = 'rgb(47, 212, 47)'
    } else if (title == "YOU LOSE") {
        result.style.color = 'rgb(201, 72, 72)';
    } else {
        result.style.color = 'rgb(216, 216, 90)'
    }
    const description = document.createElement("p");
    description.classList.add("result", "resultMessage")

    const playNextButton = document.createElement("button");
    playNextButton.textContent = "Next Round";
    playNextButton.className = "button"
    playNextButton.addEventListener("click", () => {
        scoreCard.style.display = "none";
        contentBanner.style.display = "flex";
    })

    const gameResultContainer = document.getElementById("gameResult")
    const gameResultMessage = document.querySelector("#gameResult h3");

    const playAgainButton = document.createElement("button");
    playAgainButton.textContent = "Play Again";
    playAgainButton.className = "button";
    playAgainButton.addEventListener("click", () => {
        scoreCard.style.display = "none";
        contentBanner.style.display = "flex";
        userScore = 0;
        computerScore = 0;
        updateUserScore();
        updateComputerScore();
        gameResultMessage.textContent = "First to 5 wins";
        playAgainButton.style.display = "none"
    })

    if (userScore == 5) {
        console.log("users")
        gameResultMessage.textContent = "VICTORY";
        gameResultMessage.style.marginTop = "11px";
        gameResultMessage.style.marginBottom = "4px"
        playNextButton.style.visibility = "hidden"
        gameResultContainer.append(playAgainButton)
    } else if (computerScore == 5) {
        console.log("computer")
        gameResultMessage.textContent = "DEFEAT";
        gameResultMessage.style.marginTop = "11px";
        gameResultMessage.style.marginBottom = "4px"
        playNextButton.style.visibility = "hidden"
        gameResultContainer.append(playAgainButton)
    }

    result.textContent = title;
    description.textContent = message;
    resultMessage.append(result, description, playNextButton)
    
    scoreCard.append(fetchPropImage(usersProp), resultMessage, fetchPropImage(computersProp));
    document.querySelector(".body").append(scoreCard)
}