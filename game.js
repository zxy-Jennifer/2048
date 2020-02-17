//keydown事件表示键盘被按下
$(document).keydown(function(event){        //event是keydown事件自带的
    switch (event.keyCode){
        case 37://left
            /*
            moveLeft()方法
                * 完成向左移动的逻辑
                * 返回值是Boolean类型,判断是否可以向左移动.
             */
            if (moveLeft()) {
                //重新地随机生成两个数字
                generateOneNumber();
                //判断当这次的移动完成之后,游戏是否结束了
                  isgameover();
            }
            break;
        case 38://up
            if(moveUp()){
            	generateOneNumber();
            	isgameover();
            }
            break;
        case 39://right
            if(moveRight()){
            	generateOneNumber();
            	isgameover();
            }
            break;
        case 40://down
            if(moveDown()){
            	generateOneNumber();
            	isgameover();
            }
            break;
    }
});
//完成移动方法
function moveLeft(){
    //返回值是Boolean类型,判断是否可以向左移动.
    if(!canMoveLeft(board)){
        //当前的格子无法移动
        return false;
    }
    //完成向左移动的逻辑
    for(var i=0;i<4;i++){//对每一行进行判断
        for(var j=1;j<4;j++){
            //当前数字格有值的(2,4...一定不是0)
            if(board[i][j] != 0){
                //向左移动的逻辑
                for (var k = 0; k < j; k++) {//判断第i行第k到j列
                	////判断当前值不为0的数字格左边的数字格必须值为0并且中间的数字格必须值也为0
                    if(board[i][k] == 0 && noBlokHorizontalCol(i, k, j, board)){
                        //才能向左移动
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                    }else if(board[i][k] == board[i][j] && noBlokHorizontalCol(i, k, j, board)&&!hasConflicted[i][j]){
                    	//判断当前值不为0的数字格与左边的数字格值相等并且中间的数字格必须值也为0
                        //才能向左移动
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score+=board[i][k];
                        updateScore(score);
                        //
                        hasConflicted[i][k]==true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView();",200);
    return true;
}
function moveUp(){
	if(!canMoveUp){
		return false;
	}
	for(var i=1;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]!=0){
				for(var k=0;k<i;k++){
					if(board[k][j]==0&&noBlokHorizontalRow(k, i, j, board)){
						showMoveAnimation(i, j, k, j);
						board[k][j]=board[i][j];
						board[i][j]=0;
					}else if(board[k][j]==board[i][j]&&noBlokHorizontalRow(k, i, j, board)&&!hasConflicted[k][j]){
						showMoveAnimation(i,j,k,j);
						board[k][j]+=board[i][j];
						board[i][j]=0;
						//
						score+=board[k][j];
                        updateScore(score);
                        //
                        hasConflicted[k][j]=true;
                        continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView();",200);
    return true;
}

function moveRight(){
	if(!canMoveRight){
		return false;
	}
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(board[i][j]!=0){
				for(var k=3;k>j;k--){
					if(board[i][k]==0&&noBlokHorizontalCol(i,j,k,board)){
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
					}else if(board[i][k]==board[i][j]&&noBlokHorizontalCol(i,j,k,board)&&!hasConflicted[i][k]){
						showMoveAnimation(i,j,i,k);
						board[i][k]+=board[i][j];
						board[i][j]=0;
						//
						score+=board[i][k];
                        updateScore(score);
                        //
                        hasConflicted[i][k]=true;
                        continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView();",200);
    return true;
}
function moveDown1() {
    if (!canMoveDown(board)) {
        return false;
    }
    //moveDown
    for (var i = 2; i >= 0; i--) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 3; k > i; k--) {
                    if (board[k][j] == 0 && noBlokHorizontalRow(i, k, j, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;

                        continue;
                    } else if (board[k][j] == board[i][j] && noBlokHorizontalRow(i, k, j, board)&&!hasConflicted[k][j] ) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //
                        score+=board[k][j];
                        updateScore(score);
                        hasConflicted[k][j]=true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
    return true;
}
function moveDown(){
	if(!canMoveDown(board)){
		return false;
	}
	for(var i=2;i>=0;i--){
		for(var j=0;j<4;j++){
			if(board[i][j]!=0){
				for(var k=3;k>i;k--){
					if(board[k][j]==0&&noBlokHorizontalRow(i,k,j,board)){
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
					}else if(board[k][j]==board[i][j]&&noBlokHorizontalRow(i,j,k,board)&&!hasConflicted[k][j]){
						showMoveAnimation(i,j,k,j);
						board[k][j]+=board[i][j];
						board[i][j]=0;
						//
						score+=board[k][j];
                        updateScore(score);
                        
                        hasConflicted[k][j]=true;
                        continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView();",200);
    return true;
}
function isgameover(){
	if(nomove(board)&&nospace(board)){
		gameover();
	}
}
 function gameover1(){
 	alert("gameover!");
 	$("#grid-container").append("<div id='gameover' class='gameover'><p>本次得分</p><span>" + score + "</span><a href='javascript:restartgame();' id='restartgamebutton'>Restart</a></div>");
 	var gameover=$("#gameover");
 	gameover.css("width","500px");
 	gameover.css("height","500px");
 	gameover.css("background-color","rgba(0, 0, 0, 0.5)");
}
 
function gameover() {
    alert("gameover!");
    $("#grid-container").append("<div id='gameover' class='gameover'><p>本次得分</p><span>" + score + "</span><a href='javascript:restartgame();' id='restartgamebutton'>Restart</a></div>");
    var gameover = $("#gameover");
    gameover.css("width", "500px");
    gameover.css("height", "500px");
    gameover.css("background-color", "rgba(0, 0, 0, 0.5)");
}
