$(function() {
  //支払うチームを選択した時の処理
  $('[name=src_team]').change(function() {

    // 選択されているvalue属性値を取り出す
    var val = $('[name=src_team]').val();
    if ($.isNumeric(val)) {
      $('.team').eq(val - 1).addClass('back_blue')
      $('.team').not($('.team').eq(val - 1)).removeClass('back_blue')
      $('.team').not($('.team').eq(val - 1)).addClass('back_gray')
      $('.team').eq(val - 1).removeClass('back_gray')
      my_firebase()
    }
  });


  //送信をクリックした時の処理
  $('.submit').on(_touch, function() {
    if ($(".multi_select_area").is(':visible')){
      //チームが未チェック
      if (!$('.select_area').children().hasClass('back_blue')) {
        alert('お金を払うチームを選択してください')
        resetSelect()
        return
      }
      //チームが未チェック
      if (!$.isNumeric($('[name=dest_team]').val())) {
        alert('お金を受け取るチームを選択してください')
        resetSelect()
        return
      }

      //数値が未入力
      if ($('.calulate_amount').text() == '　') {
        alert('数値を入力してください')
        resetSelect()
        return
      }
      //処理
      calc2PostAction()
      $('.team').removeClass('back_blue')
      $('.team').addClass('back_gray')
      $('.ope_key').removeClass('back_red')
      $('.ope_key').addClass('back_gray')
      $('.calulate_operation p').text('')
      $('.calulate_amount').text('　')
      resetSelect()
      my_firebase()
    }
  })

  function resetSelect(){
    $('.src_team').val("お金を払うチームを選択");
    $('.dest_team').val("お金を受け取るチームを選択");
  }
  //投稿処理
  function calc2PostAction() {
    current_price = parseInt(removeComma($('.current_money').text()));
    num = parseInt(removeComma($('.calulate_amount').text()));

    // お金を払う処理
    total = current_price - num
    if (current_price < num ) {
      alert('所持金が足りません')
      return
    }

    ref.set(total)
    ref_log.push({
      date: new Date().getTime(),
      value: total - current_price
    });

    // お金を受け取る処理
    ref_dest = database.ref('transaction/' + $('[name=dest_team]').val() + '/money_amount');
    ref_dest.once("value", function(price) {
      dest_price = price.val()

      ref_dest.set(dest_price + num)

      ref_dest_log = database.ref('transaction/' + $('[name=dest_team]').val() + '/log');
      ref_dest_log.push({
        date: new Date().getTime(),
        value: dest_price + num
      });
    });

  };
});
