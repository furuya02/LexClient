//***************************************** */
//  class Converter
//  データ変換
//***************************************** */

class Converter {
    // サンプルレートを下げる
    static downRate(buffer, fromRate, toRate) {
        const rate = fromRate / toRate;
        const result = new Float32Array(Math.round(buffer.length / rate));
        let offsetResult = 0;
        let offsetBuffer = 0;
        while (offsetResult < result.length) {
          let nextOffsetBuffer = Math.round((offsetResult + 1) * rate);
          let accum = 0;
          let count = 0;
          for (var i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
            accum += buffer[i];
            count++;
          }
          result[offsetResult] = accum / count;
          offsetResult++;
          offsetBuffer = nextOffsetBuffer;
        }
        return result;
      }
    

    // WAVファイルの生成
    static createWav(samples, sampleRate) {
        const view = new DataView(new ArrayBuffer(44 + samples.length * 2));
    
        this._writeString(view, 0, 'RIFF');
        view.setUint32(4, 32 + samples.length * 2, true);
        this._writeString(view, 8, 'WAVE');
        this._writeString(view, 12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, 1, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * 2, true);
        view.setUint16(32, 2, true);
        view.setUint16(34, 16, true);
        this._writeString(view, 36, 'data');
        view.setUint32(40, samples.length * 2, true);
        let offset = 44;
        for (var i = 0; i < samples.length; i++, offset += 2) {
            const s = Math.max(-1, Math.min(1, samples[i]));
            view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
        }
        return view;
    }
    
    static _writeString(view, offset, string) {
        for (var i = 0; i < string.length; i++) {
          view.setUint8(offset + i, string.charCodeAt(i));
        }
    }
}