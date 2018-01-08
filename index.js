const puppeteer = require("puppeteer");

console.log("qsdfddddddddddddd");

(async () => {
  console.log("in dans la page");
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  page.on("dialog", async dialog => {
    console.log(dialog, "DIALOGO PUTTA DE MERDE");
    dialog.type; // 'alert', 'confirm', 'prompt', 'beforeunload'
    dialog.accept(); // takes optional string
    const frames = await page.frames();
    console.log("IFRAAAAAAAAAME", frames);
    let tds = await frames[0].evaluate(
      td => Array.from(document.querySelectorAll(td)).map(td => td.textContent),
      "tr"
    );
    console.log("1 first frame ", tds);
  });

  await page.goto("https://web.bankin.com/challenge/index.html");

  await page.waitForSelector("td", { timeout: 3000 });
  let tds = await page.evaluate(
    td => Array.from(document.querySelectorAll(td)).map(td => td.textContent),
    "tr"
  );
  console.log("ttttttttttddddd", tds);
  if (!tds.length) {
    const frames = await page.frames();
    console.log("IFRAAAAAAAAAME", frames);
    tds = await frames[0].evaluate(
      td => Array.from(document.querySelectorAll(td)).map(td => td.textContent),
      "tr"
    );
    console.log("1 first frame ", tds);
    tds = await frames[1].evaluate(
      td => Array.from(document.querySelectorAll(td)).map(td => td.textContent),
      "tr"
    );
    console.log("2 seconde frame ", tds);
  }
})();
