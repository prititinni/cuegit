var cam,inputNumberUnit,inputNumberTenth,inputNumberHundredth,entry=0,round=1,wrong=0,correct=0,container,container2,group;

class GameScene extends Phaser.Scene {
  
    constructor() {
      super({
        key: "GameScene",
      });
    }
  
    preload()
     {
      this.load.plugin('rexflashplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexflashplugin.min.js', true);
      this.load.plugin('rexshakepositionplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexshakepositionplugin.min.js', true);

     }

     animsLoad()
     { }
     
     create()
     {
    cam = this.cameras.main;
    cam.fadeIn(500, 255, 255, 255);
    this.BG=this.add.image(-2200, (this.cameras.main.height / 2)-160 , 'BG2').setScale(1.0);

    //Tree shake1 animation (fast movement)
    this.anims.create({
      key: 'shake1',
      frames: this.anims.generateFrameNames('shake', {
          start: 0,
          end: 60,
          zeroPad: 0,
          prefix: 'treeShake',
          suffix: '.png'
      }),
      frameRate: 28,
      repeat: -1
      });

    //Tree shake2 animation (slow movememt)
    this.anims.create({
      key: 'shake2',
      frames: this.anims.generateFrameNames('shake', {
          start: 60,
          end: 0,
          zeroPad: 0,
          prefix: 'treeShake',
          suffix: '.png'
      }),
      frameRate: 15,
      repeat: -1
      });

      //Shake & Fruit collection animation
      this.anims.create({
        key: 'shake3',
        frames: this.anims.generateFrameNames('shake', {
            start: 60,
            end: 180,
            zeroPad: 0,
            prefix: 'treeShake',
            suffix: '.png'
        }),
        frameRate: 30,
        repeat: 0
        });
    
    this.tree1=this.add.sprite(238,315, 'shake').play('shake1');
    this.tree1.displayHeight=590;
    this.tree2=this.add.sprite(443,355, 'shake').play('shake2');
    this.tree3=this.add.sprite(655,315, 'shake').play('shake2');
    this.tree3.displayHeight=590;
    this.tree4=this.add.sprite(860,245, 'shake').setScale(1.09).play('shake1');
    this.tree4.displayHeight=640;
    this.tree5=this.add.sprite(1085,320, 'shake').play('shake2');
    
    this.bottom=this.add.image(-500,575, 'bottom').setScale(0.8);
    this.basket=this.add.image(644,660, 'basket').setScale(1.02);
    this.leftHandle=this.add.image(250,750, 'leftHandle');
    this.leftHandle.angle-=20;
    this.rightHandle=this.add.image(1035,750, 'rightHandle');
    this.rightHandle.angle+=20;
    this.machine=this.add.image(645,542, 'machine');
    this.harvest=this.add.image(645,650, 'harvest').setInteractive({cursor: "pointer"});
    this.knob=this.add.image(984,630, 'knob');
    this.wheelPart=this.add.image(360,603, 'wheelPart');
    this.wheel=this.add.image(350,590, 'wheel');
    this.lever=this.add.sprite(645,355, 'lever');
    this.bulb=this.add.image(477,435, 'bulb').setVisible(false);
    this.bulb2=this.add.image(477,476, 'bulb').setVisible(false);
    this.bulb3=this.add.image(477,519, 'bulb').setVisible(false);
    this.redBulbLeft=this.add.image(509,643, 'redBulb').setVisible(false);
    this.redBulbRight=this.add.image(780,643, 'redBulb').setVisible(false);
     //Wind Leaves animation
     this.anims.create({
      key: 'wind',
      frames: this.anims.generateFrameNames('wind', {
          start: 0,
          end: 210,
          zeroPad: 0,
          prefix: 'windLeaves',
          suffix: '.png'
      }),
      frameRate: 20,
      repeat: -1
      });

    this.wind=this.add.sprite(640, 360, "wind").play('wind');
   
    //confetti animation
    this.anims.create({
      key: 'confetti',
      frames: this.anims.generateFrameNames('confetti', {
          start: 0,
          end: 81,
          zeroPad: 0,
          prefix: 'confetti',
          suffix: '.png'
      }),
      frameRate: 35,
      repeat: 0
  }); 

  //leverdown animation
      this.anims.create({
        key: 'lever',
        frames: this.anims.generateFrameNames('lever', {
            start: 0,
            end: 16,
            zeroPad: 0,
            prefix: 'lever',
            suffix: '.png'
        }),
        frameRate: 20,
        repeat: 0
    }); 

    //leverup animation
      this.anims.create({
        key: 'leverUp',
        frames: this.anims.generateFrameNames('lever', {
            start: 16,
            end: 0,
            zeroPad: 0,
            prefix: 'lever',
            suffix: '.png'
        }),
        frameRate: 20,
        repeat: 0
    });

    this.anims.create({
      key: "spotlightOpen",
      frames: this.anims.generateFrameNames("spotlight", {
        start: 0,
        end: 188,
        zeroPad: 0,
        prefix: "spotlight0",
        suffix: ".png",
      }),
      frameRate: 20,
      repeat: 0,
    });

   this.anims.create({
      key: "endConfetti",
      frames: this.anims.generateFrameNames("endConfetti", {
        start: 0,
        end: 120,
        zeroPad: 0,
        prefix: "seq_0_",
        suffix: ".png",
      }),
      frameRate: 40,
      repeat: 0,
    });   

    this.inputBox1=this.add.image(646,532 , 'default').setInteractive({cursor:'pointer'});
    this.inputBox2=this.add.image(708,532 , 'default').setInteractive({cursor:'pointer'});
    this.inputBox3=this.add.image(583,532 , 'default').setInteractive({cursor:'pointer'});
    this.multiplicant = this.add.text(624, 385,"1     4", { fontFamily: "font2", fontSize: "50px", fill: "#2B2B2B" }).setResolution(1.0);
    this.multiplier = this.add.text(698, 445,"5", { fontFamily: "font2", fontSize: "50px", fill: "#2B2B2B" }).setResolution(1.0);
    this.multiply = this.add.text(624, 445,"x", { fontFamily: "font2", fontSize: "50px", fill: "#2B2B2B" }).setResolution(1.0);
    this.inputTextUnit = this.add.text(699, 507,"", { fontFamily: "font2", fontSize: "45px", fill: "#2B2B2B" }).setResolution(1.0);
    this.inputTextTenth = this.add.text(625, 507,"", { fontFamily: "font2", fontSize: "45px", fill: "#2B2B2B" }).setResolution(1.0);
    this.inputTextHundredth = this.add.text(550, 507,"", { fontFamily: "font2", fontSize: "45px", fill: "#2B2B2B" }).setResolution(1.0);
    this.cursorHundredth=this.add.image(583, 516,"cursor").setOrigin(0).setVisible(false);
    this.cursorTenth = this.add.image(647, 516,"cursor").setOrigin(0).setVisible(false);
    this.cursorUnit =this.add.image(709, 516,"cursor").setOrigin(0).setVisible(false);
    
    this.containerMachine=this.add.container(0,0,[this.basket,this.leftHandle,this.rightHandle,this.machine,this.harvest,this.knob, this.wheelPart,this.wheel,this.lever,this.bulb,this.bulb2,this.bulb3,this.redBulbLeft,this.redBulbRight,this.inputBox1,this.inputBox2,this.inputBox3,this.multiplicant,this.multiplier,this.multiply,this.inputTextUnit,this.inputTextTenth, this.inputTextHundredth,this.cursorHundredth,this.cursorTenth,this.cursorUnit]);
    this.containerMachine.shake = this.plugins.get('rexshakepositionplugin').add(this.containerMachine, {
      duration: 2000,
      magnitude: 6,
      mode: 'effect'
       });

    this.inputBox1.on("pointerup",() => {  
      this.input.keyboard.enabled = true;
      entry=2;
      wrong=0;
      this.flash1 = this.plugins.get('rexflashplugin').add(this.cursorTenth, {
      duration: 700,
      repeat: 1000
      },this);
      //if(this.inputTextTenth.text.length==0)
      this.inputBox1.setTexture("typing");
      this.inputBox2.setTexture("default");
      this.inputBox3.setTexture("default");
      this.cursorTenth.setVisible(true);
      this.flash1.flash();
     },this);

     this.inputBox2.on("pointerup",() => {  
      this.input.keyboard.enabled = true;
      entry=1;
      wrong=0;
      this.flash2 = this.plugins.get('rexflashplugin').add(this.cursorUnit, {
      duration: 700,
      repeat: 1000
      },this);
      //if(this.inputText.text.length==0)
      this.inputBox2.setTexture("typing");
      this.inputBox1.setTexture("default");
      this.inputBox3.setTexture("default");
      this.cursorUnit.setVisible(true);
      this.flash2.flash();
     },this);

     this.inputBox3.on("pointerup",() => {  
      this.input.keyboard.enabled = true;
      entry=3;
      wrong=0;
      this.flash3 = this.plugins.get('rexflashplugin').add(this.cursorHundredth, {
      duration: 700,
      repeat: 1000
      },this);
      //if(this.inputText.text.length==0)
      this.inputBox3.setTexture("typing");
      this.inputBox1.setTexture("default");
      this.inputBox2.setTexture("default");
      this.cursorHundredth.setVisible(true);
      this.flash3.flash();
     },this);

    this.input.keyboard.on('keydown', function (event) {
    
    this.inputTextUnit.setFill("#2B2B2B");
    this.inputTextTenth.setFill("#2B2B2B");
    this.inputTextHundredth.setFill("#2B2B2B");

     if(entry==1) //unit place input
     {
     inputNumberUnit = parseInt(event.key);
     if(inputNumberUnit==1)
     this.inputTextUnit.x=701;
     else
     this.inputTextUnit.x=695;
     this.inputTextUnit.setText(inputNumberUnit);
     }
     
     if(entry==2) 
     {
     inputNumberTenth = parseInt(event.key);// tenth place input
     if(inputNumberTenth==1)
     this.inputTextTenth.x=637;
     else
     this.inputTextTenth.x=633;
     this.inputTextTenth.setText(inputNumberTenth);
     }

     if(entry==3) 
     {
     inputNumberHundredth = parseInt(event.key);// tenth place input
     if(inputNumberHundredth==1)
     this.inputTextHundredth.x=574;
     else
     this.inputTextHundredth.x=570;
     this.inputTextHundredth.setText(inputNumberHundredth);
     }

     },this);

     this.harvest.on(
      "pointerover",
      function (pointer) {
       this.harvest.setTexture("harvestBlack");
      },
      this
    );

    this.harvest.on(
      "pointerout",
      function (pointer) {
        this.harvest.setTexture("harvest");
      },
      this
    );

    this.harvest.on(
      "pointerdown",
      function (pointer) {

        //button click effect
        this.tweens.add({
          targets:this.harvest,
          scale:0.8,
          duration: 100,
          dealy:50,
          ease: "Power2",
          repeat: 0,
          yoyo: true,
          });

        if((this.inputTextUnit.text.length>0 && this.inputTextTenth.text.length>0) ||(this.inputTextUnit.text.length>0 && this.inputTextHundredth.text.length>0) || (this.inputTextTenth.text.length>0 && this.inputTextHundredth.text.length>0))
        {
        if(round==1)
        {
        if(this.inputTextUnit.text=="0" && this.inputTextTenth.text=="7" && this.inputTextHundredth.text=="")
        this.correctAnswerCheck();
        else
        this.wrongAnswerCheck();
        }

        if(round==2)
        {
if(this.inputTextUnit.text=="0" && this.inputTextTenth.text=="0" && this.inputTextHundredth.text=="1" )
        this.correctAnswerCheck();
        else
        this.wrongAnswerCheck();
        }

        if(round==3)
        {
if(this.inputTextUnit.text=="0" && this.inputTextTenth.text=="8" && this.inputTextHundredth.text=="7" )
        this.correctAnswerCheck();
        else
        this.wrongAnswerCheck();
        }
        }
      },this);

     }//create close

     correctAnswerCheck()
     {
       correct=1;
       this.confetti=this.add.sprite(650,255, "confetti").setDepth(1).play('confetti');
       if(round==1)
       {
         this.confetti.setDepth(2);
         this.containerMachine.setDepth(1);
       }
       if(round>=2)
       this.confetti.setDepth(4);
       
       this.inputBox1.setTexture("correct");
       this.inputBox2.setTexture("correct");
       if(round==1)
       this.inputBox3.setTexture("default");
       if(round>1)
       this.inputBox3.setTexture("correct");
       this.inputTextUnit.setFill("#149A53");
       this.inputTextTenth.setFill("#149A53");
       this.inputTextHundredth.setFill("#149A53");
       this.input.keyboard.enabled = false;
       this.inputBox1.disableInteractive();
       this.inputBox2.disableInteractive();
       this.inputBox3.disableInteractive();
       this.cursorUnit.setVisible(false);
       this.cursorTenth.setVisible(false); 
       this.cursorHundredth.setVisible(false);
       this.harvest.disableInteractive();
       this.celebrate();
     }//correctAnswerCheck close

     celebrate()
     {
      this.time.delayedCall(
        1000,
         () => { 
      //button sliding down effect     
      this.tweens.add({
        targets:this.harvest,
        y:900,
        duration: 1000,
        dealy:200,
        ease: "Linear",
        repeat: 0,
        yoyo: false,
        });
     //lever animation play
     this.lever.anims.play('lever',true);
     
     //knob sliding down effect     
      this.knobTween= this.tweens.add({
        targets:this.knob,
        x:{from: 984,to: 995},
        y:670,
        duration: 1000,
        dealy:200,
        ease: "Linear",
        repeat: 0,
        yoyo: false,
        });

      // basket move up to collect fruits on knobTween completion
      this.knobTween.on('complete',
        ()=>{  
          if(round==1)
          this.containerMachine.setDepth(2);
          if(round>1)
          {
            this.containerBasket.setDepth(1);
            this.containerMachine.setDepth(2);
            container2.setDepth(2);
          }
     this.containerBasket=this.add.container(0,0,[this.basket,this.leftHandle,this.rightHandle]).setDepth(1);
     this.containerBasket.shake = this.plugins.get('rexshakepositionplugin').add(this.containerBasket, {
            duration: 1500,
            magnitude: 3.0,
            mode: 'effect'
             });
             if(round>=2) 
            { 
            container.setDepth(1);
            container2.setDepth(4);
            this.containerBasket.setDepth(3);
            } 
           this.basketUpTween=this.tweens.add({
              targets:this.containerBasket,
              y:-180,
              duration: 700,
              dealy:200,
              ease: "Linear",
              repeat: 0,
              yoyo: false,
              });//basketUpTween 

            this.basketUpTween.on('complete',
            ()=>{ 
            if(round==1)  
             this.bulb.setVisible(true);
            if(round==2) 
            this.bulb2.setVisible(true);

            if(round==3)  
            this.bulb3.setVisible(true);
            // basket shake and tween
            this.containerBasket.shake.shake();

           /* this.tweens.add({
              targets: this.containerBasket,
              y:{from:660, to: 514},
              duration: 1500,
              ease: 'Linear',
              easeParams: [ 0.36722460687974, 0,  0.40789483866094,   1 ],
              delay: 100,
          },this);*/ //will check later
            
            if(round==1 || round==2)
            this.basketShakeTween=this.tweens.add({
              targets:this.containerBasket,
              x:{from: -35,to: 35 },
              duration: 160,
              dealy:0.5,
              ease: "Linear",
              repeat: 6,
              yoyo: true,
              });//basket tween for left right movement

            if(round==3)
            {
              //this.basket.setScale(1.04);
              this.basketShakeTween=this.tweens.add({
                targets:this.containerBasket,
                x:{from: -80,to: 80 },
                duration: 160,
                dealy:0.5,
                ease: "Linear",
                repeat: 6,
                yoyo: true,
                });//basket tween for left right movement
              }
            
            //Fruit collection animation;
               this.tree1.anims.play('shake3');
               this.tree2.anims.play('shake3');
               this.tree3.anims.play('shake3');
               this.tree4.anims.play('shake3');
               if(round==1 || round==3)
               this.tree5.anims.play('shake3');
               if(round==3)
               this.tree12.anims.play('shake3');
            this.basketShakeTween.on('complete',
              ()=>{ 
              this.containerBasket.x=0;
              },this);
              
            this.tree4.on(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY+"shake3",
                  () => {
                  this.afterCollectReset();
                  },this);   //tree5 animation complete                     

            },this);//basketUpTween complete close
        
        },this);//knobTween complete close

      },[],this);//time delay call close
      
     }//celebrate close

     afterCollectReset()
     {

     this.basketDownTween=this.tweens.add({
        targets:this.containerBasket,
        y:0,
        duration: 700,
        dealy:200,
        ease: "Linear",
        repeat: 0,
        yoyo: false,
        });//basketDownTween close

     this.basketDownTween.on('complete',
          ()=>{     
     //lever reverse animation play
     this.lever.anims.play('leverUp',true);
     
     //knob sliding up effect     
     this.knobUpTween= this.tweens.add({
        targets:this.knob,
        x:{from: 995,to: 984},
        y:630,
        duration: 1000,
        dealy:200,
        ease: "Linear",
        repeat: 0,
        yoyo: false,
        }); 
      this.knobUpTween.on('complete',
        ()=>{  
         this.scrollNew();
        },this);

      },this);
     }

     scrollNew()
     {
      round+=1;
   
      this.inputBox1.setTexture("default");
      this.inputBox2.setTexture("default");
      this.inputBox3.setTexture("default");
      //new set of trees for round 2
      if(round==2)
      {
      this.tree6=this.add.sprite(1745,255, 'shake').play('shake1');
      //this.tree6.displayHeight=625;
      this.tree7=this.add.sprite(1947,320, 'shake').play('shake2');
      this.tree8=this.add.sprite(2150,280, 'shake').play('shake2');
      this.tree8.displayHeight=570;
      this.tree9=this.add.sprite(2360,230, 'shake').setScale(1.03).play('shake1');
      this.tree9.displayHeight=585;
      }
      //new set of trees for round 3
     if(round==3)
      {
      this.tree6=this.add.sprite(1552,288, 'shake').play('shake1');
      this.tree7=this.add.sprite(1757,325, 'shake').play('shake2');
      this.tree7.displayHeight=500;
      this.tree8=this.add.sprite(1962,290, 'shake').play('shake2');
      this.tree9=this.add.sprite(2160,235, 'shake').setScale(1.09).play('shake1');
      this.tree9.displayHeight=635;
      this.tree10=this.add.sprite(2372,350, 'shake').play('shake2');
      this.tree10.displayHeight=525;
      this.tree11=this.add.sprite(2570,285, 'shake').setScale(1.05).play('shake1');
      this.tree11.displayHeight=620;
      }

    if(round==2)
    {
      container=this.add.container(0,0,[this.BG,this.tree1,this.tree2,this.tree3,this.tree4,this.tree5,this.tree6,this.tree7,this.tree8,this.tree9,this.bottom]);
    }

    if(round==3)
    {
    this.tree1.x=345;
    this.tree2.x=547;
    this.tree3.x=750;
    this.tree4.x=960;
    this.BG.x=-3595;
    this.bottom.x=-1900;
    container=this.add.container(0,0,[this.BG,this.tree1,this.tree2,this.tree3,this.tree4,this.tree6,this.tree7,this.tree8,this.tree9,this.tree10,this.tree11,this.bottom]);
    }

    container2=this.add.container(0,0,[this.basket,this.leftHandle,this.rightHandle,this.machine,this.redBulbLeft,this.redBulbRight,this.bulb,this.bulb2,this.bulb3,this.inputBox1,this.inputBox2,this.inputBox3,this.multiplicant,this.multiplier,this.multiply,this.inputTextUnit,this.inputTextTenth, this.inputTextHundredth,this.cursorHundredth,this.cursorTenth,this.cursorUnit,this.wheelPart,this.wheel,this.lever,this.knob,this.harvest]); 
    
    if(round>1)
    {
    container.setDepth(1);
    //console.log(container.getIndex(this.tree6));
    this.tree1.setDepth(1);
    this.tree2.setDepth(1);
    this.tree3.setDepth(1);
    this.tree4.setDepth(1);
    if(round==2)
    this.tree5.setDepth(1);
    this.tree6.setDepth(1);
    this.tree7.setDepth(1);
    this.tree8.setDepth(1);
    this.tree9.setDepth(1);
    this.bottom.setDepth(2);
    if(round==3)
    {
      this.tree10.setDepth(1);
      this.tree11.setDepth(1);
    }
    this.containerBasket.setDepth(3);
    container2.setDepth(4);
    this.harvest.setDepth(5);
    }

    container2.shake = this.plugins.get('rexshakepositionplugin').add(container2, {
        duration: 2000,
        magnitude: 6,
        mode: 'effect'
         });//For round-2 and 3 in place of containermachine
   
   //Tween to scroll Bg and trees
      this.scrollTween=this.tweens.add({
        targets:container,
        x:-1400,
        duration: 1500,
        dealy:250,
        ease: "Linear",
        repeat: 0,
        yoyo: false,
        });
     
      this.wind.setDepth(5);
      // Tween to rotate the wheel
      if(round<=3)  
      this.tweens.add({
          targets:this.wheel,
          angle:240,
          duration: 1250,
          dealy:250,
          ease: "Linear",
          repeat: 0,
          yoyo: false,
          }); 

      this.blurTween=this.tweens.add({
            targets:[this.multiplicant,this.multiplier,this.multiply,this.inputTextUnit,this.inputTextTenth,this.inputTextHundredth],
            alpha:0,
            duration: 1000,
            dealy:250,
            ease: "Linear",
            repeat: 0,
            yoyo: false,
            });
      //button sliding up effect 
      if(round<=3)    
      this.tweens.add({
        targets:this.harvest,
        y:650,
        duration: 1000,
        dealy:200,
        ease: "Linear",
        repeat: 0,
        yoyo: false,
        });  
       
       this.blurTween.on('complete',
        ()=>{
         if(round==2)  
         {
        this.multiplicant.text="2    5";
        this.multiplier.text="4";
         }
         if(round==3)  
         {
        this.multiplicant.x=558;
        this.multiplicant.text="1    3    0";
        this.multiplier.text="6";
         }
        this.inputTextHundredth.text="";
        this.inputTextTenth.text="";
        this.inputTextUnit.text="";
        entry=0;
        wrong=1;
        correct=0;

        this.time.delayedCall(
          350,
           () => { 
        if(round<=3)    
        this.tweens.add({
        targets:[this.multiplicant,this.multiplier,this.multiply,this.inputTextHundredth,this.inputTextTenth,this.inputTextUnit],
          alpha:1,
          duration: 1000,
          dealy:250,
          ease: "Linear",
          repeat: 0,
          yoyo: false,
          });

        //Reactivation
        this.harvest.setInteractive();
        this.inputBox1.setInteractive();
        this.inputBox2.setInteractive();
        this.inputBox3.setInteractive();
        this.tree1=this.tree6;
        this.tree2=this.tree7;
        this.tree3=this.tree8;
        this.tree4=this.tree9;
        if(round==3)
        {
        this.tree5=this.tree10;
        this.tree12=this.tree11;
        }

        //For the ending part only
        if (round==4)
        this.endCelebration();
        
        },[],this);
        },this);//blur tween oncomplete event
     }

     wrongAnswerCheck()
     { 
      if(round>1)
        container2.shake.shake();   
      if(round==1) 
      this.containerMachine.shake.shake(); 

      this.inputBox1.setTexture("wrong");
      this.inputBox2.setTexture("wrong");
      this.inputBox3.setTexture("wrong");
      this.inputTextHundredth.setFill("#C22300");
      this.inputTextUnit.setFill("#C22300");
      this.inputTextTenth.setFill("#C22300");
      this.redBulbLeft.setVisible(true);
      this.redBulbRight.setVisible(true);
      this.bulbBlinking();
      this.input.keyboard.enabled = false;
      this.inputBox1.disableInteractive();
      this.inputBox2.disableInteractive();
      this.inputBox3.disableInteractive();
      this.harvest.disableInteractive();
      wrong=1;
      this.time.delayedCall(
        2000,
         () => {
          this.inputBox1.setTexture("default");
          this.inputBox2.setTexture("default");
          this.inputBox3.setTexture("default");
          this.inputTextUnit.text="";
          this.inputTextTenth.text="";
          this.inputTextHundredth.text="";
          
          this.inputBox1.setInteractive();
          this.inputBox2.setInteractive();
          this.inputBox3.setInteractive();
          this.cursorUnit.setVisible(false);
          this.cursorTenth.setVisible(false);
          this.cursorHundredth.setVisible(false);
          this.redBulbLeft.setVisible(false);
          this.redBulbRight.setVisible(false);
          this.harvest.setInteractive();
         },[],this);
     }//wrongAnswerCheck

endCelebration()
     {
      this.overlay=this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'overlay').setDepth(6);
      this.endConfetti = this.add.sprite(config.width / 2, config.height / 2, "endConfetti").setDepth(7).play('endConfetti');
                  
      this.endConfetti.on(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY+"endConfetti",
      () => {
       this.spotlight = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, "spotlight").setDepth(8).play('spotlightOpen');
       this.yay=this.add.sprite(this.cameras.main.width / 2, (this.cameras.main.height / 2)+100, "yay").setDepth(9).setAlpha(0);  
       
       this.tweens.add({
        targets: this.yay,
        alpha: 1.0,
        delay: 250,
        duration: 1000
        });
       
  this.time.delayedCall(
          1000,
           () => { 
 this.bunchApples= this.add.sprite(this.cameras.main.width / 2, (this.cameras.main.height / 2)-70, "bunchApples").setDepth(9).setAlpha(0);   

 this.tweens.add({
  targets: this.bunchApples,
  alpha: 1.0,
  delay: 250,
  duration: 1000
  });
 
 this.distribute= this.add.sprite(this.cameras.main.width / 2, (this.cameras.main.height / 2)+200, "distribute").setDepth(9).setAlpha(0).setInteractive({cursor:'pointer'}); 

 this.tweens.add({
  targets: this.distribute,
  alpha: 1.0,
  delay: 250,
  duration: 1000
  });

  this.distribute.on(
    "pointerover",
    function (pointer) {
     this.distribute.setTexture("distributeBlack");
    },this);

  this.distribute.on(
    "pointerout",
    function (pointer) {
      this.distribute.setTexture("distribute");
    },this );

  this.distribute.on(
    "pointerdown",
    function (pointer) {
    //For pointer down 2nd level to be started i.e division
   },this );
},[],this);
},this);//endconfetti animation completion event

}//endCelebration close
    
  bulbBlinking()
  {
    /*this.lights.enable().setAmbientColor(0xFF3131);

    var hsv = Phaser.Display.Color.HSVColorWheel();

    var radius = 100;
    var intensity = 6;
    var x = radius;
    var y = 0;

    var color = hsv[10].color;

    var light = this.lights.addLight(509, y, radius, color, intensity);*/
     this.tweens.add({
        targets: [this.redBulbLeft,this.redBulbRight],
        delay:15,
        alpha: { from: 0, to: 1},
        ease: 'Cubic',       // 'Cubic', 'Elastic', 'Bounce', 'Back' ,'Sine.easeOut',
        duration: 250,
        repeat: -1,            // -1: infinity
        yoyo: true
      });
   }
   update()
     {
      if(wrong==0)
      {
      if(this.inputTextUnit.text.length>0 || entry==2 || entry==3)
       this.cursorUnit.setVisible(false);
     
      if(this.inputTextTenth.text.length>0 || entry==1 || entry==3)
       this.cursorTenth.setVisible(false); 
      
      if(this.inputTextHundredth.text.length>0 || entry==2 || entry==1)
        this.cursorHundredth.setVisible(false);
      }
      
      if(wrong==1 || correct==1)
        {
          this.cursorUnit.setVisible(false);
          this.cursorTenth.setVisible(false); 
          this.cursorHundredth.setVisible(false);
        }

     }
    }