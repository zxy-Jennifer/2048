//定义一个javascript数组
var board = new Array();
var score=0;
var hasConflicted=new Array();

$(function(){
    newgame();
});

function newgame(){
    //初始化棋盘格和数字格
    init();
    //生成两个随机位置的随机的数字
    generateOneNumber();
    generateOneNumber();
}

function restartgame(){
	$("#gameover").remove();
	updateScore(0);
	newgame();
}

function init(){
    for(var i=0;i<4;i++){
        //定义了一个二维数组
        board[i] = new Array();
        hasConflicted[i]=new Array();
        for(var j=0;j<4;j++){
            //初始化小格子的值为0
            board[i][j] = 0;
            hasConflicted[i][j]=false;
            var gridCell = $("#grid-cell-"+i+"-"+j);
            //通过getPosTop()方法设置每个格子距顶端的距离
            gridCell.css("top", getPosTop(i, j));
            //通过getPosLeft()方法设置每个格子距左端的距离
            gridCell.css("left", getPosLeft(i, j));
        }
    }

    updateBoardView();
}
function updateBoardView(){
	//首先清空之前的数字布局内容
	$(".number-cell").remove();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			//向棋盘上增加数字格
			$("#grid-container").append("<div class='number-cell' id='number-cell-" + i + "-" + j + "'></div>");
			var numberCell=$("#number-cell-"+i+"-"+j);
			//如果棋盘格的值为零的话，设置数字格为高宽都为零
			if(board[i][j]==0){
				numberCell.css("width","0px");
				numberCell.css("height","0px");
				numberCell.css("top",getPosTop(i,j)+100);
				numberCell.css("left",getPosLeft(i,j)+100);
			}else{
				//如果棋盘格的值不为零，设置数字格为高宽为75，并设置背景色和前景色及数字值
				numberCell.css("width","100px");
				numberCell.css("height","100px");
				numberCell.css("top",getPosTop(i,j));
				numberCell.css("left",getPosLeft(i,j));
				numberCell.css("background-color",getNumberBackgroundColor(board[i][j]));
				numberCell.css("color",getNumberColor(board[i][j]));numberCell.text(board[i][j]);
			}
			hasConflicted[i][j]=false;
		}
	}
	//设置数字值的字体样式
//	$(".number-cell").css("line-height","100px");
//	$(".number-cell").css("font-size","60px");
}
function generateOneNumber(){
	if (nospace(board)) {
        return false;
    }
    //生成一个随机位置的随机数字
    //1 生成一个随机的位置
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy =parseInt(Math.floor(Math.random() * 4));
    //定义一个死循环,完成生成随机空格子
    while (true) {
        //如果当前格子的值为0,满足条件
        if (board[randx][randy] == 0) {
            break;
        }
        //否则重新随机一个位置
        var randx = parseInt(Math.floor(Math.random() * 4));
        var randy = parseInt(Math.floor(Math.random() * 4));
    }
    //2 生成一个随机的数字(2048游戏规则,新生成的数字只可以是2或4)
    var randNumber = Math.random() < 0.5 ? 2 : 4;

    //3 在随机的位置上显示出随机的数字
    //在随机位置显示随机数字
    board[randx][randy] = randNumber;
    //实现随机数字显示的动画
    ShowNumberWithAnimation(randx, randy, randNumber);
}
