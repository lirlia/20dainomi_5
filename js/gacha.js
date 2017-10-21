$(function() {

  //ガチャの種類を選択
  $('.gacha_key').on(_touch, function() {

    //色の選択の処理
    $(this).addClass('back_red')
    $('.gacha_key').not($(this)).removeClass('back_red')
    $('.gacha_key').not($(this)).addClass('back_gray')
    $(this).removeClass('back_gray')

  })

  //ガチャを購入する数を選択
  $('.gacha_count_key').on(_touch, function() {

    //色の選択の処理
    $(this).addClass('back_red')
    $('.gacha_count_key').not($(this)).removeClass('back_red')
    $('.gacha_count_key').not($(this)).addClass('back_gray')
    $(this).removeClass('back_gray')

  })

  //送信をクリックした時の処理
  $('.gacha_submit').on(_touch, function() {

    //チームが未チェック
    if (!$('.select_area').children().hasClass('back_blue')) {
      alert('チーム名を選択してください')
      return
    }
    //ガチャの種類が未チェック
    if (!$('.gacha_select').children().hasClass('back_red')) {
      alert('ガチャの種類を選択してください')
      return
    }
    //ガチャの解禁チェック
    if ($('.gacha_key.back_red').text() == "未解禁") {
      alert('そのガチャはまだ解禁されていません')
      return
    }
    //ガチャを引く回数が未入力
    if (!$('.gacha_count').children().hasClass('back_red')) {
      alert('ガチャを引く回数を選択してください')
      return
    }
    //処理
    gachaPostAction()
    $('.team').removeClass('back_blue')
    $('.team').addClass('back_gray')
    $('.gacha_key').removeClass('back_red')
    $('.gacha_key').addClass('back_gray')
    $('.gacha_count_key').removeClass('back_red')
    $('.gacha_count_key').addClass('back_gray')
    my_firebase()
  })

  //投稿処理
  function gachaPostAction() {

    current_price = parseInt(removeComma($('.current_money').text()));
    gacha_price = gacha_price_list[$('.gacha_key.back_red').index()]
    gacha_count = $('.gacha_count_key.back_red').index() + 1

    // ガチャに必要な金額を算出
    gacha_price_amount = gacha_price * gacha_count

    // 必要な金額　＞　所持金の場合
    if (current_price < gacha_price_amount) {
      alert('所持金が ' + addComma((gacha_price_amount - current_price)) + 'G 足りません')
      return
    }

    // 計算
    total = current_price - gacha_price_amount

    // push
    ref.set(total)
    ref_log.push({
      date: new Date().getTime(),
      value: total - current_price
    });
  }

});
