var erase=document.getElementById("namegame")
var canvas;
var context;
var my_gradient;
var penguin= new Image()
var poleImg=new Image()
var poleBot=new Image()
var background=new Image()
var isFinish=false;
penguin.src='firstproject/image.jpg';
background.src='firstproject/back.jpg';
poleImg.src="firstproject/pole.jpg"
poleBot.src="firstproject/polebot.jpg"
var a=[]; var tracerFront=0; let score=0; var check=false; var highestScore=0;var bird={};
var socket = io();
var bestscore;
var kylucda="";
socket.emit("request best-score");
socket.on("best-score",(key)=>{bestscore=key.bestscore;
kylucda=key.bestplayer;
})
function POLES(){
    this.x=500;
    this. daiTop= 300;
    this. yDown=500;
    this. daiBot=218
};


function setUpReSource ()
{
   bird =
{
    x:100,
    y:300
}
a=[];tracerFront=0;score=0
let temp=new POLES()
// push giá trị các poles có sẵn
a[0]=temp;
for (let i=1;i<=100;i++)
  {
      let ran=Math.random()*200;
      let temp=new POLES()
      temp.x=a[i-1].x+325;
      temp.yDown=500-ran;
      temp.daiTop=300-ran;
      temp.daiBot=218+ran;
      a.push(temp);
  }

}
function checkLose()
{

   if (bird.y <= 50 || bird.y>=650) return false;
   if ((bird.y+50 >= a[tracerFront].yDown || bird.y <=a[tracerFront].daiTop)&& 150 >= a[tracerFront].x ) return false;
   
   return true;
}
// run game
function ProcessGame()
{ 
    canvas.height=718;
    canvas.width=1500;    
context.drawImage(penguin,bird.x,bird.y,50,50)
for (let i=0;i<=100;i++)
{
    context.drawImage(poleImg,a[i].x,0,50,a[i].daiTop)
    context.drawImage(poleBot,a[i].x,a[i].yDown,50,a[i].daiBot)
}
// let poles move
for (let i=0;i<=100;i++)  a[i].x-=3;
if (a[tracerFront].x < bird.x-50) { ++tracerFront; ++score;}
bird.y+=3;
//Display player's score
context.font = "20px Arial";
context.fillStyle = "red";
context.fillText(`Kỷ lục: ${bestscore}`,0,25);
context.fillText(`Kỷ lục da: ${kylucda}`,0,50);
context.font = "30px Arial";
context.fillStyle = "violet";
context.fillText(`Your Score : ${score}`,0,100);
if (!checkLose())   isFinish=true;
// set up resource

 if (!isFinish) requestAnimationFrame(ProcessGame)
 else  {
     check=false;
     cancelAnimationFrame(ProcessGame);
         if (highestScore < score) highestScore=score;
         setTimeout(()=>{
             if (window.confirm(` Your score in this turn is ${score}           
         DO YOU WANNA PLAY AGAIN?
         Click OK to try again
               Cancel to see your highest score 
          `))
        AgainGame();
        else  
        {
            
           if(bestscore >= highestScore)  alert(` Your highest score is ${highestScore}, sắp phá kỷ lục rồi, better luck next time `)
           else 
           {        
                alert(` Your highest score is ${highestScore}, phá kỷ lục rồi!. Bạn là nhất, nhất bạn rồi `) ; 
                var username= prompt('Nhập lên kỷ lục da');
                socket.emit("guinness",{highestScore,username});          
                alert(` Thanks, chơi lại để see ur name `) ; 
        }}
        },200);  
        
        //  erase.innerHTML=` DO YOU WANT PLAY AGAIN?
        //  <button id="try" onclick="AgainGame()">
        //     TRY AGAIN
        //  </button> ` 
 }
}
function StartGame()
{
erase.innerHTML=""; 
check=true;
setUpReSource();
canvas=document.getElementById("mycanvas")
context=canvas.getContext("2d")
ProcessGame()
}
function AgainGame()
{
   isFinish=false;
   StartGame();
}
window.onclick= function()
{
    if (check)
    bird.y-=100;
}