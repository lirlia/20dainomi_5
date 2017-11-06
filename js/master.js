$(function() {
  firebase.initializeApp({databaseURL: "https://my-apps-9b366.firebaseio.com"});
  database = firebase.database();
  team = location.pathname.replace(/.*team(.*)\.html/g,'$1');

  prepare()
  my_firebase()

  _touch = ('ontouchstart' in document) ? 'touchstart' : 'click';

  //ツールタブをクリックした時の処理
  $('.tool').on(_touch, function() {

    //色の選択の処理
    $(this).addClass('back_blue')
    $('.tool').not($(this)).removeClass('back_blue')
    $('.tool').not($(this)).addClass('back_gray')
    $(this).removeClass('back_gray')

    // tabクリック
    // ガチャクリック時
    if ($(this).hasClass('gacha_tool')) {
      $(".gacha").show()
      $(".exchange").hide()
      $(".item").hide()
      $(".calulate").hide()
    }
    // 換金クリック時
    if ($(this).hasClass('exchange_tool')) {
      $(".gacha").hide()
      $(".exchange").show()
      $(".item").hide()
      $(".calulate").hide()
    }
    // 換金クリック時
    if ($(this).hasClass('item_tool')) {
      $(".gacha").hide()
      $(".exchange").hide()
      $(".item").show()
      $(".calulate").hide()
    }
    // 電卓クリック時
    if ($(this).hasClass('calulate_tool')) {
      $(".gacha").hide()
      $(".exchange").hide()
      $(".item").hide()
      $(".calulate").show()
    }
  })

  // 初期処理
  function prepare() {
    $(".select_area").text("チーム" + team)
    $(".exchange").hide()
    $(".item").hide()
    $(".calulate").hide()
  }

});


// firebase
function my_firebase() {

  ref = database.ref('transaction/' + team + '/money_amount');
  ref_log = database.ref('transaction/' + team + '/log');

  // ゲームの基本的な情報を取得
  def = database.ref('transaction/default');

  //初期読み込み & pushイベント検知
  ref.on("value", function(snapshot) {
    $(".current_money").text(addComma(snapshot.val()));
  });

  ref_log.on("child_added", function(snapshot) {
      priceHistory({
        id: snapshot.key,
        value: snapshot.val()
      });
  });

  //初期設定(各アイテムの価格)の読み込み
  def.once("value", function(def_data) {
    gacha_price_list = def_data.val().gacha
    exchange_price_list = def_data.val().mission
    item_price_list = def_data.val().item
  });

};

//購買履歴
function priceHistory(log){
  var last_message = "dummy"
  var price = log.value.value
  var message = log.value.message

  if ( price > 0) {
    message_html = '<p class="post-text">' + message +'</p><p><span class="font_blue">+' + addComma(price) + 'G</span></p>';
  } else {
    message_html = '<p class="post-text">' + message +'</p><p><span class="font_red">' + addComma(price) + 'G</span></p>';
  }

  date_html = '';
  if(log.value.date) {
    date_html = '<p class="post-date">' + new Date(log.value.date).toLocaleString() +'</p>';
  }

  $('.' + last_message).after('<div class="' + log.id + ' post">' + message_html + date_html +'</div>');
  last_message = log.id;
}
