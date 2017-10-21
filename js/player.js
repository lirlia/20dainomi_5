$(function() {
  firebase.initializeApp({databaseURL: "https://my-apps-9b366.firebaseio.com"});
  database = firebase.database();
  last_message = "dummy";
  var team = location.pathname.replace(/.*team(.*)_.*/g,'$1');
  $(".heading").text('チーム' + team + 'の所持金');

  my_firebase()

  // firebase
  function my_firebase() {

    ref = database.ref('transaction/' + team + '/money_amount');
    ref_log = database.ref('transaction/' + team + '/log');

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
  };

  function priceHistory(message){
    price = message.value.value

    if ( price > 0) {
      message_html = '<p class="post-text">所持金 <span class="font_blue">+' + addComma(price) + 'G</span></p>';
    } else {
      message_html = '<p class="post-text">所持金 <span class="font_red">' + addComma(price) + 'G</span></p>';
    }

    date_html = '';
    if(message.value.date) {
      date_html = '<p class="post-date">' + new Date(message.value.date).toLocaleString() +'</p>';
    }

    $('.' + last_message).before('<div class="' + message.id + ' post">' + message_html + date_html +'</div>');
    last_message = message.id;
  }
});
