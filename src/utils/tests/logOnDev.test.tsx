import { describe, expect, it, vi } from 'vitest';
import { logOnDev } from '../logOnDev';

describe('logOnDev', () => {
  describe('when the environment is development', () => {
    it('logs the message ', () => {
      const consoleLogSpy = vi.spyOn(console, 'log');
      process.env.MODE = 'development';
      logOnDev('Test message');
      expect(consoleLogSpy).toHaveBeenCalledWith('Test message');
    });
  });

  describe('when the environment is not development', () => {
    it('does not log the message', () => {
      const consoleLogSpy = vi.spyOn(console, 'log');
      process.env.MODE = 'production';
      logOnDev('Test message');
      expect(consoleLogSpy).not.toHaveBeenCalled();
    });
  });
});
