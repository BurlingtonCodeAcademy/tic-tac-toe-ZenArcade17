//.....................................................................GLOBAL VARIABLES.....................................................//

//..............Cell Variables.........................................

let cell0 = document.getElementById('cell-0')
let cell1 = document.getElementById('cell-1')
let cell2 = document.getElementById('cell-2')
let cell3 = document.getElementById('cell-3')
let cell4 = document.getElementById('cell-4')
let cell5 = document.getElementById('cell-5')
let cell6 = document.getElementById('cell-6')
let cell7 = document.getElementById('cell-7')
let cell8 = document.getElementById('cell-8')


let playerTurn = "X"

//...................................................Buttons/Text Boxes/Other Elements
let button = document.getElementById('start')
let button1 = document.getElementById('one-player')
let nameButton = document.getElementById("add-names")
let xName = document.getElementById("xnameid")
let oName = document.getElementById("onameid")
let title = document.getElementById("title")
let status = document.getElementById('status-area')
let bottomDiv = document.getElementById("status")

let statusMessage = "It's your turn, " + oName.value + "!"

xName.disabled = true;
oName.disabled = true;
nameButton.disabled = true;

//......................................................Cell Array, Winning Combos, and Other Arrays......................

let cellArray = [cell0, cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8]
let winCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
let playerXArray = []
let playerOArray = []
let onePlayerArr = []

//...................................................................................................FUNCTIONS.........................................//

//...........................................................1 Player Win Checker Function................................//

function winCheck1() {
    for(let combo of winCombos) {
        let xCounter = 0
        let oCounter = 0
        for(let num of combo) {
            if(playerXArray.includes(num)) {
                xCounter += 1
                
                
                
            } else if (playerOArray.includes(num)) {
                oCounter += 1
                
            }
        }
        if(xCounter === 3) {
            title.textContent =  "Player X Wins!"
            status.textContent = "Player X Wins!"
            clearInterval(clock)
            setTimeout(() => {location.reload(); }, 3000)
            
        } else if (oCounter === 3) {
            title.textContent = "Player O Wins!"
            status.textContent = "Player O Wins!"
            clearInterval(clock)
            setTimeout(() => {location.reload(); }, 3000)
        } 
        
    }
    
    
}

//...........................................................2 Player Win Checker Function...............................//

function winCheck2() {
    for(let combo of winCombos) {
        let xCounter = 0
        let oCounter = 0
        for(let num of combo) {
            if(playerXArray.includes(num)) {
                xCounter += 1
                
                
                
            } else if (playerOArray.includes(num)) {
                oCounter += 1
                
            }
        }
        if(xCounter === 3) {
            title.textContent = xName.value + " Wins!"
            status.textContent = xName.value + " Wins!"
            clearInterval(clock)
            setTimeout(() => {location.reload(); }, 3000)
            
        } else if (oCounter === 3) {
            title.textContent = oName.value + " Wins!"
            status.textContent = oName.value + " Wins!"
            clearInterval(clock)
            setTimeout(() => {location.reload(); }, 3000)
        } 
        
    }
    if(playerXArray.length === 5) {
        title.textContent = "It's a Draw!"
        status.textContent = "It's a Draw!"
        clearInterval(clock)
        setTimeout(() => {location.reload(); }, 3000)
    }
    
    
}

//.......................Timer Function.......................................................//

let seconds = 0
let timer = document.getElementById("timer")
function increment() {
    timer.innerText = "Time Elapsed: " + seconds + " seconds"
    seconds++
}

let clock;
function startClock () {
    clock = setInterval(increment, 1000);
}

//.............................................................................................EVENT LISTENERS (SOME NESTED IN FUNCTIONS)...............................//

//.....................................................Player Names Button Function + Event Listener........................................//
function addNames() {
    nameButton.addEventListener("click", function() {   
        if(xName.value !== "" && oName.value !== "") {
            let namesEl = document.createElement("p")
            let namesText = document.createTextNode(xName.value + " is Player X.      " + oName.value + " is Player O.")
            
            namesEl.appendChild(namesText)
            bottomDiv.appendChild(namesEl)
            
            nameButton.disabled = true
            xName.disabled = true
            oName.disabled = true
            
            status.textContent = xName.value + "- you're up first! START!"
            startClock()
            
        } else {
            alert("Please enter 2 Names!")
        }    
        
        
    })
    
}
//............................................................1 Player Function + Event Listener.................................................//

let compPick = cellArray[Math.floor(Math.random() * cellArray.length)]

function compPlay() {
    
    for(let cell of cellArray) {
        cell.addEventListener("click", function() {
            status.textContent = ""
            if(cell.textContent === "") {
                cell.textContent = "X"
                cellArray.splice(cellArray.indexOf(cell), 1)
                playerXArray.push(parseInt(cell.id.slice(-1)))
                console.log(playerXArray.length)
                if(playerXArray.length === 5) {
                    title.textContent = "It's a Draw!"
                    status.textContent = "It's a Draw!"
                    clearInterval(clock)
                    setTimeout(() => {location.reload(); }, 3000)
                }
                
                compPick = cellArray[Math.floor(Math.random() * cellArray.length)]
                compPick.textContent = "O"
                cellArray.splice(cellArray.indexOf(compPick), 1)
                playerOArray.push(parseInt(compPick.id.slice(-1)))
                console.log(playerOArray.length)
                
            } else {
                alert("Please Choose an Empty Cell!")
            }
            winCheck1()
        })
    }
}
                
                
//....................................................................2 Player Function + Event Listener..............................//

function play() {
    
    for (let cell of cellArray) {
        
        cell.addEventListener('click', function () {
            
            if (cell.textContent === "") {
                cell.textContent = playerTurn
                status.textContent = statusMessage
                
                
                if (playerTurn === "X") {
                    playerTurn = "O"
                    statusMessage = "It's your turn, " + xName.value + "!"
                    playerXArray.push(parseInt(cell.id.slice(-1)))
                    console.log("Player X's Array Length: " + playerXArray.length)
                } else {
                    playerTurn = "X"
                    statusMessage = "It's your turn, " + oName.value + "!"
                    playerOArray.push(parseInt(cell.id.slice(-1)))
                    console.log("Player O's Array Length: " + playerOArray.length)
                } 
                
                
                
            } else if (cell.textContent === "X" || cell.textContent === "O") {
                alert("Please click a cell that isn't filled!")
            }
            
            
            winCheck2()
        })
        
    }
}

//.....................................................1 Player Button Event Listener......................................//

button1.addEventListener('click', function () {
    button1.disabled = true
    button.disabled = true
    status.textContent = "Human- you are 'X'! You go first!"
    startClock()
    compPlay()
    
})


//......................................................2 Player Button Event Listener....................................//

button.addEventListener('click', function () {
    xName.disabled = false
    oName.disabled = false
    nameButton.disabled = false
    button.disabled = true
    button1.disabled = true
    addNames()
    play()
})





