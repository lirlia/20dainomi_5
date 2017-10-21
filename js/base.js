//数値の,区切り
function addComma(num){
    return String(num).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
}

//数値の,外し
function removeComma(num){
  return num.replace(/,/g, '');
}
