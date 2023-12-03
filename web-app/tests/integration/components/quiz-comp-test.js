import { module, test } from 'qunit';
import { setupRenderingTest } from 'web-app/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | quiz-comp', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<QuizComp />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <QuizComp>
        template block text
      </QuizComp>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
