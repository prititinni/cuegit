var cam;

class StartScene extends Phaser.Scene {
  
  constructor() {
    super({
      key: "StartScene",
    });
  }

  preload()
   {     }

   create()
   {
    cam = this.cameras.main;
    this.BG=this.add.image(0,0 , 'BG').setOrigin(0,0);
    this.play=this.add.image(527.85,268.56,'play').setInteractive({cursor:"pointer"}).setOrigin(0,0).setAlpha(0);
    this.tweens.add({
      targets: this.play,
      delay:100,
      alpha: { from: 0, to: 1},
      ease: 'Power1',       // 'Cubic', 'Elastic', 'Bounce', 'Back' ,'Sine.easeOut',
      duration: 300,
      repeat: 0,            // -1: infinity
      yoyo: false
    });

    this.anims.create({
      key: "characterAnim",
      frames: this.anims.generateFrameNames("characterAnim", {
        start: 0,
        end: 60,
        zeroPad: 0,
        prefix: "miningCharacterStart",
        suffix: ".png",
      }),
      frameRate: 30,
      repeat: 0,
    });
   
    this.anims.create({
      key: "characterAnim2",
      frames: this.anims.generateFrameNames("characterAnim", {
        start: 61,
        end: 151,
        zeroPad: 0,
        prefix: "miningCharacterStart",
        suffix: ".png",
      }),
      frameRate: 30,
      repeat: 0,
    });

    this.characterAnim=this.add.sprite(650,360, "characterAnim").play('characterAnim');

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
      this.characterAnim.destroy();
      this.characterAnim2=this.add.sprite(650,360, "characterAnim").play('characterAnim2');
      this.characterAnim2.on(Phaser.Animations.Events.ANIMATION_COMPLETE,
        () => { 
          cam.fadeOut(500, 255, 255, 255);
        },this);
      cam.once('camerafadeoutcomplete', function (camera) {
        this.scene.start("GameScene");

       },this); //cam event
     },this); //play event
    }
 update() 
  {}
}


