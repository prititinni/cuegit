var cam,complete=0;

class StartScene extends Phaser.Scene {
  
  constructor() {
    super({
      key: "StartScene",
    });
  }

  preload()
   { 
   }

   create()
  {
    this.BG=this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 , 'BG');
    this.play=this.add.image(640, 500,'play').setInteractive({ cursor: "pointer" });
    this.cloud=this.add.image(1400, 200,'cloud');

    //cloud tween movement
    this.tweens.add({
     targets:this.cloud,
     x:-200,
     duration: 90000,
     dealy:20000,
     ease: "Power1",
     repeat: -1,
     yoyo: true,
     });

     //Front tree animation
     this.anims.create({
      key: 'frontTree',
      frames: this.anims.generateFrameNames('frontTree', {
          start: 0,
          end: 140,
          zeroPad: 0,
          prefix: 'trees_front',
          suffix: '.png'
      }),
      frameRate: 25,
      repeat: -1
      });


     //Back tree animation
     this.anims.create({
      key: 'backTree',
      frames: this.anims.generateFrameNames('backTree', {
          start: 0,
          end: 140,
          zeroPad: 0,
          prefix: 'trees_back',
          suffix: '.png'
      }),
      frameRate: 25,
      repeat: -1
      });

    //Bird Fly animation
     this.anims.create({
      key: 'birdFly',
      frames: this.anims.generateFrameNames('birdFly', {
          start: 0,
          end: 369,
          zeroPad: 0,
          prefix: 'birdsAnim',
          suffix: '.png'
      }),
      frameRate: 20,
      repeat: 0
      });

    //Truck movement animation
     this.anims.create({
      key: 'truckDrive',
      frames: this.anims.generateFrameNames('truckDrive', {
          start: 0,
          end: 163,
          zeroPad: 0,
          prefix: 'truckDrive',
          suffix: '.png'
      }),
      frameRate: 15,
      repeat: 0
      });

      this.birdFly=this.add.sprite(650, 400, "birdFly").play('birdFly');
      this.backTree=this.add.sprite(640, 360, "backTree").play('backTree');
      this.bottom1=this.add.image(640,600, 'bottom1');
      this.frontTree=this.add.sprite(640, 355, "frontTree").play('frontTree');
      this.truckDrive=this.add.sprite(760, 334, "truckDrive").play('truckDrive');
      this.bottom2=this.add.image(640,643, 'bottom2');
      this.truckDrive.on(Phaser.Animations.Events.ANIMATION_COMPLETE,()=>{
       complete=1;
      },this);
     
      cam = this.cameras.main;

      this.play.on(
        "pointerover",
        function (pointer) {
         this.play.setTexture("playBlack");
        },
        this
      );

      this.play.on(
        "pointerout",
        function (pointer) {
          this.play.setTexture("play");
        },
        this
      );

      this.play.on(
        "pointerdown",
        function (pointer) {
        
        this.play.setVisible(false);
        this.scale.startFullscreen();
        
        if(complete==0)
        {
         //console.log("hi1");
         this.tweens.add({
          targets: this.truckDrive.anims,
          timeScale: { from: 0.5, to: 2.8 },
          //ease: 'Sine.inOut',
          ease:"Sine.easeInOut",
          yoyo: false,
          repeat: 0,
          delay: 2,
          duraton: 40,
          });
         
          this.truckDrive.on(Phaser.Animations.Events.ANIMATION_COMPLETE,()=>{
            this.sceneChange();

          },this);//animation complete
        }

       if(complete==1)
        { 
         // console.log("hi2");
          this.sceneChange();
        }
       },this);//play event
       }

       sceneChange()
       {
        cam.fadeOut(500, 255, 255, 255);
        cam.once('camerafadeoutcomplete', function (camera) {
         this.scene.start("GameScene");
        //this.scene.stop("StartScene");
         },this);//camera
       }
 update() 
  {}

}


