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

    //チームが未チェック
    if (!$('.select_area').children().hasClass('back_blue')) {
      alert('チーム名を選択してください')
      return
    }
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
    $('.team').removeClass('back_blue')
    $('.team').addClass('back_gray')
    $('.exchange_key').removeClass('back_red')
    $('.exchange_key').addClass('back_gray')
    $('.exchange_count_key').removeClass('back_red')
    $('.exchange_count_key').addClass('back_gray')
    my_firebase()
  })

  //投稿処理
  function exchangePostAction() {
    current_price = parseInt(removeComma($('.current_money').text()));

    exchange_price = exchange_price_list[$('.exchange_key.back_red').index()]
    exchange_count = $('.exchange_count_key.back_red').index() + 1
    index = $('.exchange_key.back_red').index()

    // ss判定
    if (index == 7 ) {
      // SSの時
      total = current_price * mission_bonus
    } else {
      // SS以外の時
      total = current_price + exchange_price * exchange_count
    }

    // push
    ref.set(total)

    // 合計前の換金を保存しておく
    bef_gacha_level1 = my_data.f + my_data.e
    bef_gacha_level2 = my_data.d + my_data.c

    if (index == 0 ) { ref_data.child("f").set(my_data.f + exchange_count)}
    if (index == 1 ) { ref_data.child("e").set(my_data.e + exchange_count)}
    if (index == 2 ) { ref_data.child("d").set(my_data.d + exchange_count)}
    if (index == 3 ) { ref_data.child("c").set(my_data.c + exchange_count)}
    if (index == 4 ) { ref_data.child("b").set(my_data.b + exchange_count)}
    if (index == 5 ) { ref_data.child("a").set(my_data.a + exchange_count)}
    if (index == 6 ) { ref_data.child("s").set(my_data.s + exchange_count)}
    if (index == 7 ) { ref_data.child("ss").set(my_data.ss + exchange_count)}

    //ガチャ解禁アラート
    if ((my_data.f + my_data.e) >= gacha_level1 && bef_gacha_level1 < gacha_level1) {
      alert('ガチャ(銀)が解禁されました、参加者に伝えてください。')
    }
    if ((my_data.d + my_data.c) >= gacha_level2 && bef_gacha_level2 < gacha_level2) {
      alert('ガチャ(金)が解禁されました、参加者に伝えてください。')
    }

    ref_log.push({
      date: new Date().getTime(),
      value: total - current_price
    });
  }

});
