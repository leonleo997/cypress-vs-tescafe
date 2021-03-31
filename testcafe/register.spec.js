import { random } from 'faker'
import { Selector } from 'testcafe';
const catName = `Mr ${random.words(2)}`;

fixture('Register cat').page('http://animal-shelter-ui.herokuapp.com/');

test('Register a cat successfully', async t => {
    await t.wait(1000)
    await t.click('[href="/animal/register"]');
    await t.typeText('[name="cat-name"]', catName);
    await t.click('#demo-simple-select');
    await t.click('[data-value="Azul Ruso"]');
    await t.click('[value="Male"]');
    await t.click('[name="moquillo"]');
    await t.click('[name="leucemia"]');
    await t.click('#terms-and-condition');
    await t.click('button[type="submit"]');

    await t.expect(Selector(`[data-testid="${catName}-container"] [name="name-cat"]`).textContent)
        .eql(catName);
    await t.expect(Selector(`[data-testid="${catName}-container"] [name="breed-cat"]`).textContent)
        .eql("Azul Ruso");
    await t.expect(Selector(`[data-testid="${catName}-container"] [name="gender-cat"] div`).getAttribute("name"))
        .eql("male-icon");
    await t.expect(Selector(`[data-testid="${catName}-container"] [name="is-vaccinated-cat"] div`).getAttribute("name"))
        .eql("health-icon");
});