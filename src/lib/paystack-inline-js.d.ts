declare module "@paystack/inline-js" {
  interface PaystackResumeCallbacks {
    onSuccess?: (transaction: {
      id: number;
      reference: string;
      message: string;
    }) => void;
    onCancel?: () => void;
    onError?: (error: { message: string }) => void;
    onLoad?: (transaction: {
      id: number;
      customer: unknown;
      accessCode: string;
    }) => void;
  }

  export default class PaystackPop {
    isLoaded(): boolean;
    resumeTransaction(accessCode: string, callbacks?: PaystackResumeCallbacks): unknown;
    newTransaction(options: Record<string, unknown>): unknown;
    cancelTransaction(idOrTransaction: unknown): void;
  }
}
