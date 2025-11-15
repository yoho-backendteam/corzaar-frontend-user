/* eslint-disable @typescript-eslint/no-explicit-any */
// date = 11 mar 2009
import reactstorage from "react-secure-storage"
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options);
};

export const StoreLocalstorage = (key: string, value: any) => {
  reactstorage.setItem(key, value)
}

export const GetLocalstorage = (key: string) => {
  const data = reactstorage.getItem(key)
  return data ? data : undefined
}

export const RemoveLocalstorage = (key: string) => {
  reactstorage.removeItem(key)
}