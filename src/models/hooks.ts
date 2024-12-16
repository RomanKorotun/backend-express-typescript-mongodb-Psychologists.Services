import { IUserDocument } from "../interfaces/authInterfaces.js";

interface SettingsContext {
  options: {
    new: boolean;
    runValidators: boolean;
  };
}

export const handleSaveError = (): void => {
  (error: any, data: IUserDocument, callback: () => void): void => {
    error.status = 400;
    callback();
  };
};

export const handleAddSettings = function (
  this: SettingsContext,
  callback: () => void
): void {
  this.options.new = true;
  this.options.runValidators = true;
  callback();
};
