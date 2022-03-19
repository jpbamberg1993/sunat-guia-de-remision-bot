require('dotenv').config()

const puppeteer = require('puppeteer')

let page = null
let browser = null

browser = puppeteer.launch({ headless: false })
  .then(async (browser) => {
    page = await browser.newPage()
    page.setViewport({
      width: 1500,
      height: 500,
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

    await page.waitFor(10000)

    const iframeHandler = await page.$('iframe[id="iframeApplication"]')
    const frame = await iframeHandler.contentFrame()
    await frame.waitForSelector('input[id="txt_numero_doc_destinatario"]')
    await frame.type('input[id="txt_numero_doc_destinatario"]', process.env.TIPO_Y_NUMERO_DE_DOCUMENTO_DEL_DESTINATARIO)
    page.keyboard.press('Tab')
    const tipoDeTransporte = process.env.TIPO_DE_TRANSPORTE
    await frame.evaluate((tipoDeTransporte) => {
      document.querySelector('#sel_forma_traslado').value = tipoDeTransporte.toUpperCase()
    }, tipoDeTransporte)
    // await page.click('span[id="btn_continuar_inicio_label"]')
  })
  .catch(error => {
    console.error(error)
  })
