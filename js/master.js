$(function() {
  firebase.initializeApp({databaseURL: "https://my-apps-9b366.firebaseio.com"});
  database = firebase.database();

  // ガチャのレベルアップ設定
  gacha_level1 = 8;
  gacha_level2 = 5;

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
      $(".calc_ope").show()
      $(".calulate").hide()
      $(".select_area").show()
      $(".multi_select_area").hide()
    }
    // 換金クリック時
    if ($(this).hasClass('exchange_tool')) {
      $(".gacha").hide()
      $(".exchange").show()
      $(".calc_ope").show()
      $(".calulate").hide()
      $(".select_area").show()
      $(".multi_select_area").hide()
    }
    // 電卓クリック時
    if ($(this).hasClass('calulate_tool')) {
      $(".gacha").hide()
      $(".exchange").hide()
      $(".calc_ope").show()
      $(".calulate").show()
      $(".select_area").show()
      $(".multi_select_area").hide()
    }

    // 交渉クリック時
    if ($(this).hasClass('nego_tool')) {
      $(".gacha").hide()
      $(".exchange").hide()
      $(".calc_ope").hide()
      $(".calulate").show()
      $(".select_area").hide()
      $(".multi_select_area").show()
    }
  })

  //チーム番号をクリックした時の処理
  $('.team').on(_touch, function() {

    //色の選択の処理
    $(this).addClass('back_blue')
    $('.team').not($(this)).removeClass('back_blue')
    $('.team').not($(this)).addClass('back_gray')
    $(this).removeClass('back_gray')
    my_firebase()
  })

  // 初期処理
  function prepare() {
    $(".exchange").hide()
    $(".calulate").hide()
    $(".multi_select_area").hide()
  }

  // スクロール禁止
  $(window).on('touchmove.noScroll', function(e) {
      e.preventDefault();
  });

/*
  //電卓キーのタイプのエフェクト
  var linkTouchStart = function(){
    thisAnchor = $(this);
    touchPos = thisAnchor.offset().top;
    moveCheck = function(){
        nowPos = thisAnchor.offset().top;
        if(touchPos == nowPos){
            thisAnchor.addClass("hover");
        }
    }
    setTimeout(moveCheck,10);
    }
    var linkTouchEnd = function(){
        thisAnchor = $(this);
        hoverRemove = function(){
            thisAnchor.removeClass("hover");
        }
        setTimeout(hoverRemove,10);
    }

    $(document).on('touchstart mousedown','.calc_key',linkTouchStart);
    $(document).on('touchend mouseup','.calc_key',linkTouchEnd);
*/
});

// firebase
function my_firebase() {

  team = $('.team.back_blue').text()
  if (team == '') { team = 'default' }

  ref = database.ref('transaction/' + team + '/money_amount');
  ref_data = database.ref('transaction/' + team + '/data');
  ref_log = database.ref('transaction/' + team + '/log');
  def = database.ref('transaction/default');

  //初期読み込み & pushイベント検知
  ref.on("value", function(snapshot) {
    $(".current_money").text(addComma(snapshot.val()));
  });

  //初期設定の読み込み
  def.once("value", function(def_data) {
    gacha_price_list = def_data.val().gacha
    exchange_price_list = def_data.val().mission
    mission_bonus = def_data.val().mission_ss_bonus
  });

  //ガチャの解禁状態を操作
  ref_data.on("value", function(data) {
    my_data = data.val()

    // 1つ目（fとeランク）
    if ((my_data.f + my_data.e) >= gacha_level1 && $(".gacha_key").eq(1).text() == "未解禁") {
      $(".gacha_key").eq(1).text("ガチャ(銀)")
    } else {
      $(".gacha_key").eq(1).text("未解禁")
    }
    // 1つ目（dとcランク）
    if ((my_data.d + my_data.c) >= gacha_level2 && $(".gacha_key").eq(2).text() == "未解禁") {
      $(".gacha_key").eq(2).text("ガチャ(金)")
    } else {
      $(".gacha_key").eq(2).text("未解禁")
    }
  });

};
