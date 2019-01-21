// 表示色の指定
const offColor = '#000080'; // 停止中
const onColor = '#0000CC'; // 起動中
const gradationBright = '#00FFFF'; // グラデーションの明るい方
const gradationDark = '#0000AA'; // グラデーションの暗い方

class RingLight {

    // コンストラクタ
    //
    // <canvas id="canvas" width=300 height=20 />
    // new RingLight($('#canva1'))
    //
    constructor(canvas){

      this.ctx = canvas[0].getContext('2d');

      this.width = canvas.width();
      this.height = canvas.height();

      this.grad  = this.ctx.createLinearGradient(0, 0, this.width, 0);
      this.grad.addColorStop(0, gradationDark);  
      this.grad.addColorStop(0.5, gradationBright);    
      this.grad.addColorStop(1, gradationDark);  

      this.stop();
    }

    _strokeText(color) {
      this.ctx.font = "18px 'ＭＳ Ｐゴシック'";
      this.ctx.strokeStyle = color;
      this.ctx.strokeText("Please speak while pushing here", 50, 50);
    }

    // 停止状態にする
    stop() {
      this.ctx.fillStyle = offColor;
      this.ctx.fillRect(0, 0, this.width, this.height);
      this._strokeText('yellow');
    }

    // 起動状態にする
    start() {
      this.ctx.fillStyle = onColor; 
      this.ctx.fillRect(0, 0, this.width, this.height);
      this._strokeText('silver');
    }

    // レベルを表示する
    level(sample) {
      let max = Math.max.apply(null, sample); // サンプル中の最大値を取得
      let volume = Math.round((max) * this.width); // 適合化
      this.start();
      this.ctx.beginPath();
      this.ctx.fillStyle = this.grad;
      this.ctx.rect(this.width/2, 0, volume, this.height);
      this.ctx.rect(this.width/2, 0, -1 * volume, this.height);
      this.ctx.fill();
      this._strokeText('silver');
    }
}
