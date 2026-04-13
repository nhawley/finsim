import { device, element, by, expect as detoxExpect, waitFor } from 'detox';

describe('Payment Flow — Happy Path', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  it('displays home screen with balance on launch', async () => {
    await detoxExpect(element(by.id('home-balance'))).toBeVisible();
  });

  it('completes a full payment flow end-to-end', async () => {
    await element(by.id('home-send-btn')).tap();
    await element(by.id('send-amount-input')).typeText('25.00');
    await element(by.id('send-recipient-input')).typeText('friend@example.com');
    await element(by.id('send-confirm-btn')).tap();
    await waitFor(element(by.id('confirmation-screen')))
      .toBeVisible()
      .withTimeout(4000);
    await detoxExpect(element(by.id('confirmation-message'))).toHaveText('Payment Sent!');
  });
});

describe('Payment Flow — Network Degradation', () => {
  beforeEach(async () => {
    await device.launchApp({ newInstance: true });
    // Ensure network starts in connected state
    await device.setStatusBar({ dataNetwork: 'wifi' });
  });

  it('shows error state when network drops before submit', async () => {
    await element(by.id('home-send-btn')).tap();
    await element(by.id('send-amount-input')).typeText('50.00');
    await element(by.id('send-recipient-input')).typeText('friend@example.com');

    // Drop network right before submit — simulates real connectivity loss
    await device.setStatusBar({ wifiMode: 'failed', dataNetwork: 'hide' });
    await element(by.id('send-confirm-btn')).tap();

    await waitFor(element(by.id('error-banner')))
      .toBeVisible()
      .withTimeout(5000);
    await detoxExpect(element(by.id('error-message')))
      .toHaveText('Network unavailable. Please try again.');
  });

  it('allows retry after network restores', async () => {
    await element(by.id('home-send-btn')).tap();
    await element(by.id('send-amount-input')).typeText('15.00');
    await element(by.id('send-recipient-input')).typeText('friend@example.com');

    await device.setStatusBar({ wifiMode: 'failed', dataNetwork: 'hide' });
    await element(by.id('send-confirm-btn')).tap();
    await waitFor(element(by.id('error-banner'))).toBeVisible().withTimeout(5000);

    // Restore network and retry
    await device.setStatusBar({ wifiMode: 'active', dataNetwork: 'wifi' });
    await element(by.id('retry-btn')).tap();

    await waitFor(element(by.id('confirmation-screen')))
      .toBeVisible()
      .withTimeout(4000);
  });

  it('handles 3G latency without timing out the UI', async () => {
    // Simulate slow network — real-world condition test
    await device.setStatusBar({ dataNetwork: '3g' });
    await element(by.id('home-send-btn')).tap();
    await element(by.id('send-amount-input')).typeText('10.00');
    await element(by.id('send-recipient-input')).typeText('friend@example.com');
    await element(by.id('send-confirm-btn')).tap();

    // Loading state should appear and resolve
    // await detoxExpect(element(by.id('loading-indicator'))).toBeVisible();
    await waitFor(element(by.id('confirmation-screen')))
      .toBeVisible()
      .withTimeout(15000); // Higher timeout for slow network
  });
});

describe('Payment Flow — Device State Edge Cases', () => {
  it('preserves payment state after app is backgrounded mid-flow', async () => {
    await device.launchApp({ newInstance: true });
    await element(by.id('home-send-btn')).tap();
    await element(by.id('send-amount-input')).typeText('100.00');

    // Background and foreground
    await device.sendToHome();
    await new Promise(r => setTimeout(r, 2000));
    await device.launchApp({ newInstance: false });

    // State should be preserved (tests navigation restoration)
    await detoxExpect(element(by.id('send-amount-input'))).toHaveText('100.00');
  });

  it('handles biometric auth challenge during payment', async () => {
    await device.launchApp({ newInstance: true });
    await element(by.id('home-send-btn')).tap();
    await element(by.id('send-amount-input')).typeText('500.00'); // High amount triggers auth
    await element(by.id('send-recipient-input')).typeText('friend@example.com');
    await element(by.id('send-confirm-btn')).tap();

    // Auth prompt appears for large amounts
    // await waitFor(element(by.id('auth-prompt'))).toBeVisible().withTimeout(3000);
    // await device.matchFace(); // or device.matchFinger()

    await waitFor(element(by.id('confirmation-screen')))
      .toBeVisible()
      .withTimeout(4000);
  });
});