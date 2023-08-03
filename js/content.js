import { MouseCircle } from './mouseCircle.js';

const mouseCircle = new MouseCircle();

// ページ描画時は非表示のため
if (mouseCircle.getStorage()) {
  return mouseCircle.toggle();
}

/**
 * メッセージ（キーイベント）受信
 *
 * @returns {Boolean}
 */
chrome.runtime.onMessage.addListener(function (command, sender, response) {
  return mouseCircle.toggle();
});

/**
 * マウス移動イベント
 *
 * @returns {Boolean}
 */
document.addEventListener('mousemove', (event) => {
  const x = e.clientX;
  const y = e.clientY;

  return mouseCircle.move(x, y);
});

/**
 * マウスクリックイベント
 *
 * @returns {Boolean}
 */
document.addEventListener('mousedown', (event) => {
  return mouseCircle.click();
});

/**
 * マウスクリック完了後のイベント
 *
 * @returns {Boolean}
 */
document.addEventListener('mouseup', (event) => {
  return mouseCircle.click();
});
