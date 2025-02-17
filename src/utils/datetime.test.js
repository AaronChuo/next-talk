import { localizeTimeString } from '@/utils/datetime';

describe('localizeTimeString', () => {
  it('returns empty string when timestamp is null or undefined', () => {
    expect(localizeTimeString()).toBe('');
    expect(localizeTimeString(null)).toBe('');
  });

  it('formats a valid timestamp correctly', () => {
    const mockTimestamp = 1739016300000;
    const expectedTime = new Date(mockTimestamp).toLocaleTimeString();

    expect(localizeTimeString(mockTimestamp)).toBe(expectedTime);
  });
});
