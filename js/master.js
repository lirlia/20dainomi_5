$(function() {

  var _touch = ('ontouchstart' in document) ? 'touchstart' : 'click';

  //チーム番号をクリックした時の処理
  $('.team').on(_touch, function() {

    //色の選択の処理
    $(this).addClass('back_blue')
    $('.team').not($(this)).removeClass('back_blue')
    $('.team').not($(this)).addClass('back_gray')
    $(this).removeClass('back_gray')
  })

  //電卓の四則演算をクリックした時の処理
  $('.ope_key').on(_touch, function() {

    //色の選択の処理
    $(this).addClass('back_red')
    $('.ope_key').not($(this)).removeClass('back_red')
    $('.ope_key').not($(this)).addClass('back_gray')
    $(this).removeClass('back_gray')

    //四則演算の反映
    $('.calulate_operation').text($(this).text());
  })

  //電卓の数字をクリックした時の処理
  $('.number').on(_touch, function() {
    amount = removeComma($('.calulate_amount').text()) + $(this).text()
    amount = amount.replace('　','')
    amount = addComma(amount)
    if (amount.length < 22) {
      //数字の反映
      $('.calulate_amount').text(amount);
    }
  })

  //電卓のクリアをクリックした時の処理
  $('.clear').on(_touch, function() {
    //クリア
    $('.calulate_amount').text('　');
  })

  //送信をクリックした時の処理
  $('.submit').on(_touch, function() {

    //チームが未チェック
    if (!$('.select_area').children().hasClass('back_blue')) {
      alert('チーム名を選択してください')
      return
    }
    //四則演算が未チェック
    if ($('.calulate_operation').text() == '　') {
      alert('四則演算を選択してください')
      return
    }
    //数値が未入力
    if ($('.calulate_amount').text() == '　') {
      alert('数値を入力してください')
      return
    }
    //処理
    postAction()
    $('.team').removeClass('back_blue')
    $('.team').addClass('back_gray')
    $('.ope_key').removeClass('back_red')
    $('.ope_key').addClass('back_gray')
    $('.calulate_operation').text('　')
    $('.calulate_amount').text('　')
  })

  //数値の,区切り
  function addComma(num){
      return String(num).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
  }

  //数値の,外し
  function removeComma(num){
    return num.replace(/,/g, '');
  }

  // firebase
  firebase.initializeApp({databaseURL: "https://my-apps-9b366.firebaseio.com"});
  database = firebase.database();
  ref = database.ref('transaction');
  let last_message = "dummy";

  //初期読み込み & pushイベント検知
	ref.on("value", function(snapshot) {
		$(".current_money").text(addComma(snapshot.val()));
	});

  //投稿処理
  function postAction() {
    current_price = parseInt(removeComma($('.current_money').text()));
    num = parseInt(removeComma($('.calulate_amount').text()));

    ope = $('.calulate_operation').text()

    // 足し算
    if (ope == '+') {
      total = current_price + num

    // 引き算
  } else if (ope == '-') {
      total = current_price - num
      if (current_price < num ) {
        alert('所持金が足りません')
        return
      }

    // 掛け算
    } else if (ope == '×') {
      total = current_price * num

    // 割り算
    } else if (ope == '÷') {
      total = Math.floor(current_price / num)
    }

    ref.set(total)
  };

});
