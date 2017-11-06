# 20dainomi_5

このリポジトリは2017/11/03に`第5回20代飲み`で行ったアイスブレイクイベント「金の正解ぎんの正解」で利用した、通貨管理用アプリケーションのコード格納先です。

GoogleFirebaseを利用し、リアルタイムでのお金の同期処理を実装しています。

基本的に作った本人しか利用想定がないため、他の方がcloneしても何もできないと思いますが何かの参考になれば幸いです。

## データベース

現在writeをfalseとしているため、アプリ上で金額の更新を行ってもDBは更新されません。

## url

* https://my-apps-9b366.firebaseapp.com/all.html
* https://my-apps-9b366.firebaseapp.com/master_team1.html
* https://my-apps-9b366.firebaseapp.com/master_team2.html
* https://my-apps-9b366.firebaseapp.com/master_team3.html
* https://my-apps-9b366.firebaseapp.com/master_team4.html
* https://my-apps-9b366.firebaseapp.com/master_team5.html
* https://my-apps-9b366.firebaseapp.com/master_team6.html
* https://my-apps-9b366.firebaseapp.com/master_team7.html
* https://my-apps-9b366.firebaseapp.com/master_team8.html
* https://my-apps-9b366.firebaseapp.com/master_team9.html
* https://my-apps-9b366.firebaseapp.com/master_team10.html

## Deploy

```
$ firebase deploy
```
