import { describe, expect, test, vi } from 'vitest';

import { render, screen } from '@testing-library/react';
import { scoops } from '../../../../testHelpers/constants/productsProviderConstants';
import { ProductOptionPropsType } from '../../../../types/types';
import ScoopOption from '../scoopOption';
import userEvent from '@testing-library/user-event';

describe('ScoopOption', () => {
  describe('with initial props', () => {
    test('should render correctly', () => {
      renderScoopOption(getScoopOptionProps(0));

      expect(getImage()).toHaveAttribute('alt');
      expect(getLabel()).toBeInTheDocument();
      expect(getInput()).toHaveValue(0);
    });
  });

  describe('when count is changed', () => {
    test('should render correctly', () => {
      renderScoopOption(getScoopOptionProps(5));

      expect(getInput()).toHaveValue(5);
    });
  });

  describe('when change input', () => {
    test('should call onChange callback', async () => {
      const props = getScoopOptionProps(0);
      renderScoopOption(props);
      const user = userEvent.setup();
      await user.type(getInput(), '5');

      expect(props.onChange.mock.lastCall).toEqual(['Chocolate', 1, '5']);
    });
  });
});

const getScoopOptionProps = (count: number) => ({
  ...scoops[0],
  count,
  onChange: vi.fn(),
});

const renderScoopOption = (props: ProductOptionPropsType) => {
  render(<ScoopOption {...props} />);
};

const getImage = () => screen.getByAltText('Chocolate scoop');
const getLabel = () => screen.getByText('Chocolate');
const getInput = () => screen.getByRole('spinbutton');
