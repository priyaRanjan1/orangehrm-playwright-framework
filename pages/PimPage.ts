import { Locator, Page, expect } from '@playwright/test';
export class PIM{
    page: Page
    pimMenu: Locator
    addEmployeeTab: Locator
    firstNameInput: Locator
    lastNameInput: Locator
    employeeIdInput: Locator
    fileUpload: Locator
    saveButton: Locator
    employeeListTab: Locator
    searchIdInput: Locator
    searchButton: Locator
    editRecordButton: Locator
    jobTab: Locator
    jobTitleDropdown: Locator
    dropdownOptions: Locator
    empStatusDropdown: Locator
    listboxOptions: Locator
    deleteRecordButton: Locator
    confirmDeleteButton: Locator
    logoutDropdown: Locator
    logoutButton: Locator

    //constructor creation
    constructor(page: Page) {
    this.page = page
    this.pimMenu = page.getByRole('link', { name: 'PIM' })
    this.addEmployeeTab = page.getByRole('link', { name: 'Add Employee', exact: true })
    this.firstNameInput=page.getByRole('textbox', { name: 'First Name' })
    this.lastNameInput=page.getByRole('textbox', { name: 'Last Name' })
    this.employeeIdInput=page.getByRole('textbox').nth(4)
    this.fileUpload=page.locator('input[type="file"]')
    this.saveButton=page.getByRole('button', { name: 'Save' })
    //this.employeeListTab=page.getByRole('link', { name: 'Employee List', exact: true })
    this.employeeListTab = page.getByRole('link', { name: 'Employee List', exact: true })
    //this.employeeListTab=page.locator("a:has-text('Employee List')")
    this.searchIdInput = page.locator('.oxd-input-group', { hasText: 'Employee Id' }).getByRole('textbox')
    this.searchButton= page.locator(".oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space")
    this.editRecordButton=page.getByRole('button').filter({ hasText: /^$/ }).nth(3)
    this.jobTab= page.getByRole('link', { name: 'Job' })
    this.jobTitleDropdown = page.locator(".oxd-icon.bi-caret-down-fill.oxd-select-text--arrow").first()
    this.dropdownOptions = page.locator('.oxd-select-dropdown [role="option"], .oxd-select-dropdown .oxd-select-option')
    this.empStatusDropdown = page.locator('.oxd-input-group').filter({ hasText: 'Employment Status' }).locator('.oxd-select-text--arrow')
    this.listboxOptions = page.getByRole('listbox').getByRole('option')
    this.deleteRecordButton = page.getByRole('button').filter({ hasText: /^$/ }).nth(4)
    this.confirmDeleteButton = page.getByRole('button', { name: ' Yes, Delete' })
    this.logoutDropdown=page.locator(".oxd-icon.bi-caret-down-fill.oxd-userdropdown-icon")
    this.logoutButton=page.locator("a[href='/web/index.php/auth/logout']")

    }
    //method creation
    async navigateToAddEmployee(){
        await this.pimMenu.click()
        await this.addEmployeeTab.click()
        await expect(this.pimMenu).toBeVisible()
        await this.page.screenshot({path:'screenshot/PIMAddEmp.png',fullPage:true})
    }
    async addEmployeeDetails(firstName: string, lastName: string, empId: string, imagePath: string) {
    await this.firstNameInput.fill(firstName)
    await this.lastNameInput.fill(lastName)
    await this.employeeIdInput.fill(empId)
    await this.fileUpload.setInputFiles(imagePath)
    await this.saveButton.click();
    await expect(this.page.getByText('Successfully Saved')).toBeVisible()
    await this.page.screenshot({path:'screenshot/Empdetails.png',fullPage:true})
  }
  async searchEmployee(empId: string) {
     // SMART GUARD: If we are deep inside an edit tab, the list tab might be hidden.
    // We check if the main PIM menu is visible and click it to reset our page view.
    if (await this.pimMenu.isVisible()) {
        await this.pimMenu.click();
    }
    
    // Now the top sub-bar is guaranteed to re-render, making the list tab safely visible
    await this.employeeListTab.waitFor({ state: 'visible', timeout: 10000 });
    await this.employeeListTab.click();
    
    await this.searchIdInput.fill(empId);
    await this.searchButton.click();
    
    // Wait for the grid to update and display the specific target ID row
    await this.page.locator(`text=${empId}`).waitFor({ state: 'visible', timeout: 5000 });
    await expect(this.page.getByText(empId)).toBeVisible();
    
    await this.page.screenshot({path:`screenshot/empID_${empId}.png`, fullPage:true});
  }
  async updateJobDetails() {
    await this.editRecordButton.click()
    await this.jobTab.click()
    await this.jobTitleDropdown.click()
    await this.dropdownOptions.nth(1).click()
    await this.empStatusDropdown.click()
    await this.listboxOptions.nth(1).click()
    // take a screenshot to verify changes
    await this.page.screenshot({path:'screenshot/empDetailsUpdate.png',fullPage:true})
  }
  async deleteSearchedEmployee() {
        await this.deleteRecordButton.click()
        await this.confirmDeleteButton.click()
        await expect(this.page.getByText('Successfully Deleted')).toBeVisible()
        await this.page.screenshot({ path: 'screenshot/empDeleted.png', fullPage: true })
  }
  async employeeLogout(){
    await this.logoutDropdown.click()
    await this.logoutButton.click()
  }
}
