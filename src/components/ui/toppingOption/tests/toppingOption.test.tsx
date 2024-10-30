import { describe, expect, test, vi } from 'vitest';
import { toppings } from '../../../../testHelpers/constants/productsProviderConstants';
import { ProductOptionPropsType } from '../../../../types/types';
import ToppingOption from '../toppingOption';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ToppingOption', () => {
  describe('with initial props', () => {
    test('should render correctly', () => {
      renderToppingOption(getToppingOptionProps(0));

      expect(getImage()).toHaveAttribute('alt');
      expect(getLabel()).toBeInTheDocument();
      expect(getCheckbox()).not.toBeChecked();
    });
  });

  describe('when count is changed', () => {
    test('should render correctly', () => {
      renderToppingOption(getToppingOptionProps(1));

      expect(getCheckbox()).toBeChecked();
    });
  });

  describe('when click on unselected checkbox', () => {
    test('should call onChange callback with correct args', async () => {
      const props = getToppingOptionProps(0);
      renderToppingOption(props);
      const user = userEvent.setup();

      await user.click(getCheckbox());

      expect(props.onChange.mock.lastCall).toEqual(['Cherries', 0.5, '1']);
    });
  });

  describe('when click on selected checkbox', () => {
    test('should call onChange callback with correct args', async () => {
      const props = getToppingOptionProps(1);
      renderToppingOption(props);
      const user = userEvent.setup();

      await user.click(getCheckbox());

      expect(props.onChange.mock.lastCall).toEqual(['Cherries', 0.5, '0']);
    });
  });
});

const getToppingOptionProps = (count: number) => ({
  ...toppings[0],
  count,
  onChange: vi.fn(),
});

const renderToppingOption = (props: ProductOptionPropsType) => {
  render(<ToppingOption {...props} />);
};

const getImage = () =>
  screen.getByRole('img', {
    name: /Cherries topping/i,
  });

const getLabel = () => screen.getByText(/Cherries/i);

const getCheckbox = () =>
  screen.getByRole('checkbox', {
    name: /Cherries/i,
  });
