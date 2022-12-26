
class LoadingScene extends Phaser.Scene {
    constructor() {
      super({
        key: "LoadingScene",
      });
    }
    preload()
    { 
      this.load.atlas("load", "assets/loadAnims/loadAnim.png", "assets/loadAnims/loadAnim.json");
      this.load.atlas("load2", "assets/loadAnims/loadAnim2.png", "assets/loadAnims/loadAnim2.json");
    }

    gameAssetsLoad()
    {   //StartScene assets
        this.load.image("BG", "assets/StartScene/BG.png");
        this.load.image("play", "assets/StartScene/play.png");
        this.load.image("playBlack", "assets/StartScene/playBlack.png");
        
        //GameScene Assets
        this.load.image("BG2", "assets/GameScene/BG.png"); 
        this.load.image("projector", "assets/GameScene/projector.png"); 
        this.load.image("knob", "assets/GameScene/knob.png"); 
        this.load.image("yellowDot", "assets/GameScene/yellowDot.png");
        this.load.image("greenDot", "assets/GameScene/greenDot.png"); 
        this.load.image("redDot", "assets/GameScene/redDot.png"); 
        this.load.image("correctGreen", "assets/GameScene/correctGreen.png"); 
        this.load.image("glow1", "assets/GameScene/glow1.png"); 
        this.load.image("glow2", "assets/GameScene/glow2.png"); 
        this.load.image("glow3", "assets/GameScene/glow3.png"); 
        this.load.image("greenGlow1", "assets/GameScene/greenGlow1.png"); 
        this.load.image("greenGlow2", "assets/GameScene/greenGlow2.png"); 
        this.load.image("greenGlow3", "assets/GameScene/greenGlow3.png"); 
        this.load.image("redGlow1", "assets/GameScene/redGlow1.png"); 
        this.load.image("redGlow2", "assets/GameScene/redGlow2.png"); 
        this.load.image("redGlow3", "assets/GameScene/redGlow3.png"); 
        this.load.image("graph", "assets/GameScene/graph.png"); 
        this.load.image("ore1", "assets/GameScene/ore1.png"); 
        this.load.image("ore2", "assets/GameScene/ore2.png"); 
        this.load.image("ore3", "assets/GameScene/ore3.png"); 
        this.load.image("ore4", "assets/GameScene/ore4.png"); 
        this.load.image("ore5", "assets/GameScene/ore5.png"); 
        this.load.image("ore6", "assets/GameScene/ore6.png"); 
        this.load.image("ore7", "assets/GameScene/ore7.png"); 
        this.load.image("ore8", "assets/GameScene/ore8.png"); 
        this.load.image("ore9", "assets/GameScene/ore9.png"); 
        this.load.image("oreBar", "assets/GameScene/oreBar.png"); 
        this.load.image("speechBubble1", "assets/GameScene/speechBubble1.png"); 
        this.load.image("speechBubble2", "assets/GameScene/speechBubble2.png");
        this.load.image("speechBubble3", "assets/GameScene/speechBubble3.png");
        this.load.image("speechBubble4", "assets/GameScene/speechBubble4.png");
        this.load.image("speechBubble5", "assets/GameScene/speechBubble5.png");
        this.load.image("speechBubble6", "assets/GameScene/speechBubble6.png");
        this.load.image("speechBubble7", "assets/GameScene/speechBubble7.png");
        this.load.image("speechBubble8", "assets/GameScene/speechBubble8.png");
        this.load.image("speechBubble9", "assets/GameScene/speechBubble9.png");
        this.load.image("white", "assets/GameScene/whiteDot.png");
        this.load.image("collect", "assets/GameScene/collect.png");
        this.load.image("collectBlack", "assets/GameScene/collectBlack.png");
        this.load.image("bar2", "assets/GameScene/bar2.png");
       //this.load.image("topBar", "assets/GameScene/topBar.png");
        this.load.image("top", "assets/GameScene/top2.png");
        this.load.image("glare1", "assets/GameScene/glare1.png");
        this.load.image("glare2", "assets/GameScene/glare2.png");
        this.load.image("grey1", "assets/GameScene/grey1.png");
        this.load.image("grey2", "assets/GameScene/grey2.png");
        this.load.image("redIncorrect", "assets/GameScene/redIncorrect.png");
        this.load.image("wrongText", "assets/GameScene/wrongText.png");
    }
  animsLoad()
    {  
  this.load.atlas("shovel","assets/GameScene/Shovel Animation/shovelCorrectAnim.png",
  "assets/GameScene/Shovel Animation/shovelCorrectAnim.json");
  this.load.atlas("wrongShovel","assets/GameScene/Shovel Animation/shovelIncorrectAnim.png",
  "assets/GameScene/Shovel Animation/shovelIncorrectAnim.json");
  this.load.atlas("oreCollect","assets/GameScene/Ore collect anim/oresCollectCartAnim.png",
  "assets/GameScene/Ore collect anim/oresCollectCartAnim.json");
  this.load.multiatlas("characterAnim","assets/StartScene/CharacterAnim/miningCharacterAnimStart.json",
  "assets/StartScene/CharacterAnim");
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
   this.animsLoad();
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
           this.scene.start("StartScene");
           // this.scene.start("GameScene");
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