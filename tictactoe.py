def printgrid():
    global grid
    for i in range(len(grid)):
        for value in grid[i]:
            print("|",grid[i][value],end = "", sep ="")
        print("|")

def reset():
    global grid
    global mark
    grid = [{'7':"_",'8':"_",'9':"_"},
           {'4':"_",'5':"_",'6':"_"},
           {'1':"_",'2':"_",'3':"_"}]
    mark = 'X'
    status = True
    
def checkstatus():
    global mark
    if grid[0]['7'] == mark and grid[0]['8'] == mark and grid[0]['9'] == mark:
        return False
    if grid[1]['4'] == mark and grid[1]['5'] == mark and grid[1]['6'] == mark:
        return False 
    if grid[2]['1'] == mark and grid[2]['2'] == mark and grid[2]['3'] == mark:
        return False
    if grid[0]['7'] == mark and grid[1]['4'] == mark and grid[2]['1'] == mark:
        return False
    if grid[0]['8'] == mark and grid[1]['5'] == mark and grid[2]['2'] == mark:
        return False
    if grid[0]['9'] == mark and grid[1]['6'] == mark and grid[2]['3'] == mark:
        return False
    if grid[0]['7'] == mark and grid[1]['5'] == mark and grid[2]['3'] == mark:
        return False
    if grid[0]['9'] == mark and grid[1]['5'] == mark and grid[2]['1'] == mark:
        return False
    else:
        return True
def toggle():
    global mark
    if mark == 'X':
        mark = 'O'
    else:
        mark = 'X'
def makemark():
    global mark
    global move
    validmove = False
    
    while validmove == False:
        prompt = mark +"'s turn: "
        move = input(prompt)
        if move.isdigit():
            if int(move) > 0 and int(move) < 4:
                if grid[2][move] == '_':
                    grid[2][move] = mark
                    break
            if int(move) > 3 and int(move) < 7:
                if grid[1][move] == '_':
                    grid[1][move] = mark
                    break
            if int(move) > 6 and int(move) < 10:
                if grid[0][move] == '_':
                    grid[0][move] = mark
                    break       
gamestatus = True
while gamestatus == True:
    reset()
    printgrid()
    print("X goes first(input 1-9): ")
    makemark()
    for i in range(3):
        printgrid()
        toggle()
        makemark()
    x = 0
    while checkstatus():
        printgrid()
        toggle()
        makemark()
        x += 1
        if x == 5:
            break

    printgrid()
    if not checkstatus():
        print(mark + " wins!")
    else:
        print("Tied Game!")

    while gamestatus == True:
        move = input("Play again?(y/n)")
        if move == 'y':
            break
        if move == 'n':
            gamestatus = False
            
print("Thanks for playing!")

##Need to check if the game is going to be a tie
        
        
    
    

