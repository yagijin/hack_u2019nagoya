var googlehome = require('google-home-notifier');
var language = 'ja';

googlehome.device('テスト', language);
googlehome.ip('192.168.7.146');// IPアドレスは自分の環境のGoogleHomeの設定に合わせてください

var text = 'ママが帰ってきたよ。早くズボンを履いて。';

try {
        googlehome.notify(text, function (notifyRes) {
                console.log(notifyRes);
        });
} catch (err) {
        console.log(err);
}