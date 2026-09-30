import {test,expect} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import data from '../testdata/testdata.json'
let lp: LoginPage
test.beforeEach(async({page})=>{
    lp=new LoginPage(page)
    await lp.navigateTo()
})
test('Login Validation', async({page})=>{
    await lp.login(process.env.ORANGEHRM_USERNAME!, process.env.ORANGEHRM_PASSWORD!)
})