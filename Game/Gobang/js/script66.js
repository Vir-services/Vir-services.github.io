
var me=true;//控制轮流下棋，首先黑子先下
var over=false;//9-定义游戏是否结束

var chessBoard=[]; //定义一个二维数组，用来存储棋盘上位置的信息，初始化为0表示棋盘上无子
for(var i=0;i<15;i++){
    chessBoard[i]=[];
    for(var j=0;j<15;j++){
        chessBoard[i][j]=0;
    }
}

var wins=[]; //6-定义赢法数组，为三维数组，保存了五子棋所有的赢法
for(var i=0;i<15;i++){
    wins[i]=[];
    for(var j=0;j<15;j++){
        wins[i][j]=[];
    }
}

var count=0;//7-定义赢法种类，初始化为0

//9-赢法的统计数组
var myWin=[];//9-我方赢的数组
var computerWin=[];//9-计算机方赢的数组



var chess=document.getElementById("chess");  //1-获取canvas对象
var context=chess.getContext('2d');
context.strokeStyle="#b0b0b0";//设置划线的颜色

var logo=new Image();   //3-棋盘上的水印图片
logo.src="image/logo.png";
logo.onload=function(){
    context.drawImage(logo,0,0,450,450);  //水印图片设置
    drawChessBoard();//后调用绘制棋盘函数，防止水印图片遮挡住棋盘

    //oneStep(0,0,true);
    //oneStep(1,1,false);
}

var drawChessBoard=function(){     //2-绘制棋盘
    for(var i=0;i<15;i++){
        context.moveTo(15+i*30,15);//竖线，线的起始点坐标
        context.lineTo(15+i*30,435);//线的终止点坐标
        context.stroke();
        context.moveTo(15,15+i*30);//横线
        context.lineTo(435,15+i*30);
        context.stroke();
    }
}

var oneStep=function(i,j,me){ //4-绘制棋子
    context.beginPath();
    context.arc(15+i*30,15+j*30,13,0,2*Math.PI); //通过arc弧度函数画圆
    context.closePath();
    var gradient=context.createRadialGradient(15+i*30,15+j*30,13,15+i*30,15+j*30,0);
    //返回一个渐变对象，且该函数内设六个参数，前三个表示外圆的圆心坐标及半径，后三个表示内圆的圆心坐标及半径，
    if(me){
        gradient.addColorStop(0,"#0A0A0A");//外层圆的填充色
        gradient.addColorStop(1,"#636766");//内层圆的填充色
    }else{
        gradient.addColorStop(0,"#D1D1D1");
        gradient.addColorStop(1,"#F9F9F9");
    }
    context.fillStyle=gradient;
    context.fill();//填充圆
}

chess.onclick=function(e){ //5--鼠标点击落子情况
    if(over){  //9--判断游戏是否结束
        return;
    }
    if(!me){  //10-设置onclick函数只对我方有效
        return ;
    }
    var x= e.offsetX;
    var y= e.offsetY;
    var i=Math.floor(x / 30);//棋盘上的位置索引
    var j=Math.floor(y / 30);
    if(chessBoard[i][j]==0){   //当存储为0，即棋盘上无子情况才能落子
        oneStep(i,j,me);//黑子先下
/*
       if(me){  //如果下的是黑子，在二维数组中存储为1
            chessBoard[i][j]=1;
        }else{  //如果下的是白子，在二维数组中存储为2
            chessBoard[i][j]=2;
        }
        me=!me;//下棋的权利交给计算机
 */
        chessBoard[i][j]=1;//10-前面已经设置该click函数只对me即黑子有效，所以可以不用判断，直接存为1
        for(var k=0;k<count;k++){ //9-我方赢法统计数组
            if(wins[i][j][k]){
                myWin[k]++;
                computerWin[k]=6;//此时，计算机在第k种赢法上不可能赢了
                if(myWin[k] == 5){
                    window.alert("你赢了！");
                    over=true;
                }
            }
        }
        if(!over){  //10-判断是否结束，否的话，调用计算机落子函数
            me=!me;//10-如果没结束就把下棋的权利交给计算机
            computer();
        }
    }
}

//8-填充赢法数组
for(var i=0;i<15;i++){  //所有横向的赢法
    for(var j=0;j<11;j++){
        for(var k=0;k<5;k++){
            wins[i][j+k][count]=true;
        }
        count++;
    }
}

for(var i=0;i<15;i++){ //所有竖向的赢法
    for(var j=0;j<11;j++){
        for(var k=0;k<5;k++){
            wins[j+k][i][count]=true;
        }
        count++;
    }
}

for(var i=0;i<11;i++){  //所有斜向的赢法
    for(var j=0;j<11;j++){  //
        for(var k=0;k<5;k++){
            wins[i+k][j+k][count]=true;
        }
        count++;
    }
}

for(var i=0;i<11;i++){  //所有反斜向的赢法
    for(var j=14;j>3;j--){  //
        for(var k=0;k<5;k++){
            wins[i+k][j-k][count]=true;
        }
        count++;
    }
}
console.log(count);

for(var i=0;i<count;i++){ //9-赢法的初始化，这里需要注意，赢法的初始化用到count变量，因此需要在count变量计算完毕之后进行赢法的初始化
    myWin[i]=0;
    computerWin[i]=0;
}

var computer=function(){ //10-计算机落子实现
    var myScore=[];
    var computerScore=[];
    var max=0;//11-用来保存最高分数
    var u= 0,v=0;//11-用来保存最高分数的点坐标
    for(var i=0;i<15;i++){
        myScore[i]=[];
        computerScore[i]=[];
        for(var j=0;j<15;j++){
            myScore[i][j]=0;
            computerScore[i][j]=0;
        }
    }
    for(var i=0;i<15;i++){ //10-统计我方和计算机可能赢的分数
        for(var j=0;j<15;j++){
            if(chessBoard[i][j]==0){
                for(var k=0;k<count;k++){ //遍历了所有赢法
                    if(wins[i][j][k]){
                        if(myWin[k]==1){
                            myScore[i][j]+=100;
                        }else if(myWin[k]==2){
                            myScore[i][j]+=200;
                        }else if(myWin[k]==3){
                            myScore[i][j]+=500;
                        }else if(myWin[k]==4){
                            myScore[i][j]+=800;
                        }
                        if(computerWin[k]==1){
                            computerScore[i][j]+=120;
                        }else if(computerWin[k]==2){
                            computerScore[i][j]+=220;
                        }else if(computerWin[k]==3){
                            computerScore[i][j]+=560;
                        }else if(computerWin[k]==4){
                            computerScore[i][j]+=860;
                        }
                    }
                }
                if(myScore[i][j] > max){ //11-记录最高分及坐标
                    max=myScore[i][j];
                    u=i;
                    v=j;
                }else if(myScore[i][j]==max){
                    if(computerScore[i][j] > computerScore[u][v]){
                        u=i;
                        v=j;
                    }
                }

                if(computerScore[i][j] > max){ //11-记录最高分及坐标
                    max=computerScore[i][j];
                    u=i;
                    v=j;
                }else if(computerScore[i][j]==max){
                    if(myScore[i][j] > myScore[u][v]){
                        u=i;
                        v=j;
                    }
                }
            }
        }
    }
    oneStep(u,v,false);
    chessBoard[u][v]=2;//11-表示计算机在u，v处落子

    for(var k=0;k<count;k++){ //12-计算机赢法统计数组
        if(wins[u][v][k]){
            computerWin[k]++;
            myWin[k]=6;
            if(computerWin[k] == 5){
                window.alert("计算机赢了！");
                over=true;
            }
        }
    }
    if(!over){  //12-判断是否结束，否的话，调用计算机落子函数
        me=!me;//12-如果没结束就把下棋的权利交给我方
    }
}
