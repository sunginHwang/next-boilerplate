import { render } from '@testing-library/react';
import Button from './index';

describe('Button', () => {
  it('is Exist Button', () => {
    const buttonText = '버튼';
    const { getByText } = render(<Button text={buttonText} />, {});
    expect(getByText(buttonText));
  });
});
