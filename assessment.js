'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');

assessmentButton.onclick = () => {
  const userName = userNameInput.value;
  if (userName.length === 0) {
    //名前が空時は処理を終了する
    return;
  }

  //診断結果表示エリアの作成
  resultDivision.innerText = '';

  // headerDivision の作成
  const headerDivision = document.createElement('div');
  headerDivision.setAttribute('class', 'card-header text-bg-primary');
  headerDivision.innerText = '診断結果';

  // bodyDivision の作成
  const bodyDivision = document.createElement('div');
  bodyDivision.setAttribute('class', 'card-body');

  const paragraph = document.createElement('p');
  paragraph.setAttribute('class', 'card-text');
  const result = assessment(userName);
  paragraph.innerText = result;
  bodyDivision.appendChild(paragraph);

  // resultDivision に Bootstrap のスタイルを適用する
  resultDivision.setAttribute('class', 'card');

  // headerDivision と bodyDivision を resultDivision に差し込む
  resultDivision.appendChild(headerDivision);
  resultDivision.appendChild(bodyDivision);



  // ツイートエリアの作成
  tweetDivision.innerText = '';
  const anchor = document.createElement('a');
  const hrefValue =
    'https://twitter.com/intent/tweet?button_hashtag=' +
    encodeURIComponent('あなたのラッキーたばやん') +
    '&ref_src=twsrc%5Etfw';

  anchor.setAttribute('href', hrefValue);
  anchor.setAttribute('class', 'twitter-hashtag-button');
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #あなたのラッキーたばやん';

  tweetDivision.appendChild(anchor);

  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivision.appendChild(script);
};

userNameInput.onkeydown = event => {
  if (event.key === 'Enter') {
    assessmentButton.onclick();
  }
};

const answers = [
  '###userName###さんのラッキーたばやんはラコステを着たたばです。###userName###さんがワニの存在に気がついてくれたとき、たばはとても喜ぶでしょう。裏表逆に着ていないか気遣いできればさらに運気upに繋がるかも!?',
  '###userName###さんのラッキーたばやんはクリームブリュレクレープを持ったたばです。###userName###さんも一緒にクレープを買って隣で食べてあげましょう。',
  '###userName###さんのラッキーたばやんは映画中、停電に遭遇したたばです。思わぬレアな体験にたばはテンションが上がるでしょう。',
  '###userName###さんのラッキーたばやんはショートカットたばです。###userName###さんがほめてあげるとたばもきっと喜んでくれるでしょう。',
  '###userName###さんのラッキーたばやんはロングヘアたばです。###userName###さんがほめてあげるとたばもきっと喜んでくれるでしょう。たばが喜べば運気upに繋がります。',
  '###userName###さんのラッキーたばやんはトータル紺コーデたばです。###userName###さんが気づいてほめてあげるとたばもきっと喜んでくれるでしょう。',
  '###userName###さんのラッキーたばやんは文房具を見るたばです。たばにロケットえんぴつ、香り消しゴムなどをあげてみましょう。たばが喜べば###userName###さんの運勢upに繋がります。',
  '###userName###さんのラッキーたばやんはサンリオにハマったたばです。###userName###さんがサンリオ話題を振ってあげると喜んで話してくれるでしょう。',
  '###userName###さんのラッキーたばやんは待ち合わせに早く来すぎたたばです。###userName###さんは早く着きすぎないようにすると運気up。',
  '###userName###さんのラッキーたばやんは映画鑑賞ポイントが溜まったたばです。溜まったポイントでたばやんが「君たちはどう生きるか」を見ると、###userName###さんの運勢もさらにupします。',
  '###userName###さんのラッキーたばやんはマスクをしたたばです。###userName###さんも一緒にマスクをすると運気up!',
  '###userName###さんのラッキーたばやんは寿司が上手く食べれないたばです。###userName###さんがサポートしてあげると、運勢UPに繋がります。',
  '###userName###さんのラッキーたばやんは芝生に目がないたばです。抹茶ティラミスなど芝生に似たデザートがあればたばにあげましょう。運勢UPに繋がります。',
  '###userName###さんのラッキーたばやんは事故ったたばです。###userName###さんも似た経験があれば「心配ないよ」と励ましてあげましょう。たばが元気になれば運気upに繋がります。',
  '###userName###さんのラッキーたばやんは赤いバックを持ったたばです。###userName###さんも一緒に赤いバックを持ってしまうと怒らせてしまうで注意しましょう。',
  '###userName###さんのラッキーたばやんは地元で働くたばやんです。###userName###さんがもし都内で働いているなら、ぜひ、たばやんにそことを伝えてあげて下さい。きっと「めっちゃ都会！」と言ってくれるはずです。',
];

/**
 * 名前文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザ名前
 * @return {string} 診断結果 
 */
function assessment(userName) {
  //全文字コード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }
  //文字コード番号合計を回答数で割って添字数値を求める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];

  //TODO ###userName###をユーザ名前に置き換える
  result = result.replaceAll('###userName###', userName);
  return result;
}

// テストコード
console.assert(
  assessment('太郎') ===
  '太郎さんのラッキーたばやんは待ち合わせに早く来すぎたたばです。太郎さんは早く着きすぎないようにすると運気up。',
  '診断結果の文言の特定部分を名前に置き換える処理が正しくありません。'
);
console.assert(
  assessment('太郎') === assessment('太郎'),
  '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);
