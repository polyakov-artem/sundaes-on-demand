export const logOnDev = (message: string) => {
  if (import.meta.env.MODE === 'development') {
    console.log(message);
  }
};
