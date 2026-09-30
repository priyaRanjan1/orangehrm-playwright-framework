import {test,expect} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { PIM } from '../pages/PimPage'
import data from '../testdata/testdata.json'
import path from 'path';
let pim:PIM
let lp:LoginPage
test.beforeEach(async({page})=>{
    lp=new LoginPage(page)
    await lp.navigateTo()
    await lp.login(process.env.ORANGEHRM_USERNAME!, process.env.ORANGEHRM_PASSWORD!)
})
test('PIM Page',async({page})=>{
    const uniqueEmpId = `900${Math.floor(100 + Math.random() * 900)}`;
    const empImageDetails = path.join(__dirname, '../testdata/emp.jpg');
    pim=new PIM(page)
    await pim.navigateToAddEmployee()
    await pim.addEmployeeDetails(data.firstName,data.lastName,uniqueEmpId,empImageDetails)
    await pim.searchEmployee(uniqueEmpId)
    await pim.updateJobDetails()
    await pim.searchEmployee(uniqueEmpId)
    await pim.deleteSearchedEmployee()
    await pim.employeeLogout()
})