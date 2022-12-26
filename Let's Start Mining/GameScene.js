var cam;
var whiteDots=[],shovels=[];
var p=0,round=1,click=false;
var videoPlayed = false, videoLoaded = false;

class GameScene extends Phaser.Scene {
    constructor() {
      super({
        key: "GameScene",
      });
    }
  
    preload()
     {     }
    videoLoad()
     {
      this.load.video("myvideo","assets/GameScene/video.mp4");
     }

    create()
     {
      cam = this.cameras.main;
      this.BG=this.add.image(0,0 , 'BG2').setOrigin(0,0);
      cam.fadeIn(500, 255, 255, 255);
      this.add.image(40, 592.75 , 'projector').setOrigin(0.5,0.5);
      this.knob=this.add.image(64, 590 , 'knob').setOrigin(0,0);
      this.oreBar=this.add.image(40, 41 , 'oreBar').setOrigin(0,0);
      this.grey1 = this.add.image(40, 105,'grey1').setOrigin(0,0);
      this.grey2 = this.add.image(40,40,'grey2').setOrigin(0,0).setDepth(4);
      //this.bar=this.add.image(24, 229 , 'bar2').setOrigin(0.5,0.5).setScale(0.5).setAlpha(0);

      this.anims.create({
        key: "shovel",
        frames: this.anims.generateFrameNames("shovel", {
          start: 0,
          end: 143,
          zeroPad: 0,
          prefix: "shovelCorrect",
          suffix: ".png",
        }),
        frameRate: 30,
        repeat: 0,
      });
     
      this.anims.create({
        key: "wrongShovel",
        frames: this.anims.generateFrameNames("wrongShovel", {
          start: 0,
          end: 75,
          zeroPad: 0,
          prefix: "shovelIncorrect",
          suffix: ".png",
        }),
        frameRate: 30,
        repeat: 0,
      });

      this.anims.create({
        key: "oreCollect",
        frames: this.anims.generateFrameNames("oreCollect", {
          start: 0,
          end: 0  ,
          zeroPad: 0,
          prefix: "oresCollectCart",
          suffix: ".png",
        }),
        frameRate: 30,
        repeat: 0,
      })
      this.anims.create({
        key: "oreCollect2",
        frames: this.anims.generateFrameNames("oreCollect", {
          start: 0,
          end: 32  ,
          zeroPad: 0,
          prefix: "oresCollectCart",
          suffix: ".png",
        }),
        frameRate: 30,
        repeat: 0,
      })
      this.oreCollect=this.add.sprite(641, 355 , 'oreCollect').setOrigin(0.5,0.5).play('oreCollect');

      this.time.delayedCall(
        1000,
         () => {
         this.initiate();
   },[],this);  

   this.videoLoad();
   this.load.start();
   this.load.on(
    "complete",
    () => {
      console.log("videocomplete");
      videoLoaded = true;
    },
    this
  );
}//create close

 gridCreation()
 {
 let x=558;let y=83;
 for(let i=1;i<=13; i++)
 {
 for(let j=1;j<=13;j++)
{
  whiteDots[p]=this.add.image(x, y , 'white').setOrigin(0,0).setAlpha(0.0001).setScale(1.2).setInteractive({cursor:"pointer"});
  x+=46;
  p++;
}
y+=46;
x=558;
}
}

speechBubble()
{
  this.speech1Anim=this.tweens.add({
    targets: this.speechBubble1,
    delay:10,
    alpha: { from: 0, to: 1},
    ease: 'Power1',       // 'Cubic', 'Elastic', 'Bounce', 'Back' ,'Sine.easeOut',
    duration: 200,
    repeat: 0,            // -1: infinity
    yoyo: false
  });
}

 initiate()
 {
  this.knobAnim=this.tweens.add({
    targets: this.knob,
    delay:10,
    y: { from: 590, to: 570},
    ease: 'Power1',       // 'Cubic', 'Elastic', 'Bounce', 'Back' ,'Sine.easeOut',
    duration: 250,
    repeat: 0,            // -1: infinity
    yoyo: false
  });

  this.knobAnim.on('complete',()=>{
    this.yellow=this.add.image(21.5, 601 , 'yellowDot').setOrigin(0,0);
    this.glow1=this.add.image(160, 587 , 'glow1');
    this.lightAnim1=this.tweens.add({
      targets: this.glow1,
      delay:10,
      alpha: { from: 0, to: 1},
      ease: 'Power1',       // 'Cubic', 'Elastic', 'Bounce', 'Back' ,'Sine.easeOut',
      duration: 250,
      repeat: 1,            // -1: infinity
      yoyo: false
    });

    this.lightAnim1.on('complete',()=>{
   this.glow2=this.add.image(45, 300 , 'glow2').setOrigin(0,0);
    this.lightAnim2=this.tweens.add({
      targets: this.glow2,
      delay:10,
      alpha: { from: 0, to: 1},
      ease: 'Power1',       // 'Cubic', 'Elastic', 'Bounce', 'Back' ,'Sine.easeOut',
      duration: 300,
      repeat: 0,            // -1: infinity
      yoyo: false
    });

    this.lightAnim2.on('complete',()=>{
      this.glow3=this.add.image(80, 0 , 'glow3').setOrigin(0,0);
      this.graph=this.add.image(520, 15 , 'graph').setOrigin(0,0).setAlpha(0);
     this.graphAnim=this.tweens.add({
        targets: this.graph,
        delay:35,
        alpha: { from: 0, to: 1},
        ease: 'Power1',       // 'Cubic', 'Elastic', 'Bounce', 'Back' ,'Sine.easeOut',
        duration: 500,
        repeat: 0,            // -1: infinity
        yoyo: false
      });
      this.lightAnim3=this.tweens.add({
        targets: this.glow3,
        delay:10,
        alpha: { from: 0, to: 1},
        ease: 'Power1',       // 'Cubic', 'Elastic', 'Bounce', 'Back' ,'Sine.easeOut',
        duration: 300,
        repeat: 0,            // -1: infinity
        yoyo: false
      });
      this.graphAnim.on('complete',()=>{
        this.speechBubble1=this.add.image(40, 340 , 'speechBubble1').setOrigin(0,0).setAlpha(0);
        this.speechBubble();
        this.ore1=this.add.image(750, 590 , 'ore1').setOrigin(0.5,0.5).setScale(0);
        this.speech1Anim.on('complete',()=>{
          this.ore1Anim=this.tweens.add({
            targets: this.ore1,
            delay:10,
            scale: { from: 0, to: 1},
            ease: 'Power1',       // 'Cubic', 'Elastic', 'Bounce', 'Back' ,'Sine.easeOut',
            duration: 200,
            repeat: 0,            // -1: infinity
            yoyo: false
          });

      this.ore1Anim.on('complete',()=>{
     this.time.delayedCall(
     2500,
     () => {
        this.speechBubble1.setAlpha(0);
         this.speechBubble1.setTexture("speechBubble2");
         this.speechBubble();
         this.gridCreation();
         
         whiteDots.forEach((element,index) =>{
        if(index==147 && (round==1 || round==2))  
          element.setVisible(false);
        if(index==127 && (round==3 || round==4)) 
          element.setVisible(false);
          if(index==1 && (round==5 || round==6)) 
          element.setVisible(false);
         element.on('pointerover',()=>
         {
          //console.log(index)
          element.setAlpha(1);
          });
         element.on('pointerout',()=>
          {
           // console.log("out")
            if(click==false)
            element.setAlpha(0.0001);
            if(click==true)
            element.setAlpha(1);
          });
          element.on(
            "pointerdown",function (pointer) {
         if(round==1 || round==2)//Round-1 & 2 checking
         {
          if((index==53 && round==1) || (index==21 && round==2))
          {
          click=true; 
          this.correctEffect();
          }
          else
          {
            click=true; 
            this.wrongEffect(element.x,element.y,index);
          }
         }//if round close

           if(round==3 || round==4)//Round-3 & 4 checking
            {
             if((index==35 && round==3) || (index==41 && round==4))
             {
             click=true; 
             this.correctEffect();
             }
             else
             {
               click=true; 
               this.wrongEffect(element.x,element.y,index);
             }
           }//if round close 
           
           if(round==5 || round==6)//Round-5 & 6 checking
            {
             if((index==25 && round==5) || (index==143 && round==6))
             {
             click=true; 
             this.correctEffect();
             }
             else
             {
               click=true; 
               this.wrongEffect(element.x,element.y,index);
             }
           }//if round close 
         },this);
         
         });
         },[],this);
        },this);//ore1anim event complete

      },this);//speech1anim event complete

    },this);//graphAnim complete evnet close
      
  },this);//lightanim2 complete event close 

},this);//lightanim1 complete event close 

},this)//knobanimation complete event
}
shovelOre(x1,y1,y2,y3,pos,ore,speech,size,diff1,diff2)
{
  this.shovel=this.add.sprite(x1,y1, "shovel").play('shovel').setDepth(1);
  ore.setDepth(2);
  whiteDots[pos].setTexture("correctGreen");
  shovels.push(this.shovel);
  this.time.delayedCall(
    2000,
     () => {
      whiteDots[pos].setVisible(false); 
      this.ore2Anim1=this.tweens.add({
        targets: ore,
        delay:10,
        y: { from: y2, to: y3},
        ease: 'Power1',       // 'Cubic', 'Elastic', 'Bounce', 'Back' ,'Sine.easeOut',
        duration: 350,
        repeat: 0,            // -1: infinity
        yoyo: false
      });
      this.ore2Anim2=this.tweens.add({
        targets: ore,
        delay:10,
        scale: { from: 0, to: size},
        ease: 'Power1',       // 'Cubic', 'Elastic', 'Bounce', 'Back' ,'Sine.easeOut',
        duration: 350,
        repeat: 0,            // -1: infinity
        yoyo: false
      });

      this.ore2Anim2.on('complete',()=>{
        this.ore2Anim3=this.tweens.add({
          targets: ore,
          delay:250,
          y: { from: y3, to: y3+diff1},
          ease: 'Power1',       // 'Cubic', 'Elastic', 'Bounce', 'Back' ,'Sine.easeOut',
          duration: 600,
          repeat: 1,            // -1: infinity
          yoyo: true
        });

        this.ore2Anim3.on('complete',()=>{
          this.ore2Anim4=this.tweens.add({
            targets: ore,
            delay:250,
            y: { from: y3, to: y3+diff2},
            ease: 'Power1',       // 'Cubic', 'Elastic', 'Bounce', 'Back' ,'Sine.easeOut',
            duration: 500,
            repeat: 0,            // -1: infinity
            yoyo: false
          });

          this.ore2Anim4.on('complete',()=>{
 
           this.yellow.setTexture('yellowDot');
           this.glow1.setTexture("glow1");
           this.glow2.setTexture("glow2");
           this.glow3.setTexture("glow3");
           click=false;
           round++;
           console.log("round"+round);
           if(round==2 || round==4 || round==6)
           {
           this.speechBubble1.setTexture(speech);
           this.speechBubble();
           }
           if(round==3 || round==5 || round==7)
           {
           this.collect=this.add.image(847, 367 , 'collect').setOrigin(0.5,0.5).setInteractive({cursor:"pointer"});

          this.collect.on(
      "pointerover",
      function (pointer) {
       this.collect.setTexture("collectBlack");
      },
      this
    );

    this.collect.on(
      "pointerout",
      function (pointer) {
        this.collect.setTexture("collect");
      },
      this
    );
           this.collect.on(
            "pointerdown",function (pointer) {
              this.collectAnim=this.tweens.add({
                targets: this.collect,
                delay:100,
                scale: { from: 1, to: 0},
                ease: 'Power1',       // 'Cubic', 'Elastic', 'Bounce', 'Back' ,'Sine.easeOut',
                duration: 300,
                repeat: 0,            // -1: infinity
                yoyo: false
              });
              this.collectAnim.on('complete',()=>{
               if(round==3) 
               this.oreMove(this.ore1,this.ore2,this.ore3);
               if(round==5) 
               this.oreMove(this.ore4,this.ore5,this.ore6);
               if(round==7) 
               this.oreMove(this.ore7,this.ore8,this.ore9);
               whiteDots.forEach(element =>{
                element.setTexture("white").setAlpha(0.0001);
               })     
              },this);
            },this);
           }
           if(round==1 || round==2 || round==4 || round==6)
           whiteDots.forEach(element =>{
            element.setInteractive();
           })
           if(round==3)
           whiteDots.forEach(element =>{
            element.disableInteractive();
           })
          },this);
        },this);
      },this);

     },[],this);
}
correctEffect()
{ 
  if(round==1)
  {
    this.ore2=this.add.image(613, 281 , 'ore2').setOrigin(0.5,0.5).setScale(0);
    this.shovelOre(643,460,281,241,53,this.ore2,'speechBubble3',1.3,15,13);
  }

  if(round==2)
  {
    this.ore3=this.add.image(938, 140 , 'ore3').setOrigin(0.5,0.5).setScale(0);
    this.shovelOre(964,320,140,110,21,this.ore3,'speechBubble4',0.6,12,11);
  }

  if(round==3)
  {
    this.ore5=this.add.image(980, 188 , 'ore5').setOrigin(0.5,0.5).setScale(0);
    this.shovelOre(1007,368,188,158,35,this.ore5,'speechBubble6',1.0,12,11);
  }

  if(round==4)
  {
    this.ore6=this.add.image(658, 230 , 'ore6').setOrigin(0.5,0.5).setScale(0);
    this.shovelOre(689,412,230,203,41,this.ore6,'speechBubble7',1.0,12,11);
  }

  if(round==5)
  {
    this.ore8=this.add.image(1119, 136 , 'ore8').setOrigin(0.5,0.5).setScale(0);
    this.shovelOre(1144,320,136,110,25,this.ore8,'speechBubble9',1.0,12,13);
  }

  if(round==6)
  {
    this.ore9=this.add.image(567, 596 , 'ore9').setOrigin(0.5,0.5).setScale(0);
    this.shovelOre(597,780,596,570,143,this.ore9,'speechBubble9',1.0,12,11);
  }

   this.glow1.setTexture("greenGlow1");
   this.glow2.setTexture("greenGlow2");
   this.glow3.setTexture("greenGlow3");
   this.yellow.setTexture("greenDot");
   this.speechBubble1.setAlpha(0);
   if(click==true) 
   whiteDots.forEach(element =>{
   element.disableInteractive();
  })
}

wrongEffect(x,y,pos)
{ 
   this.wrongShovel=this.add.sprite(x+35,y+190, "wrongShovel").play('wrongShovel');
   whiteDots[pos].setTexture("redIncorrect");
   this.glow1.setTexture("redGlow1");
   this.glow2.setTexture("redGlow2");
   this.glow3.setTexture("redGlow3");
   this.yellow.setTexture("redDot");

   this.time.delayedCall(
    1500,
     () => {
      whiteDots[pos].setTexture("white").setAlpha(0.0001);
      this.wrongText=this.add.sprite(840,365, "wrongText").setOrigin(0.5,0.5);

      this.time.delayedCall(
        1000,
         () => {
          this.tweens.add({
            targets: this.wrongText,
            delay:100,
            scale: { from: 1, to: 0},
            ease: 'Power1',       // 'Cubic', 'Elastic', 'Bounce', 'Back' ,'Sine.easeOut',
            duration: 300,
            repeat: 0,            // -1: infinity
            yoyo: false
          });
           this.yellow.setTexture('yellowDot');
           this.glow1.setTexture("glow1");
           this.glow2.setTexture("glow2");
           this.glow3.setTexture("glow3");
           click=false;
           whiteDots.forEach(element =>{
            element.setInteractive();
           })
        },[],this);
     },[],this);
   
   if(click==true) 
   whiteDots.forEach(element =>{
   element.disableInteractive();
  })
}

oreMove(ore1,ore2,ore3)
{
  this.oreCollect.setDepth(2);
  ore1.setDepth(1);
  ore2.setDepth(1);
  ore3.setDepth(1);
  this.tweens.add({
    targets:[ore1,ore2,ore3],
    delay:250,
    x: this.oreBar.x+10,
    y: this.oreBar.y+180,
    ease: 'Power1',       // 'Cubic', 'Elastic', 'Bounce', 'Back' ,'Sine.easeOut',
    duration: 1000,
    repeat: 0,            // -1: infinity
    yoyo: false
  });

  this.time.delayedCall(
    800,
     () => {
  this.oreCollectAnim=this.tweens.add({
    targets:[ore1,ore2,ore3],
    delay:100,
    scale: 0,
    ease: 'Power1',       // 'Cubic', 'Elastic', 'Bounce', 'Back' ,'Sine.easeOut',
    duration: 500,
    repeat: 0,            // -1: infinity
    yoyo: false
  });
  this.time.delayedCall(
    300,
     () => {
    shovels.forEach(element =>{
      element.destroy();
     })
    if(round==3)
    { 
    this.bar=this.add.image(44, 229 , 'bar2').setOrigin(0,0).setScale(0.5);
    this.glare1 = this.add.image(60,186,'glare1').setScale(0.9).setVisible(false).setOrigin(0.5,0.5);
    this.oreCollect2=this.add.sprite(641, 355 , 'oreCollect').setOrigin(0.5,0.5).play('oreCollect2').setDepth(2);
    }
    if(round==5)
    {
    this.bar2=this.add.image(44, 163 , 'bar2').setDepth(3).setOrigin(0,0).setScale(0.5).setVisible(false);
    this.glare1.setDepth(1);
    this.barProgress=this.tweens.add({
      targets:this.bar2,
      displayHeight:54.8,
      y:107.4,
      duration: 500,
      delay:100,
      ease: "Power1",
      repeat: 0,
      yoyo:false,
     });
     this.barProgress.on('start',()=>{
      this.bar2.setVisible(true);
     },this);
     this.reset();
    }
    if(round==7)
    {
    this.bar3=this.add.image(44, 103 , 'bar2').setDepth(5).setOrigin(0,0).setScale(0.5).setVisible(false);  
    this.barProgress=this.tweens.add({
      targets:this.bar3,
      displayHeight:51.4,
      y:54,
      duration: 500,
      delay:100,
      ease: "Power1",
      repeat: 0,
      yoyo:false,
     });
     this.barProgress.on('start',()=>{
      this.bar3.setVisible(true);
     },this);
    this.time.delayedCall(
        500,
         () => {
      this.top=this.add.image(44, 65 , 'top').setOrigin(0,0).setDepth(5).setVisible(false);
      this.topTween=this.tweens.add({
        targets:this.top,
        y:42,
        duration: 100,
        delay:10,
        ease: "Power1",
        repeat: 0,
        yoyo:false,
       });
       this.topTween.on('start',()=>{
        this.top.setVisible(true);
       },this);
      },[],this);
     this.reset();
    }
    this.oreCollect2.on(Phaser.Animations.Events.ANIMATION_COMPLETE,
      () => { 
      this.barProgress=this.tweens.add({
        targets:this.bar,
        displayHeight:66,
        y:165,
        duration: 500,
        delay:100,
        ease: "Power1",
        repeat: 0,
        yoyo:false,
       });
       this.reset();
      },this);
   // },this);
  },[],this); 
},[],this);
}

reset()
{
  this.barProgress.on('complete',()=>{
   if(round==3) 
   {
   this.glare1.setVisible(true).setDepth(1);
   this.grey1.setDepth(2);
   this.glareMove(this.glare1,130);
   }
   if(round==5) 
   {
   this.grey1.destroy();  
   this.oreCollect2.setDepth(3); 
   this.bar2.setDepth(1);
   this.glare1.setDepth(2);
   this.glare1.setTexture('glare2');
   this.grey2.setDepth(4);
   this.glareMove(this.glare1,110);
   }
   if(round==7) 
   {
    this.oreCollect2.setDepth(6); 
    this.bar.setDepth(4); 
    this.bar2.setDepth(4); 
   this.bar3.setDepth(4);
   this.top.setDepth(4);
   this.glare1.setDepth(5);
   this.glare1.setTexture('glare2');
  // this.glareMove(this.glare1,110);
  this.time.delayedCall(
    5000,
     () => { 
  this.myVideo = this.add.video(this.cameras.main.width / 2,this.cameras.main.height / 2, 'myvideo').setDepth(10);
  if (videoLoaded) 
  {  
    this.myVideo.play(true).setLoop(false);
    /*this.time.delayedCall(
      6000,
       () => {  
        this.cuemathLogoReveal.setVolume(0.5).play(); //audio
       },[],this);*/
    this.myVideo.on(
      "complete",
      function (video) {
        this.scale.stopFullscreen();
        videoPlayed = true;
      },this );
  }  //if close
},[],this); 
   }

   this.time.delayedCall(
      2000,
       () => { 
       if(round==3)  
       {
       this.ore4=this.add.image(1025, 504 , 'ore4').setOrigin(0.5,0.5).setScale(0);
       this.firstOreAppear(this.ore4,'speechBubble4');
       whiteDots[147].setVisible(true);
       whiteDots[53].setVisible(true);
       whiteDots[21].setVisible(true);
       whiteDots[127].setVisible(false);
       }

       if(round==5)  
       {
       this.ore7=this.add.image(610, 90 , 'ore7').setOrigin(0.5,0.5).setScale(0);
       this.firstOreAppear(this.ore7,'speechBubble7');
       whiteDots[127].setVisible(true);
       whiteDots[35].setVisible(true);
       whiteDots[41].setVisible(true);
       whiteDots[1].setVisible(false);
       }
       },[],this);
   },this);
}
glareMove(glare,y)
{
  this.tweens.add({
    targets:glare,
    y:y,
    ease: "Linear",
    duration: 2500,
    delay:500,
    repeat: -1,
    });
  if(round==7)
  {
    console.log("video");
      
    }//if close
}

firstOreAppear(ore,speech)
{          
  cam.fadeOut(500, 0, 0, 0);
  cam.once('camerafadeoutcomplete', function (camera) { 
    cam.fadeIn(500, 255, 255, 255);
  },this);//fadeout complete event 
  cam.once('camerafadeincomplete', function (camera) { 
  this.speechBubble1.setTexture(speech);
  this.speechBubble();
  this.speech1Anim.on('complete',()=>{
    this.ore4Anim=this.tweens.add({
      targets: ore,
      delay:10,
      scale: { from: 0, to: 1},
      ease: 'Power1',       // 'Cubic', 'Elastic', 'Bounce', 'Back' ,'Sine.easeOut',
      duration: 200,
      repeat: 0,            // -1: infinity
      yoyo: false
    });
    this.ore4Anim.on('complete',()=>{
      this.time.delayedCall(
      2500,
      () => {
         this.speechBubble1.setAlpha(0);
          if(round==3)
          this.speechBubble1.setTexture("speechBubble5");
          if(round==5)
          this.speechBubble1.setTexture("speechBubble8");
          this.speechBubble();
          whiteDots.forEach(element =>{
            element.setInteractive();
           })
      },[],this);
    },this);
   },this);
  },this);//fadein complete event 
}

update()
   { 
    if (videoPlayed) 
         this.myVideo.setPaused(true);
  
    }
   } 