$(function() {

  //ミッションの種類を選択
  $('.exchange_key').on(_touch, function() {

    //色の選択の処理
    $(this).addClass('back_red')
    $('.exchange_key').not($(this)).removeClass('back_red')
    $('.exchange_key').not($(this)).addClass('back_gray')
    $(this).removeClass('back_gray')

  })

  //ミッションを購入する数を選択
  $('.exchange_count_key').on(_touch, function() {

    //色の選択の処理
    $(this).addClass('back_red')
    $('.exchange_count_key').not($(this)).removeClass('back_red')
    $('.exchange_count_key').not($(this)).addClass('back_gray')
    $(this).removeClass('back_gray')

  })

  //送信をクリックした時の処理
  $('.exchange_submit').on(_touch, function() {

    //ミッションの種類が未チェック
    if (!$('.exchange_select').children().hasClass('back_red')) {
      alert('ミッションの種類を選択してください')
      return
    }
    //ミッションを引く回数が未入力
    if (!$('.exchange_count').children().hasClass('back_red')) {
      alert('ミッションを換金する数を選択してください')
      return
    }

    //処理
    exchangePostAction()
    $('.exchange_key').removeClass('back_red')
    $('.exchange_key').addClass('back_gray')
    $('.exchange_count_key').removeClass('back_red')
    $('.exchange_count_key').addClass('back_gray')
  })

  //投稿処理
  function exchangePostAction() {
    current_price = parseInt(removeComma($('.current_money').text()));

    exchange_price = exchange_price_list[$('.exchange_key.back_red').index()]
    exchange_count = $('.exchange_count_key.back_red').index() + 1
    index = $('.exchange_key.back_red').index()

    total = current_price + exchange_price * exchange_count

    // 念のための確認
    if(!confirm($('.exchange_key.back_red').text() + "ランクミッションを" + exchange_count + "つ換金しますか？")){
          return false;
      }

    // push
    ref.set(total)
    ref_log.push({
      date: new Date().getTime(),
      message: "「" + $('.exchange_key.back_red').text() + "ランクミッション」を" + exchange_count + "つ換金しました",
      value: total - current_price
    });
  }

});
