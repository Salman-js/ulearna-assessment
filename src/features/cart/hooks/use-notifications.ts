import { toast } from 'sonner';

export const onErrorNotification = (error: any, customMSG?: string) => {
  toast.error(
    error?.response?.data.message || customMSG || 'An error occurred'
  );
};

export const onSuccessNotification = <T>(data: T | any, message?: string) => {
  toast.success(
    message ? message : data?.message ? data?.message : 'action was successful'
  );
};
