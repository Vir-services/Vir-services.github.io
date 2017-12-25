#!/bin/env python3

import time
import random
import os
import subprocess
import platform


def checksystem():
    if 'Windows' in platform.system() :
        subprocess.call("cls", shell=True) # windows上执行cls命令
    if 'Linux' in platform.system() :    
        subprocess.call("clear") # linux上借助于call执行clear命令  

checksystem() 
print('发现史莱姆')
hp = int(100) #你的血量
hp2 = int(100) #史莱姆血量
hh = int(0)
print('你的当前血量%d and 史莱姆的血量%d' % (hp,hp2))
print('战斗开始！')


#结果判定
def zdjieguo(x,y):
    if y <= 0 and x > 0:
        print('你的血量:%d VS 史莱姆的血量:%d' %(x,y))
        print('你杀死了史莱姆，取得最终胜利！')        
        print('――――――――――――――――――――')
        input('按回车键继续...')
        os._exit(0)
    if x <= 0 and y > 0:
        print('你的血量:%d VS 史莱姆的血量:%d' %(x,y))
        print("你被史莱姆杀死，任务失败！")        
        print('――――――――――――――――――――')
        input('按回车键继续...')
        os._exit(0)

def yourount(mhp,dhp2,mdm,ddm2,mbj):
    global hp2 
    if mbj > 30 :
        hp2 = dhp2-2*mdm
        print('你对史莱姆发起攻击 -%d 暴击！' % (2*mdm))
        zdjieguo(mhp,hp2)

    if bj <= 30 :
        hp2 = dhp2 - mdm
        print('你对史莱姆发起攻击 -%d ！' % (mdm))
        zdjieguo(mhp,hp2)

def dmrount(mhp,dhp2,mdm,ddm2,dbj2):
    global hp
    if dbj2 > 30 :
        hp = mhp - 2*ddm2
        print('史莱姆对你发起攻击 -%d 暴击！' % (2*ddm2))
        zdjieguo(hp,dhp2)

    if dbj2 <= 30 :
        hp = mhp - ddm2
        print('史莱姆对你发起攻击 -%d ！' % (ddm2))
        zdjieguo(hp,dhp2)

while (hp> 0 and hp2 >0):
    hh = hh + 1
    dm = random.randint(8,10) #你的攻击力
    dm2 = random.randint(6,11) #史莱姆攻击力
    bj = random.randint(0,100) #你的暴击概率计算
    bj2 = random.randint(0,70) #史莱姆的暴击概率计算
    speed = random.randint(0,20) #你的先手速度
    speed2 = random.randint(0,10) #史莱姆的先手速度
    print('回合%d:' % (hh))

    if speed >= speed2 :
        print('你获得了先手')
        yourount(hp,hp2,dm,dm2,bj)
        dmrount(hp,hp2,dm,dm2,bj2)
    if speed < speed2 :
        print('史莱姆获得了先手')
        dmrount(hp,hp2,dm,dm2,bj2)
        yourount(hp,hp2,dm,dm2,bj)
    if speed == 0 :
        print('你受伤了，未能攻击！')       
        dmrount(hp,hp2,dm,dm2,bj2)
    if speed2 == 0 :
        print('史莱姆受伤了，未能攻击！')       
        yourount(hp,hp2,dm,dm2,bj)
#战斗日志
    print('你的血量:%d VS 史莱姆的血量:%d' %(hp,hp2))
    print('――――――――――――――――――――')
    time.sleep(1)
    checksystem() 