chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    type: "normal",
    id: "menu",
    title: "multiMovie",
    contexts: ["link", "page"],
  });
});

chrome.contextMenus.onClicked.addListener((item) => {
  let link = "";
  if (item.linkUrl != undefined) {
    link = item.linkUrl;
    console.log(link);
  } else {
    link = item.pageUrl;
    console.log(link);
  }

  chrome.runtime.sendMessage({ link: link }, (res) => {
    console.log(res.firewell);
  });
});
