$(function() {
  //電卓の四則演算をクリックした時の処理
  $('.ope_key').on(_touch, function() {

    //色の選択の処理
    $(this).addClass('back_red')
    $('.ope_key').not($(this)).removeClass('back_red')
    $('.ope_key').not($(this)).addClass('back_gray')
    $(this).removeClass('back_gray')

    //四則演算の反映
    $('.calulate_operation p').text($(this).text());
  })

  //電卓の数字をクリックした時の処理
  $('.calc_key.number').on(_touch, function() {
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

    if (!$(".multi_select_area").is(':visible')){

      //チームが未チェック
      if (!$('.select_area').children().hasClass('back_blue')) {
        alert('チーム名を選択してください')
        return
      }
      //四則演算が未チェック
      if ($('.calulate_operation').text() == '') {
        alert('四則演算を選択してください')
        return
      }
      //数値が未入力
      if ($('.calulate_amount').text() == '　') {
        alert('数値を入力してください')
        return
      }
      //処理
      calcPostAction()
      $('.team').removeClass('back_blue')
      $('.team').addClass('back_gray')
      $('.ope_key').removeClass('back_red')
      $('.ope_key').addClass('back_gray')
      $('.calulate_operation p').text('')
      $('.calulate_amount').text('　')
      my_firebase()
    }
  })
  //投稿処理
  function calcPostAction() {
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

    ref_log.push({
      date: new Date().getTime(),
      value: total - current_price
    });
  };
});
