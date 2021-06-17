// before executing , install node modules using command - npm i init
// puppeteer installing command - npm install puppeteer
const pup = require("puppeteer");
let id = "project.xdddd";
let pass = "pep@123";

let tab;
async function main() {
  let browser = pup.launch({
    headless: false,
    defaultViewport: false,
    args: ["--start-maximized"]
  });
  let pages = await (await browser).pages();
  tab = pages[0];
  await tab.goto("https://www.instagram.com/");
  await tab.waitForSelector("input[name='username']", { visible: true });
  await tab.type("input[name='username']", id);
  await tab.type("input[type='password']", pass);
  await tab.click("button[type='submit']");
  await tab.waitForSelector("svg[aria-label='Activity Feed']", { visible: true });
  await tab.click("svg[aria-label='Activity Feed']");
  await tab.waitForSelector("._7UhW9.xLCgt.MMzan._0PwGv.uL8Hv.M8ipN", { visible: true });
  await tab.click("._7UhW9.xLCgt.MMzan._0PwGv.uL8Hv.M8ipN");
  //  await tab.waitForSelector("FPmhX.notranslate.yrJyr",{visible:true});
  let herfdata = []
  let followrequest = await tab.$$(".FPmhX.notranslate.yrJyr");
  for (let i in followrequest) {
    let followurl = await tab.evaluate(function (ele) {
      return ele.getAttribute("href");
    }, followrequest[i]);
    herfdata.push(followurl);
  }

  let followaccept = await tab.$$(".iTMfC button");
  for (let i = 0; i < followaccept.length; i++) {
    if (i % 2 == 0) {
      await followaccept[i].click({ delay: 1000 });
    }
  }
  for (let i = 0; i < herfdata.length; i++) {
    await autoLike("https://www.instagram.com" + herfdata[i]);
  }

}
async function autoLike(url) {
  await tab.goto(url);
  await tab.waitForSelector(".g47SY", { visible: true });
  let PrfileNumbers = await tab.$$(".g47SY");
  let TotalPost = await tab.evaluate(function (ele) {
    return ele.textContent;
  }, PrfileNumbers[0]);

  let j = 1;
  for (let i = 0; i < TotalPost; i++) {
    await tab.waitForSelector("._9AhH0", { visible: true });
    await tab.click("._9AhH0");
    await tab.waitForSelector(".fr66n", { visible: true });
    await tab.click(".fr66n");
    await tab.screenshot({
      path: `./screenshots/SS+ request_${j + "of" + TotalPost}.jpeg`
    }),{delay:500};
    if (i == TotalPost - 1) {
      await tab.waitForSelector(".wpO6b .QBdPU ._8-yf5", { visible: true });
      let close = await tab.$$(".wpO6b .QBdPU ._8-yf5");
      await close[7].click();
    } else {
      await tab.click("._65Bje.coreSpriteRightPaginationArrow", { delay: 1000 });
    }
    j++;

  }
}
main();

