$(function() {

  //アイテムの種類を選択
  $('.item_key').on(_touch, function() {

    //色の選択の処理
    $(this).addClass('back_red')
    $('.item_key').not($(this)).removeClass('back_red')
    $('.item_key').not($(this)).addClass('back_gray')
    $(this).removeClass('back_gray')

  })

  //アイテムを購入する数を選択
  $('.item_count_key').on(_touch, function() {

    //色の選択の処理
    $(this).addClass('back_red')
    $('.item_count_key').not($(this)).removeClass('back_red')
    $('.item_count_key').not($(this)).addClass('back_gray')
    $(this).removeClass('back_gray')

  })

  //送信をクリックした時の処理
  $('.item_submit').on(_touch, function() {

    //アイテムの種類が未チェック
    if (!$('.item_select').children().hasClass('back_red')) {
      alert('アイテムの種類を選択してください')
      return
    }
    //アイテムを引く回数が未入力
    if (!$('.item_count').children().hasClass('back_red')) {
      alert('アイテムの数を選択してください')
      return
    }
    //処理
    itemPostAction()
    $('.item_key').removeClass('back_red')
    $('.item_key').addClass('back_gray')
    $('.item_count_key').removeClass('back_red')
    $('.item_count_key').addClass('back_gray')
  })

  //投稿処理
  function itemPostAction() {
    current_price = parseInt(removeComma($('.current_money').text()));

    item_price = item_price_list[$('.item_key.back_red').index()]
    item_count = $('.item_count_key.back_red').index() + 1
    index = $('.item_key.back_red').index()

    // アイテムに必要な金額を算出
    item_price_amount = item_price * item_count

    // 必要な金額　＞　所持金の場合
    if (current_price < item_price_amount) {
      alert('所持金が ' + addComma((item_price_amount - current_price)) + 'G 足りません')
      return
    }

    // 計算
    total = current_price - item_price_amount

    // 念のための確認
    if(!confirm($('.item_key.back_red').text() + "を" + item_count + "つ購入しますか？")){
          return false;
      }

    // push
    ref.set(total)
    ref_log.push({
      date: new Date().getTime(),
      message: "「" + $('.item_key.back_red').text() + "」を" + item_count + "つ購入しました",
      value: total - current_price
    });
  }

});
