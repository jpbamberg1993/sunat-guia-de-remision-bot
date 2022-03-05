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
      'https://api-seguridad.sunat.gob.pe/v1/clientessol/4f3b88b3-d9d6-402a-b85d-6a0bc857746a/oauth2/loginMenuSol',
      { waitUntil: "networkidle2" })

    await page.waitFor(2000)

    // login
    await page.waitFor('input[id="txtRuc"]')
    await page.type('input[id="txtRuc"]', process.env.RUC)
    await page.type('input[id="txtUsuario"]', process.env.USERNAME)
    await page.type('input[id="txtContrasena"]', process.env.PASSWORD)
    await page.click('button[id="btnAceptar"]')
  })
  .catch(error => {
    console.error(error)
  })
