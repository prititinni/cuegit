
class LoadingScene extends Phaser.Scene {
    constructor() {
      super({
        key: "LoadingScene",
      });
    }
    preload()
    { //audio
      this.load.atlas("load", "assets/loadAnims/loadAnim.png", "assets/loadAnims/loadAnim.json");
      this.load.atlas("load2", "assets/loadAnims/loadAnim2.png", "assets/loadAnims/loadAnim2.json");
     
    }

    gameAssetsLoad()
    {   //StartScene assets
        this.load.image("BG", "assets/StartScene/BG.png");
        this.load.image("bottom1", "assets/StartScene/bottom1.png");
        this.load.image("bottom2", "assets/StartScene/bottom2.png");
        this.load.image("cloud", "assets/StartScene/cloud.png");
        this.load.image("play", "assets/StartScene/play.png");
        this.load.image("playBlack", "assets/StartScene/playBlack.png");
        this.load.multiatlas("frontTree", "assets/G5 Prereq Game Anims/Start Scene Anims/treesFrontAnim.json", "assets/G5 Prereq Game Anims/Start Scene Anims");
        this.load.multiatlas("backTree", "assets/G5 Prereq Game Anims/Start Scene Anims/treesBackAnim.json", "assets/G5 Prereq Game Anims/Start Scene Anims");
        this.load.multiatlas("birdFly", "assets/G5 Prereq Game Anims/Start Scene Anims/birdAnim.json", "assets/G5 Prereq Game Anims/Start Scene Anims");
        this.load.multiatlas("truckDrive", "assets/G5 Prereq Game Anims/Start Scene Anims/truckDriveAnim.json", "assets/G5 Prereq Game Anims/Start Scene Anims");
  
        //GameScene assets
        this.load.image("BG2", "assets/GameScene/newBG2.png");
        this.load.image("bottom", "assets/GameScene/newBottom3.png");
        //this.load.image("fakeBottom", "assets/GameScene/fakeBottom.png");
        this.load.image("machine", "assets/GameScene/machine.png");
        this.load.image("basket", "assets/GameScene/basket.png");
        this.load.image("leftHandle", "assets/GameScene/leftHandle.png");
        this.load.image("rightHandle", "assets/GameScene/rightHandle.png");
        this.load.image("default", "assets/GameScene/inputDefault.png");
        this.load.image("typing", "assets/GameScene/inputTyping.png");
        this.load.image("correct", "assets/GameScene/inputCorrect.png");
        this.load.image("wrong", "assets/GameScene/inputWrong.png");
        this.load.image("cursor", "assets/GameScene/cursor.png");
        this.load.image("harvest", "assets/GameScene/harvest.png");
        this.load.image("harvestBlack", "assets/GameScene/harvestBlack.png");
        this.load.image("wheel", "assets/GameScene/wheel.png");
        this.load.image("wheelPart", "assets/GameScene/wheelPart.png");
        this.load.image("knob", "assets/GameScene/knob.png");
        this.load.image("bulb", "assets/GameScene/bulb.png");
        this.load.image("redBulb", "assets/GameScene/redBulb.png");
        this.load.image("overlay", "assets/GameScene/overlay.png");
        this.load.image("yay", "assets/GameScene/yay.png");
        this.load.image("distribute", "assets/GameScene/distribute.png");
        this.load.image("distributeBlack", "assets/GameScene/distributeBlack2.png");
        this.load.image("bunchApples", "assets/GameScene/bunchApples.png");
        this.load.multiatlas("wind", "assets/G5 Prereq Game Anims/Game Scene Anims/windLeavesAnim.json", "assets/G5 Prereq Game Anims/Game Scene Anims");
        this.load.multiatlas("shake", "assets/G5 Prereq Game Anims/Game Scene Anims/treeShake.json", "assets/G5 Prereq Game Anims/Game Scene Anims");
        this.load.multiatlas("lever", "assets/G5 Prereq Game Anims/Game Scene Anims/leverAnim.json", "assets/G5 Prereq Game Anims/Game Scene Anims");
        this.load.atlas("confetti","assets/GameScene/confettiAnim.png","assets/GameScene/confettiAnim.json");
        this.load.multiatlas("endConfetti", "assets/confetti/confettiAnimNew.json", "assets/confetti");
        this.load.multiatlas("spotlight", "assets/spotlight/spotlightAnimNew.json", "assets/spotlight"); 
    } 

    create()
    {
    this.loadAnim = this.add.sprite(config.width / 2, config.height / 2, "load").setScale(0.25);
    this.loadAnim2 = this.add.sprite(config.width / 2, config.height / 2, "load2").setVisible(false).setScale(0.5);

    //cuerocket animation-1
    this.anims.create({
      key: "loading",
      frames: this.anims.generateFrameNames("load", {
        start: 0,
        end: 8,
        zeroPad: 0,
        prefix: "LOAD",
        suffix: ".png",
      }),
      frameRate: 30,
      repeat: -1,
    });
   
     //cuerocket animation-2
    this.anims.create({
      key: "loading2",
      frames: this.anims.generateFrameNames("load2", {
        start: 9,
        end: 40,
        zeroPad: 0,
        prefix: "LOAD",
        suffix: ".png",
      }),
      frameRate: 20,
      repeat: 0,
    });

    this.gameAssetsLoad();
    this.load.start();

    this.load.on(
      "progress",
      function (value) {
        this.loadAnim.play("loading");
      },
      this
    );

    this.load.on(
      "complete",
      function () {
        console.log("complete");
        this.loadAnim.destroy();//not reusaable
        this.loadAnim2.setVisible(true).play("loading2");
        this.loadAnim2.on(
          Phaser.Animations.Events.ANIMATION_COMPLETE,
          function () {
            this.scene.stop("LoadingScene");
            //this.scene.start("StartScene");
            this.scene.start("GameScene");
          },
          this
        );
      },
      this
    );  
    }
    update()
    {}

}