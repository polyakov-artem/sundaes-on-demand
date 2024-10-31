import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import SummaryForm from '../summaryForm';
import { SummaryFormPropsType } from '../summaryForm';

describe('Summary form', () => {
  describe('in initial state', () => {
    test('should renders correctly', () => {
      renderForm(getProps());

      expect(getCheckbox()).not.toBeChecked();
      expect(getButton()).toBeDisabled();
      expect(getLink()).toBeInTheDocument();
      expect(getPopover()).resolves.toBe(null);
    });
  });

  describe('when accepted = true', () => {
    describe('when isCreating = false', () => {
      test('button should be enabled, checkbox should be checked', () => {
        renderForm(getProps({ accepted: true }));

        expect(getCheckbox()).toBeChecked();
        expect(getButton()).toBeEnabled();
      });

      test('should call `onChange` on checkbox click', async () => {
        const user = userEvent.setup();
        const props = getProps({ accepted: true });
        renderForm(props);

        await user.click(getCheckbox());

        expect(props.onChange).toBeCalledTimes(1);
      });

      test('should call `onSubmit` function on button click', async () => {
        const user = userEvent.setup();
        const props = getProps({ accepted: true });
        renderForm(props);

        await user.click(getButton());

        expect(props.onSubmit).toBeCalledTimes(1);
      });
    });

    describe('when isCreating = true', () => {
      test('button and checkbox should be disabled', () => {
        renderForm(getProps({ accepted: true, isCreating: true }));

        expect(getCheckbox()).toBeDisabled();
        expect(getButton()).toBeDisabled();
      });
    });
  });

  describe('when hovering over the Terms and Conditions link', () => {
    test('popover should be displayed', async () => {
      const user = userEvent.setup();
      renderForm(getProps());

      await user.hover(getLink());

      expect(await getPopover()).toBeInTheDocument();
    });
  });

  describe('when not hovering over the Terms and Conditions link', () => {
    test('popover should not be displayed', async () => {
      const user = userEvent.setup();
      renderForm(getProps());

      await user.hover(getLink());
      await user.unhover(getLink());

      expect(await getPopover()).toBeNull();
    });
  });
});

const getProps = (props: Partial<SummaryFormPropsType> = {}): SummaryFormPropsType => ({
  accepted: props.accepted || false,
  isCreating: props.isCreating || false,
  onSubmit: vi.fn(),
  onChange: vi.fn(),
});

const renderForm = (props: SummaryFormPropsType) => render(<SummaryForm {...props} />);

export const getForm = () => screen.getByTestId('summary-form');
export const getCheckbox = () =>
  screen.getByRole('checkbox', { name: /i agree to terms and conditions/i });
const getButton = () => screen.getByRole('button', { name: /confirm order/i });
const getLink = () => screen.getByText(/terms and conditions/i);
const getPopover = async () =>
  await waitFor(() => screen.queryByText(/No ice cream will actually be delivered/i));
