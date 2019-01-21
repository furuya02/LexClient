//  無音の検出（単なるカウンター）--未使用--
class SilenceDetection {
    
    constructor(max) {
        this.max = max; 
        this.counter = 0;
    }

    // 初期化時に-1をセットする
    clear() {
        this.counter = -1;
    }

    // カウンターの初期化
    restart() {
        this.counter = 0;
    }
    
    // カウンターが最大値に達したどうか？
    isFinish() { 
        if(0 <= this.counter) { // start()が呼ばれるまでカウントしない
            this.counter++;
            if(this.max < this.counter){
                return true;
            }
        }
        return false;
    }

}