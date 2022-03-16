chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    type: 'normal',
    id: 'menu',
    title: 'multiMovie',
    contexts: ['link', 'page'],
  });
});

chrome.contextMenus.onClicked.addListener((item) => {
  if (item.linkUrl != undefined) {
    console.log(item.linkUrl);
  } else {
    console.log(item.pageUrl);
  }
});
