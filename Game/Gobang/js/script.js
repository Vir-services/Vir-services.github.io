/**
 * Created by Administrator on 2016/4/5.
 */
var chessBoard=[];//��������
 //����һ����ά�������洢�����ϵ�������������������Ͱ�������ͬһ���ط�
var me=true;//Ϊ���������壬����me��Ĭ��Ϊtrue����
var over=false;
//����Ӯ������
var wins=[];

//Ӯ����ͳ������
var myWins=[];
var computerWin=[];

for(var i=0;i<15;i++){  //��ά�����ʼ��
    chessBoard[i]=[];
    for(var j=0;j<15;j++){
        chessBoard [i][j]=0;//ֵΪ0��û�����ӣ��ǿյ�
    }
}

//Ӯ�������ʼ��
for(var i=0;i<15;i++){
    wins[i]=[];
    for(var j=0;j<15;j++){
        wins[i][j]=[];
    }
}
var count=0;//����Ӯ�����������
for(var i=0;i<15;i++){  //���к���Ӯ��
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

for(var i=0;i<15;i++){  //��������Ӯ��
    for(var j=0;j<11;j++){
      for(var k=0;k<5;k++){
        wins[j+k][i][count]=true;
    }
    count++;
}
}

for(var i=0;i<11;i++){  //����б���Ӯ��
    for(var j=0;j<11;j++){  //
        for(var k=0;k<5;k++){
            wins[i+k][j+k][count]=true;
        }
        count++;
    }
}

for(var i=0;i<11;i++){  //���з�б���Ӯ��
    for(var j=14;j>3;j--){  //
        for(var k=0;k<5;k++){
            wins[i+k][j-k][count]=true;
        }
        count++;
    }
}

console.log(count);

//Ӯ����ͳ�������ʼ��
for(var i=0;i<count;i++){
    myWins [i]=0;
    computerWin[i]=0;
}

var chess=document.getElementById ("chess");//ͨ��dom�������Ԫ��canvas
var context=chess.getContext ('2d');//���chess��������
context.strokeStyle ="#BFBFBF";
//ʹ��canvas��ˮӡ
var logo=new Image();
logo.src="image/logo.png";
logo.onload=function(){   //png logo������Ҫʱ�䣬��˻�ˮӡ���ڼ�����ɵĻص�������ȥ����
    //�˴���onload������ΪͼƬ������֮��Ļص�����
    context.drawImage (logo,0,0,580,194);
    drawChessBoard();

  /*  oneStep (0,0,true );//�ڣ�0,0��������һ�����壬
    oneStep (1,1,false);//�ڣ�1,1�������ð���
    //���ڵ���
   */

}
//Ϊ�˷�ֹˮӡͼƬ�ڵ�ס���̣����ǿ���ѡ�����滭���̴����װ��һ�������У�Ȼ����ͼƬ֮�����������������

//ʹ��forѭ����������

var drawChessBoard=function(){
    for(var i=0;i<15;i++){    //���̿��450���԰�15�����30
        context.moveTo(15+i*30,15);//����
        context.lineTo (15+i*30,435);
        context.stroke ();
        context.moveTo(15,15+i*30);//����
        context.lineTo(435,15+i*30);
        context.stroke();
    }
}
//��װһ����������ĺ���
var oneStep=function(i,j,me){
    context.beginPath ();
    context.arc(15+i*30,15+j*30,12,0,2*Math.PI );
    //arc���������Σ��˴�������Բ��ǰ����������ΪԲ�����꣬����Ϊ�뾶����ʼ���ȣ���ֲ����
    context.closePath ();
    var gradient=context.createRadialGradient (15+i*30+2,15+j*30-2,12,15+i*30+2,15+j*30-2,0);
    //����һ������Ķ���ǰ����������Ϊ��Բ������Ͱ뾶����������Ϊ��Բ������Ͱ뾶,���е�2��ʾƫ����
    if(me){  //�����ҵ�Ϊ���壬������ɫ����
        gradient.addColorStop (0,"#0A0A0A");//��Բ����ɫ
        gradient.addColorStop (1,"#636766");//��Բ����ɫ
    }else{  //������ɫ����
        gradient.addColorStop (0,"#D1D1D1");//��Բ����ɫ
        gradient.addColorStop (1,"#F9F9F9");//��Բ����ɫ
    }
    context.fillStyle =gradient ;
    context.fill();//fill����������
}

//ϣ�������ʱ�����ӣ�����Ҫ��canvas��һ��click�¼�
chess.onclick=function(e){
    if(over){
        return;
    }
    if(!me){
        return;
    }
    var x= e.offsetX;
    var y= e.offsetY;
    var i=Math.floor(x/30);//��������ȡ��
    var j=Math.floor(y/30);
    if(chessBoard [i][j]==0){  //λ����û������ʱ�����������
      /*  oneStep(i,j,me);//Ĭ�ϻ����Ǻ���
        if(me){ //�������Ӻ�Ϊ���������µ��Ǻ��廹�ǰ����ֱ�Ϊ���趨ֵ
            chessBoard [i][j]=1;
        }else{
            chessBoard [i][j]=2;
        }
        me=!me;//��������֮�󻻰���*/
        oneStep (i,j,me);
        chessBoard[i][j]=1;
        //���ҷ���������ʱ���Ӯ��������и���
        for(var k=0;k<count;k++){
            if(wins[i][j][k]){
                myWins[k]++; //�ҷ�Ӯ�Ŀ�����++
                computerWin [k]=6;//��ʱ���Բ�����Ӯ�趨һ���쳣ֵ
                if(myWins [k]==5){
                    window.alert("��Ӯ��");
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
    var max=0;//������߷���
    var u= 0,v=0;//������߷���������
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
    chessBoard [u][v]=2;//��ʾ���������������һ������
    for(var k=0;k<count;k++){
        if(wins[u][v][k]){
            computerWin[k]++; //�ҷ�Ӯ�Ŀ�����++
            myWins [k]=6;//��ʱ���Բ�����Ӯ�趨һ���쳣ֵ
            if(computerWin[k]==5){
                window.alert("�����Ӯ��");
                over=true;
            }
        }
    }
    if (!over){
        me=!me;
    }
}



/*
//ʹ��forѭ����������
/!*for(var i=0;i<15;i++){    //���̿��450���԰�15�����30
    context.moveTo(15+i*30,15);//����
    context.lineTo (15+i*30,435);
    context.stroke ();
    context.moveTo(15,15+i*30);//����
    context.lineTo(435,15+i*30);
    context.stroke();
}*!/
*/
/*
context.moveTo (0,0);
context.lineTo (450,450);
context.stroke ();//���ߣ������Ͻǵ����½�
*/

/*
//�滭������Ҫ���ȻửԲ
//�ȿ�ʼһ��·����Ȼ��ǵùرո�·��
context.beginPath ();
context.arc(200,200,100,0,2*Math.PI );
//arc���������Σ��˴�������Բ��ǰ����������ΪԲ�����꣬����Ϊ�뾶����ʼ���ȣ���ֲ����
context.closePath ();
// context.stroke ();//stroke��������ߵ�
// xontext.fillStyle ="#636766";//������ʽ��ɫ
var gradient=context.createRadialGradient (200,200,50,200,200,20);
//����һ������Ķ���ǰ����������Ϊ��Բ������Ͱ뾶����������Ϊ��Բ������Ͱ뾶
gradient.addColorStop (0,"#0A0A0A");//��Բ����ɫ
gradient.addColorStop (1,"#636766");//��Բ����ɫ
context.fillStyle =gradient ;
context.fill();//fill����������*/
