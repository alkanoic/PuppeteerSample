# PuppeteerSample
Puppeteerを使った自分得なSampleまとめ  
Basic認証や認証Proxyがある環境でのE2EテストをするためのSampleがメイン  
使用するライブラリは以下の通り  

|ライブラリ|備考|
|----|----|
|puppeteer|E2Eテスト用| 
|config|環境変更用| 
|log4js|ログ出力用| 
|cross-env|環境変数変更用| 
|make-dir|フォルダ作成用| 

npmの認証プロキシ設定  
``` PowerShell
npm config -g get proxy http://proxyAddress:portNo
npm config -g get https-proxy http://proxyAddress:portNo
```

依存ライブラリのインストール
``` PowerShell
npm install
```

production環境で実行
``` PowerShell
npm start
```

development環境で実行
``` PowerShell
npm run dev-start
```

Sampleの切り替えはpackage.jsonのscriptsの指定ファイルを変更する。  
または、以下のコマンドでファイル名を指定し、実行する。
``` PowerShell
cross-env NODE_ENV={production or development} node {sampleファイル名}
```

## configについて
configフォルダに基本的な設定値を格納  

|項目名|内容|
|----|----|
|windowSize|ウインドウのサイズ| 
|windowPosition|ヘッドレスモードでないときの表示位置| 
|headless|ヘッドレスモード有効| 
|slowMo|入力遅延 ヘッドレスモードでないときに使用する| 
|timeout|タイムアウトの秒数[msec]0の時タイムアウト無効| 

## sample1.js
googleのurlに遷移し、puppeteerを検索し、スクリーンショットを取得する  
スクリーンショットはimagesフォルダに保存されます

## sample2.js
gotoUrlListのurlを順次アクセスし、スクリーンショットをfileに保存する

## sample3.js
googleのurlに遷移し、puppeteerを検索し、最初のページに表示されるページにアクセスし、スクリーンショットを取得する

