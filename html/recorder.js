//***************************************** */
//  class Recorder
//
//  マイクからの録音
//  サンプルレートは、デバイス固有であり、変更できない
//***************************************** */

class Buffers {
  constructor(){
    this.clear();
  }

  clear() {
    this._buffers = [];
    this._len = 0;
  }

  append (buffer) {
    this._buffers.push(new Float32Array(buffer));
    this._len += buffer.length;
  }

  getData() {
    const buffer = new Float32Array(this._len);
    let offset = 0;
    this._buffers.forEach(buf =>{
      buffer.set(buf, offset);
      offset += buf.length;
    })
    return buffer;
  }
}

class Recorder {

  constructor(){
    this._buffers = new Buffers();
  }

  get sampleRate() {
    return this._source.context.sampleRate;
  }

  async init() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    this._context = new AudioContext();
    this._source = this._context.createMediaStreamSource(stream);
    this._recorder = this._context.createScriptProcessor(4096, 1, 1);
    
    this._recorder.onaudioprocess = ( e => {
      const sample = e.inputBuffer.getChannelData(0);
      this._buffers.append(sample);
     this.onData(sample);// 入力イベントハンドラ

    });
  }
  
  start() {
    this._buffers.clear();
    this._source.connect(this._recorder);
    this._recorder.connect(this._context.destination);
    this.onStart();// 録音開始イベントハンドラ
  };

  stop() {
    this._recorder.disconnect(this._context.destination);
    this._source.disconnect(this._recorder);
    this.onStop(this._buffers.getData());// 録音終了イベントハンドラ
  };
}