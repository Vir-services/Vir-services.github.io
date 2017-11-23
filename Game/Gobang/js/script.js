/**
 * Created by Administrator on 2016/4/5.
 */
var chessBoard=[];//定义数组
 //设置一个二维数组来存储棋盘上的落子情况，来避免黑棋和白棋下在同一个地方
var me=true;//为了轮流下棋，设置me，默认为true黑棋
var over=false;
//定义赢法数组
var wins=[];

//赢法的统计数组
var myWins=[];
var computerWin=[];

for(var i=0;i<15;i++){  //二维数组初始化
    chessBoard[i]=[];
    for(var j=0;j<15;j++){
        chessBoard [i][j]=0;//值为0表没有落子，是空的
    }
}

//赢法数组初始化
for(var i=0;i<15;i++){
    wins[i]=[];
    for(var j=0;j<15;j++){
        wins[i][j]=[];
    }
}
var count=0;//定义赢法种类的索引
for(var i=0;i<15;i++){  //所有横向赢法
  for(var j=0;j<11;j++){
    // wins[0][0][0]=true;
    // wins[0][1][0]=true;
    // wins[0][2][0]=true;
    // wins[0][3][0]=true;
    // wins[0][4][0]=true;
      for(var k=0;k<5;k++){
        wins[i][j+k][count]=true;
    }
    count++;
 }
}

for(var i=0;i<15;i++){  //所有竖向赢法
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

//赢法的统计数组初始化
for(var i=0;i<count;i++){
    myWins [i]=0;
    computerWin[i]=0;
}

var chess=document.getElementById ("chess");//通过dom操作获得元素canvas
var context=chess.getContext ('2d');//获得chess的上下文
context.strokeStyle ="#BFBFBF";
//使用canvas画水印
var logo=new Image();
logo.src="image/logo.png";
logo.onload=function(){   //png logo加载需要时间，因此画水印放在加载完成的回调函数中去调用
    //此处的onload方法即为图片加载完之后的回调函数
    context.drawImage (logo,0,0,580,194);
    drawChessBoard();

  /*  oneStep (0,0,true );//在（0,0）处放置一个黑棋，
    oneStep (1,1,false);//在（1,1）处放置白琪
    //用于调试
   */

}
//为了防止水印图片遮挡住棋盘，我们可以选择将下面画棋盘代码封装在一个函数中，然后画完图片之后再来调用这个函数

//使用for循环画出棋盘

var drawChessBoard=function(){
    for(var i=0;i<15;i++){    //棋盘宽高450，旁白15，间距30
        context.moveTo(15+i*30,15);//竖线
        context.lineTo (15+i*30,435);
        context.stroke ();
        context.moveTo(15,15+i*30);//横线
        context.lineTo(435,15+i*30);
        context.stroke();
    }
}
//封装一个画五子棋的函数
var oneStep=function(i,j,me){
    context.beginPath ();
    context.arc(15+i*30,15+j*30,12,0,2*Math.PI );
    //arc用来画扇形，此处用来画圆，前面两个参数为圆心坐标，接着为半径，起始弧度，种植弧度
    context.closePath ();
    var gradient=context.createRadialGradient (15+i*30+2,15+j*30-2,12,15+i*30+2,15+j*30-2,0);
    //返回一个渐变的对象，前面三个参数为外圆心坐标和半径，后面三个为内圆心坐标和半径,其中的2表示偏移量
    if(me){  //假设我的为黑棋，黑棋颜色设置
        gradient.addColorStop (0,"#0A0A0A");//外圆的颜色
        gradient.addColorStop (1,"#636766");//内圆的颜色
    }else{  //白琪颜色设置
        gradient.addColorStop (0,"#D1D1D1");//外圆的颜色
        gradient.addColorStop (1,"#F9F9F9");//内圆的颜色
    }
    context.fillStyle =gradient ;
    context.fill();//fill是用来填充的
}

//希望点击的时候落子，则需要给canvas绑定一个click事件
chess.onclick=function(e){
    if(over){
        return;
    }
    if(!me){
        return;
    }
    var x= e.offsetX;
    var y= e.offsetY;
    var i=Math.floor(x/30);//索引，下取整
    var j=Math.floor(y/30);
    if(chessBoard [i][j]==0){  //位置上没有棋子时候才让其落子
      /*  oneStep(i,j,me);//默认画的是黑棋
        if(me){ //落完棋子后，为了区分落下的是黑棋还是白琪分别为其设定值
            chessBoard [i][j]=1;
        }else{
            chessBoard [i][j]=2;
        }
        me=!me;//黑棋下完之后换白琪*/
        oneStep (i,j,me);
        chessBoard[i][j]=1;
        //在我方进行落子时候对赢法数组进行更新
        for(var k=0;k<count;k++){
            if(wins[i][j][k]){
                myWins[k]++; //我方赢的可能性++
                computerWin [k]=6;//此时电脑不可能赢设定一个异常值
                if(myWins [k]==5){
                    window.alert("你赢了");
                    over=true;
                }
            }
        }
        if (!over){
            me=!me;
            computerAI();
        }
    }

}


var computerAI=function(){
   var myScore=[];
    var computerScore=[];
    var max=0;//保存最高分数
    var u= 0,v=0;//保存最高分数的坐标
    for(var i=0;i<15;i++){
        myScore [i]=[];
        computerScore [i]=[];
        for(var j=0;j<15;j++){
            myScore [i][j]=0;
            computerScore [i][j]=0;
        }
    }
    for(var i=0;i<15;i++){
        for(var j=0;j<15;j++){
            if(chessBoard [i][j]==0){
                for(var k=0;k<count;k++){
                    if(wins[i][j][k]){
                        if(myWins [k]==1){
                            myScore [i][j]+=200;
                        }else if(myWins [k]==2){
                            myScore [i][j]+=400;
                        }else if(myWins [k]==3){
                            myScore [i][j]+=700;
                        }else if(myWins [k]==4){
                            myScore [i][j]+=10000;
                        }
                        if(computerWin [k]==1){
                            computerScore [i][j]+=220;
                        }else if(computerWin [k]==2){
                            computerScore [i][j]+=420;
                        }else if(computerWin [k]==3){
                            computerScore [i][j]+=800;
                        }else if(computerWin [k]==4){
                            computerScore [i][j]+=16000;
                        }
                    }
                }
                if(myScore[i][j]>max){
                    max=myScore [i][j];
                    u=i;
                    v=j;
                }else if(myScore [i][j]==max){
                    if(computerScore [i][j]>computerScore[u][v]){
                        u=i;
                        v=j;
                    }
                }
                if(computerScore[i][j]>max){
                    max=computerScore [i][j];
                    u=i;
                    v=j;
                }else if(computerScore [i][j]==max){
                    if(myScore [i][j]>myScore[u][v]){
                        u=i;
                        v=j;
                    }
                }
            }
        }
    }
    oneStep (u,v,false);
    chessBoard [u][v]=2;//表示计算机在这里落了一个棋子
    for(var k=0;k<count;k++){
        if(wins[u][v][k]){
            computerWin[k]++; //我方赢的可能性++
            myWins [k]=6;//此时电脑不可能赢设定一个异常值
            if(computerWin[k]==5){
                window.alert("计算机赢了");
                over=true;
            }
        }
    }
    if (!over){
        me=!me;
    }
}



/*
//使用for循环画出棋盘
/!*for(var i=0;i<15;i++){    //棋盘宽高450，旁白15，间距30
    context.moveTo(15+i*30,15);//横线
    context.lineTo (15+i*30,435);
    context.stroke ();
    context.moveTo(15,15+i*30);//竖线
    context.lineTo(435,15+i*30);
    context.stroke();
}*!/
*/
/*
context.moveTo (0,0);
context.lineTo (450,450);
context.stroke ();//划线，从左上角到右下角
*/

/*
//绘画棋子需要首先会画圆
//先开始一个路径，然后记得关闭该路径
context.beginPath ();
context.arc(200,200,100,0,2*Math.PI );
//arc用来画扇形，此处用来画圆，前面两个参数为圆心坐标，接着为半径，起始弧度，种植弧度
context.closePath ();
// context.stroke ();//stroke是用来描边的
// xontext.fillStyle ="#636766";//设置样式颜色
var gradient=context.createRadialGradient (200,200,50,200,200,20);
//返回一个渐变的对象，前面三个参数为外圆心坐标和半径，后面三个为内圆心坐标和半径
gradient.addColorStop (0,"#0A0A0A");//外圆的颜色
gradient.addColorStop (1,"#636766");//内圆的颜色
context.fillStyle =gradient ;
context.fill();//fill是用来填充的*/
