require('dotenv').config()

const puppeteer = require('puppeteer')

let page = null
let browser = null

browser = puppeteer.launch({ headless: false })
  .then(async (browser) => {
    page = await browser.newPage()
    page.setViewport({
      width: 1200,
      height: 800,
      isMobile: false
    })

    page.goto(
      'https://e-menu.sunat.gob.pe/cl-ti-itmenu/MenuInternet.htm?pestana=*&agrupacion=*',
      { waitUntil: "networkidle2" })

    await page.waitFor(2000)

    // login
    await page.waitFor('input[id="txtRuc"]')
    await page.type('input[id="txtRuc"]', process.env.RUC)
    await page.type('input[id="txtUsuario"]', process.env.USERNAME)
    await page.type('input[id="txtContrasena"]', process.env.PASSWORD)
    await page.click('button[id="btnAceptar"]')

    await page.waitFor(2000)

    // get to Emitir-GRE Remitente page
    await page.click('div[id="divOpcionServicio2"]')
    await page.click('li[id="nivel1_11"]')
    await page.click('li[id="nivel2_11_5"]')
    await page.click('li[id="nivel3_11_5_6"]')

    await page.waitFor(2000)

    await page.click('li[id="nivel4_11_5_6_1_1"]')
  })
  .catch(error => {
    console.error(error)
  })
